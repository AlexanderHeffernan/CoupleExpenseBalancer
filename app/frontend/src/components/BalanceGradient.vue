<script setup>
import { ref } from 'vue';
import { getBalanceData } from '../utils/transactions';

const u1deficit = ref(0);
const u2deficit = ref(0);

(async () => {
  const balanceData = await getBalanceData();
  u1deficit.value = balanceData.u1deficit;
  u2deficit.value = balanceData.u2deficit;
})();

function getBalancePoint() {
  if (u1deficit.value === 0 && u2deficit.value === 0) {
    return 50;
  }
  return u1deficit.value / (u1deficit.value + u2deficit.value) * 100;

}

</script>

<template>
    <div style="border: 16px solid #FFCCCC;" class="w-64 h-64 rounded-full" :style="{ background: `linear-gradient(to right, #FF6B6B ${getBalancePoint()}%, #A9A9A9 0%)` }">
        <div style="width: 150%; translate: -17% 140%;" class="flex justify-center items-center shadow-2xl bg-accent h-1/4 rounded-3xl">
            <p class="text-[#A62E2E] text-2xl font-bold w-1/2 text-center">${{ u1deficit }}</p>
            <p class="text-text text-2xl font-bold w-1/2 text-center">${{ u2deficit }}</p>
        </div>
    </div>
</template>