<script setup>
import { ref, defineEmits } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/init.js';

const emit = defineEmits(['loggedIn'])

const signUpName = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');

const signInEmail = ref('');
const signInPassword = ref('');

async function signUp() {
    // register new user
    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
        .then(() => {
            // Update name
            updateProfile(auth.currentUser, {
                displayName: signUpName.value
            })
            .then(() => {
                emit('loggedIn');
            })
        })
}

function signIn() {
    signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
        .then(() => {
            emit('loggedIn');
        })
}
</script>

<template>
    <div class="flex flex-row justify-center items-center h-[100vh]">
        <form  class="flex flex-col items-start h-28" @submit.prevent="signUp">
            <h2 class="text-red-500">Sign Up</h2>
            <input type="text" v-model="signUpName" placeholder="Name" required>
            <input type="email" v-model="signUpEmail" placeholder="Email" required>
            <input type="password" v-model="signUpPassword" placeholder="Password" required>
            <button type="submit">Sign up</button>
        </form>
        <form class="flex flex-col items-start h-28"  @submit.prevent="signIn">
            <h2>Sign In</h2>
            <input type="email" v-model="signInEmail" placeholder="Email" required>
            <input type="password" v-model="signInPassword" placeholder="Password" required>
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>