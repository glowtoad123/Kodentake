import React, {useState, useEffect} from 'react'
import Link from 'next/link'


function Navbar(){
    function Navprop(props){
        return(
            <div style={{
                    display: 'block',
                    arrangeItems: "center",
                    justifyContent: "center",
                    margin: 'auto',
                    
                 }} title={props.description} >
                <img style={{
                        width: '48px', 
                        height: '48px',
                        marginRight: "10px",
                        horizontalAlign: "middle",
                    }} title={props.description} className="navpic" src={props.pic} />
                <div style={{
                        display: 'inline-block',
                        fontSize: "16px",
                        position: 'relative',
                        bottom: '15px',
                        backgroundColor: "#2f3e46",
                        borderRadius: "6px",
                        color: "white",
                        margin: "auto",
                        horizontalAlign: "middle",
                    }} title={props.description}><strong title={props.description}>{props.description}</strong></div>
            </div>
        )
    }

    //const window = new Window();

    var NavbarStyle = {
      backgroundColor: "#cad2c5",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      position: "fixed",
      right: "0",
      zIndex: "2",
      display: "block",
      margin: "auto"
    }

    
    const [username, setusername] = useState("")
    const [userId, setuserId] = useState("")
    const [navCheck, setNavCheck] = useState(false)
    useEffect(() => {
    sessionStorage.getItem("username") && setusername(sessionStorage.getItem("username"))
    sessionStorage.getItem("userId") && setuserId(sessionStorage.getItem("userId"))


})

    function toggleNav() {
        setNavCheck(current => !current)
    }

    return(
        <>
            {navCheck && <div onClick={toggleNav} className="styles.navbar" style={NavbarStyle}>
                <Link href="/projectdisplay"><a href="/projectdisplay"><Navprop pic="/book.svg" description="projects" /></a></Link>
                <Link href="/newProject"><a href="/newProject"><Navprop pic='/plus.svg' description="add" /></a></Link>
                {userId.length > 0 && <Link href={`/accountPage?title=${userId}`}><a href="/accountPage"><Navprop pic='/user.svg' description="my account" /></a></Link>}
                <Link href="/enter"><a href="/enter"><Navprop pic='/login.svg' description="login/switch account" /></a></Link>
                {/*<Link href="/accountPage"><a href="/accountPage"><Navprop pic='/user.svg' description="my account" /></a></Link>
                <Navprop pic='/favorite.svg' description="favorites" />
                <Navprop pic='/notification.svg' description="updates" />
                <Navprop pic='/settings.svg' description="settings" />*/}
            </div>}
            <img onClick={toggleNav} src="/navpreview.svg" style={{
                position: 'fixed',
                right: "0",
                bottom: "0"
            }}/>
        </>
    )
}

        

export default Navbar