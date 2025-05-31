type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  message: string;
  consent: boolean;
};


export const isOnlyLetters = (value: string) => /^[A-Za-zÀ-ÿ\s'-]+$/.test(value);
export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validateField = (field: keyof FormDataType, value: string | boolean): boolean => {
  if (typeof value === 'boolean') return field === 'consent' ? value === true : true;

  const trimmed = value.trim();

  switch (field) {
    case 'firstName':
    case 'lastName':
      return trimmed.length >= 3 && isOnlyLetters(trimmed);
    case 'email':
      return isValidEmail(trimmed);
    case 'message':
      return trimmed.length >= 10;
    case 'queryType':
      return trimmed !== '';
    default:
      return true;
  }
};