export function isValidCPF(strCPF) {
  console.log('strCPF',strCPF)
    let Soma;
  let Resto;
  Soma = 0;

  if (strCPF === "00000000000") {
    return false;
  }

  let cpf = strCPF.replace(/[.-]/g, '');

   console.log('cpf',cpf)
  if (cpf.length !== 11) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  Soma = 0;

  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== parseInt(strCPF.substring(10, 11))) {
    return false;
  }

  return true;
}

export function isValidCNPJ(cnpj) {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(cnpj)
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}

export function isValidBirthDate(dateStr) {
  if (!dateStr || !dateStr.trim()) {
    return { valid: false, error: 'Precisamos da data do seu nascimento' };
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return { valid: false, error: 'Formato inválido (use DD/MM/AAAA)' };
  }

  const birthDate = new Date(dateStr);
  if (isNaN(birthDate.getTime())) {
    return { valid: false, error: 'Data inválida' };
  }

  const today = new Date();
  const minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 130, today.getMonth(), today.getDate());

  if (birthDate > today) {
    return {
      valid: false,
      error: `Data maior que a data atual`,
    };
  }

  if (birthDate < maxDate) {
    return {
      valid: false,
      error: 'Data de nascimento muito antiga (mais de 130 anos)',
    };
  }

  if (birthDate > minDate) {
    return {
      valid: false,
      error: `Você deve ser maior que 12 anos`,
    };
  }

  return { valid: true, error: '' };
}

export const isPhoneNumber = (phone) => {
  if (!phone) {
    return { valid: false, error: 'Precisamos do seu telefone' };
  }
  
  if (phone.length !== 11) {
    return { valid: false, error: 'Telefone deve ter 11 dígitos (Somente números)' };
  }
  
  if (!/^\d+$/.test(phone)) {
    return { valid: false, error: 'O telefone deve conter apenas números' };
  }
  
  const ddd = parseInt(phone.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return { valid: false, error: 'DDD inválido' };
  }
  
  const firstDigit = phone.charAt(2);
  if (!['6', '7', '8', '9'].includes(firstDigit)) {
    return { valid: false, error: 'Número de telefone inválido' };
  }
  
  return { valid: true };
};