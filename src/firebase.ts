import * as firebase from 'firebase-admin';

firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(process.env.FIREBASE_KEY!))
});

export const db = firebase.firestore();
