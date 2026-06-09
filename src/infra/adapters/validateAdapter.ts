import {
  validateCpf,
  validateCep,
  validateCnpj,
  validateDate,
  validatePassword,
  validatePhone,
  validateRg,
} from "@arkyn/server";

class ValidateAdapter {
  static cpf(cpf: string): boolean {
    return validateCpf(cpf);
  }

  static cep(cep: string): boolean {
    return validateCep(cep);
  }

  static cnpj(cnpj: string): boolean {
    return validateCnpj(cnpj);
  }

  static date(date: string): boolean {
    return validateDate(date);
  }

  static password(password: string): boolean {
    return validatePassword(password);
  }

  static phone(phone: string): boolean {
    return validatePhone(phone);
  }

  static rg(rg: string): boolean {
    return validateRg(rg);
  }

  static email(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

export { ValidateAdapter };
