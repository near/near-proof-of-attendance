// All utils should be define here.

declare namespace console {
  @external("console", "log")
  export function log(): void;
}

function consoleLog(str: string): void { 
  // Uncomment this line for running tests only. Else it wont build the contracts.
  // log(str);
}

export { 
 consoleLog
}