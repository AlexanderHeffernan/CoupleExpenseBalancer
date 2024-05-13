import { ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/init.js';
import { loadUserData } from './userData.js';

export const isLoggedIn = ref(false)

export async function signup(name, email, password) {
    if (!name || !email || !password)
        throw new Error("Name, email, and password are required.");

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: name });
        await createUserDocument(auth.currentUser.uid, email, auth.currentUser.displayName);
    } catch (error) {
        console.error("Error signing up user: ", error.message);
        throw new Error("Sign up failed: " + error);
    }
}

export async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    await signOut(auth);
}

/**
 * Create a user document in Firestore
 */
async function createUserDocument(userId, email, name) {
    try {
        const userDocRef = doc(db, `users/${userId}`);
        await setDoc(userDocRef, { email, name, original: null, partnerUid: null });
        return getDoc(userDocRef);
    } catch (error) {
        console.error("Error creating user document:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

/**
 * Initialize user data and authentication status on authentication state change.
 * @param {Object} user - Firebase user object
 */
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        isLoggedIn.value = false;
        return;
    }
    await loadUserData(user);
    isLoggedIn.value = true;
});