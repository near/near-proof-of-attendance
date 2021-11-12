import getConfig from "../config";
import { NODE_ENV } from "./environment";

const getBaseUrl = () => {
  if(NODE_ENV == "production") {
    return "https://eventcred-backend.herokuapp.com";
  }
  
  if(NODE_ENV == "development") {
    return "http://localhost:3000";
  }
  
  if(NODE_ENV == "staging") {
    return "https://staging.eventcred-backend.herokuapp.com";
  }
}

export const BASE_URL = getBaseUrl();
