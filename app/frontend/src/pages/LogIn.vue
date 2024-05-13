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
    <div class="flex flex-row justify-center items-center h-[100vh]">
        <form class="flex flex-col items-start h-28"  @submit.prevent="handleLogin()">
            <h2>Sign In</h2>
            <input type="email" v-model="signInEmail" placeholder="Email" required>
            <input type="password" v-model="signInPassword" placeholder="Password" required>
            <button type="submit">Sign in</button>
            <button @click="changePage('signup')">New? Sign Up!</button>
        </form>
    </div>
</template>