'use server';

import { GraphQLClientSingleton } from '@/graphql';
import { createUserMutation } from '@/graphql/mutations/createUserMutation';
import { createAccessToken } from '@/utils/auth/createAccessToken';
import { redirect } from 'next/navigation';

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
