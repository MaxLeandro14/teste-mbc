<template>
  <div class="mbc-radio-group">
    <div class="mbc-radio-group__options">
      <label 
        v-for="option in options"
        :key="option.value"
        class="radio-label"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        />
        {{ option.label }}
      </label >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.mbc-radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .group-label {
    font-weight: 600;
    margin-bottom: 4px;
    }

    .mbc-radio-group__options {
        display: flex;
        gap: 16px;
    }

    .radio-label {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
    }

    input[type='radio'] {
        accent-color: #cc7a00;
    }
}

@media (max-width: 600px) {
  .mbc-radio-group__options{
        flex-direction: column;
   }
}
</style>
