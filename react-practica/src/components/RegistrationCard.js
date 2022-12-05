import React, { useContext } from "react";
import { Card, Form, Button, Row, Container, FormControl, InputGroup, Alert} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";
import { Context } from "..";
import req from "../http/requests";
import {AUTH_ROUTE} from "../utils/consts"

let password = "", phone ="", surname ="", name="", patronymic ="", birthdate="", sexCode="", citizenshipCode="", passIdent = false, phoneUniqe = false;

const RegistrationCard = () =>{
    const {user} = useContext(Context);
    const navigate = useNavigate();

    function Reg(){
        if(password === "" || !phoneUniqe || !passIdent || surname ==="" || name ==="" || patronymic ==="" || birthdate ==="" || sexCode ==="" || citizenshipCode ===""){
            document.getElementById('alert').innerHTML = "Заполните все поля формы регистрации!"
            document.getElementById('alert').classList.replace('d-none', 'd-block');
        }
        else{
            req("/registration?"+"phone="+phone+"&password="+password+"&surname="+surname+"&name="+name+"&patronymic="+patronymic+"&birthdate="+birthdate+"&sexCode="+sexCode+"&citizenshipCode="+citizenshipCode)
            .then((res) => {
                if(res.status < 400){    
                user.setIsAuth(true);
                localStorage.setItem('phone', phone.toString());
                navigate('/hub')
                }
                
            })
            .catch((e) => {
                document.getElementById('alert').innerHTML = "Произошла ошибка, перезагрузите страницу или попробуйте позднее!"
                document.getElementById('alert').classList.replace('d-none', 'd-block');
            })
        }
    } 
      




    return(
        <Container className="d-flex justify-content-center align align-items-center mt-10" style={{height: window.innerHeight/3, marginTop: window.innerHeight/4}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                    <InputGroup className="mt-3">
                        <InputGroup.Text id="basic-addon1">+7</InputGroup.Text>
                        <FormControl
                        placeholder="9876543210"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                            phone = e.target.value
                            if(e.target.value.length == 10 & !isNaN(e.target.value)){
                                e.target.classList.remove('bg-warning')
                                req("/registration/exist?phone="+phone)
                                .then(res => res.json())
                                .then(res => {
                                    if(res.status){
                                        e.target.classList.add('bg-danger')
                                        phoneUniqe = false;
                                    }
                                    else{
                                        e.target.classList.remove('bg-danger')
                                        phoneUniqe = true;
                                    }
                                    })
                                    .catch((e) =>{
                                        document.getElementById('alert').innerHTML = "Произошла ошибка, перезагрузите страницу или попробуйте позднее!"
                                        document.getElementById('alert').classList.replace('d-none', 'd-block');
                                    })
                            }
                            else{
                                e.target.classList.remove('bg-danger')
                                e.target.classList.add('bg-warning')
                                phoneUniqe = false;
                            }
                        }}/>
                    </InputGroup>
                    <Form.Control className="mt-3" placeholder="Введите фамилию" onChange={(e) => {surname = e.target.value}}/>
                    <Form.Control className="mt-3" placeholder="Введите имя" onChange={(e) => {name = e.target.value}} />
                    <Form.Control className="mt-3" placeholder="Введите отчество" onChange={(e) => {patronymic = e.target.value}}/>
                    <Form.Select className="mt-3" onChange={(e) => {sexCode = e.target.value}} defaultValue="">
                        <option value="" disabled>Укажите пол</option>
                        <option value="1">Мужской</option>
                        <option value="2">Женский</option>
                    </Form.Select>
                    <Form.Select className="mt-3" onChange={(e) => {citizenshipCode = e.target.value}} defaultValue="">
                        <option value="" disabled>Укажите гражданство</option>
                        <option value="1">Гражданин РФ</option>
                        <option value="2">Гражданин РФ и иного государства</option>
                        <option value="3">Иностранный гражданин</option>
                        <option value="4">Лицо без гражданства</option>
                    </Form.Select>
                    <Form.Control type="date" style={{height: 40}} className="mt-3" placeholder="Ввведите дату рождения" onChange={(e) => {birthdate = e.target.value}}/>
                    <Form.Control type="password" className="mt-3" placeholder="Ввведите пароль" onChange={(e) => {password = e.target.value}}/>
                    <Form.Control type="password" className="mt-3" placeholder="Повторно введите пароль" onChange={(e) => {
                        if(password == e.target.value){
                            e.target.classList.remove('bg-warning')
                            passIdent = true;
                        }
                        else{
                            passIdent = false;
                            e.target.classList.add('bg-warning')
                        }
                        }}/>
                    <Row className="d-flex mt-3 m-0 justify-content-between  align-items-center" style={{width: 502}}>
                        <div style={{width: 300}} className="p-0">
                            Есть аккаунт? <NavLink className="p-0 d-inline" to={AUTH_ROUTE}>Войдите!</NavLink>
                        </div>
                        <Button style={{width: 130}} className="d-inline" variant={"outline-success"} onClick={()=>{Reg()}}>
                            Регистрация
                        </Button>
                    </Row> 
                    <Alert id="alert" variant='danger' className="mt-2 d-none p-2 mb-0">
                            Заполните все поля формы регистрации!
                    </Alert>                       
                </Form>
            </Card>
        </Container>
    )
}

export default RegistrationCard;