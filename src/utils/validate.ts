type ruleset = {
  regex: RegExp | null,
  minLength: number | null,
  maxLength: number | null
}
export default function validate(field: HTMLFormElement): boolean {
  const ruleset: Record<string, ruleset> = {
    first_name: {
      regex: /^([A-ZА-ЯЁ])[a-zA-Zа-яёА-ЯЁ-]+$/,
      minLength: 1,
      maxLength: null,
    },
    second_name: {
      regex: /^([A-ZА-ЯЁ])[a-zA-Zа-яёА-ЯЁ-]+$/,
      minLength: 1,
      maxLength: null,
    },
    login: {
      regex: /^(?!\d+$)[\w-]+$/,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      regex: /^[\w-]+@[A-Za-z]+\.[A-Za-z]+$/,
      minLength: null,
      maxLength: null,
    },
    password: {
      regex: /^(?=.*[A-Z])(?=.*\d).+$/,
      minLength: 8,
      maxLength: 40,
    },
    repeat_password: {
      regex: /^(?=.*[A-Z])(?=.*\d).+$/,
      minLength: 8,
      maxLength: 40,
    },
    phone: {
      regex: /^\+?\d+$/,
      minLength: 10,
      maxLength: 15,
    },
    message: {
      regex: null,
      minLength: 1,
      maxLength: null,
    },
    default: {
      regex: null,
      minLength: null,
      maxLength: null,
    },
  };
  const rules = ruleset[field.name] || ruleset.default;

  const passRegex = rules.regex ? rules.regex.test(field.value) : true;
  const passMinLength = rules.minLength ? field.value.length >= rules.minLength : true;
  const passMaxLength = rules.maxLength ? field.value.length <= rules.maxLength : true;

  return (passRegex && passMinLength && passMaxLength);
}
