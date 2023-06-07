import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  USERNAME_REQUIRE: 'Юзернейм обовʼязковий',
  USERNAME_MIN_LENGTH: `Юзернейм повинен бути не менше ніж ${UserValidationRule.USERNAME_MIN_LENGTH} символів`,
  USERNAME_MAX_LENGTH: `Юзернейм повинен бути не більше ніж  ${UserValidationRule.USERNAME_MAX_LENGTH} символів`,
  EMAIL_REQUIRE: 'Електронна адреса обовʼязкова',
  EMAIL_WRONG: 'Неправильний формат електронної адреси',
  PASSWORD_REQUIRE: 'Пароль обовʼязковий',
  PASSWORD_MIN_LENGTH: `Пароль повинен бути не менше ніж  ${UserValidationRule.PASSWORD_MIN_LENGTH} символів`,
  PASSWORD_MAX_LENGTH: `Пароль повинен бути не більше ніж ${UserValidationRule.PASSWORD_MAX_LENGTH} символів`
};

export { UserValidationMessage };
