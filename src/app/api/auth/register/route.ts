import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
//url rhega api/auth/register
//export async function 
//so kis type ki req hai to servver?
//we are sending post req 
//req-next request type ka hoga 
export async function POST(req:NextRequest) {
    //try catch ke andar api likhni hai hamein 
    //name,email,pass frontend se lana hai 
    //agar alr exist krta hai so naya user banao 
    //email check for that 
    //then aage badenge
    //password bhi check kr sakte hai 
    //password hash karte hai ham log //salt krte hai 
    //so nobody can see that pass even if db access krliye kisi ne
    //ab ham user create kr sakte
    //flow for sign up api
    try {
      await connectDb()
      const {name,email,password}=await req.json()
      //json ke through data mil jata hai frontend se
      //connected the db before that
      //then email check kr rhe hai 
      //ki if it already exist in db or not 

    const existUser=await User.findOne({email})
    if(existUser){
        return NextResponse.json(
            {message:"email already exist!"},
            {status:400}
        )
    }
    //agar mil gaya toh return email alr exist ka messgae
    //response bhejenge using next response 
    //json method hota hai data bhejne ke liye 
    //status code bhi dere - 400 for bad request 

    //frontend error ham 400 bhejte hai 
    //we check if password is less than 6 char or not 
    //length check krte hai password ka 
   if(password.length<6){
    return NextResponse.json(
            {message:"password must be at least 6 characters"},
            {status:400}
        )
   }
   //hashed password banate hai bcyrpt ke through 
   const hashedPassword=await bcrypt.hash(password,10)
   //has function is used ( normal pass, salt round)
   //itni baar hash krenge 10 baar

   //now we are creating the user using user.create method
   //name,email,hashed pass bhejdenge
   const user=await User.create({
    name,email,password:hashedPassword
   })
    return NextResponse.json(
            user,
            {status:200}
            //sucess status code 200, it means everything if fine
            //and user object bhejdenge response me 
        )
        
    } catch (error) {
         return NextResponse.json(
            {message:`register error ${error}`},
            {status:500}
            //server error hai yeh 
        )
    }
}
// connect db
// name,email,password frontend
// email check
// password 6 character
//password hash
// user create
