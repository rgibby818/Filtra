<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  selectName: {
    nameText: String,
    default: 'filter-selection',
  },
  label: {
    labelText: String,
    required: true,
  },
})

// const options = ['Black and White', 'Sepia', 'Invert', 'Normalize', 'Remove Background']
const options = {
    none: 'Select Filter',
    blackwhite: 'Black and White',
    sepia: 'Sepia',
    invert: 'Invert',
    normalize: "Normalize",
    removebg: 'Remove Background'
}
</script>

<template>
    <label for="props.selectName" class="hidden"></label>
    <select class="w-3/4 h-9 sm:w-1/3 bg-indigo-500 font-semibold text-white
                 hover:bg-indigo-600 hover:scale-105 cursor-pointer rounded-full"
                 :name="props.selectName" :id="props.selectName">
      <option class="text-center" v-for="(value, key) in options" :key="value" :value="key">{{ value }}</option>
    </select>
</template>
