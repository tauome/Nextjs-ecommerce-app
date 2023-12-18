import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['tausifsolaiman@gmail.com']; 

export const authOptions = {
  providers: [
     GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
   secret: process.env.SECRET,
   adapter: MongoDBAdapter(clientPromise),
   callbacks: {
    session: ({ session, token, user}) => {
      console.log(session);
      if (adminEmails.includes(session?.user?.email)){
          return session; 
      }
    }
   }
}; 


export default NextAuth(authOptions); 


export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)){
    res.status(401).json({error: 'Not an Admin'});
  }
}