import React , { Component } from 'react';
import Navigation from "./Navigation";
import Jumbo from "./Jumbo";
import Footer from "./Footer";
import Cards from "./Cards";
import { Button, Form, InputGroup, Container } from "react-bootstrap";
import { auth, db } from '../firebase/firebase';


const INITIAL_STATE = {
  error: null,
  results: [],
  userDetails:{},
  data:{}
  
};




class Landing extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.onSearchValue = this.onSearchValue.bind(this);
 }
 
 

  onSearchValue = async (e) =>{
    // implement caliing the api from this function 
    if(e){
      await fetch('http://www.omdbapi.com/?apikey=3cb52bc&s='+ e)
        .then(response => response.json())
        .then(json => {
          if(json.Response){
            this.setState({data:json})
          }
        }
          )
        .catch(error => console.error(error));
        if(this.state.data.Response){
          this.setState({
            results: this.state.data.Search
          });
        }

    }else{
      this.setState({
        results:[]
      });
    }
    
    
  }
  componentWillMount() {
    if(auth.currentUser != null){
      db.ref('users/' + auth.currentUser.uid).once('value').then((snapshot) => {
        if (snapshot) {
          this.setState({userDetails:snapshot.val()});
        }
      }).catch( e => {
        alert(e.message);
      })
    }

}
  
  render() {
    return (
      <div className="App">
       <div>
          <Navigation />
          <div className="container"> 
              <Jumbo text="Imdb Movies"/>
          </div>
          <InputGroup>
            <InputGroup.Prepend className="inputlabel">Search</InputGroup.Prepend>
              <Form.Control
                id="inputtext"
                type="search"
                name="search"
                placeholder=""
                // value={""}
                required
                onChange={e => this.onSearchValue(e.target.value)}
              />
            </InputGroup>
          <div className="cards_together">
              <Cards userDetails = {this.state.userDetails} isFavorite = {false} results = {this.state.results} />
          </div>
          <Footer/>
        </div>
      </div>    
    );
  }
}
  
export default Landing;
