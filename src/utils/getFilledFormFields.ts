export default function getFilledFormFields(form: HTMLFormElement) {
  const formData = new FormData(form);
  const formDataFilled: Record<string, string> = {};

  formData.forEach((value, key) => {
    if (value && typeof value === 'string') {
      formDataFilled[key] = value;
    }
  });

  return formDataFilled;
}
