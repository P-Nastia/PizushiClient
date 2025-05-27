import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CategoriesPage from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import Layout from "./components/layout";
import NoMatch from "./pages/NoMatch";
import HomePage from "./pages/home";
import CategoriesEdit from "./pages/categories/edit";
import UserLogin from "./pages/account/login";


const App = () => { //стрєлочна функція

    //Use State - вміє при зміні викликати рендер-компонента в якому знаходиться
    //count - зберігає значення
    //setCount - функція для зміни значення
    // const [count, setCount] = useState(0);





// const handleClick=()=>{
//     setList(([...list,{ // так будуть добавлятися нові елементи, деструктуризація
//         id:1,
//         name:'pizza',
//         image: "https://picsum.photos/400/400"
//     }]))
// }


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
                         <Route path={"login"} element={<UserLogin></UserLogin>} />
                     </Route>
                 </Route>
                 <Route path="*" element={<NoMatch></NoMatch>} />
             </Routes>
        </>

    )
}

export default App;
