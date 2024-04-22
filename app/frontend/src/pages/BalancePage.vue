<script setup>
import { defineProps, defineEmits } from 'vue';
import PageHeader from '../components/PageHeader.vue';

defineProps(['balanceData']);
defineEmits(['balanceConfirmed'])

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <PageHeader pageHeading="Balance" />
        <div class="flex flex-col items-center shadow-xl p-5 rounded-2xl w-[80%] bg-widget h-[300px]">
            <p>User {{ balanceData.user_id }} owes: ${{ balanceData.amount }}</p>
            <button class="text-lg bg-primary pl-10 pr-10 pt-2 pb-2 rounded-xl text-white font-semibold" @click="$emit('balanceConfirmed')">Confirm</button>
        </div>
    </div>
</template>