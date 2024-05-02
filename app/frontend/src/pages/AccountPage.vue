<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['isAccountPageOpen']);
const emits = defineEmits(['closeAccountPage', 'logout']);

function closeAccountPage() {
    emits('closeAccountPage');
}

function logoutButton() {
    emits('logout');
}

</script>

<template>
    <div class="fixed top-0 right-0 z-10 rounded-b-[40px] bg-accent overflow-hidden transition-all duration-500" :class="isAccountPageOpen ? 'w-full h-full' : 'w-0 h-0'">
        <p>Account Page</p>
        <button @click="closeAccountPage" class="absolute right-0 top-0 pt-5 transition-transform ease rounded-t-3xl w-20 flex justify-center items-center">
            <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="fill-text" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>

        <button @click="logoutButton">Sign out</button>
    </div>
</template>