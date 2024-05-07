<script setup>
import { ref, defineEmits } from 'vue';
import { login, signup } from '../utils/userAccount.js';

const emit = defineEmits(['loggedIn'])

const signUpName = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');

const signInEmail = ref('');
const signInPassword = ref('');

function handleSignup() {
    signup(signUpName.value, signUpEmail.value, signUpPassword.value);
}

function handleLogin() {
    if (login(signInEmail.value, signInPassword.value))
        emit('loggedIn');
}
</script>

<template>
    <div class="flex flex-row justify-center items-center h-[100vh]">
        <form  class="flex flex-col items-start h-28" @submit.prevent="handleSignup">
            <h2 class="text-red-500">Sign Up</h2>
            <input type="text" v-model="signUpName" placeholder="Name" required>
            <input type="email" v-model="signUpEmail" placeholder="Email" required>
            <input type="password" v-model="signUpPassword" placeholder="Password" required>
            <button type="submit">Sign up</button>
        </form>
        <form class="flex flex-col items-start h-28"  @submit.prevent="handleLogin">
            <h2>Sign In</h2>
            <input type="email" v-model="signInEmail" placeholder="Email" required>
            <input type="password" v-model="signInPassword" placeholder="Password" required>
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>