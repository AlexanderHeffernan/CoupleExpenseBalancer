<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['balanceData']);
defineEmits(['balanceConfirmed'])

</script>

<template>
    <div class="w-full h-full">
        <h1 class="pt-5 pb-5  w-full text-center text-text text-2xl font-bold">Balance</h1>
        <p>User {{ balanceData.user_id }} owes: {{ balanceData.amount }}</p>
        <button @click="$emit('balanceConfirmed')">Confirm</button>
    </div>
</template>