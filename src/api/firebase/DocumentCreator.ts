import firebase from '@react-native-firebase/firestore';

export async function createDocument(
  path: string,
  documentId: string,
  data: Object,
) {
  return await firebase()
    .collection(path)
    .doc(documentId)
    .set(data)
    .then(() => {
      return {error: undefined};
    })
    .catch((error) => {
      return {error: error};
    });
}
