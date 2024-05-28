import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authoptions= NextAuth.default({
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_ID, 
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});

export { authoptions as GET,authoptions as POST}