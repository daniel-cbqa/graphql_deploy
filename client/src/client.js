import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";

export const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://training-graphql.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

export const useClient = () => {
  const [idToken, setIdToken] = useState("");
  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    setIdToken(token);
  }, []);
  return new GraphQLClient(ENDPOINT, {
    headers: { authorization: idToken }
  });
};
