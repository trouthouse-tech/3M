import {updateDocument} from '../../api/firebase/DocumentMutator';
import {getDocumentWithPathAndId} from '../../api/firebase/DocumentRetriever';

const PATH = 'orders';

export async function addOrderIdToFirebase(email: string, orders: string[]) {
  return updateDocument(PATH, email, {orders: orders});
}

export async function getOrderIds(email: string) {
  return await getDocumentWithPathAndId(PATH, email);
}
