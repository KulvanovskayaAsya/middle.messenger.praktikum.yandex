type ValidationResult = {
  isValid: boolean;
  message: string;
};

type ValidatorMap = {
  [key: string]: (value: string) => ValidationResult;
};

const validateName = (name: string): ValidationResult => {
  const regex = /^[А-ЯA-Z][а-яa-z-]*$/;
  if (!regex.test(name)) {
    return { isValid: false, message: 'Имя должно начинаться с заглавной буквы, содержать только латиницу или кириллицу, допустим дефис.' };
  }
  return { isValid: true, message: '' };
};

const validateLogin = (login: string): ValidationResult => {
  const regex = /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/;
  if (!regex.test(login)) {
    return { isValid: false, message: 'Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, дефис и подчеркивание.' };
  }
  return { isValid: true, message: '' };
};

const validateEmail = (email: string): ValidationResult => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(email)) {
    return { isValid: false, message: 'Некорректный формат email.' };
  }
  return { isValid: true, message: '' };
};

const validatePassword = (password: string): ValidationResult => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
  if (!regex.test(password)) {
    return { isValid: false, message: 'Пароль должен быть от 8 до 40 символов, содержать хотя бы одну заглавную букву и цифру.' };
  }
  return { isValid: true, message: '' };
};

const validatePhone = (phone: string): ValidationResult => {
  const regex = /^(\+)?\d{10,15}$/;
  if (!regex.test(phone)) {
    return { isValid: false, message: 'Телефон должен быть от 10 до 15 символов и содержать только цифры, возможно начинаться с плюса.' };
  }
  return { isValid: true, message: '' };
};

const validateMessage = (message: string): ValidationResult => {
  if (message.trim() === '') {
    return { isValid: false, message: 'Сообщение не может быть пустым.' };
  }
  return { isValid: true, message: '' };
};

const validate = (fieldName: string, value: string): ValidationResult => {
  const validators: ValidatorMap = {
    first_name: validateName,
    second_name: validateName,
    login: validateLogin,
    email: validateEmail,
    password: validatePassword,
    phone: validatePhone,
    message: validateMessage,
  };

  const validator = validators[fieldName];
  if (!validator) {
    return { isValid: true, message: '' };
  }

  return validator(value);
};

export default validate;
