
import React from 'react'

const Navbar = () => {  
  // const { data: session } = useSession()
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  
  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-sm">
    <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-bold text-white ">
        GetMeaChai
      </div>
      <div className="flex space-x-8">
        <a href="/" className="text-white text-l hover:text-gray-400">Home</a>
        <a href="/projects" className="text-white text-l hover:text-gray-400">Projects</a>
        <a href="/about" className="text-white text-l hover:text-gray-400">About Us</a>
        <a href="/signup" className="text-white text-l hover:text-gray-400">Sign Up</a>
        <a href="/login" className="text-white text-l hover:text-gray-400">Login</a>
      </div>
    </div>
  </nav>
  ) 
}

export default Navbar
