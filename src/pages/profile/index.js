import {BASE_URL} from "../../api/apiConfig";
import {Image, Card, Row, Col} from "react-bootstrap";
import {useAuthStore} from "../../store/authStore";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    const user = useAuthStore.getState().user;
    console.log("USER",user);

    return(
        <>
            <div className="container">
                {user?(
                <>
                    <Card className="mt-4 shadow-sm ">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={3} className="text-center">
                                    <Image
                                        src={`${BASE_URL}/images/400_${user.image}`}
                                        roundedCircle
                                        fluid
                                        style={{ maxWidth: '150px' }}
                                        alt={user.name}
                                    />
                                </Col>
                                <Col md={9}>
                                    <h4>{user.name}</h4>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <NavLink to="/orders" className={"btn btn-primary mt-3"}>
                        <FontAwesomeIcon icon={faReceipt} className="me-2" />
                        Переглянути список замовлень
                    </NavLink>

                </>)
                :
                <h3 className="mb-4">Ви не увійшли в свій профіль</h3>
                }
            </div>
        </>

    )
}

export default ProfilePage;