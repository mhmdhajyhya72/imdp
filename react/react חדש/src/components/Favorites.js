import React , { Component } from 'react';
import Navigation from "./Navigation";
import Jumbo from "./Jumbo";
import Footer from "./Footer";
import Cards from "./Cards";
import { auth, db } from '../firebase/firebase';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import * as routes from "../constants/routes";





const INITIAL_STATE = {
  isMoviesPage: true,
  userDetails: null
};




class Landing extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      history: props.history
    };
 }
 
 
 componentWillMount() {
  if(auth.currentUser !== null){
    return new Promise(async (resolve, reject) => {
            
      await db.ref('users/' + auth.currentUser?.uid).once('value').then((snapshot) => {
        if (snapshot) {
          this.setState({userDetails: snapshot.val()});
        }
      }).catch( e => {
        alert(e.message);
      })
                  


     resolve();
     })    
  }

}
  
   switchToMovies(){
    this.setState({isMoviesPage: true});
  }
  
  switchToSerieses(){
    this.setState({isMoviesPage: false});
    this.state.history.push(routes.HOME);
    this.state.history.push(routes.FAVORITES);
    
    // design changes
    // website hosting build the app and deploy to firebase hosting
    // explentation to the customer
    

  }
  
  
  render() {
    return (
      <div className="App">
       <div>
          <Navigation />
          <div className="container"> 
              <Jumbo text={"Your " + "Favorites"}/>
          </div>
          <Button id='mybutton' onClick={() => this.switchToMovies()}>Movies</Button>
          <Button id='mybutton' onClick={() => this.switchToSerieses()}>Serieses</Button>
          
          <div className="cards_together">
            {
              this.state.userDetails ?
              this.state.isMoviesPage ? 
              this.state.userDetails.movieFavorites !== "" || this.state.userDetails.movieFavorites.length !== 0 ?
               <Cards isFavorite = {true} results = {this.state.userDetails.movieFavorites == "" ? [] : this.state.userDetails.movieFavorites} userDetails={this.state.userDetails} />:
               <p>There is No Favorites On Your Movies List</p>
              
              :
              this.state.userDetails.seriesFavorites !== "" || this.state.userDetails.seriesFavorites.length !== 0  ?
               <Cards isFavorite = {true} results = {this.state.userDetails.seriesFavorites == "" ? []: this.state.userDetails.seriesFavorites} userDetails={this.state.userDetails} />:
               <p>There is No Favorites On Your Serieses List</p>  : <p>Error</p>
               
          
           }
          </div>
          <Footer/>
        </div>
      </div>    
    );
  }
}
  
export default withRouter(Landing);
