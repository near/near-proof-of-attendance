// We want to declare a custom property in the request object
// Check more information here: 
// https://stackoverflow.com/questions/58957228/property-does-not-exist-on-type-requestparamsdictionary
declare namespace Express {
  interface Request {
      token: string | object;
  }
}