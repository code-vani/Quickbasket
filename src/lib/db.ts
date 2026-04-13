import mongoose from "mongoose";
//jitni api call karoge utni hi baar db connect krne ki koshish hogi
//isliye ham ek baar db connect krne ki koshish krenge aur baad mein db reuse krenge 

const mongodbUrl=process.env.MONGODB_URL
//imported the url in this variable from env file
//process.env is a global variable in nodejs which gives us acess to env variables
if(!mongodbUrl){
 throw new Error("db error")
}
//agar url nahi mila to error throw hoga 
//ab hamein apne connection ko cache karna hogi taki baar baar db connect na krna pade 
//object banayenge jismein conn connected
//and other is a promise key which says ki connect ho jayega process horha hai 
//global ke andar moongose naam se ek object banana padega ortherwise error ayega
//so we make a file global.d.ts in src folder and declare global varibale there 
let cached=global.mongoose
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}
//if kuch nahi hai so conn is null and promise is also null
//connecting function for db connection
//async arrow function 
const connectDb=async ()=>{
    if(cached.conn){
       
        return cached.conn
    }
    //agar connection hai toh usko return krdo aage nahi jana padega
    //agar connection null hai so ham promise dekhenge 
    //promise hai kuch toh usko resolve krdo 
    if(!cached.promise){
        //agar hamare pass cahce ke andar promise bhi nahi hai toh ham
        //naya promise bananyenge 
        //aur connect krne ki koshish krenge mongodb se
        //mongodburl ke andar hamari string url hai 

      
        cached.promise=mongoose.connect(mongodbUrl).then((conn)=>conn.connection)
    }
    //await mtlb tb tk connection resolve ni hota tb toh kuch ni hoga wait krega
    try {
        const conn=await cached.promise
        return conn
    } catch (error) {
        console.log(error)
    }

}

export default connectDb
//exporting the function so that we can use it in other files 
