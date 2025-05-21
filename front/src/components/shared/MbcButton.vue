<template>
  <button
    type="button"
    :disabled="disabled"
    :class="['mbc-button', variant, { disabled }]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const emit = defineEmits(['click'])

function handleClick(event) {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped>
.mbc-button {
  padding: 9px 19px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  width: 100%;
  height: 40px;
  font-weight: 700;
}

.primary {
  background-color: #ff9900;
}

.primary:not(.disabled):hover, .outline:hover {
  background-color: #cc7a00;
  color: #ffffff;
}

.outline {
  background-color: transparent;
  border: 1px solid #ff9900;
  color: #ff9900;
}

.outline:hover {
  background-color: #ff9900;
  color: #ffffff;
}

.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>
