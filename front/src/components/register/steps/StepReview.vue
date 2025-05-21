<template>
  <div class="step-pf-container">
    <h1>Revise suas informações</h1>

    <div class="mbc-m-form" v-if="form.userType === 'PF'">
      <mbc-input 
        type="text"
        v-model="form.name"
        label="Nome"
        @input="validateName"
        :class="{ 'input-error': nameError }" />
        <span v-if="nameError" class="error-text">{{ nameError }}</span>
    </div>

    <div class="mbc-m-form" v-if="form.userType === 'PF'">
      <mbc-input 
        type="text"
        v-model="form.cpf"
        label="CPF"
        @input="validateCPF"
        :class="{ 'input-error': cpfError }" />
        <span v-if="cpfError" class="error-text">{{ cpfError }}</span>
    </div>

    <div class="mbc-m-form" v-if="form.userType === 'PF'">
      <mbc-input 
        v-model="form.birthDate"
        label="Data de nascimento"
        @input="validateBirthDate"
        :class="{ 'input-error': birthDateError }" />
        <span v-if="birthDateError" class="error-text">{{ birthDateError }}</span>
    </div>

    <div class="mbc-m-form" v-if="form.userType === 'PJ'">
      <mbc-input 
        type="text"
        v-model="form.companyName"
        label="Razão social"
        @input="validateCompanyName"
        :class="{ 'input-error': companyNameError }" />
        <span v-if="companyNameError" class="error-text">{{ companyNameError }}</span>
    </div>

    <div class="mbc-m-form" v-if="form.userType === 'PJ'">
      <mbc-input 
        type="text"
        v-model="form.cnpj"
        label="CNPJ"
        @input="validateCNPJ"
        :class="{ 'input-error': cnpjError }" />
        <span v-if="cnpjError" class="error-text">{{ cnpjError }}</span>
    </div>

    <div class="mbc-m-form" v-if="form.userType === 'PJ'">
      <mbc-input 
        v-model="form.foundationDate"
        label="Data de abertura"
        @input="validateFoundationDate"
        :class="{ 'input-error': foundationDateError }" />
        <span v-if="foundationDateError" class="error-text">{{ foundationDateError }}</span>
    </div>

    <div class="mbc-m-form">
      <mbc-input 
        type="text"
        v-model="form.phoneNumber"
        label="Telefone"
        @input="validatePhoneNumber"
        :class="{ 'input-error': phoneNumberError }" />
        <span v-if="phoneNumberError" class="error-text">{{ phoneNumberError }}</span>
    </div>

    <div class="mbc-m-form">
      <mbc-input 
        type="password"
        v-model="form.password"
        label="Sua senha"
        @input="validatePassword"
        :class="{ 'input-error': passwordError }" />
        <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
    </div>

    <div class="button-footer">
      <mbc-button
        @click="handleBack"
        class="back-button"
        variant="outline"
      >
        Voltar
      </mbc-button>
      <mbc-button  @click="handleNext" :disabled="form.userType === 'PF' ? !isFormValidCpf : !isFormValidCnpj" >Cadastrar</mbc-button>
    </div>
    
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MbcButton from '@/components/shared/MbcButton.vue'
import MbcInput from '@/components/shared/MbcInput.vue'
import { isValidCPF, isValidBirthDate, isValidCNPJ, isPhoneNumber } from '@/utils/validators';


const props = defineProps({ data: Object });

const emit = defineEmits(['back', 'submit']);

const form = ref({ ...props.data });

const emailError = ref('');
const userTypeError = ref('');
const nameError = ref('');
const cpfError =  ref('');
const birthDateError = ref('');
const phoneNumberError = ref('');
const passwordError = ref('');
const companyNameError = ref('');
const cnpjError =  ref('');
const foundationDateError = ref('');

const validateCNPJ = () => {
  const cnpj = form.value.cnpj;

  if (!cnpj || !cnpj.trim()) {
    cnpjError.value =  'Precisamos do seu CNPJ';
     return false;
  }

  const result = isValidCNPJ(cnpj);

  if (!result) {
    cnpjError.value = 'CNPJ inválido';
    return false;
  }

  cnpjError.value = '';
  return true;
};

