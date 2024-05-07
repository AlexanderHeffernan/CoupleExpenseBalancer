import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';

export async function signup(name, email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: name
        });

        await createUserDocument(email, auth.currentUser.displayName);
        isLoggedIn.value = true;
        return true;
    } catch (error) {
        console.error("Error signing up user: ", error);
    }
}

export const isLoggedIn = ref(false);

// On mount, check if user is logged in
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, `users/${user.uid}`));
        isLoggedIn.value = userDoc.exists(); // Update the value based on whether the user document exists
    } else {
        isLoggedIn.value = false;
    }
});

export async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    return true;
}

export async function logout() {
    await signOut(auth);
    console.log("SIGNED OUT!");
}

// get user uid

// get user data
export async function getUserData(dataLabel, uid = auth.currentUser.uid) {
    try {
        // Get the document corresponding to the specified user
        const userDoc = await getDoc(doc(db, `users/${uid}`));

        // Ensure the document exists
        if (!userDoc.exists()) { throw new Error("User document does not exist"); }

        // Extract the data from the document
        const userData = userDoc.data();
        if (!Object.prototype.hasOwnProperty.call(userData, dataLabel)) { console.log(`Data label '${dataLabel}' does not exist in the user data.`); }

        return userData[dataLabel];
    } catch (error) {
        console.log("Error fetching user data:", error);
    }
}

// create user document
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