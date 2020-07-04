import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'

function Accountinfo(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const userName = sessionStorage.getItem("username")
    const worksArray = []
    const worksIdArray = []
    const [creatorName, setcreatorName] = useState(userName)
    const [chosenOne, setChosenOne] = useState("nothing")
    //const [refid, setrefid] = useState("")
    const [userId, setuserId] = useState("")

    serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {ret.data.map(one => {console.log(one.data); worksIdArray.push(one.ref.id); worksArray.push(one.data); localStorage.setItem('yourProjects', JSON.stringify(worksArray));})})
    

    serverClient.query(
        q.Get(q.Match(q.Index("dublicateUsername"), userName))
    ).then((ret, Index) => {sessionStorage.setItem("ref", ret.ref.id)})

    const refid = sessionStorage.getItem("ref")


    console.log("chosenOne: " + chosenOne)

    const projectsArray = JSON.parse(localStorage.getItem("yourProjects"))
    console.log(projectsArray)

    const taggies = projectsArray.map(current => current.Categories)
    
    function editName(event){
        setcreatorName(event.target.value)
    }

    function updateName(event){

        serverClient.query(
            q.Update(
              q.Ref(q.Collection("Accounts"), refid),
              { data: {username: creatorName}},
            )
          )
          .then((ret) => console.log(ret))

          worksIdArray.map(id => {serverClient.query(
            q.Update(
              q.Ref(q.Collection('Projects'), id),
              { data: {Creator: creatorName}},
            )
          )
          .then((ret) => console.log(ret))})

          sessionStorage.setItem("username", creatorName)
    }

    function choseOne(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data); serverClient.query(
            q.Map(
                q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
                q.Lambda("X", q.Get(q.Var("X")))
              )
        ).then((ret, index) => {ret.data.map(one => {console.log(one.data); worksIdArray.push(one.ref.id); worksArray.push(one.data); localStorage.setItem('yourProjects', JSON.stringify(worksArray));})})})
    }

    function setRef(event){
        
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {setrefid(ret.ref); console.log("ref: " + ret.ref.id); sessionStorage.setItem("ref", ret.ref.id)})
    }

    function Userdisplay(props){
        return(
            <div className="display" style={{width: '300px',}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                {props.Creator === username && <Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} style={{
                width: '48px', 
                height: '48px',
                marginRight: '20px',
                position: 'relative',
                left: "10px",
                cursor: "pointer"
                }} title={props.description} name={props.Project_Title} className="navpic" src='/edit.svg' /></a></Link>}
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Description}</strong></p>
                <br />
                <h1 className="textHead"><strong>Roadmap</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Roadmap}</strong></p>
                <br />
                <h1 className="textHead"><strong>Changes</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Changes}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src='/me.jpg' />
                <p className="creatorname"><strong>{props.Creator}</strong></p>
                <br />
                {props.Categories.map(each => <Tag tag={each}/>)}
            </div>)
    }

    function Tag(props){
        return(
            <p style={{
                display: 'inline-block',
                backgroundColor: '#84a98c',
                color: "black",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                margin: '12px',
                border: 'none',
                borderRadius: '6px'}}><strong>{props.tag}</strong></p>
        )
    }

    console.log("chosenOne" + chosenOne)

    return(
        <div>
            <Navbar />
            <div className={styles.head}>
                <img src="/me.jpg" className={styles.creatorpic}/>
                <input value={creatorName} onChange={editName} type="text" className={styles.creatorName}></input>
                <Link  className={styles.save}
                 href="/"><a href="/"><img src="/save.svg" className={styles.save} onClick={updateName}/></a></Link>
            </div>
            <div>
            {chosenOne === "nothing" ? projectsArray.map((Current, index) => {const Categories = Current.Categories; return (<div className="display" style={{width: '300px'}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{Current.Project_Title}</strong></h1>
                <p><strong>{Current.Description.slice(0, 99) + "..."}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src='/me.jpg' />
                <p className="creatorname"><strong>{Current.Creator}</strong></p>
                <br />
                {taggies[index].map(each => <Tag tag={each}/>)}
            </div>)}) : chosenOne !== "nothing" && refid === "" ? <Userdisplay 
        Project_Title= {chosenOne.Project_Title}
        Description= {chosenOne.Description}
        Roadmap={chosenOne.Roadmap}
        Changes={chosenOne.Changes}
        Creator={chosenOne.Creator}
        Categories={chosenOne.Categories}
        Id={chosenOne.Id}
        /> : <Updateproject />}
            </div>
        </div>
    )
}

export default Accountinfo