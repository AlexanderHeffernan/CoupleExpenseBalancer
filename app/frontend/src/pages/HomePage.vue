<script setup>
import { defineProps } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import BalanceGradient from '../components/BalanceGradient.vue';

defineProps(['u1deficit', 'u2deficit']);

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Home" />
      <BalanceGradient :u1deficit="u1deficit" :u2deficit="u2deficit" />
    </div>
</template>