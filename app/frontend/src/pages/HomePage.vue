<script setup>
// Import componens
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';
import ExpensesPreview from '../components/ExpensesPreview.vue';
// Import utilities
import { getUserData } from '../utils/userData.js';

</script>

<template>
    <div class="relative w-full h-full flex flex-col items-center overflow-hidden touch-none">
      <PageHeader pageHeading="Home" />
      <br /><br />
      <BalanceGradient v-if="getUserData('partnerUid')" />
      <ExpensesPreview />
    </div>
</template>