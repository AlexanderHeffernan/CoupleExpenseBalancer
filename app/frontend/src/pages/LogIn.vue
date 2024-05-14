<script setup>
import { ref } from 'vue';
import { login } from '../utils/userAuth.js';
import { changePage } from '../utils/navigation.js';

const signInEmail = ref(''), signInPassword = ref('');

function handleLogin() {
    login(signInEmail.value, signInPassword.value)
}
</script>

<template>
    <!-- Log In form -->
    <div class="flex flex-col justify-center items-center h-[100vh]">
        <div class="bg-primary absolute w-[200%] h-[300px] top-[-160px] rotate-[-13deg]"/>
        <div class="bg-accent absolute w-[200%] h-[300px] top-[-180px] rotate-[-15deg]"/>
        <div class="bg-secondary absolute w-[200%] h-[300px] bottom-[-140px] rotate-[15deg]"/>
        <div class="bg-widget absolute w-[200%] h-[300px] bottom-[-160px] rotate-[13deg]"/>
        <form class="flex flex-col items-start z-[1]"  @submit.prevent="handleLogin()">
            <h2 class="text-primary font-bold text-2xl mb-3">Log In</h2>
            <input class="border-[3px] border-accent rounded-sm focus:border-primary focus:outline-none placeholder-accent px-2 py-1 mb-3" 
                type="email" v-model="signInEmail" placeholder="Email" required>
            <input class="border-[3px] border-accent rounded-sm focus:border-primary focus:outline-none placeholder-accent px-2 py-1 mb-10" 
                type="password" v-model="signInPassword" placeholder="Password" required>
            <button class="border-[3px] border-secondary rounded-lg bg-widget px-4 py-[2px] font-medium"
                type="submit">Confirm</button>
        </form>
        <button class="absolute bottom-0 mb-10 bg-white border-[3px] border-secondary rounded-lg px-5 py-[4px] text-xl font-bold"
                @click="changePage('signup')">New? Sign Up!</button>
    </div>
</template>