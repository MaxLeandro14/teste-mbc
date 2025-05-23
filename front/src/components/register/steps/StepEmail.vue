<template>
  <div class="step-email-container">
    <h1>Seja bem vindo(a)</h1>

    <div class="mbc-m-form">
        <mbc-input 
        type="email"
        v-model="form.email"
        label="Endereço de E-mail"
        @blur="validateEmail"
        :class="{ 'input-error': emailError }" />
        <span v-if="emailError" class="error-text">{{ emailError }}</span>
    </div>

    <div class="mbc-m-form">
        <mbc-radioGroup :options="optionsUserType" v-model="form.userType"/>
        <span v-if="userTypeError" class="error-text">{{ userTypeError }}</span>
    </div>
    
    <div class="button-footer">
        <mbc-button  @click="handleNext" :disabled="!isFormValid" >Continuar</mbc-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MbcButton from '@/components/shared/MbcButton.vue'
import MbcInput from '@/components/shared/MbcInput.vue'
import MbcRadioGroup from '@/components/shared/MbcRadioGroup.vue'

const props = defineProps({ data: Object });

const emit = defineEmits(['next', 'updateStepEmail']);

const form = ref({ ...props.data });

const emailError = ref('');
const userTypeError = ref('');
const optionsUserType = [
    { value: 'PF', label: 'Pessoa Física' },
      { value: 'PJ', label: 'Pessoa Jurídica' }
    ]

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

const validateUserType = () => {
  userTypeError.value = form.value.userType ? '' : 'Precisamos do seu perfil';
  return !userTypeError.value;
};

const isFormValid = computed(() => {
  return (
    form.value.email &&
    form.value.userType &&
    !emailError.value &&
    !userTypeError.value
  );
});

const handleNext = () => {
 const isEmailValid = validateEmail();
 const isUserTypeValid = validateUserType();

  if (isEmailValid && isUserTypeValid) {
    emit('updateStepEmail', form.value);
    emit('next');
  }
};
</script>

<style scoped>
.step-email-container {
  display: flex;
  flex-direction: column;

    h1{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 22px;
    }

    .button-footer{
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
