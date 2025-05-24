import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";
import {Modal,Button} from "react-bootstrap";


const CategoriesPage = () => {

    const [list, setList] = useState([]); // створення масиву
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axiosInstance.get("/api/Categories")
            .then(res => {
                const {data} = res;
                console.log('Get list of categories', data);
                setList(data);
            })
            .catch(err => console.log('Error', err));
    }, []);  //deps - для умови коли має викликатися це, якщо просто [] - то викличеться лише на початку запуску програми і всі

    const confirmDelete = (id) => {
        console.log('Delete category', id);
        setItemToDelete(id);
        setShowModal(true);
    };
    const handleDeleteConfirmed = async () => {
        if (itemToDelete) {
            try {
                await axiosInstance.delete(`/api/Categories/delete`, {
                    data: {id: itemToDelete}
                });
                setList((prev) => prev.filter((item) => item.id !== itemToDelete));
            } catch (err) {
                console.error("Помилка при видаленні", err);
            } finally {
                setShowModal(false);
                setItemToDelete(null);
            }
        }
    };
    const handleClose = () => {
        setShowModal(false);
        setItemToDelete(null);
    };

    return(
        <>
            <div className={"container"}>
                <h1 className={"text-center"}>Категорії</h1>
                    <Link className={"btn btn-primary"} to={"create"}>
                        Add new
                    </Link>
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
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => confirmDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirmed}>
                            Yes, Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>

    )
}

export default CategoriesPage;