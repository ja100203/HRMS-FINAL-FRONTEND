import React, { useState } from 'react';
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import '/node_modules/primeflex/primeflex.css'
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
import httpClient from './HttpClient';

import Keycloak from 'keycloak-js';

/*
  Init Options
*/
let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'react-client',
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    /* http client will use this header in every request it sends */
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

function LoginSignup() {

  const [infoMessage, setInfoMessage] = useState('');

  /* To demonstrate : http client adds the access token to the Authorization header */
  const callBackend = () => {
    httpClient.get('')
  };

  return (
    <div className="App">
      <div className='grid'>
        <div className='col-12'>
          <h1>My Secured React App</h1>
        </div>
      </div>
    </div>
  ); 
}


export default LoginSignup;