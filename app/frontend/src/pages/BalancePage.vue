<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['balanceData']);
defineEmits(['balanceConfirmed'])

</script>

<template>
    <div class="w-full h-full">
        <p>User {{ balanceData.user }} owes: {{ balanceData.amount }}</p>
        <button @click="$emit('balanceConfirmed')">Confirm</button>
    </div>
</template>