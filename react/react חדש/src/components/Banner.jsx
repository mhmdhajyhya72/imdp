import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
 

// TODO need to change the image with customer university image 

const MainBanner = () => (
    <div style={{marginTop: "110px", marginBottom: "20px"}}>
        <center >
            <Link to={routes.LANDING}>
                <img src="https://yoram.walla.co.il/images/institute/1345-logo.jpg" alt="Brand Logo" height={"70px"} />
            </Link>
            <hr/>
        </center> 
    </div>
);

export default MainBanner;
