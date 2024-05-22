'use server';

import { GraphQLClientSingleton } from '@/graphql';
import { createUserMutation } from '@/graphql/mutations/createUserMutation';
import { createAccessToken } from '@/utils/auth/createAccessToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CartItem } from '../../types';
import { validateAccessToken } from '@/utils/auth/validateAccessToken';
import { createCartMutation } from '@/graphql/mutations/createCartMutation';

export const handleCreateUser = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const variables = {
    input: {
      firstName: formDataObject.first_name,
      lastName: formDataObject.last_name,
      email: formDataObject.email,
      phone: `+57${formDataObject.phone}`,
      password: formDataObject.password,
    },
  };

  const data: any = await graphqlClient.request(createUserMutation, variables);

  const { customer, customerUserErrors } = data.customerCreate;
  if (customer?.firstName) {
    await createAccessToken(
      formDataObject.email as string,
      formDataObject.password as string
    );
    redirect('/store');
  }
};

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  const accessToken = await createAccessToken(
    formDataObject.email as string,
    formDataObject.password as string
  );
  if (accessToken) {
    redirect('/store');
  }
};

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get('accessToken')?.value as string;

  if (!accessToken) redirect('/login');

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accessToken,
        email: customer?.email,
      },
      lines: items.map(item => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  };

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};
