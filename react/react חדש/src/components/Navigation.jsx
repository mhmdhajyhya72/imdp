import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOutButton from './SignOut';
import { auth} from '../firebase/firebase';
import cardDetails from './CardDetails';


function Navigation(props) {
  


  
    return (
        <div style={{position: "fixed", top: "0", width: "100%", zIndex: "99"}}>
          <Navbar className="header" collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand><Nav.Link href='#'><Button id="mylogo">Imdb Movies</Button></Nav.Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {auth.currentUser === null ?<Nav>
                  
                  <Nav.Link href="#">
                  <Link to={routes.ABOUT_AS} style={{color: "white"}} >
                    <Button>About Us</Button>
                    </Link>
                  </Nav.Link>
                    
                  
                </Nav> :

                <Nav className="mr-auto">
                  <Navbar.Brand><Link to={routes.HOME}><Button id="">Home</Button></Link></Navbar.Brand>
                  <Navbar.Brand><Link to={routes.FAVORITES}><Button id="">Favorits</Button></Link></Navbar.Brand>

                  <Nav.Link href='#ourfooter'>
                    <Button>Feedback</Button>
                  </Nav.Link>
                  <Nav.Link href="#">
                    <Link to={routes.ABOUT_AS} style={{color: "white"}} >
                    <Button>About Us</Button>
                    </Link>
                  </Nav.Link>
                </Nav>}
                
                {
                  auth.currentUser === null ?(
                  <Nav>
                    <Nav.Link>
                      <Link to={routes.SIGN_IN} style={{color: "white"}} >
                        <Button>SignIn/SignUp</Button>
                        </Link>
                    </Nav.Link>
                  </Nav>):
                  (<Nav>
                    <Nav.Link>
                      <Link to={routes.ACCOUNT} style={{color: "white"}}>
                        <Button>Profile</Button>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <SignOutButton />
                    </Nav.Link>
                  </Nav>
                  ) 
                }                
              </Navbar.Collapse>
          </Navbar>
        </div>
    )
}

export default Navigation;
