<script setup>
import { defineProps, defineEmits } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';
import ExpenseLog from '../components/ExpenseLog.vue';

defineProps(['u1deficit', 'u2deficit', 'transactions']);
const emit = defineEmits(['openAccountPage']);

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" @openAccountPage="emit('openAccountPage')" />
      <br />
      <BalanceGradient :u1deficit="u1deficit" :u2deficit="u2deficit" />
      <ExpenseLog :transactions="transactions" />
    </div>
</template>