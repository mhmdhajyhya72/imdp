import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { auth} from '../firebase/firebase';
import { db } from '../firebase';

const CardUI = props => {

    var [favoritesObject, setFavoritesObject] = useState({});
    
    
    
    function addToFavorites(){

        return new Promise(async (resolve, reject) => {
            await fetch('http://www.omdbapi.com/?apikey=3cb52bc&i='+ props.cardId)
            .then(response => response.json())
            .then(json => db.addToFavorite(auth.currentUser.uid, json, props.userDetails.movieFavorites, props.userDetails.seriesFavorites))
            .catch(error => console.error(error));
                        
 
 
           resolve();
           })
           
        
        
    }
    
    function deleteFavorites(id){
        return new Promise(async (resolve, reject) => {
            
            const newValues = await db.updateFavorites(auth.currentUser.uid, props.userDetails, id)
                        
           resolve(newValues);
           }).then((e)=>{
            window.location.href = 'home';
            props.updateFavoritesObject(e);
           }
           )
           
        
    }

    return (
        
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.image} alt="image1" className="card-img-top"/>
            </div>
          <div className="card-body text-dark">
           <h4 className="card-title">{props.title}</h4>
           <p className ="card-text text-secondary">
               {props.text}
           </p>
           {
            props.isFavorite ?
            <div className='d-flex justify-content-around'>
           <Link className="btn btn-outline-primary" to={{pathname:'/card/' + props.cardId, card: props.card}}>
            more details
           </Link>
           <Button onClick={() => deleteFavorites(props.cardId)}>Delete</Button>
           </div>
           :
           <Button onClick={addToFavorites}>Add To Favorites</Button>
           }
          </div>
        </div>
    )
}

export default CardUI;
