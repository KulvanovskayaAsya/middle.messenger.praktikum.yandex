export const authenticationForm = [
	{ id: 'login', name: 'login', label: 'Логин' },
	{ id: 'password', name: 'password', label: 'Пароль', type: 'password' }
]

export const registrationForm = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'password', name: 'password', label: 'Пароль', type: 'password' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' }
];

export const profileForm = [
  { id: 'first_name', name: 'first_name', label: 'Имя' },
  { id: 'second_name', name: 'second_name', label: 'Фамилия' },
  { id: 'display_name', name: 'display_name', label: 'Отображаемое имя' },
  { id: 'login', name: 'login', label: 'Логин' },
  { id: 'email', name: 'email', label: 'Email', type: 'email' },
  { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel' }
];

export const changePasswordForm = [
  { id: 'old_password', name: 'old_password', label: 'Старый пароль', type: 'password' },
  { id: 'new_password', name: 'new_password', label: 'Новый пароль', type: 'password' },
  { id: 'new_password_copy', name: 'new_password_copy', label: 'Повторите новый пароль', type: 'password' }
];

export const chatsList = [
  {
    id: 1,
    avatar: { 
      src: '/images/avatar4.png',
      alt: 'Аватар пользователя Яра'
    },
    name: 'Яра',
    date: 'пн',
    lastMessage: 'Здравствуйте! Я представитель компании Oriflame. Не хотите посмотреть наш каталог?',
    unreadedCount: 2,
  },
  {
    id: 2,
    avatar: { 
      src: '/images/avatar2.png',
      alt: 'Аватар пользователя Бора-Бора'
    },
    name: 'Бора-Бора',
    date: 'пн',
    lastMessage: 'Я тебя жду!!! Хватит опаздывать...',
    unreadedCount: 4,
  },
  {
    id: 3,
    avatar: { 
      src: '/images/avatar3.png',
      alt: 'Аватар пользователя Лизок'
    },
    name: 'Лизок',
    date: 'ср',
    lastMessage: 'Привет! Как дела?',
    unreadedCount: 4,
  },
  {
    id: 4,
    avatar: { 
      src: '/images/avatar4.png',
      alt: 'Аватар пользователя Анна'
    },
    name: 'Анна',
    date: 'вт',
    lastMessage: 'Давай встретимся завтра.',
    unreadedCount: 1,
  },
  {
    id: 5,
    avatar: { 
      src: '/images/avatar7.png',
      alt: 'Аватар пользователя Олег'
    },
    name: 'Олег',
    date: 'ср',
    lastMessage: 'Это был отличный день!',
    unreadedCount: 3,
  },
  {
    id: 6,
    avatar: { 
      src: '/images/avatar6.png',
      alt: 'Аватар пользователя Елена'
    },
    name: 'Елена',
    date: 'вт',
    lastMessage: 'Не могу сегодня поговорить, напишу позже.',
    unreadedCount: 3,
  },
  {
    id: 7,
    avatar: { 
      src: '/images/avatar7.png',
      alt: 'Аватар пользователя Дмитрий'
    },
    name: 'Дмитрий',
    date: 'чт',
    lastMessage: 'Все в порядке, только немного занят. Поговорим позже?',
    unreadedCount: 1,
  },
  {
    id: 8,
    avatar: { 
      src: '/images/avatar2.png',
      alt: 'Аватар пользователя Ирина'
    },
    name: 'Ирина',
    date: 'пт',
    lastMessage: 'Как насчет похода в кино на выходных?',
    unreadedCount: 5,
  },
];
