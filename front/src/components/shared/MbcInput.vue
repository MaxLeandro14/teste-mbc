<template>
   <div class="mbc-input">
    <label>{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.mbc-input {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 17px 11px;
    font-size: 16px;
    border: 1px solid #999999;
    border-radius: 4px;
    font-style: normal;

    &:focus {
      border-color: #ff9900;
      outline: none;
    }
  }
  input[type="date"] {
  font-family: 'IBMPlexSans', sans-serif;
  }
}

@media (max-width: 600px) {
  .mbc-input {
    label{
      font-size: 14px;
    }
     input {
      padding: 14px 10px;
      font-size: 14px;
     }
  }
}
</style>