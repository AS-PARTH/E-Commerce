import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
    domain="dev-e1cmnaq6b534g80m.us.auth0.com"
    clientId="SuV7Ij2LDKKbFxBU2TszeYSh6BVz5DfQ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

<App />
  </Auth0Provider>
);
