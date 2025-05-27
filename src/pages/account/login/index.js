import {forwardRef, useState} from "react";
import { useNavigate} from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/baseTextInput";

import {useFormik} from "formik";
import {BASE_URL} from "../../../api/apiConfig";

const UserLogin = () => {

    const handleFormikSubmit = async (values) => {
        console.log("Formik submit", values);
        try {
            var result = await axiosInstance.post(`${BASE_URL}/api/account/login`, values);
            console.log("Server result", result);
            const {token} = result.data;
            localStorage.setItem('token', token);
            window.location.href = "/";
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
        email: "",
        password: ""
    }

    const formik=useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit
    });

    const {values,handleSubmit,errors,setErrors,touched,handleChange,setFieldValue} = formik; //values - зміни, які будуть в форміку


    const navigate = useNavigate();

    return (
        <form className={"col-md-6 offset-md-3 mt-4"} onSubmit={handleSubmit}>
            <h2 className={"text-center"}>Create category</h2>
            <BaseTextInput
                field={"email"}
                label={"Email"}
                handleOnChange={handleChange}  // з форміка
                value={values.email} // з форміка
                error={errors.email} // з форміка
                touched={touched.email} // з форміка
            />

            <BaseTextInput
                field={"password"}
                label={"Password"}
                handleOnChange={handleChange}
                value={values.password}
                error={errors.password} // з форміка
                touched={touched.password} // з форміка
            />


            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
};

export default UserLogin;