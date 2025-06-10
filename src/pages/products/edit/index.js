import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Modal, Input } from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import DragDropUpload from "../../../components/productCreatePage/dragDropUpload";
import {BASE_URL} from "../../../api/apiConfig";

const EditProductPage = () => {
    const {id} = useParams();

    const [productData, setProductData] = useState({
        id: id,
        name: "",
        slug: "",
        price: "",
        weight: "",
        productSizeId: "",
        categoryId: "",
        ingredientIds: []
    });
    const [images, setImages] = useState([]);

    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [isIngModalVisible, setIsIngModalVisible] = useState(false);
    const[newIngredient, setNewIngredient] = useState({
        name: "",
        imageFile : null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sizesRes, categoriesRes, ingredientsRes] = await Promise.all([
                    axiosInstance.get("/api/Products/sizes"),
                    axiosInstance.get("/api/Categories"),
                    axiosInstance.get("/api/Products/ingredients"),
                ]);
                console.log("Categories",categoriesRes);

                setSizes(Array.isArray(sizesRes.data) ? sizesRes.data : []);
                setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
                setIngredients(Array.isArray(ingredientsRes.data) ? ingredientsRes.data : []);

            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if(!id || ingredients.length === 0) return;
        axiosInstance.get(`/api/Products/id/${id}`)
            .then(res => {
                const current = res.data;
                const {productImages} = res.data;
                console.log("current", current);
                console.log("productImages", productImages);

                const updatedFileList=productImages?.map((image) => ({
                    uId:image.id.toString(),
                    name:image.name,
                    url:`${BASE_URL}/images/800_${image.name}`,
                    originFileObj: new File([new Blob([''])],image.name,{type:'old-image'}),
                }));
                setImages(updatedFileList);

                productData.weight=current.weight;
                productData.price=current.price;
                productData.productSizeId=current.productSize.id;
                productData.categoryId=current.category.id;
                productData.name=current.name;
                productData.slug=current.slug;
                productData.ingredientIds=current.productIngredients.map(pi => pi.id)
                console.log(productData);

            })
            .catch(err => console.error("Error loading product", err));
    },[id,ingredients]);

    const handleIngredientToggle = (id) => {
        setProductData(prev => {
            const has = prev.ingredientIds.includes(id);
            let newIds;
            if (has) {
                newIds = prev.ingredientIds.filter(x => x !== id);
            } else {
                newIds = [...prev.ingredientIds, id];
            }
            return { ...prev, ingredientIds: newIds };
        });

        console.log("IDS",productData.ingredientIds);
    };

    const showIngModal = () => {
        setIsIngModalVisible(true);
    };

    const handleIngModalOk = async () => {
        try {
            const formData = new FormData();
            formData.append("name", newIngredient.name);
            formData.append("imageFile", newIngredient.imageFile);

            const res = await axiosInstance.post("/api/Products/ingredients", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const newIng = res.data;

            setIngredients(prev => [...prev, newIng]);

            setProductData(prev => {
                const updatedIds = prev.ingredientIds.includes(newIng.id)
                    ? prev.ingredientIds
                    : [...prev.ingredientIds, newIng.id];

                return {
                    ...prev,
                    ingredientIds: updatedIds
                };
            });

            setIsIngModalVisible(false);
        } catch (error) {
            console.log("Помилка при створенні інгредієнта");
        }
    };

    const handleIngModalCancel = () => {
        setIsIngModalVisible(false);
        newIngredient.name = "";
        newIngredient.imageFile = null;
    };

    const handleEditProduct = async () => {
        try {
            productData.imageFiles = images.map(x=>x.originFileObj);
            console.log("Send Data server",productData);

            const res = await axiosInstance.put("/api/Products/edit", productData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("..");

        } catch (err) {
            setErrorMessage(err);
            console.error(err);
        }
    };

    return (

        <div className="container mt-5">
            <h2 className="mb-4">Змінити продукт</h2>
            <div className="row">

                {errorMessage && (
                    <div className="error">
                        {typeof errorMessage === 'string'
                            ? errorMessage
                            :
                            JSON.stringify(errorMessage)}
                    </div>
                )}


                <div className="col-md-6 mb-4">
                    <div className="border rounded p-3 h-100">
                        <DragDropUpload fileList={images} setFileList={setImages}></DragDropUpload>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="border rounded p-3 h-100">
                        <div className="mb-3">
                            <label className="form-label">Назва</label>
                            <input
                                type="text"
                                className="form-control"
                                value={productData.name}
                                onChange={e => setProductData({ ...productData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Слаг (латинськими)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={productData.slug}
                                onChange={e => setProductData({ ...productData, slug: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Вага (г)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={productData.weight}
                                onChange={e => setProductData({ ...productData, weight: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ціна (грн)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={productData.price}
                                onChange={e => setProductData({ ...productData, price: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Розмір</label>
                            <select
                                className="form-select"
                                value={productData.productSizeId}
                                onChange={e => setProductData({ ...productData, productSizeId: e.target.value })}
                            >
                                <option value="">Оберіть розмір</option>
                                {sizes.map(size => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Категорія</label>
                            <select
                                className="form-select"
                                value={productData.categoryId}
                                onChange={e => setProductData({ ...productData, categoryId: e.target.value })}
                            >
                                <option value="">Оберіть категорію</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-success" onClick={handleEditProduct}>
                            Редагувати продукт
                        </button>
                    </div>
                </div>
            </div>

            <div className="border rounded p-3 mb-4">
                <h5>Інгредієнти</h5>
                <div className="d-flex flex-wrap gap-3 mb-3">
                    {ingredients.length === 0 && <span>Завантаження інгредієнтів...</span>}
                    {ingredients.length > 0 && ingredients.map(ing => (
                        <div
                            key={ing.id}
                            onClick={() => handleIngredientToggle(ing.id)}
                            style={{
                                cursor: "pointer",
                                userSelect: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: productData.ingredientIds.includes(ing.id) ? "2px solid green" : "1px solid #ccc",
                                backgroundColor: productData.ingredientIds.includes(ing.id) ? "#d4f5d4" : "#f9f9f9",
                                marginRight: 8,
                                marginBottom: 8,
                            }}
                        >
                            {ing.name}
                        </div>

                    ))}
                    <div
                        onClick={() => showIngModal()}
                        style={{
                            cursor: "pointer",
                            userSelect: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            border: "1px solid black",
                            backgroundColor: "gray",
                            marginRight: 8,
                            marginBottom: 8
                        }}
                    >+
                    </div>
                    {productData.ingredientIds.length === 0 && (
                        <span className="text-muted">Жодного інгредієнта не додано</span>
                    )}
                </div>
            </div>
            <Modal
                title="Додати інгредієнт"
                open={isIngModalVisible}
                onOk={handleIngModalOk}
                onCancel={handleIngModalCancel}
                okText="Додати"
                cancelText="Скасувати"
            >
                <Input
                    placeholder="Назва інгредієнта"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                />

                <Input
                    type="file"
                    className={`form-control mt-4`}
                    onChange={(e) => setNewIngredient({...newIngredient, imageFile: e.target.files[0]})}
                    accept="image/*"

                />
            </Modal>

        </div>

    );
};

export default EditProductPage;