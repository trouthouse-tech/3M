import firebase from '@react-native-firebase/firestore';
export async function getDocumentWithPathAndId(
  path: string,
  documentId: string,
) {
  return await firebase()
    .collection(path)
    .doc(documentId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          path: path,
          id: documentId,
          data: doc,
          wasSuccessful: true,
          error: undefined,
        };
      } else {
        return handleUnsuccessfulRetrieval(
          path,
          documentId,
          'Doc does not exist',
        );
      }
    })
    .catch((error) => {
      return handleUnsuccessfulRetrieval(path, documentId, error);
    });
}

function handleUnsuccessfulRetrieval(
  path: string,
  documentId: string,
  error: any,
) {
  console.log(
    `Error retrieving document(${documentId}) path(${path}). ERR: ${error}`,
  );
  return {
    path: path,
    id: documentId,
    data: null,
    wasSuccessful: false,
    error: error,
  };
}
