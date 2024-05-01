function isEmpty(value) {
  return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes('@') && password && password.trim().length >= 6
  );
}

export function inputDetailsAreValid(
  email,
  password,
  name,
  street,
  postal,
  city,
) {
  const valid =
    userCredentialsAreValid(email, password) &&
    userCredentialsAreValid &&
    isEmpty(name) &&
    isEmpty(street) &&
    isEmpty(postal) &&
    isEmpty(city);
  return valid;
}

export function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}
