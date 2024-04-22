<script setup>
import { defineProps } from 'vue';

defineProps(['pageHeading']);

</script>

<template>
    <h1 class="pt-5 pb-5 bg-accent rounded-b-3xl w-full text-center text-text text-2xl font-bold">{{ pageHeading }}</h1>
</template>