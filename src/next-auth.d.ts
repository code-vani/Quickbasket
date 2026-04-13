
declare module "next-auth" {
    interface User {
        id:string,
        name:string,
        email:string,
        role:string
    }
}

//package ke andar chnages kar rhe hai isliye hamne module likha hai ismein 
//interface hai User inside next auth 
export {}