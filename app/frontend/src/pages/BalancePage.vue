<script setup>
import { defineProps, defineEmits } from 'vue';
import PageHeader from '../components/PageHeader.vue';

defineProps(['balanceData']);
defineEmits(['balanceConfirmed'])

</script>

<template>
    <div class="w-full h-full">
        <PageHeader pageHeading="Balance" />
        <p>User {{ balanceData.user_id }} owes: {{ balanceData.amount }}</p>
        <button @click="$emit('balanceConfirmed')">Confirm</button>
    </div>
</template>