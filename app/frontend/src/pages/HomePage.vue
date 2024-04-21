<script setup>
import { defineProps } from 'vue';

const props = defineProps(['u1expense', 'u2expense']);

function getAngle(user) {
  const totalExpense = props.u1expense + props.u2expense;

  // If both expenses are zero, return 0 degrees
  if (totalExpense === 0) { return 0; }
  
  return user === 1 ? props.u1expense / totalExpense * 360 : props.u2expense / totalExpense * 360;
}

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <p>Hello</p>
      <div class="w-64 h-64 rounded-full flex justify-center items-center" :style="{ backgroundImage: `conic-gradient(red ${getAngle(1)}deg, blue 0deg)` }">
        <p class="w-1/2 text-center">{{ u2expense }}</p>
        <p class="w-1/2 text-center">{{ u1expense }}</p>
      </div>
    </div>
</template>