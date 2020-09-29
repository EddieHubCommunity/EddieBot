import * as firebase from 'firebase-admin';

// Providing a path to a service account key JSON file
firebase.initializeApp({
  credential: firebase.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),

  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = firebase.firestore();
