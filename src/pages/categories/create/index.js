import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

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
        const {name,files,value}=e.target;
        console.log(name,value,files);
        if(name==='image'){
            setFormData({
                ...formData,
                image:files[0]
            })
        }
        else{
            setFormData({
                ...formData,
                [name]:value
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
            await axios.post("http://localhost:5003/api/categories", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/categories");
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
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}

                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                        type="text"
                        className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                        name="slug"
                        value={formData.slug}
                        onChange={handleOnChange}

                    />
                    {errors.slug && (
                        <div className="invalid-feedback">{errors.slug}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        name="image"
                        onChange={handleOnChange}
                        accept="image/*"

                    />
                    {errors.image && (
                        <div className="invalid-feedback">{errors.image}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CategoriesCreate;