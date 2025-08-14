import validator from "validator";

export function validatePhone(phone) {
    return validator.isMobilePhone(phone, 'id-ID');
}

export function validateEmail(email) {
    return validator.isEmail(email);
}