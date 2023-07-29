import React, { Component } from 'react';
import Card from './CardUI';




class Cards extends Component{
 
    constructor(props) {
        super(props);
        this.state = {
            results: null
        };
        this.updateFavoritesObject = this.updateFavoritesObject.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.results !== nextProps.results) {
          return { results: nextProps.results };
        }
      
        return null;
    }
    updateFavoritesObject(value){
        this.setState(() => {
            // Important: read `state` instead of `this.state` when updating.
            return {results: value}
        });    
    }


    render(){
        return(
            <div className="container-fluid d-flex justify-content-center ">
               <div className="row">
                    {
                        this.state.results?.map( oneCard => 
                            <div className="col-md-4 individual_card" >
                                <Card
                                    updateFavoritesObject = {this.updateFavoritesObject}
                                    userDetails = {this.props.userDetails}
                                    isFavorite ={this.props.isFavorite}   
                                    key={oneCard.imdbID} 
                                    cardId= {oneCard.imdbID}
                                    image={new URL(oneCard.Poster != "" && oneCard.Poster != null && oneCard.Poster != undefined && oneCard.Poster != "N/A" ? oneCard.Poster : "https://source.unsplash.com/800x500")}
                                    title={oneCard.Title}
                                    text={oneCard.Title}
                                    card = {oneCard}
                                    />
                            </div>)
                    
                   
                        
                    }
               </div>
            </div>
        );
    }
}

export default Cards;
