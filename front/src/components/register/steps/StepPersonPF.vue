<template>
  <div class="step-pf-container">
    <h1>Pessoa Fisíca</h1>

    <div class="mbc-m-form">
      <mbc-input 
        type="text"
        v-model="form.name"
        label="Nome"
        @input="validateName"
        :class="{ 'input-error': nameError }" />
        <span v-if="nameError" class="error-text">{{ nameError }}</span>
    </div>

    <div class="mbc-m-form">
      <mbc-input 
        type="text"
        v-model="form.cpf"
        label="CPF"
        @input="validateCPF"
        :class="{ 'input-error': cpfError }" />
        <span v-if="cpfError" class="error-text">{{ cpfError }}</span>
    </div>

    <div class="mbc-m-form">
      <mbc-input 
        v-model="form.birthDate"
        label="Data de nascimento"
        @input="validateBirthDate"
        :class="{ 'input-error': birthDateError }" />
        <span v-if="birthDateError" class="error-text">{{ birthDateError }}</span>
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

    <div class="button-footer">
      <mbc-button
        @click="handleBack"
        class="back-button"
        variant="outline"
      >
        Voltar
      </mbc-button>
      <mbc-button  @click="handleNext" :disabled="!isFormValid" >Continuar</mbc-button>
    </div>
    
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MbcButton from '@/components/shared/MbcButton.vue'
import MbcInput from '@/components/shared/MbcInput.vue'
import { isValidCPF, isValidBirthDate, isPhoneNumber } from '@/utils/validators';

const props = defineProps({ data: Object });

const emit = defineEmits(['next', 'back', 'updateStepPersonPF']);

const form = ref({ ...props.data });

const nameError = ref('');
const cpfError =  ref('');
const birthDateError = ref('');
const phoneNumberError = ref('');

const validateName = () => {
  nameError.value = form.value.name ? '' : 'Precisamos do seu nome';
  return !nameError.value;
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

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.cpf &&
    form.value.birthDate &&
    form.value.phoneNumber &&
    !phoneNumberError.value &&
    !birthDateError.value &&
    !cpfError.value &&
    !nameError.value
  );
});


const handleNext = () => {

const isNameValid = validateName();
const isCpfValid =  validateCPF();
const isBirthDateValid = validateBirthDate();
const isPhoneNumberValid = validatePhoneNumber();

  if (isNameValid && isCpfValid && isBirthDateValid && isPhoneNumberValid) {
    emit('updateStepPersonPF', form.value);
    emit('next');
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
