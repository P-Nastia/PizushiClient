import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";

const CategoriesPage = () => {

    const [list, setList] = useState([]); // створення масиву

    useEffect(() => {
        axiosInstance.get("/api/Categories")
            .then(res => {
                const {data} = res;
                console.log('Get list of categories', data);
                setList(data);
            })
            .catch(err => console.log('Error', err));
    }, []);  //deps - для умови коли має викликатися це, якщо просто [] - то викличеться лише на початку запуску програми і всі


    return(
        <>
            <div className={"container"}>
                <h1 className={"text-center"}>Категорії</h1>
                    <Link className={"btn btn-primary"} to={"create"}>
                        Add new
                    </Link>
                {/*<button onClick={() => {*/}
                {/*    setCount(count + 1);*/}
                {/*}}>*/}
                {/*    click me*/}
                {/*</button>*/}


                {list.length === 0 ? <h2>List is empty</h2> : // якщо список пустий буде виводитися це
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Назва</th>
                            <th>Зображення</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img width={75} src={`${BASE_URL}/images/200_${item.image}`} alt={item.name}/></td>
                                    <td>
                                        <Link to={`edit/${item.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

        </>

    )
}

export default CategoriesPage;