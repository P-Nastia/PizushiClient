import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CategoriesPage from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import Layout from "./components/layout";
import NoMatch from "./pages/NoMatch";
import HomePage from "./pages/home";
import CategoriesEdit from "./pages/categories/edit";
import LoginPage from "./pages/account/login";
import {useAuthStore} from "./store/authStore";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/products/product";

const App = () => { //стрєлочна функція

    const {setUser}=useAuthStore((state)=>state);

    useEffect(()=>{
        const token=localStorage.getItem("jwt");
        if(token){
            const decoded=jwtDecode(token);
            setUser(decoded);
        }
    },[])

    return (
        <>
             <Routes>
                 <Route path="/" element={<Layout></Layout>}>
                     // це все буде Outlet
                     <Route index element={<HomePage></HomePage>} />
                     <Route path={"categories"}>
                         <Route index element={<CategoriesPage></CategoriesPage>} />
                         <Route path={"create"} element={<CategoriesCreate></CategoriesCreate>} />
                         <Route path={"edit/:id"} element={<CategoriesEdit></CategoriesEdit>} />

                     </Route>
                     <Route path={"account"}>
                         <Route path={"login"} element={<LoginPage></LoginPage>} />
                     </Route>
                     <Route path={"products"}>
                         <Route index element={<ProductsPage></ProductsPage>} />
                         <Route path={"product/:id"} element={<ProductPage></ProductPage>} />
                     </Route>
                 </Route>
                 <Route path="*" element={<NoMatch></NoMatch>} />
             </Routes>
        </>

    )
}

export default App;
