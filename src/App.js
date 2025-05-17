import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CategoriesPage from "./pages/categories/index";
import CategoriesCreate from "./pages/categories/create";
import Layout from "./components/Layout/index";


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
        <Router>
             <Routes>
                 <Route element={<Layout></Layout>}>
                     // це все буде Outlet
                     <Route path="/" element={<CategoriesPage></CategoriesPage>} />
                     <Route path="/create" element={<CategoriesCreate></CategoriesCreate>} />
                 </Route>
             </Routes>
        </Router>

    )
}

export default App;
