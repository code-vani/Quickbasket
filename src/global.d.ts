import { Connection } from "mongoose"
//mongoose ke andar connection type import krna padega
//taki ham apna global variable declare kr sakein

declare global{
    var mongoose:{
       conn:Connection | null,
       promise:Promise<Connection> | null
    }
}
//conn ke andr connection store hoga 
//hoga ya null hoga connection
//successfully connect horha tha promise bhi return krna pdega
//reject or resolve
//so the promise will say that connect ho rha hai
//promise fullfil hoga toh connection return hoga hamara
export {}