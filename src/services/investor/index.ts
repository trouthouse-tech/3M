import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDocumentWithPathAndId } from '../../api/firebase/DocumentRetriever';
import { getDocumentWithPathAndKey } from '../../api/firebase/DocumentRetrieverByKey';
import { FIREBASE_PATHS } from '../paths';
import { Investor } from '../../model';
import { createDocument } from '../../api/firebase/DocumentCreator';
import AsyncStorage from '@react-native-community/async-storage';
import { updateDocument } from '../../api/firebase/DocumentMutator';
import { user } from '../../store/user/reducer';

export async function registerInvestor(email: string, password: string) {
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user: FirebaseAuthTypes.UserCredential) => {
      return { user: user, error: undefined };
    })
    .catch((error) => {
      return { user: undefined, error: error };
    });
}

export function registerInvestorAllInfo(investor: Investor) {
  return new Promise(async (resolve) => {
    await getInvestorByKey("username", investor.username as string).then((data) => {
      if (data.wasSuccessful) {   // username exist
        resolve({ user: undefined, error: "Username exist in database." });
      } else {
        auth()
          .createUserWithEmailAndPassword(investor.email as string, investor.password as string)
          .then((user: FirebaseAuthTypes.UserCredential) => {
            createInvestor(investor).then((insertionAttempt) => {
              resolve({ user: user, error: undefined });
            }).catch((error) => {
              resolve({ user: undefined, error: error });
            });
          })
          .catch((error) => {
            resolve({ user: undefined, error: error });
          });
      }
    })
  })
}

export async function login(email: string, password: string) {
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then((user: FirebaseAuthTypes.UserCredential) => {
      console.log("i am user from login function", user)
      return { user: user, error: undefined };
    })
    .catch((error) => {
      console.log("i am user from login function", user)
      return { user: undefined, error: error };
    });
}

/**
 * Retrieve Investor's information
 * @param email
 */
export async function getInvestor(email: string) {
  return await getDocumentWithPathAndId(FIREBASE_PATHS.Investors, email);
}

export async function createInvestor(investor: Investor) {
  return await createDocument(
    FIREBASE_PATHS.Investors,
    investor.email as string,
    investor,
  );
}

/**
 * We need to update AsyncStorage to indicate if a user has logged in. It will be set to false upon logout.
 * The corresponding key will be used when the application is loaded to help direct the auto-login feature.
 */
export function setLoggedInUser() {
  AsyncStorage.setItem('isInvestorLoggedIn', 'true');
}

export function updateInvestorDocument(email: string, data: {}) {
  updateDocument(FIREBASE_PATHS.Investors, email, data);
}

/**
 * Retrieve Investor's information by key and value
 */
export async function getInvestorByKey(key: string, val: string) {
  return await getDocumentWithPathAndKey(FIREBASE_PATHS.Investors, key, val);
}