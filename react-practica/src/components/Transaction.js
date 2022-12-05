import React from "react";
import {Form, Modal, Button} from "react-bootstrap";
import req from "../http/requests";

const Transaction = (props)=>{
    let adress = "", sum ="", transactionValid = [false,false];

    function trans(){
        console.log(transactionValid)
        if(transactionValid[0] && transactionValid[1]){
            fetch("https://www.cbr-xml-daily.ru/latest.js")
            .then(res=>res.json())
            .then(res=>{
                let data = {
                    "account" : props.clicked,
                    "adress": adress,
                    "sum":sum,
                    "valuta": res
                }
                fetch("http://89.108.65.47:3000/transaction", {method:'POST',headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'}), body: JSON.stringify(data)})
                .then(res=>{
                    props.createNewAcc()
                    props.onHide(false)
                })
            })
        }
    }

    return(
        <Modal show={true} onHide={() => props.onHide(false)} onKeyPress={event => {
            if (event.key === "Enter") {
              trans();
            }}}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Перевод средств</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5 style={{fontWeight: 400}}>Номер счета списания: <span style={{fontWeight: 600}}>{props.clicked}</span></h5>
          <Form>
            <Form.Group className="mb-3 mt-3">
                <h5 style={{fontWeight: 400}}>Номер счета зачисления</h5>
              <Form.Control
                type="email"
                placeholder="000000"
                autoFocus
                onBlur={(e) => {
                    if(e.target.value.length !== 0 && Number.isInteger(+e.target.value)){
                        req("/checkAdress?accountCode="+e.target.value)
                        .then(res=>res.json())
                        .then(data=>{
                            if(data.data){
                                e.target.classList.remove('border-danger');
                                e.target.style.borderWidth = "1px"
                                transactionValid[0] = true;
                            }
                            else{
                                e.target.classList.add('border-danger');
                                e.target.style.borderWidth = "2px"
                                transactionValid[0] = false;
                            }
                        })
                    }
                    else{
                        e.target.classList.add('border-danger');
                        e.target.style.borderWidth = "2px"
                        transactionValid[0] = false;
                    }
                    adress = e.target.value
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <h5 style={{fontWeight: 400}}>Сумма перевода</h5>
              <Form.Control
                type="email"
                placeholder="500"
                onChange={(e)=>{
                    sum = e.target.value;
                    if(e.target.value.length !== 0 && !isNaN(e.target.value) && e.target.value >0){
                        req("/checkBalance?accountCode="+props.clicked)
                        .then(res=>res.json())
                        .then(res=>{
                            if(res.data !== false){
                                if(+res.data>=+e.target.value){
                                    e.target.classList.remove('border-danger');
                                    e.target.style.borderWidth = "1px"
                                    transactionValid[1] = true;
                                }else{
                                    e.target.classList.add('border-danger');
                                    e.target.style.borderWidth = "2px"
                                    transactionValid[1] = false;
                                }
                            }
                        })
                        
                    }
                    else{
                        e.target.classList.add('border-danger');
                        e.target.style.borderWidth = "2px"
                        transactionValid[1] = false;
                    }
                }}
              />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide(false)}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={()=>trans()}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Transaction;