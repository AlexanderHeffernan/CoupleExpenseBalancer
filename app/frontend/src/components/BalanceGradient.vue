<script setup>
import { defineProps } from 'vue';
const props = defineProps(['u1deficit', 'u2deficit']);

function getBalancePoint() {
  if (props.u1deficit === 0 && props.u2deficit === 0) {
    return 50;
  }
  return props.u1deficit / (props.u1deficit + props.u2deficit) * 100;

}

</script>

<template>
    <div style="border: 16px solid #FFCCCC;" class="w-64 h-64 rounded-full" :style="{ background: `linear-gradient(to right, #FF6B6B ${getBalancePoint()}%, #A9A9A9 0%)` }">
        <div style="width: 150%; translate: -17% 140%;" class="flex justify-center items-center shadow-2xl bg-accent h-1/4 rounded-3xl">
            <p class="text-primary text-2xl font-bold w-1/2 text-center">${{ u1deficit }}</p>
            <p class="text-text text-2xl font-bold w-1/2 text-center">${{ u2deficit }}</p>
        </div>
    </div>
</template>