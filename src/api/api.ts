import { client, Query } from '@tilework/opus'

export const fetchGraphQL = async (newQuery: Query<string, unknown, boolean>): Promise<any> => {
  client.setEndpoint('http://localhost:4000/graphql')
  return await client.post(newQuery)
}