class Input{
  constructor(public validation?:()=>string|undefined, public error='', public value='', public token=''){
  }
}

export interface Inputs{
  success:string,
  error:string|{field:string, message:string},
  token:string,
  [input:string]:any
}

export default Input
