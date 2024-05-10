<script setup>
// Import componens
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';
import ExpenseLog from '../components/ExpenseLog.vue';
// Import utilities
import { getUserData } from '../utils/userAccount.js';

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" />
      <br />
      <BalanceGradient v-if="getUserData('partnerUid')" />
      <ExpenseLog />
    </div>
</template>