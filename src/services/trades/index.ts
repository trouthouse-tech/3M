import {createDocument} from '../../api/firebase/DocumentCreator';
import {updateDocument} from '../../api/firebase/DocumentMutator';
import {getDocumentWithPathAndId} from '../../api/firebase/DocumentRetriever';

const PATH = 'trades';

export async function addTradeToFirebase(email: string, trades: string[]) {
  return updateDocument(PATH, email, {trades: trades});
}

export async function getTrades(email: string) {
  return await getDocumentWithPathAndId(PATH, email);
}
