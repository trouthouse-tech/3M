import firestore from '@react-native-firebase/firestore';

export function updateDocument(path: string, id: string, data: {}) {
  firestore()
    .collection(path)
    .doc(id)
    .update(data)
    .then((doc) => {
      console.log('doc: ', doc);
    });
}
