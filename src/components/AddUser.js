import React, { useState, useEffect } from 'react'
import { Button, Modal, FormGroup, Form } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker';
import axios from "axios";
import swal from 'sweetalert';



export const AddUser = () => {

    const [formData, SetFormData] = useState({
        Name: "",
        Email: "",
        Number: "",
        DOB: "",
        NameError: "",
        EmailError: "",
        NumberError: "",
        DOBError: ""
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [value, onChange] = useState(new Date());
    formData.DOB = value
    const onChangeInput = (e) =>
        SetFormData({ ...formData, [e.target.name]: e.target.value });


    const validate = () => {

        let NameError = ""

        if (!formData.Name) {
            NameError = "Name is required"

        }
        let EmailError = ""
        if (!formData.Email.includes("@")) {
            EmailError = "invalidEmail"

        }
        let NumberError = ""

        if (!formData.Number) {
            NumberError = "phone number is required"

        }
        let DOBError = ""
        if (!formData.DOB) {
            DOBError = "Date of Birth is required"

        }
        if (NameError || EmailError || NumberError || DOBError) {
            SetFormData({
                NameError,
                EmailError,
                NumberError,
                DOBError
            })
            return false
        }

        return true

    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate()
        if (isValid) {
            console.log(formData)
            axios.post("http://localhost:5000/api/v1/posts/", formData)
                .then((response) => {
                    swal("saved", "Your data saved in Database you can view ", "success");
                    window.location.reload(false);
                    console.log(response);
                });
        }
    };






    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New user
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        onSubmit(e);
                    }}>
                        <Form.Group className="mb-3"  >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Name" name="Name"
                                onChange={(e) => {
                                    onChangeInput(e);
                                }}

                            />
                            <span style={{ color: "red" }} >{formData.NameError ? (formData.NameError) : ""}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="Email" onChange={(e) => {
                                onChangeInput(e);
                            }} />
                            <span style={{ color: "red" }} >{formData.EmailError ? (formData.EmailError) : ""}</span>

                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="tel" placeholder="Mobile" name="Number" onChange={(e) => {
                                onChangeInput(e);
                            }} />
                        </Form.Group>
                        <span style={{ color: "red" }} >{formData.NumberError ? (formData.NumberError) : ""}</span>


                        <Form.Group className="mb-3" >
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                            />
                        </Form.Group>
                        <span style={{ color: "red" }} >{formData.DOBError ? (formData.DOBError) : ""}</span>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form></Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>
        </>
    );
}


