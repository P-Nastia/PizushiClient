import {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";
import {Badge,Image, Card, Row, Col, ListGroup,Alert} from "react-bootstrap";

const OrdersPage = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/Order/list")
            .then(res => {
                const {data} = res;
                console.log('Get list of orders', data);
                setList(data);
            })
            .catch(err => console.log('Error', err));
    }, []);


    return(
        <div className="container mt-4">
            <h3 className="mb-4">Мої замовлення</h3>
            {list.length < 1 ? (
                <Alert variant="info">У вас ще немає замовлень.</Alert>
            ) : (
                list.map(order => (
                    <Card className="mb-4 shadow-sm">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col className="text-end">
                                    <Badge bg="info">{order.status}</Badge>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Дата:</strong> {new Date(order.dateCreated).toLocaleString()}</p>
                            <p><strong>Загальна ціна:</strong> {order.totalPrice} грн</p>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row className="align-items-center">
                                            <Col xs={2}>
                                                <Image
                                                    src={`${BASE_URL}/images/400_${item.productImage}`}
                                                    alt={item.productName}
                                                    thumbnail
                                                    style={{ maxHeight: '60px' }}
                                                />
                                            </Col>
                                            <Col xs={5}>
                                                <strong>{item.productName}</strong>
                                            </Col>
                                            <Col xs={3}>
                                                <div>{item.count} x {item.priceBuy} грн</div>
                                            </Col>
                                            <Col xs={2}>
                                                <strong>{item.count * item.priceBuy} грн</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>

    )
}

export default OrdersPage;