const validateName = () => {
  nameError.value = form.value.name ? '' : 'Precisamos do seu nome';
  return !nameError.value;
};

const validateCompanyName = () => {
  companyNameError.value = form.value.companyName ? '' : 'Precisamos do seu nome';
  return !companyNameError.value;
};

const validateCPF = () => {
  const cpf = form.value.cpf;

  if (!cpf || !cpf.trim()) {
    cpfError.value =  'Precisamos do seu CPF';
     return false;
  }

  const result = isValidCPF(cpf);

  console.log('result', result)

  if (!result) {
    cpfError.value = 'CPF inválido (Somente números)';
    return false;
  }

  cpfError.value = '';
  return true;
};

const validatePassword = () => {
  passwordError.value = form.value.password ? '' : 'Precisamos da sua senha';
  return !passwordError.value;
};

const validateBirthDate = () => {
  const validation = isValidBirthDate(form.value.birthDate);
  birthDateError.value = validation.error || '';
  return validation.valid;
};

const validatePhoneNumber = () => {
  const validation = isPhoneNumber(form.value.phoneNumber);
  phoneNumberError.value = validation.error || '';
  return validation.valid;
};

const validateFoundationDate = () => {
 const foundationDateAux = form.value.foundationDate;

  if (!foundationDateAux || !foundationDateAux.trim()) {
    foundationDateError.value = 'Precisamos da data de abertura';
    return false;
  }

  const foundationDate = new Date(foundationDateAux);
  if (isNaN(foundationDate.getTime())) {
    foundationDateError.value = 'Data inválida (use DD/MM/AAAA)';
    return false;
  }

  foundationDateError.value = '';
  return true;
};

const validateUserType = () => {
  userTypeError.value = form.value.userType ? '' : 'Precisamos do seu perfil';
  return !userTypeError.value;
};

const validateEmail = () => {
  if (!form.value.email?.trim()) {
    emailError.value = 'Precisamos do seu e-mail';
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    emailError.value = 'E-mail inválido';
    return false;
  }
  emailError.value = '';
  return true;
};

const isFormValidCnpj = computed(() => {
  return (
    form.value.password &&
    form.value.companyName &&
    form.value.cnpj &&
    form.value.foundationDate &&
    form.value.phoneNumber &&
    !passwordError.value &&
    !phoneNumberError.value &&
    !companyNameError.value &&
    !cnpjError.value &&
    !foundationDateError.value
  );
});

const isFormValidCpf = computed(() => {
  return (
    form.value.password &&
    form.value.name &&
    form.value.cpf &&
    form.value.birthDate &&
    form.value.phoneNumber &&
    !passwordError.value &&
    !phoneNumberError.value &&
    !birthDateError.value &&
    !cpfError.value &&
    !nameError.value
  );
});


const handleNext = () => {
let isValide = true;

const isEmailValid = validateEmail();
const isUserTypeValid = validateUserType();
const isNameValid = validateName();
const isCpfValid =  validateCPF();
const isBirthDateValid = validateBirthDate();
const isPhoneNumberValid = validatePhoneNumber();
const passwordValid = ref('');
const isCompanyNameValid = validateCompanyName();
const isCnpjValid =  validateCNPJ();
const isfoundationDateValid = validateFoundationDate();

  if(form.userType === 'PF') {
    if(!isNameValid && !isCpfValid && !isBirthDateValid) {
      isValide = false;
    }
  }else if(form.userType === 'PJ') {
    if(!isCompanyNameValid && !isCnpjValid && !isfoundationDateValid) {
      isValide = false;
    }
  }

  if (isValide && isEmailValid && isPhoneNumberValid && passwordValid) {
    emit('submit', form.value);
  }
};

const handleBack = () => {
  emit('back');
};
</script>

<style scoped>
.step-pf-container {
  display: flex;
  flex-direction: column;

    h1{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 22px;
    }

    .button-footer {
      display: flex;
      justify-content: space-between;
      gap: 25px;
      width: 100%;
      margin-top: 25px;
    }
}

.input-error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 14px;
}
</style>