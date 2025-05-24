import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/baseTextInput";
import BaseFileInput from "../../../components/common/baseFileInput";
import {BASE_URL} from "../../../api/apiConfig";
import {useFormik} from "formik";

const CategoriesEdit = () => {
    const { id } = useParams();

    const [currentImage, setCurrentImage] = useState("");
    const initValues = {
        id: 0,
        name: "",
        slug: "",
        imageFile: null
    }

    useEffect(() => {
        axiosInstance.get(`/api/categories/${id}`)
            .then(res => {
                const data = res.data;
                setValues({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    imageFile: null
                });
                setCurrentImage(data.image);
                console.log('Get category:', data.image);
            })
            .catch(err => console.error('Error loading category:', err));
    }, [id]);

    const handleFormikSubmit = async (values) => {

        console.log("Formik submit", values);
        try {
            var result = await axiosInstance.put(`${BASE_URL}/api/categories/edit`, values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            console.log("Server result", result);
            navigate("..");
        }
        catch (err) {
            console.log("Error", err);
            const serverErrors = {};
            const {response} = err;
            const {data} = response;
            if(data) {
                const {errors} = data;
                Object.entries(errors).forEach(([key, messages]) => {
                    let messageLines = "";
                    messages.forEach(message => {
                        messageLines += message+" ";
                        console.log(`${key}: ${message}`);
                    });
                    const field = key.charAt(0).toLowerCase() + key.slice(1);
                    serverErrors[field] = messageLines;

                });
            }
            setErrors(serverErrors);
        }
    }
    const formik=useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit,
        enableReinitialize : true,

    });

    const {values,handleSubmit,errors,setErrors,touched,handleChange,setFieldValue,setValues} = formik; //values - зміни, які будуть в форміку


    const navigate = useNavigate();

    const handleFileChange=(e)=>{
        const files=e.target.files;
        console.log("File change",files[0]);

        if(files.length>0){
            setFieldValue("imageFile",files[0]);
        }
        else{
            setFieldValue("imageFile",null);
        }
    }

    return (
        <form className={"col-md-6 offset-md-3 mt-4"} onSubmit={handleSubmit}>
            <h2 className={"text-center"}>Create category</h2>
            <BaseTextInput
                field={"name"}
                label={"Name"}
                handleOnChange={handleChange}
                value={values.name}
                error={errors.name}
                touched={touched.name}
            />

            <BaseTextInput
                field={"slug"}
                label={"Slug"}
                handleOnChange={handleChange}
                value={values.slug}
                error={errors.slug}
                touched={touched.slug}
            />

            <BaseFileInput
                field={"image"}
                label={"Choose image"}
                handleOnChange={handleFileChange}
                error={errors.imageFile}
                touched={touched.imageFile}
            />

            <div className="mb-3">
                <img
                    src={
                        values.imageFile
                            ? URL.createObjectURL(values.imageFile) : `${BASE_URL}/images/200_${currentImage}`
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
    );
};

export default CategoriesEdit;