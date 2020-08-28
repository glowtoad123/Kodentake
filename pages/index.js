import Head from 'next/head'
import Navbar from './navbar'
import Enter from './enter'
import React, {useState, useEffect} from 'react'
import Display from './projectdisplay'


export default function Home() {

  const [username, setusername] = useState(false)

  useEffect(() => {
    const getusername = sessionStorage.getItem("username")
    if(getusername){
      setusername(true)
    }
  }
)

  return (
    <div>
      {username ? <Enter /> : <Display />}
    </div>

  )
}
