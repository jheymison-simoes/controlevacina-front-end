import React from 'react';
import { Link } from 'react-router-dom';

// icons
import { MdAccountBox, MdAnnouncement, MdAssignmentInd} from 'react-icons/md';

// Styles
import './style.css';

// Images
import Background from '../../assets/images/background-home.png';

export default function Home() {

    return (
        <div className="container-home">
            <div className="body-home">
                <div className="content-home">
                    <div className="background-mobile-home"></div>
                    <h1 className="title-home">Vaccination <br></br>Control</h1>

                    <div className="btn-group-home">
                        <Link to="/registeruser" className="btn-home">
                            <MdAccountBox className="icon-home"/>
                            Register User
                        </Link>

                        <Link to="/vaccineaplication" className="btn-home">
                            <MdAssignmentInd className="icon-home"/>
                            Vaccine Aplication
                        </Link>

                        <Link to="/" className="btn-home">
                            <MdAnnouncement className="icon-home"/>
                            Post-information
                        </Link>
                    </div>
                </div>

                <div className="background-home">
                    <img src={Background} alt="Background Home" className="img-background-home"/>
                </div>
            </div>

            <div className="footer-home">
                #zupchallenge
            </div>
        </div> 
    );
}