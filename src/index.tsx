import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const accessToken = sessionStorage.getItem("accessToken");

const client = new ApolloClient({
  uri: "http://211.110.139.183:5900/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={`${googleClient}`}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </ApolloProvider>
);
