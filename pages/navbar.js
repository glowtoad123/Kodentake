import React, {useState, useEffect} from 'react'
import Link from 'next/link'


function Navbar(){
    function Navprop(props){
        return(
            <div title={props.description} >
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
      top: "0",
      zIndex: "2",
      display: "inline-block",
    }

    const [currentScrollPos, setCurrentScrollPos] = useState("")
    const [hasMoved, setHasMoved] = useState(true)
  
    useEffect(() => {var prevScrollPos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
          setHasMoved(current => false);
        } else {
          setHasMoved(true)
        }
        prevScrollPos = currentScrollPos;
    } 
})
    hasMoved && (NavbarStyle.display = "none")
    !hasMoved && (NavbarStyle.display = "inline-block")

    return(
        <div className="styles.navbar" style={NavbarStyle}>
            <Link href="/projectdisplay"><a href="/projectdisplay"><Navprop pic="/book.svg" description="takes" /></a></Link>
            <Link href="/newProject"><a href="/newProject"><Navprop pic='/plus.svg' description="add" /></a></Link>
            <Link href="/accountPage"><a href="/accountPage"><Navprop pic='/user.svg' description="my account" /></a></Link>
            <Navprop pic='/favorite.svg' description="favorites" />
            <Navprop pic='/notification.svg' description="updates" />
            <Navprop pic='/settings.svg' description="settings" />
        </div>
    )
}

        

export default Navbar