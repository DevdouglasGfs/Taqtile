export module Patterns {
  export const emailPattern =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;
  export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
  export const phonePattern = /^\d{10,11}$/;
  export const phonePatternWithAreaCode = /^\(\d{2,3}\) \d{4,5}-\d{4}$/;
  export const phonePatternWithoutAreaCode = /^\d{4,5}-\d{4}$/;
  export const emailPattern =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;
  export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
  export const phonePattern = /^\d{10,11}$/;
  export const phonePatternWithAreaCode = /^\(\d{2,3}\) \d{4,5}-\d{4}$/;
  export const phonePatternWithoutAreaCode = /^\d{4,5}-\d{4}$/;
}

export const validateEmail = (email: string) => {
  return Patterns.emailPattern.test(email.trim());
};
  return Patterns.emailPattern.test(email.trim());
};

export const validatePassword = (pass: string) => {
  return Patterns.passwordPattern.test(pass.trim());
};
  return Patterns.passwordPattern.test(pass.trim());
};

export const dateIsNotAFutureDate = (date: Date, minimunDate?: Date) => {
  const today = new Date();
  if (minimunDate) return minimunDate < date && date < today;
  return date < today;
};
  const today = new Date();
  if (minimunDate) return minimunDate < date && date < today;
  return date < today;
};

export const validatePhone = (phone: string) => {
  return (
    Patterns.phonePattern.test(phone.trim()) ||
    Patterns.phonePatternWithAreaCode.test(phone.trim()) ||
    Patterns.phonePatternWithoutAreaCode.test(phone.trim())
  );
};
  return (
    Patterns.phonePattern.test(phone.trim()) ||
    Patterns.phonePatternWithAreaCode.test(phone.trim()) ||
    Patterns.phonePatternWithoutAreaCode.test(phone.trim())
  );
};

export const formatPhoneAndValidate = (phone: string) => {
  const phoneWithJustNumbers = phone.trim().replace(/\D+/g, '');
  return validatePhone(phoneWithJustNumbers);
};

export const birthDateIsValid = (date: Date | string, requiredAge?: number) => {
  const currentDate = new Date();
  const birthDate = new Date(date);

  return (
    birthDate <= new Date(currentDate.getFullYear() - (requiredAge || 0), currentDate.getMonth(), currentDate.getDate()) &&
    birthDate <= currentDate
  );
};
