import {updateDocument} from '../../api/firebase/DocumentMutator';
import {getDocumentWithPathAndId} from '../../api/firebase/DocumentRetriever';
import {Trade} from '../../model';

const PATH = 'trades';

export async function addTradeToFirebase(email: string, trades: Trade[]) {
  return updateDocument(PATH, email, {trades: trades});
}

export async function getTrades(email: string) {
  return await getDocumentWithPathAndId(PATH, email);
}
