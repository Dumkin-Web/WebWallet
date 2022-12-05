import React, { useContext } from "react";
import { Context } from "..";
import { Card, Form, Button, Row, Container, Alert, InputGroup, FormControl} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";
import req from "../http/requests";
import {REGISTRATION_ROUTE} from "../utils/consts"
import { observer } from "mobx-react-lite";

let phone = "", password = "";



const AuthCard = observer(() =>{

    const {user} = useContext(Context);
    const navigate = useNavigate();

    function Login(){
        if(password === ""){
            document.getElementById('alert').innerHTML = "Введите пароль!"
            document.getElementById('alert').classList.replace('d-none', 'd-block');
        }
        if(phone === ""){
            document.getElementById('alert').innerHTML = "Введите номер телефона!"
            document.getElementById('alert').classList.replace('d-none', 'd-block');
        }
    
        if(password !== "" && phone !== ""){
            req("/login?"+"phone="+phone+"&password="+password)
            .then(res => res.json())
            .then((res) => {
                if(res.status){
                    user.setIsAuth(true);
                    localStorage.setItem('phone', phone.toString());
                    navigate('/hub')
                }
                else{
                    document.getElementById('alert').innerHTML = "Неверный логин или пароль"
                    document.getElementById('alert').classList.replace('d-none', 'd-block');
                    document.getElementById('phoneNumber').value = "";
                    document.getElementById('password').value = "";
                }
            })
            .catch((e) => {
                document.getElementById('alert').innerHTML = "Произошла ошибка, перезагрузите страницу или попробуйте позднее!"
                document.getElementById('alert').classList.replace('d-none', 'd-block');
            })
        }
        
        //document.getElementById('alert').classList.replace('d-none', 'd-block');
    }


    return(
        <Container className="d-flex justify-content-center align align-items-center mt-10" style={{height: window.innerHeight/3, marginTop: window.innerHeight/4}}>
            <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">Авторизация</h2>
                    <Form className="d-flex flex-column" onSubmit={()=> {console.log('sub')}}>
                        <InputGroup className="mt-3">
                        <InputGroup.Text id="basic-addon1">+7</InputGroup.Text>
                        <FormControl id="phoneNumber" placeholder="9876543210" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {phone = e.target.value}}/>
                        </InputGroup>
                        <Form.Control id="password" type="password" className="mt-3" onKeyPress={event => {
              if (event.key === "Enter") {
                Login();
              }
            }}placeholder="Введите пароль..." onChange={(e) => {password = e.target.value}}/>
                        <Row className="d-flex mt-3 m-0 justify-content-between  align-items-center" style={{width: 502}}>
                            <div style={{width: 300}} className="p-0">
                                Нет аккаунта? <NavLink className="p-0 d-inline" to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            <Button style={{width: 100}} className="d-inline" variant={"outline-success"} onClick={()=>{Login()}}>
                                Войти
                            </Button>
                        </Row>
                        <Alert id="alert" variant='danger' className="mt-2 d-none p-2 mb-0">
                            Неверный логин или пароль
                        </Alert>
                        
                    </Form>
                </Card>
        </Container>
    )
})

export default AuthCard;