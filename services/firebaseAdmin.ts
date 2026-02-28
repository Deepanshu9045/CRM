
import admin from 'firebase-admin';

// Helper function to initialize Firebase Admin if not already initialized
function initializeFirebase() {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase environment variables are not set');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
}

// Get Firestore instance
export function getDb() {
  initializeFirebase();
  return admin.firestore();
}

// Get Auth instance
export function getAuth() {
  initializeFirebase();
  return admin.auth();
}

// Create (Add) a document
export async function addDocument(collection: string, data: any) {
  const db = getDb();
  const docRef = await db.collection(collection).add(data);
  return docRef.id;
}

// Read (Get) a document by ID
export async function getDocument(collection: string, docId: string) {
  const db = getDb();
  const doc = await db.collection(collection).doc(docId).get();
  return doc.exists ? doc.data() : null;
}

// Read (Get) all documents in a collection
export async function getAllDocuments(collection: string) {
  const db = getDb();
  const snapshot = await db.collection(collection).get();

  // Map each document to an object with id and data
  const documents = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return documents;
}

// Update a document by ID
export async function updateDocument(collection: string, docId: string, data: any) {
  const db = getDb();
  await db.collection(collection).doc(docId).update(data);
  return true;
}

// Delete a document by ID
export async function deleteDocument(collection: string, docId: string) {
  const db = getDb();
  await db.collection(collection).doc(docId).delete();
  return true;
}

// Create a company account: creates Auth user and Firestore doc with same UID
export async function createCompanyAccount(companyData: any) {
  if (!companyData.email || !companyData.password) {
    throw new Error('Email and password are required');
  }
  const auth = getAuth();
  const db = getDb();
  // 1. Create Auth user
  const userRecord = await auth.createUser({
    email: companyData.email,
    password: companyData.password,
    displayName: companyData.companyName || '',
  });
  // 2. Store company details in Firestore with UID as docId
  const docData = { ...companyData };
  delete docData.password; // Don't store password in Firestore
  await db.collection('companies').doc(userRecord.uid).set(docData);
  return userRecord.uid;
}

export async function getUidFromRequest(authHeader: string) {
  const auth = getAuth();
  const match = authHeader.match(/^Bearer (.+)$/i);
  if (!match) return null;
  const idToken = match[1];
  try {
    const decoded = await auth.verifyIdToken(idToken);
    return decoded.uid;
  } catch {
    return null;
  }
}