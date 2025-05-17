import './App.css';

import CategoriesPage from "./pages/categories";


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
            {<CategoriesPage></CategoriesPage> /* підключення сторінки для категорій*/

            }
        </>

    )
}

export default App;
