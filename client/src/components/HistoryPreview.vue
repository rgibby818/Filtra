<template>
</template>

<script setup>
import { ref, reactive, onMounted} from 'vue';
import axios from 'axios';

const start = ref(0);
const end = ref(10);
const images = reactive(getImages(start, end));

async function getImages(start, end){
    try {
        const response = await fetch('http://localhost:3000/history', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'start': '0',
    'end': '10'
  }
})

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("fetched failed: ")
        console.log(error);
    }

};
</script>