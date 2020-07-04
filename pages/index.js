import Head from 'next/head'
import Navbar from './navbar'
import Enter from './enter'
import React, {useState, useEffect} from 'react'
import Display from './projectdisplay'


export default function Home() {

  const [username, setusername] = useState()

  useEffect(() => {
    const getusername = sessionStorage.getItem("username")
    console.log("getusername: " + getusername);
    if(getusername){
      setusername(getusername)
    }
  }
)

  return (
    <div>
      <Navbar />
      {!username ? <Enter /> : <Display />}
    </div>

  )
}
