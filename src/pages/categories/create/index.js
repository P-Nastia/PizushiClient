import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/baseTextInput";
import BaseFileInput from "../../../components/common/baseFileInput";

const CategoriesCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        slug: ''
    });
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
        data.append("name", formData.name);
        data.append("slug", formData.slug);
        data.append("imageFile", formData.image);

        try {
            await axiosInstance.post("/api/categories", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate(".."); // переход на сторінку категорій (на одну сторінку назад)
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
        <div className="container mt-4">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit}>
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


                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CategoriesCreate;