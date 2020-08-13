import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export async function createInvestor(email: string, password: string) {
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user: FirebaseAuthTypes.UserCredential) => {
      return {user: user, error: undefined};
    })
    .catch((error) => {
      return {user: undefined, error: error};
    });
}

export async function loginInvestor(email: string, password: string) {
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then((user: FirebaseAuthTypes.UserCredential) => {
      return {user: user, error: undefined};
    })
    .catch((error) => {
      return {user: undefined, error: error};
    });
}
