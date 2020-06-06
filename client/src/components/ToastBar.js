import React,{useState} from "react";
import {Toast,Col} from "react-bootstrap"

export const ToastBar = (props) =>
{
    const [showA, setShowA] = useState(true);

    const toggleShowA = () => setShowA(!showA);

    return (
        <div style={{position:"absolute",width:"50vw",height:"25vh"}}>
            <Col xs={8}>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <strong className="mr-auto">Message</strong>
                        <small>{props.date}</small>
                    </Toast.Header>
                    <Toast.Body>{props.message}</Toast.Body>
                </Toast>
            </Col>
            </div>
    );
}
