import React, { Component } from "react";
import { auth, db } from "../firebase";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../constants/routes";
import { Button, Form, InputGroup, Container } from "react-bootstrap";

import MainBanner from "./Banner";
import Footer from './Footer';
import Navigation from './Navigation';

const SignUpPage = ({ history }) => (
  <div>
    <Navigation />
    <div className="div-flex" style={{marginTop: "110px"}}>
      {/* <MainBanner /> */}
      <center>
        <SignUpForm history={history} />
      </center>
      <br/>
      <Footer />
    </div>
  </div>
);

//################### Sign Up Form ###################
const INITIAL_STATE = {
  name: "",
  email: "",
  passwordOne: "",
  passwordTwo: ""
};

//A Higher order function with prop name as key and the value to be assigned to
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  state = {
    ...INITIAL_STATE
  };

  onSubmit = event => {
    const { name, email, age, passwordOne } = this.state;
    const { history } = this.props;
    
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          return new Promise(async (resolve, reject) => {
            
           await db.doCreateUser(authUser.user.uid, name, email, age );
           await auth.doSignInWithEmailAndPassword(email, passwordOne);
           
          
          history.push(routes.LANDING);
           


          resolve(this.setState({
            ...INITIAL_STATE
          }));
          }); 
          
          
          
          
        })
        .catch(err => {
          
          // problem with connecting database and insert user data 
          console.log(err.message);
        });

    event.preventDefault(); //prevents refreshing
  };

  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      age
    } = this.state;

    //a boolen to perform validation
    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      name === "" ||
      age < 18;


    let passlevel = "Password must contain at least 6 characters", passlevelstyle={color: "black"};
    if (passwordOne.length < 6) {
      passlevel = "Password must contain at least 6 characters";
      passlevelstyle={color: "red"}
    } else if (passwordOne.length <= 9 && passwordOne.length >= 6) {
      passlevel = "Weak";
      passlevelstyle={color: "red"}
    } else if(passwordOne.length < 12) {
      passlevel = "Good";
      passlevelstyle={color: "blue"}
    } else if(passwordOne.length >= 12) {
      passlevel = "Strong";
      passlevelstyle={color: "green"}
    } else {
      passlevel = "Password must contain at least 6 characters";
      passlevelstyle={color: "black"};
    }
    
    if(age < 18){
      passlevel = "You Must Be older than 18 years old to sign up in this platform";
      passlevelstyle={color: "black"};
    }

    return (
      <div className="inputclass">
        <Container>
          <h2 id="mytexth2">Sign Up</h2>
          <h5 id="mytexth5">All fields are required to be filled</h5>
          <Form onSubmit={this.onSubmit}>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Full Name</InputGroup.Prepend>
              <Form.Control
                type="text"
                name="name"
                id="inputtext"
                placeholder=" John Jose"
                value={name}
                autoFocus
                required
                onChange={e =>
                  this.setState(byPropKey("name", e.target.value))
                }
              />
            </InputGroup>
            <br/>
            <InputGroup>
            <InputGroup.Prepend className="inputlabel">Email</InputGroup.Prepend>
              <Form.Control
                id="inputtext"
                type="email"
                name="email"
                placeholder=" user@gmail.com"
                value={email}
                required
                onChange={e => this.setState(byPropKey("email", e.target.value))}
              />
            </InputGroup>
            <br/>
            <br/>
            <InputGroup style={{textAlign: "center"}}>
              <div style={{width: "200px", margin: "auto"}}>
                <InputGroup.Prepend className="inputlabel">Age</InputGroup.Prepend>
                <Form.Control
                  id="inputtext"
                  type="number"
                  onChange={e => this.setState(byPropKey("age", e.target.value))}
                />
              </div>
            </InputGroup>
            <br/>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Password</InputGroup.Prepend>
              <Form.Control
                id="inputtext"
                type="password"
                name="password"
                placeholder="Password"
                value={passwordOne}
                required
                onChange={e =>
                  this.setState(byPropKey("passwordOne", e.target.value))
                }
                />
            </InputGroup>
            <p style={passlevelstyle}>{passlevel}</p>
            <br/>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Confirm Password</InputGroup.Prepend>
              <Form.Control
                id="inputtext"
                type="password"
                name="password"
                placeholder="Confirm Password"
                value={passwordTwo}
                required
                onChange={e =>
                  this.setState(byPropKey("passwordTwo", e.target.value))
                }
                
              />
            </InputGroup>
              <br/>
            <div className="text-center">
              <Button disabled={isInvalid} type="submit" id="mybutton">
                Sign Up
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p id="mylink">
    Don't have an account? <Link to={routes.SIGN_UP} id="mylink">Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);
export { SignUpForm, SignUpLink };

