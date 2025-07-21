<script setup>

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Select A Filter'
  }
});

defineEmits(['update:modelValue']);

const options = {
    blackwhite: 'Black and White',
    sepia: 'Sepia',
    invert: 'Invert',
    normalize: "Normalize",
    removebg: 'Remove Background'
}
</script>

<template>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" class="w-3/4 h-9 sm:w-1/3 bg-indigo-500 font-semibold text-white
                 hover:bg-indigo-600 hover:scale-105 cursor-pointer rounded-full"
                 >
      <option disabled value="" class="text-center">{{ placeholder }}</option>
      <option class="text-center" v-for="(value, key) in options" :key="value" :value="key">{{ value }}</option>
    </select>
</template>
