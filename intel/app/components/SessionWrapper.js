'use client'
import { SessionProvider } from "next-auth/react"
import { motion, AnimatePresence } from 'framer-motion';
export default function App({children}){
  return (

    <AnimatePresence>
    <SessionProvider>
      <motion.div
      initial={{ opacity: 0, y: 15}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: 15}}
      transition={{delay: 0.25}}
      >
        {children}
        </motion.div>
    </SessionProvider>
    </AnimatePresence>
  )
}