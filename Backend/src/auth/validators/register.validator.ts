export function validateRegisterInput(
  email: string,
  password: string
): void {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if( password.length > 128) {
    throw new Error("Password must be less than 128 characters");
  }

  if( password.length === 0) {
    throw new Error("Password cannot be empty");
  }

  if( password.includes(" ")) {
    throw new Error("Password cannot contain spaces");
  }

  if(password.search(/[0-9]/) === -1) {
    throw new Error("Password must contain at least one number");
  }

  if(password.search(/[a-z]/) === -1) {
    throw new Error("Password must contain at least one lowercase letter");
  }

  if(password.search(/[A-Z]/) === -1) {
    throw new Error("Password must contain at least one uppercase letter");
  }

  if(password.search(/[@$!%*?&]/) === -1) {
    throw new Error("Password must contain at least one special character (@, $, !, %, *, ?, &)");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
}
