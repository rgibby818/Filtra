<script setup>
import { computed } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  additionalAttributes: {
    type: Object,
    default: () => ({})
  },
  customClasses: {
    type: [String, Array, Object],
    default: () => ({})
  }

})

const buttonClasses = computed(() => {
  const baseClasses = [
    'w-3/4',           
    'h-9',             
    'sm:w-1/3',        
    'bg-indigo-500',   
    'rounded-full',    
    'font-semibold',   
    'text-white',      
    'cursor-pointer',  
    'transition-all',  
    'duration-200'     
];
  const interactiveClasses = props.isDisabled
  ? 'opacity-50 cursor-crosshair' :
  'hover:bg-indigo-600 hover:scale-105 active:bg-indigo-700 active:scale-95';

  return [
    ...baseClasses,
    interactiveClasses,
    props.customClasses
  ].filter(Boolean);

});

const buttonAttributes = computed(() => {
  return {
    ...props.additionalAttributes,
    disabled: props.isDisabled
  }
})
</script>

<template>
  <button :class="buttonClasses" v-bind="buttonAttributes">{{ buttonText }}</button>
</template>
