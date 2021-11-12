import React from "react"

import { BASE_URL } from "../utils/endpoints";
import { NODE_ENV } from "../utils/environment";

export default function Log() {
  console.info('Welcome to EventCred');
  console.info('BASE_URL', BASE_URL);
  console.info('NODE_ENV', NODE_ENV);
  return (
    <></>
  )
}
