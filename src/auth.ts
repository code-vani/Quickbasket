import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
//nextauth providers can be added here
//user api pr gya fir privder jata hai aur waha se jwt token milta hai 
//then session create hota hai and then frontend pr user access kr pata hai using useSession hook
//token se data in a session uthayenge idhr
//provider ke andar credentioals provider liya hai arur sign in krte hai
//fir tokens ate hai in callbacks and sessions 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
        email: { label: "email",type:"email" },
        password: { label: "Password", type: "password" },
      } ,
    async authorize(credentials, request) {
         //async is used to wait for the db connection and user exist krta hai toh email check
         //otherwise sign in
         //then pass match karna hai toh bcypt se compare krna hai password ko 
            await connectDb()
            const email=credentials.email
            //email access
            const password=credentials.password as string
            //typecast kr diya hamne
            //password access kr payenge aise ham long easily 
            const user=await User.findOne({email})
            //checking if user exist krta hai toh email se find kr rhe in user model
            //email se user mil gya toh nice if not then error throw kr denge ki sign up kra aap
            if(!user){
                throw new Error("user does not exist")
            }
            //db mein hash pass hai
            //aur user sends actual pass
            //for checking we use the function compare of bcyrpt
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                throw new Error("incorrect password")
            }
            //error if wrong password 
            return {
                id:user._id.toString(),
                email:user.email,
                name:user.name,
                role:user.role
            }
//authorize function hamesha ek user return krta hai agar success hota hai sign in
          } 
    }),
  ],
  //callback ke andar function hoti hai joh call hote hai
  //abhi token ke andar user ka data dalna hai toh signin callback use kr rhe hai
  //session ke andar token se data jayega
  //toh phele token mein data daalna hai user ka
  callbacks:{
    // token ke ander user ka data dalta hai
    async signIn({user,account}) {
      console.log(user)
      if(account?.provider=="google"){
        await connectDb()
        let dbUser=await User.findOne({email:user.email})
       if(!dbUser){
         dbUser=await User.create({
          name:user.name,
          email:user.email,
          image:user.image
         })
       }

       user.id=dbUser._id.toString()
       user.role=dbUser.role
      }
      return true
    },
    //token ka paramete daal rhe hai 
    //ek user hai jismein sign in ke time ka user data ayega 
    jwt({token,user,trigger,session}) {
        if(user){
            token.id=user.id,
            token.name=user.name,
            token.email=user.email,
            token.role=user.role
            //user is of USER type and token is of JWT type
            //user sirf teen chiz maanke chlta hai so to add role hamein.. next auth ke andar changes krne padenge

        }
  if(trigger=="update"){
    token.role=session.role
  }
        return token
    },
    //session ke andar token se data jayega
    //session bhi ek callback object hai idhr 
    //session ke andar user hota hai jsiemin sara data hota hai 
    //session.user.id krke data daaldenge uske andar 
    session({session,token}) {
        if(session.user){
            session.user.id=token.id as string,
            session.user.name=token.name as string,
            session.user.email=token.email as string
             session.user.role=token.role as string
        }
        return session
    },
  },
  //pages bhi batatae hai 
  //error ayega toh login pr hi jayega 
  pages:{
      signIn:"/login",
      error:"/login"
    },
    //session kis type se lenge
    //session hamne token se liya hai isliye we used jwt
    //maxage is 10 days in milliseconds
    //toh user 10 din ke liye logged in rhega uske baad dibara login krna padega
    //token expire ho jayega ismein
    session:{
      strategy:"jwt",
      maxAge:10*24*60*60*1000
    },
    secret:process.env.AUTH_SECRET
    //yeh secret helps to generate the token and verify the token as well
})
//auth options hai yeh hamare 
