import React from "react";
import {Container} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



const CLIENT_ID = "eee6212ac836476a9ac3733fa623ecc4";
const CLIENT_SECRET = "4ecd2073a4294284874860b2e29205da";
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";


function Login(props) {
    return (
        <div>
            <div className='welcome-txt'>
                <h1>Check your top songs,</h1>
                 <h1>artists and more</h1>
            </div>
            <div className="login-form">
                <div className="spotify-ico">
                    <i className="icon fa-brands fa-spotify"></i>
                </div>
                <div className="login-btn">
                  <a className='button btn btn-light btn-lg' href={AUTH_URL}>Sign in with Spotify</a>
                </div>
        
            </div>
        </div>
    )
}

export default Login