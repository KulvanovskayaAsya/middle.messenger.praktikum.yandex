export const authenticationFormFields = [
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'password', name: 'password', label: 'Пароль', type: 'password' },
];

export const registrationFormFields = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'password', name: 'password', label: 'Пароль', type: 'password' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' },
];

export const profileFormFields = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'display_name', name: 'display_name', label: 'Отображаемое имя' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' },
];

export const changePasswordFormFields = [
  { id: 'old_password', name: 'old_password', label: 'Старый пароль', type: 'password' },
  { id: 'new_password', name: 'new_password', label: 'Новый пароль', type: 'password' },
  { id: 'new_password_copy', name: 'new_password_copy', label: 'Повторите новый пароль', type: 'password' },
];
