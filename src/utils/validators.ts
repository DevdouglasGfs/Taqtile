export module Patterns {
    export const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    export const passwordPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    export const phonePattern = /^\d{10,11}$/;
    export const phonePatternWithAreaCode = /^\(\d{2,3}\) \d{4,5}-\d{4}$/;
    export const phonePatternWithoutAreaCode = /^\d{4,5}-\d{4}$/;
    export const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
}

export const validateEmail = (email: string) => {
    return Patterns.emailPattern.test(email.trim())
}

export const validatePassword = (pass: string) => {
    return Patterns.passwordPattern.test(pass.trim())
}

export const validateDate = (date: string | Date) => {
    return date instanceof Date && Patterns.birthDatePattern.test(date.toString())
}

export const dateIsNotAFutureDate = (date: Date, minimunDate?: Date) => {
    const today = new Date()
    if (minimunDate) return minimunDate < date && date < today;
    return date < today;
}

export const dateIsEqual = (dateA: Date, dateB: Date) => {
    const dayA = dateA.getDay(), dayB = dateB.getDay();
    const monthA = dateA.getMonth(), monthB = dateB.getMonth();
    const yearA = dateA.getFullYear(), yearB = dateB.getFullYear();
    return dayA === dayB && monthA === monthB && yearA === yearB
}

export const validatePhone = (phone: string) => {
    return Patterns.phonePattern.test(phone.trim()) || Patterns.phonePatternWithAreaCode.test(phone.trim()) || Patterns.phonePatternWithoutAreaCode.test(phone.trim())
}