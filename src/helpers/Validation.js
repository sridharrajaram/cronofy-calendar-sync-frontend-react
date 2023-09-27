export function LoginValidation(values) {
  let error = {};
  // eslint-disable-next-line
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // email-address input validation
  if (values.email === "") {
    error.email = "email should not be empty";
  } else if (!emailPattern.test(values.email)) {
    error.email = "please enter a valid email address";
  } else {
    error.email = "";
  }

  // passowrd input validation
  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (values.password[0].length<8) {
    error.password = "password must be at least 8 characters";
  } else if (values.password[0].search(/[a-z]/) < 0){
    error.password = "password must contain at least one lowercase letter";
  } else if (values.password[0].search(/[A-Z]/) < 0){
    error.password = "password must contain at least one uppercase letter";
  } else if (values.password[0].search(/[0-9]/) < 0){
    error.password = "password must contain at least one number";
  } else {
    error.password = "";
  }

  return error;
}

export function RegisterValidation(values) {
  let error = {};
  // eslint-disable-next-line
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  // email-address input validation
  if (values.name === "") {
    error.name = "name should not be empty";
  } else {
    error.name = "";
  }

  // email-address input validation
  if (values.email === "") {
    error.email = "email should not be empty";
  } else if (!emailPattern.test(values.email)) {
    error.email = "please enter a valid email address";
  } else {
    error.email = "";
  }

  // passowrd input validation
  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (values.password[0].length<8) {
    error.password = "password must be at least 8 characters";
  } else if (values.password[0].search(/[a-z]/) < 0){
    error.password = "password must contain at least one lowercase letter";
  } else if (values.password[0].search(/[A-Z]/) < 0){
    error.password = "password must contain at least one uppercase letter";
  } else if (values.password[0].search(/[0-9]/) < 0){
    error.password = "password must contain at least one number";
  } else {
    error.password = "";
  }

  return error;
}