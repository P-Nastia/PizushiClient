import {forwardRef, useState} from "react";
import { useNavigate} from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/baseTextInput";
import BaseFileInput from "../../../components/common/baseFileInput";
import * as yup from "yup";
import {useFormik} from "formik";
import {BASE_URL} from "../../../api/apiConfig";

const validationSchema = yup.object().shape({
    //name: yup.string().required("Name is required"),
    //slug: yup.string().required("Slug is required"),
    //imageFile: yup.mixed().required("Image is required")
});

const CategoriesCreate = () => {

    const handleFormikSubmit = async (values) => {
        console.log("Formik submit", values);
        try {
            var result = await axiosInstance.post(`${BASE_URL}/api/categories/create`, values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            console.log("Server result", result);
            navigate(".."); // перехід на сторінку категорій (на одну сторінку назад)
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

    const initValues = {
        name: "",
        slug: "",
        imageFile: null
    }

    const formik=useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: handleFormikSubmit
    });

    const {values,handleSubmit,errors,setErrors,touched,handleChange,setFieldValue} = formik; //values - зміни, які будуть в форміку
    // touched -- якщо форма була submitнута

    const navigate = useNavigate();

    const handleFileChange=(e)=>{
        const files=e.target.files;
        if(files.length>0){
            setFieldValue("imageFile",files[0]);
        }
        else{
            setFieldValue("imageFile",null);
        }
    }

    // console.log("errors",errors);
    // console.log("touched",touched);

    return (
        <form className={"col-md-6 offset-md-3 mt-4"} onSubmit={handleSubmit}>
            <h2 className={"text-center"}>Create category</h2>
                <BaseTextInput
                    field={"name"}
                    label={"Name"}
                    handleOnChange={handleChange}  // з форміка
                    value={values.name} // з форміка
                    error={errors.name} // з форміка
                    touched={touched.name} // з форміка
                />

                <BaseTextInput
                    field={"slug"}
                    label={"Slug"}
                    handleOnChange={handleChange}
                    value={values.slug}
                    error={errors.slug} // з форміка
                    touched={touched.slug} // з форміка
                />

                <BaseFileInput
                    field={"image"}
                    label={"Choose image"}
                    handleOnChange={handleFileChange}
                    error={errors.imageFile} // з форміка
                    touched={touched.imageFile} // з форміка
                />

            <div className="mb-3">
                <img
                    src={
                        values.image
                            ? URL.createObjectURL(values.image) : null
                    }
                    alt=""
                    width={100}
                />
            </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
        </form>
    );
};

export default CategoriesCreate;