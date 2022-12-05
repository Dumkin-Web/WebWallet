import React, { useContext, useState } from "react";
import { Context } from "..";
import {Form, Modal, Button} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import req from "../http/requests";

const AccountCreation = (props)=>{
    let valuta = "";

    function createNewAcc(){
        if(valuta.length>0){
            req("/create-account?phone=" + localStorage.getItem('phone') + "&valuta="+valuta)
            .then((res) => {
                if(res.status <400){
                props.createNewAcc()
                props.onHide(false)
                }
            })
            .catch((e) => {
            console.log('Ошибка загрузки!')
            })
        }
        else{
            document.getElementById('selector').style.borderColor = "red";
        }
    }

    return(
        <Modal show={true} onHide={() => props.onHide(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Создание счета</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                    <h5 style={{fontWeight: 400}}>В какой валюте хотите открыть счет?</h5>
                    <Form.Select id="selector" aria-label="Default select example" defaultValue={""} onClick={() => {document.getElementById('selector').style.borderColor = "white"}} onChange={(e) => {valuta = e.target.value; document.getElementById('selector').style.borderColor = "#ced4da"}}>
                        <option value="" disabled>Валюта</option>
                        <option value="RUB">Российский рубль</option>
                        <option value="BYN">Белорусский рубль</option>
                        <option value="KZT">Казахстанский тенге</option>
                        <option value="CNY">Китайский юань</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide(false)}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => createNewAcc()}>
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AccountCreation;