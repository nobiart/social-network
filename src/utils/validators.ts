export const validateEmail = (value: string) => {
  let error;

  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }

  return error;
};

export const validatePassword = (value: string) => {
  let error;

  if (!value) {
    error = 'Required';
  } else if (value.length < 8) {
    error = 'Maximum characters must be at least 8 characters.';
  }

  return error;
};

export const validateRequired = (value: any) => {
  let error;

  if (!value) {
    error = 'Required';
  }

  return error;
};

export const maxLengthCreator = (maxLength: number) => (value: string) => {
  if (value.length > maxLength) {
    return "Maximum length is " + maxLength + " characters.";
  }

  return undefined;
}
