<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';
import ExpenseLog from '../components/ExpenseLog.vue';
import { getUserData } from '../utils/userAccount.js';

defineProps(['u1deficit', 'u2deficit', 'transactions']);
const emit = defineEmits(['openAccountPage']);

const isPartnered = ref(false);

(async () => {
  const partnerUid = await getUserData('partnerUid');
  isPartnered.value = partnerUid !== null;
})();

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" @openAccountPage="emit('openAccountPage')" />
      <br />
      <BalanceGradient v-if="isPartnered" :u1deficit="u1deficit" :u2deficit="u2deficit" />
      <ExpenseLog :transactions="transactions" />
    </div>
</template>