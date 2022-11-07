import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import SpotifyProvider from "next-auth/providers/spotify"

import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"

const config = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  region: process.env.NEXT_AUTH_AWS_REGION as string,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

// http://localhost:3000/api/auth/callback/google
// http://localhost:3000/api/auth/callback/spotify

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(client, {
    tableName: process.env.NEXT_AUTH_AWS_USER_TABLE as string,
  }),
}

export default NextAuth(authOptions)