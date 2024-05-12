import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getTransactions, listenForTransactions } from './transactions.js';
import { startLoading, stopLoading } from './navigation.js';

// Global variables
export const isLoggedIn = ref(false);
const userData = ref(null);
const partnerUserData = ref(null);

/**
 * Initialize user data and authentication status on authentication state change.
 * 
 * @param {Object} user - Firebase user object
 */
auth.onAuthStateChanged(async (user) => {
    startLoading();
    if (user) {
        try {
            const userDoc = await getDoc(doc(db, `users/${user.uid}`));
            if (userDoc.exists()) {
                // Update user data and authentication status
                userData.value = userDoc.data();
                if (userData.value.partnerUid) {
                    const partnerDoc = await getDoc(doc(db, `users/${userData.value.partnerUid}`));
                    partnerUserData.value = partnerDoc.data();
                }
                isLoggedIn.value = true;
                await getTransactions();
                listenForTransactions();
            }
        } catch(error) {
            console.error("Error fetching user data: ", error);
        }
    } else {
        isLoggedIn.value = false;
    }
    stopLoading();
});

/**
 * Sign up new user.
 * @param {string} name - User's display name
 * @param {string} email - User's mail address
 * @param {string} password - User's password
 * @returns {boolean} - True if sign up was successful, false otherwise
 */
export async function signup(name, email, password) {
    try {
        // Create user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        // Update user profile with display name
        await updateProfile(auth.currentUser, {
            displayName: name
        });
        // Create user document in Firestore
        await createUserDocument(email, auth.currentUser.displayName);
        isLoggedIn.value = true;
        return true;
    } catch (error) {
        console.error("Error signing up user: ", error);
        throw error;
    }
}

/**
 * Log in an existing user.
 * @param {*} email - User's email address
 * @param {*} password - User's password
 * @returns - Returns true if login was successful, false otherwise
 */
export async function login(email, password) {
    try {
        // Sign in user with email and password
        await signInWithEmailAndPassword(auth, email, password)
        return true;
    } catch (error) {
        console.error("Error logging in user: ", error);
        throw error;
    }
}

/**
 * Log out the current user.
 */
export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out user: ", error);
        throw error;
    }
    
}

/**
 * Get user data for specified user.
 * @param {string} dataLabel - Label of the data to retrive.
 * @param {long?} uid - UID of the user to get data for. If not provided, the current user's data is used.
 * @returns {*} - The requested user data.
 */
export function getUserData(dataLabel, uid = auth.currentUser.uid) {
    if (dataLabel === 'uid') {
        if (uid === auth.currentUser.uid) { return auth.currentUser.uid; }
    }

    let dataDoc;
    if (uid === auth.currentUser.uid) { dataDoc = userData; }
    else { dataDoc = partnerUserData; }

    if (!dataDoc.value) { return null; } // User data not available yet
    if (!Object.prototype.hasOwnProperty.call(dataDoc.value, dataLabel)) { 
        console.error(`Data label '${dataLabel}' does not exist in the user data.`);
        return null;
    }
    return dataDoc.value[dataLabel];
}

/**
 * Create a user document in Firestore
 * @param {string} email - User's email address 
 * @param {string} name - User's display name
 */
async function createUserDocument(email, name) {
    try {
        // Create a new document in the 'users' collection with the current user's UID
        await setDoc(doc(db, `users/${auth.currentUser.uid}`), {
            email: email,
            name: name,
            original: null,
            partnerUid: null
        });
        return getDoc(doc(db, `users/${auth.currentUser.uid}`));
    } catch (error) {
        console.error("Error creating user document:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}