import isEmail from "validator/lib/isEmail";

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character

export function validateFields(data) {
  if (data.email && !isEmail(data.email)) {
    return "Invalid email";
  } else if (data.password && !passwordRegex.test(data.password)) {
    return "Password must include minimum eight characters, at least one uppercase, one lowercase, one number and one special character";
  } else if (data.confirmPassword && data.password !== data.confirmPassword) {
    return "Password and confirm password must match";
  } else {
    return false;
  }
}
