<script setup>
import { ref } from 'vue';
import { signup } from '../utils/userAuth.js';
import { changePage } from '../utils/navigation.js';

const signUpName = ref(''), signUpEmail = ref(''), signUpPassword = ref('');

function handleSignup() {
    signup(signUpName.value, signUpEmail.value, signUpPassword.value);
}

</script>

<template>
    <!-- Sign up form -->
    <div class="flex flex-row justify-center items-center h-[100vh]">
        <form class="flex flex-col items-start h-28" @submit.prevent="handleSignup">
            <h2 class="text-red-500">Sign Up</h2>
            <input type="text" v-model="signUpName" placeholder="Name" required>
            <input type="email" v-model="signUpEmail" placeholder="Email" required>
            <input type="password" v-model="signUpPassword" placeholder="Password" required>
            <button type="submit">Sign up</button>
            <button @click="changePage('login')">Go Back to Login!</button>
        </form>
    </div>
</template>