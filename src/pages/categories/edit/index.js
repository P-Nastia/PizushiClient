import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/baseTextInput";
import BaseFileInput from "../../../components/common/baseFileInput";
import {BASE_URL} from "../../../api/apiConfig";


const CategoriesEdit = () => {
    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState("");
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        image: null,
        slug: ''
    });
    useEffect(() => {
        axiosInstance.get(`/api/categories/${id}`)
            .then(res => {
                const data = res.data;
                setFormData({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    image: null
                });
                setCurrentImage(data.image);
                console.log('Get category:', data.image);
            })
            .catch(err => console.error('Error loading category:', err));
    }, [id]);
    const [errors, setErrors] = useState({
        name: '',
        slug: '',
        image:''
    });

    const navigate = useNavigate();

    const handleOnChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleFileChange=(e)=>{
        const files=e.target.files;
        if(files.length>0){
            setFormData({
                ...formData,
                [e.target.name]:files[0]
            })
            setCurrentImage("");
        }
        else{
            console.log(files[0]);
            setFormData({
                ...formData,
                [e.target.name]:null
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("id", formData.id);
        data.append("name", formData.name);
        data.append("slug", formData.slug);
        if (formData.image) {
            data.append("imageFile", formData.image);
        }

        try {
            await axiosInstance.post("/api/categories/edit", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("..");
        } catch (err) {
            const newErrors = {};
            const errors=err.response.data.errors;
            if (errors && typeof errors === 'object') {

                if (errors.Name) {
                    newErrors.name = errors.Name[0];
                    console.log(errors.Name[0]);
                }

                if (errors.Slug) {
                    newErrors.slug = errors.Slug[0];
                    console.log(errors.Slug[0]);
                }

                if (errors.ImageFile) {
                    newErrors.image = errors.ImageFile[0];
                    console.log(errors.ImageFile[0]);
                }

            }
            else{
                console.log(err.response.data);
                newErrors.name = err.response.data;
            }
            setErrors(newErrors);
        }
    };

    return (
        <div >

            <form className={"col-md-6 offset-md-3 mt-4"} onSubmit={handleSubmit}>
                <h2 className={"text-center"}>Edit category</h2>
                <BaseTextInput
                    field={"name"}
                    label={"Name"}
                    handleOnChange={handleOnChange}
                    value={formData.name}
                    error={errors.name}
                />

                <BaseTextInput
                    field={"slug"}
                    label={"Slug"}
                    handleOnChange={handleOnChange}
                    value={formData.slug}
                    error={errors.slug}
                />

                <BaseFileInput
                    field={"image"}
                    label={"Choose image"}
                    handleOnChange={handleFileChange}
                    error={errors.image}
                />
                <div className="mb-3">
                    <img
                        src={
                            formData.image
                                ? URL.createObjectURL(formData.image)
                                : `${BASE_URL}/images/200_${currentImage}`
                        }
                        alt=""
                        width={100}
                    />
                </div>


                <button type="submit" className="btn btn-primary">
                    Edit
                </button>
                <Link to="/categories" className="btn btn-primary ms-2">
                    Cancel
                </Link>
            </form>
        </div>
    );
}
export default CategoriesEdit;