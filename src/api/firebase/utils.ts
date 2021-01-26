import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export function getDocumentsFromQuerySnapshot(
  querySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
) {
  const documents: any = [];
  querySnapshot.forEach((doc) => {
    documents.push({...doc.data(), id: doc.id});
  });
  return documents;
}
