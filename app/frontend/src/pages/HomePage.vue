<script setup>
import { defineProps } from 'vue';
import PageHeader from '../components/PageHeader.vue';

const props = defineProps(['u1deficit', 'u2deficit']);

/**
 * Calculate the angle of the conic gradient based on the user deficits
 * @param {number} user_id
 */
function getAngle(user_id) {
  const totalDeficit = props.u1deficit + props.u2deficit;
  // If both expenses are zero, return 180 degrees (perfect split)
  return totalDeficit === 0 ? 180 : user_id === 1
      ? (props.u1deficit / totalDeficit) * 360
      : (props.u2deficit / totalDeficit) * 360;
}

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" />
      <div class="w-64 h-64 rounded-full flex justify-center items-center" :style="{ backgroundImage: `conic-gradient(red ${getAngle(1)}deg, blue 0deg)` }">
        <p class="w-1/2 text-center">${{ u2deficit }}</p>
        <p class="w-1/2 text-center">${{ u1deficit }}</p>
      </div>
    </div>
</template>