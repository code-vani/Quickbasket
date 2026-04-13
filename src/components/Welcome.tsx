'use client'
//client components
//login aur signup hamare client components honge kyunki unme user interaction hai
//ham duration set kr sakte hai using transition prop 
//transition ke andar property hai duration 
import React from 'react'
import { motion } from "motion/react"
//element ke age bas motion. laga denge toh wo animate ho jayega easily 
//inital-animate-transition ye motion ke props hai
//initail mein batate hai shurat mein kaha hoga and end mein kaha jana chahiye
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'
type propType={
nextStep:(s:number)=>void
}
//type define krna
//isliye important hai kyuki hamein nextstep function ko prop
//ke through pass krna hai jo ki parent component se ayega aur voh
//function ko call krega jab user text button pe click krega 
function Welcome({nextStep}:propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-100 to-white'>
      <motion.div
      initial={{
        opacity:0,
        y:-10
      }}
      animate={{
         opacity:1,
         y:0
      }}
     transition={{
        duration:0.6
     }}
     //niche se lana hai toh y set krdenge ham accordingly 
     //ab we are showing a paragraph after heading 
//we want it to be animated also so we use motion. again
//now for using the shopping basket etc we will make another div 
//icon khud recommend hota hai
     className='flex items-center gap-3'
      >
        <ShoppingBasket className='w-10 h-10 text-green-600'/>
       <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>QuickBasket</h1>
       
        </motion.div>
    <motion.p
    initial={{
        opacity:0,
        y:10
      }}
      animate={{
         opacity:1,
         y:0
      }}
     transition={{
        duration:0.6,
        delay:0.3
     }}
     className='mt-4 text-gray-700 text-lg md:text-xl max-w-lg'
    >
Your one-stop destination for fresh groceries, organic produce, and
daily essentials delivered right to your doorstep.

    </motion.p>

    <motion.div initial={{
        opacity:0,
        scale:0.9
      }}
      animate={{
         opacity:1,
         scale:1
      }}
     transition={{
        duration:0.6,
        delay:0.5
     }}
     className='flex items-center justify-center gap-10 mt-10'
     >
        <ShoppingBasket className='w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md'/>
        <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-md'/>

    </motion.div>

<motion.button initial={{
        opacity:0,
        y:20
      }}
      animate={{
         opacity:1,
         y:0
      }}
     transition={{
        duration:0.6,
        delay:0.8
     }}
     
     className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-10'
     onClick={()=>nextStep(2)}
     >
Next 
<ArrowRight/>
</motion.button>

    </div>
  )
}

export default Welcome
                             

                               