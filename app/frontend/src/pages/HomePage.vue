<script setup>
// Import componens
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';
import ExpensesPreview from '../components/ExpensesPreview.vue';
// Import utilities
import { getUserData } from '../utils/userData.js';

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" />
      <br />
      <BalanceGradient v-if="getUserData('partnerUid')" />
      <ExpensesPreview />
    </div>
</template>