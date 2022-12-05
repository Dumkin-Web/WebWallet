import React, { useContext } from "react";
import { Context } from "..";
import { Card, CardGroup, Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const MainPage = () =>{

    return(
        <Container>
            <CardGroup style={{marginTop: 20}}>
                <Card >
                    <Card.Img variant="top" src="http://89.108.65.47:3000/login.png" className="p-3"/>
                    <Card.Body>
                        <Card.Title>Для наших клиентов:</Card.Title>
                        <Card.Text>
                        Нам очень приятно, что ваш выбор пал на нашу систему онлайн-переводов "Internet money"!
                        Для того, чтобы начать совершать платежи и переводы, вам достаточно войти в аккаунт
                        </Card.Text>
                        <Button variant="primary" href="/auth">Войти в аккаунт</Button>
                    </Card.Body>
                </Card>
                <Card >
                    <Card.Img variant="top" src="http://89.108.65.47:3000/reg.png" className="p-3"/>
                    <Card.Body>
                        <Card.Title>Для новых клиентов:</Card.Title>
                        <Card.Text>
                        Мы рады приветствовать вас в нашей системе онлайн-переводов "Internet money"!
                        Для того, чтобы начать совершать платежи и переводы, вам достаточно зарегистрироваться
                        </Card.Text>
                        <Button variant="primary" href="/reg">Регистрация</Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Container>
    )
}

export default MainPage;