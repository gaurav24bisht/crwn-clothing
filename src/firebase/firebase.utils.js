import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyDuuSKLLw5AK1h7DFHCeMThkR9ePSfBR_w",
        authDomain: "crwn-db-89c47.firebaseapp.com",
        databaseURL: "https://crwn-db-89c47.firebaseio.com",
        projectId: "crwn-db-89c47",
        storageBucket: "crwn-db-89c47.appspot.com",
        messagingSenderId: "388432565823",
        appId: "1:388432565823:web:c9c7320890a97b09b04a8a",
        measurementId: "G-D9DNRJZ3PE"
      
};

export const createUserProfileDocument =async (userAuth, additionalData) => {
        if(!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists){
                const{ displayName, email } = userAuth;
                const createdAt = new Date();

                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })
                } catch(error){
                        console.log('error creating user', error.message);
                }
        }

        return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
