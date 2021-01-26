import firebase from '@react-native-firebase/firestore';
export async function getDocumentWithPathAndKey(
  path: string,
  key: string,
  val: string,
) {
  return await firebase()
    .collection(path)
    .where(key, "==", val)
    .get()
    .then((doc) => {
      //doc.forEach((querySnapshot) => {console.log(querySnapshot)})
      if (!doc.empty) {
        return {
          path: path,
          data: doc,
          wasSuccessful: true,
          error: undefined,
        };
      } else {
        return handleUnsuccessfulRetrieval(
          path,
          key,
          val,
          'Record does not exist',
        );
      }
    })
    .catch((error) => {
      return handleUnsuccessfulRetrieval(path, key, val, error);
    });
}

function handleUnsuccessfulRetrieval(
  path: string,
  key: string,
  val: string,
  error: any,
) {
  console.log(
    `Error retrieving path(${path}) by key(${key}) & value(${val}). ERR: ${error}`,
  );
  return {
    path: path,
    data: null,
    wasSuccessful: false,
    error: error,
  };
}
