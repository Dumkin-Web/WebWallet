import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {Tab, Nav, Row, Col, Spinner, Alert, Button} from "react-bootstrap";
import { Context } from "..";
import req from "../http/requests";
import AccountCreation from "../components/AccountCreation"
import Transaction from "../components/Transaction";
import OperationHistory from "../components/OperationHistory";

const Hub = observer(() =>{
    const {user} = useContext(Context);
    const [loading, setLoading] =useState(true);
    const [accounts, setAccounts] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [valutaData, setValutaData] = useState({})
    const [show, setShow] = useState(false);

    useEffect(()=>{
      req("/hub?"+"phone="+localStorage.getItem('phone'))
            .then(res => res.json())
            .then((res) => {
                setLoading(false);
                setAccounts(res.data);
            })
            .catch((e) => {
              setLoading('err');
              return <Alert id="alert" variant='danger' className="mt-2 d-none p-2 mb-0">
                      Произошла ошибка
                    </Alert>
            })
      req("/valuta")
            .then(res => res.json())
            .then((res) => {
                setValutaData(res.data);
            })
            .catch((e) => {
              console.log('Ошибка загрузки!')
            })
     }, [])

    function ModalWin(){
      if(show === 1)
        return <AccountCreation clicked={clicked} createNewAcc={createNewAcc} onHide={setShow} />
      if(show === 2)
        return <Transaction clicked={clicked} createNewAcc={createNewAcc} onHide={setShow}/>
      if(show === 3){
        return <OperationHistory clicked={clicked} createNewAcc={createNewAcc} onHide={setShow}/>
      }
      return <div></div>
    }

    function topUp(){
      req("/topUp?accountCode="+clicked)
            .then((res) => {
                createNewAcc();
            })
            .catch((e) => {
              console.log('Ошибка загрузки!')
            })
    }

     function createNewAcc(){
          console.log('Success');
          //setLoading(true);
          window.location.reload()
     }
    
    
    if(loading === "err"){
      return  <div className="d-flex justify-content-center align-items-center"><Alert id="alert" variant='danger' className="mt-2 p-2 mb-0">
      Произошла ошибка, перезагрузите страницу или попробуйте позднее
    </Alert></div>
    }

    if (loading){
      return <div className="d-flex justify-content-center align-items-center"><Spinner className="align-self-center" animation="grow" style={{width: "6rem", height: "6rem", marginTop: window.innerHeight/2.6}}/></div>
    }


    return(
      
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <ModalWin></ModalWin>
        <Row className="m-2" style={{boxSizing: "border-box"}}>
          <Col sm={3}>
            {accounts.length > 0 ? <h2 className="text-center" style={{marginBottom: 8}}>Ваши счета</h2> : <div></div>}
            { accounts.length > 0 ? <Nav variant="pills" className="flex-column">
              {accounts.map((body, index) =>{
                return <Nav.Item key={index} className="mb-1">
                  <Nav.Link eventKey={index} onClick={(e) => {setClicked(e.target.innerHTML)}}>{body.accountCode}</Nav.Link>
                </Nav.Item>
              })}
              <Button className="mb-1" variant="outline-primary" onClick={()=> {setShow(1)}}>Новый счет</Button>
            </Nav> : <Nav variant="pills" className="flex-column"><Button className="mb-1" variant="outline-primary" onClick={()=> {setShow(1)}}>Новый счет</Button> </Nav>}
          </Col>
          { accounts.length > 0 ? <Col sm={6} >
            <h2 className="text-center" style={{marginBottom: 8}}>Информация по счету</h2>
            <Tab.Content >
              {accounts.map((body, index) =>{
                  return <Tab.Pane eventKey={index} key={index} className="border border-info rounded p-3"><h1>Баланс: {body.balance} {valutaData[body.valutaCode].symbol}</h1> <h1>Валюта: {valutaData[body.valutaCode].name}</h1></Tab.Pane>
                })}
            </Tab.Content>
            
          </Col> : <Col sm={9}><h3 style={{textAlign: "center"}}>Счетов нет</h3></Col>}
          <Col sm={3}>
            {!clicked ? <div></div> : <div  style={{marginTop: 46}}><Button className="w-100" variant="outline-primary" onClick={() => {setShow(2)}}>Перевод средств</Button><Button className="mt-1 w-100" variant="outline-primary" onClick={() => {setShow(3)}}>История операций</Button><Button className="mt-1 w-100" variant="outline-primary" onClick={()=>topUp()}>Пополнить баланс</Button></div>}
          </Col>
        </Row>
      </Tab.Container>
    )
})

export default Hub;