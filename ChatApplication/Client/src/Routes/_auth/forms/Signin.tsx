import {SignIn} from "@clerk/clerk-react"
import { useState,useEffect } from "react"



const Signin = () => {

const [socket , setSocket] = useState<WebSocket | null>(null)

useEffect(
  
() =>
{
  const newSocket = new WebSocket("ws://localhost:8080");
  newSocket.onopen = () => {
    console.log('Connection established');
    newSocket.send('Hello from Browser')
  }
  setSocket(newSocket);
}
  ,[])

  return (
    <SignIn signUpUrl="/sign-up" 
    forceRedirectUrl="/chat"
    />
  )
}

export default Signin
