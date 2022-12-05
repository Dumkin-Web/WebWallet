import React, { useEffect, useState } from "react";
import {Form, Modal, Button, Spinner, Accordion} from "react-bootstrap";

const OperationHistory = (props) =>{
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [vData, setVData] = useState({});

    useEffect(()=>{
        fetch('http://89.108.65.47:3000/operation-history?accountCode=' + props.clicked)
        .then(res=>res.json())
        .then(res=>{
            fetch('http://89.108.65.47:3000/getAccountValuta?accountCode=' + props.clicked)
            .then(response=>response.json())
            .then(response=>{
                setVData(response.data)
                setData(res.data)
                setLoading(false)
            })
        })
    }, [])

    if (loading){
        return <Modal show={true} onHide={() => props.onHide(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title className="text-center">История операций счета: {props.clicked}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center"><Spinner className="align-self-center" animation="border" style={{width: "6rem", height: "6rem"}}/></div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onHide(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" >
                        Подтвердить
                    </Button>
                    </Modal.Footer>
                </Modal>
    }

    return(
        <Modal show={true} onHide={() => props.onHide(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">История операций счета: {props.clicked}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { data.length>0 ?<Accordion defaultActiveKey="0">
            {data.map((item, index) => {
                let typ = "Счет получателя";
                if(item.type === "Зачисление") typ = "Счет отправителя"
                return <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><div className="ms-3">{(new Date(+item.date)).toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric'})}</div> <div className="ms-5"><span style={{fontSize: "1.25rem"}}>{item.sum}{vData.symbol}</span></div></Accordion.Header>
                            <Accordion.Body style={{padding: 20}}>
                                <h4 className="mb-3">Сумма перевода: {item.sum}</h4>
                                <h5 className="mb-3">Дата операции: {(new Date(+item.date)).toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric'})}</h5>
                                <h5 className="mb-3">Валюта: {vData.name}</h5>
                                {item.adress !== null ? <h5 className="mb-3">{typ}: {item.adress}</h5> : <div></div>}
                                <h5 className="mb-3">Тип операции: {item.type}</h5>
                            </Accordion.Body>
                        </Accordion.Item>
            })}
            </Accordion> : <div>Операций нет</div>}
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default OperationHistory;