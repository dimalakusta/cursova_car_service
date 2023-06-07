import { encryptSync } from '../../helpers/helpers.js';

const hash = password => encryptSync(password);

const usersSeed = [
  {
    email: 'admin@demo.com',
    username: 'admin',
    password: hash('admin123'),
    role: 'Admin'
  },
  {
    email: 'pro1@demo.com',
    username: 'pro1',
    password: hash('pro123'),
    role: 'Service Provider',
    fullName: 'Петро Петренко'
  },

  {
    email: 'pro2@demo.com',
    username: 'pro2',
    password: hash('pro123'),
    role: 'Service Provider',
    fullName: 'Микола Миколенко'
  },
  {
    email: 'user@demo.com',
    username: 'user',
    password: hash('user123'),
    role: 'User'
  },
  {
    email: 'gbottoms1@arizona.edu',
    username: 'jhon',
    password: hash('pxlxvUyyUjE'),
    role: 'User'
  },
  {
    email: 'cclears2@state.gov',
    username: 'alex',
    password: hash('ioyLdS9Mdgj'),
    role: 'User'
  },
  {
    email: 'htie3@chronoengine.com',
    username: 'kivi',
    password: hash('twn50kl'),
    role: 'User'
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    username: 'avocado',
    password: hash('0naQBpP9'),
    role: 'User'
  },
  {
    email: 'pashanaumencko@gmail.com',
    username: 'pashanaumencko',
    password: hash('1234qwer'),
    role: 'User'
  }
];

export { usersSeed };
