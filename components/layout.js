import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";

export default function Layout({children}) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={()=> signIn('google')} className="bg-white p-2 px-4">Login with Google</button>
        </div>

      </div>
    )
  }
  return (
    <div>
      <div className="bg-blue-900 w-screen h-screen flex">
        <Nav/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg pd-4">
          {children}
        </div>
      </div>
    </div>
  )
}