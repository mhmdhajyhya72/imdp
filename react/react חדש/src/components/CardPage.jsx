import React, { useEffect, useState } from 'react';
import Navigation from "./Navigation";
import Footer from "./Footer";
import { auth, db } from '../firebase/firebase';


const CardPage = props => {
    const [id, setId] = useState(0);
    const [cardDetails, setCardDetails] = useState(props.location.card);
    useEffect(() => {
        setId(props.match.params.id);
    })

    

    

    
    
    return (
        <>
            <Navigation />
            <div className="container " style={{ margin: '150px auto', textAlign: 'center' }}> 
                <h1>{ cardDetails.Title }</h1>
                <h4>{cardDetails.Type}</h4>
                <div className="overflow">
                <img src={cardDetails.Poster} alt="image1" className="card-img-top"/>
            </div>
                <p>
                    
                    Description : {cardDetails.Plot}
                </p>
                <p>
                    Director : {cardDetails.Director == "" ? "unknown director": cardDetails.Director}
                </p>
                <p>
                    Stars : {cardDetails.Actors == "" ? "unknown stars": cardDetails.Actors}
                </p>
                <p>
                    Country : {cardDetails.Country == "" ? "unknown country": cardDetails.Country}
                </p>
                <p>
                    Year : {cardDetails.Year == "" ? "unknown year": cardDetails.Year}
                </p>

            </div>
            <Footer />
        </>
    )
}

export default CardPage;
