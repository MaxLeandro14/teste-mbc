<template>
  <div class="step-pf-container">
    <h1>Senha de acesso</h1>

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
      <mbc-button  @click="handleNext" :disabled="!isFormValid" >Continuar</mbc-button>
    </div>
    
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MbcButton from '@/components/shared/MbcButton.vue'
import MbcInput from '@/components/shared/MbcInput.vue'

const props = defineProps({ data: Object });

const emit = defineEmits(['next', 'back', 'updateStepPassword']);

const form = ref({ ...props.data });

const passwordError = ref('');

const validatePassword = () => {
  passwordError.value = form.value.password ? '' : 'Precisamos da sua senha';
  return !passwordError.value;
};

const isFormValid = computed(() => {
  return (
    form.value.password &&
    !passwordError.value
  );
});

const handleNext = () => {

const isNameValid = validatePassword();

  if (isNameValid) {
    emit('updateStepPassword', form.value);
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