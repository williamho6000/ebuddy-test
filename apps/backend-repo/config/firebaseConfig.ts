import admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ebudy-test1.firebaseio.com',
});

const db = admin.firestore();

export { admin, db }