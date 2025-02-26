import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const signInUrl = `http://localhost:5000/api/users/sign-in`;
          console.log('Sending sign-in request to:', signInUrl);
          console.log('With body:', { username: credentials.username, password: credentials.password });
          
          // Call the sign-in endpoint using GET method but with body
          const signInResponse = await fetch(signInUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            }),
          });

          const responseJson = await signInResponse.json();
          console.log('Raw response:', responseJson);

        const getUser = await fetch(`http://localhost:5000/api/users/profile/${responseJson.user.id}}`)
        const userJson = await getUser.json();
        const user = userJson.user; 

        if (user && user.password === credentials.password) {
          // Return user without password
          return {
            id: String(user.user_id),
            name: user.name,
            email: user.email,
            role: user.role,
            username: user.username,
            phone: user.phone,
            facebook_link: user.facebook_link,
            facebook_name: user.facebook_name,
            instagram_link: user.instagram_link,
            instagram_name: user.instagram_name
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user properties to JWT token when user signs in
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.phone = user.phone;
        token.facebook_link = user.facebook_link;
        token.facebook_name = user.facebook_name;
        token.instagram_link = user.instagram_link;
        token.instagram_name = user.instagram_name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user properties to session
      if (session.user) {
        session.user.role    = token.role as string;
        session.user.username = token.username as string;
        session.user.phone = token.phone as string;
        session.user.facebook_link = token.facebook_link as string;
        session.user.facebook_name = token.facebook_name as string;
        session.user.instagram_link = token.instagram_link as string;
        session.user.instagram_name = token.instagram_name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };