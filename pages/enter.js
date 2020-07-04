import React, {useState} from 'react'
import faunadb, { query as q } from "faunadb"
import crypto from 'crypto'
import styles from './components/Enter.module.css'
import Link from 'next/link'

const hash = crypto.createHash('sha256')

function Enter(props){

  const [hasLoggedIn, setHasLoggedIn] = useState(true)

  const signfieldStyle = {
    border: 'none',
    borderRadius: "12px",
    boxShadow: "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    padding: "15px",
    display: "inline-block",
    margin: "40px",
    fontSize: "24px",
    color: "#2f3e46"
}

  const submitStyle = {
    boxShadow: "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)",
    border: "none",
    display: "block",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#2f3e46",
    color: "white",
    fontWeight: "bold",
    marginBottom: "20px",
  }

  const signboxStyle = {
    backgroundColor: "#cad2c5",
    border: "none",
    borderRadius: "12px",
    display: "block",
    width: "500px",
    position: "relative",
    left: "30%",
    margin: "10px",
    boxShadow: "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)",
    marginBottom: "50px",
  }

  const orstyle = {
    backgroundColor: "#354f52",
    border: "none",
    display: "block",
    width: "32px",
    position: "relative",
    left: "47.5%",
    margin: "10px",
    boxShadow: "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)",
  }


  function Login(){

    //var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    /*adminClient.query(
        q.CreateKey({
          database: q.Database('Codentake'),
          role: 'server',
        })
      )
      .then((ret) => console.log(ret))*/

      const [account, setAccount] = useState({
          password: "",
          username: ""
      })



    function readingProgress(event){
        var name = event.target.name
        var value = event.target.value
        setAccount(current => ({...current, [name]: value}))
    }  

    const {username, password} = account

    const [enhancedPassword, setEnhancedPassword] = useState("")

    const [info, setInfo] = useState("")

    function readAccount(event){  

      const hashedPassword = password + username

      hash.update(hashedPassword)
      const alphaPassword = hash.digest("hex")
      console.log("alphaPassword: " + alphaPassword)
    
    
      /*crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
      })*/
      
      crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
      
      serverClient.query(
        q.Get(
          q.Match(q.Index('account'), derivedKey.toString('hex'), username)
        )
      )
      .then((ret) => (console.log(ret.data.username), setInfo(ret.data.username), sessionStorage.setItem("yourWorks", ret.data.password), sessionStorage.setItem("username", ret.data.username), setHasLoggedIn((current) => {return !current})))
    
    })
    }

    console.log("enhancedPassword: " + enhancedPassword);
    console.log(info)
    console.log(hasLoggedIn)

    return(
      <div name={hasLoggedIn} style={signboxStyle} className="styles.signbox">
        <center>
            <div>
              <input onChange={readingProgress} style={signfieldStyle} className="styles.signfield" value={username} type="text"    name="username" id="styles.username"  placeholder="username" />
              <input onChange={readingProgress} style={signfieldStyle} className="styles.signfield" value={password}    type="password" name="password"    id="styles.password" placeholder="password" />
              <Link href="/projectdisplay"><a><button style={submitStyle} className="styles.submit" onClick={readAccount}>Login</button></a></Link>
            </div>
        </center>
      </div>
    )
  }




  function Or(){
    return(
      <div style={orstyle} className="styles.or"><center>OR</center></div>
    )
  }




  function Signup() {

      //var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
      var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
      /*adminClient.query(
          q.CreateKey({
            database: q.Database('Codentake'),
            role: 'server',
          })
        )
        .then((ret) => console.log(ret))*/

        const [account, setAccount] = useState({
            email: "",
            password: "",
            username: ""
        })

      function readingProgress(event){
          var name = event.target.name
          var value = event.target.value
          setAccount(current => ({...current, [name]: value}))
      }  

      const {email, password, username} = account

      const [enteredEmail, setenteredEmail] = useState("")

      const [enhancedPassword, setEnhancedPassword] = useState("")

      const theenteredEmail = enteredEmail

      const [info, setInfo] = useState("")



      /*crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
        console.log(enhancedPassword);
      })*/





      

      function addAccount(event){

        const hashedPassword = password + username

        hash.update(hashedPassword)
        const alphaPassword = hash.digest("hex")
        console.log("alphaPassword: " + alphaPassword)


        console.log(account)

        /*crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          setEnhancedPassword(derivedKey.toString('hex'))
          console.log(enhancedPassword);
        })*/

        //account.password = alphaPassword

        
      crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          account.password = derivedKey.toString('hex')
          console.log(enhancedPassword);
        
        serverClient.query(
          q.Get(
            q.Match(q.Index('dublicateEmail'), email)
          )
        )
        .then((ret) => {console.log(ret.data.email); alert("sorry, but this email has already been taken")}, (err) => {
          serverClient.query(
            q.Get(
              q.Match(q.Index('dublicateUsername'), username)
            )
          )
          .then((ret) => {console.log(ret.data.username); alert("Sorry, but this username has alread been taken")}, (err) => {
            serverClient.query(
              q.Create(
                q.Collection('Accounts'),
                { data: account },
              )
            )
            .then((ret) => (console.log(ret), setInfo(ret), sessionStorage.setItem("yourWorks", ret.data.password), sessionStorage.setItem("username", ret.data.username), setHasLoggedIn((current) => {return !current})))
          })
        })
      })
    }

      console.log(account.password)
      console.log(info)

      return (
          <div>
              <center style={signboxStyle} className="styles.signbox">
                
                <div>
                    <input onChange={readingProgress} style={signfieldStyle} className="styles.signfield" value={email} type="email"   name="email" id="styles.email"   placeholder="email" />
                    <input onChange={readingProgress} style={signfieldStyle} className="styles.signfield" value={password}    type="password" name="password"    id="styles.password" placeholder="password" />
                    <input onChange={readingProgress} style={signfieldStyle} className="styles.signfield" value={username} type="text"    name="username" id="styles.username"  placeholder="username" />
                    <Link href="/projectdisplay"><a><button style={submitStyle} className="styles.submit" onClick={addAccount}>Register</button></a></Link>
                </div>

              </center>

          </div>
      )
  }

  function Getin(){
    return (
      <div>
        <Login />
        <Or />
        <Signup />
      </div>
    )
  }

  return(
    <div>
    {hasLoggedIn && <Getin />}
    </div>
  )

}




export default Enter
/*export default Signup
export {Or, Login}*/