// This below code in UI does not return the values of env variables like NODE_ENV.
export const getEnvVariables = () => {
  return process.env;
}

export const NODE_ENV = process.env.NODE_ENV;