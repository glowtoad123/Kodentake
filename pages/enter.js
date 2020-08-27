import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import crypto from 'crypto'
import styles from './components/Enter.module.css'
import Link from 'next/link'
import * as localForage from "localforage"

const hash = crypto.createHash('sha256')

function Enter(props){

  const [hasLoggedIn, setHasLoggedIn] = useState(true)
  const [dataCondition, setdataCondition] = useState(false)

  

  function Login(){

    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });

      const [account, setAccount] = useState({
          password: "",
          username: ""
      })

      useEffect(() => {
        {sessionStorage.getItem("dataCondition") && (
        sessionStorage.removeItem("dataCondition"),
        location.reload(),
        setAccount({
          password: "",
          username: ""
        })
      )}
  }, [])

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
      
      crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          setEnhancedPassword(derivedKey.toString('hex'))

          console.log("username: " + username)
          console.log("password: " + password)
          console.log("enhancedPassword: " + derivedKey.toString('hex'))
        
        serverClient.query(
          q.Get(
            q.Match(q.Index('account'), derivedKey.toString('hex'), username)
          )
        )
        .then((ret) => (
                        console.log(ret.data.username),
                        setInfo(ret.data.username),
                        sessionStorage.setItem("yourWorks", ret.data.password),
                        sessionStorage.setItem("userId", ret.ref.id),
                        sessionStorage.setItem("username", ret.data.username),
                        setHasLoggedIn((current) => {return !current}),
                        localForage.setItem("userId", ret.ref.id)
                      ), 
              (err) => {
                alert("sorry, but you've either entered the wrong password or the wrong username... but we'll let you in without your account anyways so that you can see some projects");
                sessionStorage.removeItem("username")
              }
            )
    
      })
    }

    console.log("enhancedPassword: " + enhancedPassword);
    console.log(info)
    console.log(hasLoggedIn)

    return(
            <div name={hasLoggedIn} className={styles.signbox}>
              <input onChange={readingProgress} className={styles.signfield} value={username} type="text"    name="username" id={username}  placeholder="username" />
              <input onChange={readingProgress} className={styles.signfield} value={password}    type="password" name="password"    id={password} placeholder="password" />
              <Link href="/projectdisplay"><a href="/projectdisplay"><button className={styles.submit} onClick={readAccount}>Login</button></a></Link>
            </div>
    )
  }




  function Or(){
    return(
      <div className={styles.or}>OR</div>
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
          console.log("username: " + username)
          console.log("password: " + password)
          console.log("enhancedPassword: " + derivedKey.toString('hex'))
        
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
            .then((ret) => (console.log(ret), setInfo(ret), sessionStorage.setItem("yourWorks", ret.data.password), sessionStorage.setItem("userId", ret.ref.id), sessionStorage.setItem("username", ret.data.username), setHasLoggedIn((current) => {return !current})))
          })
        })
      })
    }

      console.log(account.password)
      console.log(info)

      return (
              <div className={styles.signbox}>
                  <input onChange={readingProgress} className={styles.signfield} value={email} type="email"   name="email" id={styles.email}   placeholder="email" />
                  <input onChange={readingProgress} className={styles.signfield} value={password}    type="password" name="password"    id={styles.password} placeholder="password" />
                  <input onChange={readingProgress} className={styles.signfield} value={username} type="text"    name="username" id={styles.username}  placeholder="username" />
                  <Link href="/projectdisplay"><a><button className={styles.submit} onClick={addAccount}>Register</button></a></Link>
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