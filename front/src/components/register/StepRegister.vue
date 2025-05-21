<template>
    <div class="container-register">
        <div class="step-header">
            <p>Etapa <span class="step-header__current">{{ currentStep }}</span> de {{ totalStep }}</p>
        </div>

        <form @submit.prevent>
            <StepEmail
                v-if="currentStep === 1"
                :data="formData"
                @next="nextStep"
                @updateStepEmail="insertStepEmail"
            />

            <StepPersonPF
                v-else-if="currentStep === 2 && formData.userType === 'PF'"
                :data="formData"
                @next="nextStep"
                @back="prevStep"
                @updateStepPersonPF="formData = $event"
            />

            <StepPersonPj
            v-else-if="currentStep === 2 && formData.userType === 'PJ'"
            :data="formData"
            @next="nextStep"
            @back="prevStep"
            @updateStepPersonPJ="formData = $event"
            />

             <StepPassword
            v-else-if="currentStep === 3"
            :data="formData"
            @next="nextStep"
            @back="prevStep"
            @updateStepPassword="formData = $event"
            />

            <StepReview
            v-else-if="currentStep === 4"
            :data="formData"
            @submit="submitForm"
            @back="prevStep"
            />
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '@/services/register'
import StepEmail from '@/components/register/steps/StepEmail.vue'
import StepPersonPF from '@/components/register/steps/StepPersonPF.vue'
import StepPersonPj from '@/components/register/steps/StepPersonPj.vue'
import StepPassword from '@/components/register/steps/StepPassword.vue'
import StepReview from '@/components/register/steps/StepReview.vue'

const currentStep = ref(1);
const totalStep = 4;

const formData = ref({
  email: '',
  userType: '',
  name: '',
  cnpj: '',
  cpf: '',
  birthDate: '',
  phoneNumber: '',
  companyName: '',
  foundationDate: '',
  password: ''
})

const nextStep = () => {
  if (currentStep.value < totalStep) currentStep.value++
}
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const insertStepEmail = (data) => {

  if(formData.value.userType !== data.userType){
    formData.value.name = '';
    formData.value.cnpj = '';
    formData.value.cpf = '';
    formData.value.birthDate = '';
    formData.value.foundationDate = '';
    formData.value.companyName = '';
  }

  formData.value.email = data.email;
  formData.value.userType = data.userType;
}

const submitForm = async () => {
  try {
    const result = await registerUser(formData.value)
    alert(result.message)
  } catch (error) {
    console.log('Error: ', error)
  }
}
</script>
<style lang="scss">
.container-register{
        max-width: 360px;
    margin: 0 auto;
    margin-top: 70px;

    .step-header{
        p {
            font-size: 16px;
            
            .step-header__current{
                color: #ff9900;
            }
        }
    }
}

@media (max-width: 600px) {
  .container-register{
        max-width: 360px;
        margin-top: 50px;
        padding: 0px 15px;

        .step-header{
        p {
            font-size: 14px;
        }
        h1{
            font-size: 16px;
        }
    }
  }
}
</style>
