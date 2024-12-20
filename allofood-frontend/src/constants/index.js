const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
  NAME: /^[a-zA-Z\u00C0-\u017F]{2,30}(([',. -][a-zA-Z\u00C0-\u017F ])?[a-zA-Z\u00C0-\u017F]*)*$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  ADDRESS: /^[a-zA-Z0-9\s,'-]*$/,
};

const ERROR_MESSAGES = {
  required: (field) => `${field} is required`,
  email: "Please enter a valid email address",
  password:
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  passwordMatch: "Passwords do not match",
  name: "Name must be 2-30 characters long and can only contain letters, spaces, and certain special characters (',.-)",
  phone: "Please enter a valid phone number",
  address: "Please enter a valid address",
  invalidCredentials: "Invalid email or password",
  accountLocked: "Your account has been locked. Please reset your password",
  tooManyAttempts: "Too many failed attempts. Please try again later",
  generic: "Something went wrong. Please try again later",
};

export { REGEX, ERROR_MESSAGES };