<script setup>
import { defineProps } from 'vue';
import { toggleAccountPage } from '../utils/navigation';

defineProps(['pageHeading']);

</script>

<template>
    <div class="relative pt-5 pb-5 bg-accent rounded-b-3xl w-full">
        <h1 class="text-center text-text text-2xl font-bold">{{ pageHeading }}</h1>
        <button @click="toggleAccountPage()" class="absolute right-0 top-0 pt-5 transition-transform ease rounded-t-3xl w-20 flex justify-center items-center">
            <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="fill-text" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </button>
    </div>
</template>