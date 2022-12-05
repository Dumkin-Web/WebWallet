import React, { useContext } from "react";
import { Context } from "..";
import {Nav, Navbar, Button} from "react-bootstrap";
import { observer } from "mobx-react-lite";

const Topbar = observer(()=>{
    const {user} = useContext(Context)
    return(
        <Navbar className="p-2 px-4 justify-content-between" bg="dark" variant="dark">
            <div className="d-flex">
                <Navbar.Brand className="" href="/">Internet money</Navbar.Brand>
                {user.isAuth ? <Nav.Link href="/hub" className="text-secondary">Home</Nav.Link> : <Nav.Link href="/auth" className="text-secondary">Home</Nav.Link>}
            </div>
            <Nav className="ml-auto">
             {user.isAuth ? <Button variant="outline-success" onClick={()=> {user.setIsAuth(false); localStorage.removeItem('phone')}}>Exit</Button> : <Button variant="outline-success" href="/auth">Login</Button>}
            </Nav>
        </Navbar>
    )
})

export default Topbar;