'use server';

import { GraphQLClientSingleton } from '@/graphql';
import { createUserMutation } from '@/graphql/mutations/createUserMutation';

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

  const data = await graphqlClient.request(createUserMutation, variables);
  console.log(data);
};
