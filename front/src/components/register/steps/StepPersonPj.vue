<template>
  <div class="step-pf-container">
    <h1>Pessoa Jurídica</h1>

    <div class="mbc-m-form">
      <mbc-input 
        type="text"
        v-model="form.companyName"
        label="Razão social"
        @input="validateCompanyName"
        :class="{ 'input-error': companyNameError }" />
        <span v-if="companyNameError" class="error-text">{{ companyNameError }}</span>
    </div>

    <div class="mbc-m-form">
      <mbc-input 
        type="text"
        v-model="form.cnpj"
        label="CNPJ"
        @input="validateCNPJ"
        :class="{ 'input-error': cnpjError }" />
        <span v-if="cnpjError" class="error-text">{{ cnpjError }}</span>
    </div>

    <div class="mbc-m-form">
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
import { isValidCNPJ, isPhoneNumber } from '@/utils/validators';

const props = defineProps({ data: Object });

const emit = defineEmits(['next', 'back', 'updateStepPersonPJ']);

const form = ref({ ...props.data });

const companyNameError = ref('');
const cnpjError =  ref('');
const foundationDateError = ref('');
const phoneNumberError = ref('');

const validateCompanyName = () => {
  companyNameError.value = form.value.companyName ? '' : 'Precisamos do seu nome';
  return !companyNameError.value;
};

const validateCNPJ = () => {
  const cnpj = form.value.cnpj;

  if (!cnpj || !cnpj.trim()) {
    cnpjError.value =  'Precisamos do seu CNPJ';
     return false;
  }

  const result = isValidCNPJ(cnpj);

  if (!result) {
    cnpjError.value = 'CNPJ inválido (Somente números)';
    return false;
  }

  cnpjError.value = '';
  return true;
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

const validatePhoneNumber = () => {
  const validation = isPhoneNumber(form.value.phoneNumber);
  phoneNumberError.value = validation.error || '';
  return validation.valid;
};

const isFormValid = computed(() => {
  return (
    form.value.companyName &&
    form.value.cnpj &&
    form.value.foundationDate &&
    form.value.phoneNumber &&
    !companyNameError.value &&
    !foundationDateError.value &&
    !cnpjError.value &&
    !phoneNumberError.value
  );
});

const handleNext = () => {

const isCompanyNameValid = validateCompanyName();
const isCnpjValid =  validateCNPJ();
const isfoundationDateValid = validateFoundationDate();
const isPhoneNumberValid = validatePhoneNumber();

  if (isCompanyNameValid && isCnpjValid && isfoundationDateValid && isPhoneNumberValid) {
    emit('updateStepPersonPJ', form.value);
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