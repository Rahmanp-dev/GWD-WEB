
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

if (!process.env.ADMIN_USERNAME) {
  throw new Error('Missing ADMIN_USERNAME in .env.local');
}

if (!process.env.ADMIN_PASSWORD) {
  throw new Error('Missing ADMIN_PASSWORD in .env.local');
}

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing NEXTAUTH_SECRET in .env.local');
  }

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === process.env.ADMIN_USERNAME && credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Admin" };
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
});

export { handler as GET, handler as POST };
