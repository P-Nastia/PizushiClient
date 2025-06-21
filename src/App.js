import './App.css';
import {  Routes, Route } from "react-router-dom";

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
import CreateProductPage from "./pages/products/create";
import EditProductPage from "./pages/products/edit";
import {useCartStore} from "./store/cartStore";
import OrdersPage from "./pages/orders";
import ProfilePage from "./pages/profile";

const App = () => { //стрєлочна функція

    const {setUser}=useAuthStore((state)=>state);
    const loadCart = useCartStore((state) => state.loadCart);

    const checkAuth = async()=>{
        const token=localStorage.getItem("jwt");
        if(token){
            const decoded=jwtDecode(token);
            await setUser(decoded);
        }
        await loadCart();
    }

    useEffect(()=>{
        checkAuth();
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
                         <Route path={"edit/:id"} element={<EditProductPage></EditProductPage>} />
                         <Route path={"create"} element={<CreateProductPage></CreateProductPage>} />
                     </Route>

                     <Route path={"profile"}>
                         <Route index element={<ProfilePage></ProfilePage>} />
                     </Route>

                     <Route path={"orders"}>
                         <Route index element={<OrdersPage></OrdersPage>} />
                     </Route>

                 </Route>
                 <Route path="*" element={<NoMatch></NoMatch>} />
             </Routes>
        </>

    )
}

export default App;
