import { GraphQLClientSingleton } from '@/graphql';
import { customerName } from '@/graphql/queries/customerName';
import { cookies } from 'next/headers';

export const validateAccessToken = async () => {
  const cookiesStore = cookies();
  const customerAccessToken = cookiesStore.get('accessToken')?.value || '';

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

  const { customer }: any = await graphqlClient.request(customerName, {
    customerAccessToken,
  });

  return customer;
};
