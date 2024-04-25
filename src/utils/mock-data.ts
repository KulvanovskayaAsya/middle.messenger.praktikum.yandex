export const authenticationForm = [
  { id: 'login', name: 'login', label: 'Логин' },
  {
    id: 'password', name: 'password', label: 'Пароль', type: 'password',
  },
];

export const registrationForm = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'password', name: 'password', label: 'Пароль', type: 'password' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' },
];

export const profileForm = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'display_name', name: 'display_name', label: 'Отображаемое имя' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' },
];

export const changePasswordForm = [
  { id: 'old_password', name: 'old_password', label: 'Старый пароль', type: 'password' },
  { id: 'new_password', name: 'new_password', label: 'Новый пароль', type: 'password' },
  { id: 'new_password_copy', name: 'new_password_copy', label: 'Повторите новый пароль', type: 'password' },
];

export const chatsList = [
  {
    id: 3368,
    title: "test chat 2",
    avatar: null,
    created_by: 285,
    unread_count: 0,
    last_message: null
}
];

export const messagesList = [
  { 'text': 'Привет! Как ты?', 'date': '10:32' },
  { 'text': 'Давай встретимся завтра.', 'date': '08:06' },
  { 'text': 'Это был отличный день!', 'date': '20:33' },
  { 'text': 'Не могу сегодня поговорить, напишу позже.', 'date': '12:35' },
  { 'text': 'Здравствуйте! Я представитель компании. Не хотите посмотреть наш каталог?', 'date': '20:53' },
  { 'text': 'Я тебя жду!!! Хватит опаздывать...', 'date': '15:23' },
  { 'text': 'Привет! Как дела?', 'date': '13:38' },
  { 'text': 'Как насчет похода в кино на выходных?', 'date': '00:45' },
];
