// import NextAuth from "next-auth"
import { handlers } from "@/lib/auth";
// import GoogleProvider from "next-auth/providers/google"
// import { DBConnect } from "@/lib/db";
// import User from '@/models/user.js'

export const { GET, POST } = handlers;
// export const authOptions = {
//   providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//   })
// ],
//  callbacks: {
//     async signIn({ user}) {
//       try {
//          await DBConnect();
//       const currentUser = await User.findOne({email: user.email})
//       if(!currentUser){
//          await User.create({
//           email : user.email,
//           username : user.email.split('@')[0],
//         })

//       }
//        return true
//       } catch (error) {
//          console.error("❌ signIn error:", error.message);
//         return false;
//       }

//     },
//     async session({ session}) {
//       try {
//          await DBConnect();
//       const dbUser = await User.findOne({email: session.user.email })
//       if(dbUser){
//       session.user.name = dbUser.username;
//       session.user.id = dbUser._id.toString();
//       }
//       return session
//       } catch (error) {
//         console.error("Session callback error", error)
//         return session
//       }

//     },
//   }}

//   const handler = NextAuth(authOptions)

//   export {handler as GET , handler as POST}
