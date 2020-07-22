import React, {useState} from 'react'
import Link from 'next/link'
//import takes from '/book.svg'
//import user from '/user.svg'
//import favorites from '/favorite.svg'
//import updates from '/notification.svg'
//import settings from '/settings.svg'
//import add from '/plus.svg'
//import Enter from './enter'
//import Newprojects from './newProject'
//import Display from './projectdisplay'


function Components(){

    const [currentPage, setcurrentPage] = useState("takes")

    function Navprop(props){

    function changePage(event){
        sessionStorage.setItem("page", event.target.title)
        setcurrentPage(event.target.title)
        console.log("name: " + event.target.title)
        var pageTest = sessionStorage.getItem("page")
        console.log("pageTest: " + pageTest)
    }

    function changePage1(event){
        sessionStorage.setItem("page", event.target.innerText)
        setcurrentPage(event.target.innerText)
        console.log("name: " + event.target.innerText)
        var pageTest = sessionStorage.getItem("page")
        console.log("pageTest: " + pageTest)
    }

    return(
        <div title={props.description} onClick={changePage}>
            <img style={{
                width: '48px', 
                height: '48px',
                marginRight: '20px',
                }} title={props.description} className="navpic" src={props.pic} />
            <div style={{
                display: 'inline-block',
                fontSize: "16px",
                position: 'relative',
                bottom: '15px',
                backgroundColor: "#2f3e46",
                borderRadius: "6px",
                color: "white"
                }} onClick={changePage1} title={props.description}><strong title={props.description}>{props.description}</strong></div>
        </div>
    )
    }


        function Navbar(){
            var NavbarStyle = {
        backgroundColor: "#cad2c5",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "2",
        display: "inline-block",
            }

            var prevScrollPos = window.pageYOffset;
            const [currentScrollPos, setCurrentScrollPos] = useState("")
            const [hasMoved, setHasMoved] = useState(true)
            window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setHasMoved(current => false);
      } else {
        setHasMoved(true)
      }
      prevScrollPos = currentScrollPos;
            } 

            hasMoved && (NavbarStyle.display = "none")
            !hasMoved && (NavbarStyle.display = "inline-block")



            const page = sessionStorage.getItem("page")

            return(
                <div className="navbar" style={NavbarStyle}>
                    <Link href="/projectdisplay"><Navprop pic="/book.svg" description="takes" /></Link>
                    <Link href="/newProject"><Navprop pic='/plus.svg' description="add" /></Link>
                    <Navprop pic='/user.svg' description="my account" />
                    <Navprop pic='/favorite.svg' description="favorites" />
                    <Navprop pic='/notification.svg' description="updates" />
                    <Navprop pic='/settings.svg' description="settings" />
                </div>


            )
        }
    return(
        <div>
            <Navbar />        </div>
    )
}

export default Components