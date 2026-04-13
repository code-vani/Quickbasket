//in typescript we get type safety
//for everything we define a type 
//tuples etc
import mongoose from "mongoose";
//we have create a interface
//name of the user of string type,email,pass etc
//mongodb ek id generate krta hai automatically toh uskye liye we used this type
interface IUser{
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile?:string
    role:"user" | "deliveryBoy" | "admin"
}
//do objects hote hai 
//dusra object has timestamps true
//which means whenever we update the database toh data fields dikhengi hamein
//type define krte hai as its typescript
//object ke liye we are using interface keyword

const userSchema=new mongoose.Schema<IUser>({
name:{
    type:String,
    required:true

},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:false
},
mobile:{
    type:String,
    required:false
},
//mobile optional hai
//id mongodb khud generate krta hai isliye nahi likhte yaha 
//schema mein
role:{
    type:String,
    enum:["user","deliveryBoy","admin"],
    default:"user"
}
//in enum we are defining the possible values for the role field 
},{timestamps:true})

const User=mongoose.models.User || mongoose.model("User",userSchema)
//model ka name
//model ka schema 
//mongoose ke andar ek list hoti hai (registry)
//model object ke andar yeh schema register krta hai uske name se
//model ko register krte hai uske name se aur schema ke sath 
//||isliye kyuki agar alr exist krta hai model exist toh dubara mat banao model
//importing the model in other files also 
export default User
