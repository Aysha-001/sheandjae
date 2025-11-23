// src/lib/api.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, 'Product'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
