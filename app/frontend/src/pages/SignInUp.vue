<script setup>
import { ref } from 'vue';
import { signup, login } from '../utils/userAuth.js';

const signUpName = ref(''), signUpEmail = ref(''), signUpPassword = ref('');
const signInEmail = ref(''), signInPassword = ref('');

function handleSignup() {
    signup(signUpName.value, signUpEmail.value, signUpPassword.value);
}

function handleLogin() {
    login(signInEmail.value, signInPassword.value)
}
</script>

<template>
    <!-- Sign in/up form -->
    <div class="flex flex-row justify-center items-center h-[100vh]">
        <form class="flex flex-col items-start h-28" @submit.prevent="handleSignup">
            <h2 class="text-red-500">Sign Up</h2>
            <input type="text" v-model="signUpName" placeholder="Name" required>
            <input type="email" v-model="signUpEmail" placeholder="Email" required>
            <input type="password" v-model="signUpPassword" placeholder="Password" required>
            <button type="submit">Sign up</button>
        </form>
        <form class="flex flex-col items-start h-28"  @submit.prevent="handleLogin()">
            <h2>Sign In</h2>
            <input type="email" v-model="signInEmail" placeholder="Email" required>
            <input type="password" v-model="signInPassword" placeholder="Password" required>
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>