import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'

function Accountinfo(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [projectsArray, setprojectsArray] = useState([])
    const [worksIdArray, setworksIdArray] = useState([])
    const [chosenOne, setChosenOne] = useState("nothing")
    const [chosenId, setchosenId] = useState("")
    const [refid, setrefid] = useState("")
    const userName = sessionStorage.getItem("username");
    const [creatorName, setcreatorName] = useState(userName)
    

    worksIdArray.length === 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data))})
    
    console.log("projectsArray: " + projectsArray)

    refid.length === 0 && serverClient.query(
        q.Get(q.Match(q.Index("dublicateUsername"), userName))
    ).then((ret, Index) => {setrefid(ret.ref.id)})

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

          useEffect(() => {
            sessionStorage.setItem("username", creatorName)
          })

    }

    function choseOne(event){
        chosenOne === "nothing" && serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data); setchosenId(ret.ref.id)})
    }

    function setRef(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {alert("refid: " + ret.ref.id); sessionStorage.setItem("ref", ret.ref.id);})
    }

    function deleteProject(event){

        var confirmDeletion = confirm("Press a button!");
            if (confirmDeletion == true) {
                chosenId.length === 0 && serverClient.query(
                    q.Get(
                    q.Match(q.Index("Project_Title"), event.target.name)
                )).then((ret, index) => {console.log(ret); setchosenId(ret.ref.id)})

                serverClient.query(
                    q.Delete(
                      q.Ref(q.Collection('Projects'), chosenId)
                    )
                  )
                  .then((ret) => console.log(ret))
                
                  serverClient.query(
                    q.Map(
                        q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
                        q.Lambda("X", q.Get(q.Var("X")))
                      )
                ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data))})
                alert("press the delete button again to delete project. (due to some unknown bug the project wont delete the first time. After that, refresh the page and the project should be gone")
            }

    }

    useEffect(() => {
        sessionStorage.setItem("dataCondition", false)
    })

    function Userdisplay(props){
        return(
            <div className="display" style={{width: '300px',}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                <Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} style={{
                width: '48px', 
                height: '48px',
                marginRight: '20px',
                position: 'relative',
                left: "10px",
                cursor: "pointer"
                }} title={props.description} name={props.Project_Title} className="navpic" src='/edit.svg' /></a></Link>
                <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
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

    return(
        <div>
            <Navbar />
            <div className={styles.head}>
                <input value={creatorName} onChange={editName} type="text" className={styles.creatorName}></input>
                <Link  className={styles.save}
                 href="/"><a href="/"><img src="/save.svg" className={styles.save} onClick={updateName}/></a></Link>
                
            </div>
            <div>
                {chosenOne === "nothing" ? projectsArray.map((Current, index) => {const Categories = Current.Categories; return (<div className="display" style={{width: '300px'}}>
                    <h1 onClick={choseOne} className="displaytitle"><strong>{Current.Project_Title}</strong></h1>
                    <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                    <p><strong>{Current.Description.slice(0, 99) + "..."}</strong></p>
                    <br />
                    <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                    <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                    <br />
                    
                    <p className="creatorname"><strong>{Current.Creator}</strong></p>
                    <br />
                    {taggies[index].map(each => <Tag tag={each}/>)
                }
            </div>)}) : 
            <Userdisplay 
                Project_Title= {chosenOne.Project_Title}
                Description= {chosenOne.Description}
                Roadmap={chosenOne.Roadmap}
                Changes={chosenOne.Changes}
                Creator={chosenOne.Creator}
                Categories={chosenOne.Categories}
                Id={chosenOne.Id}
            />}
            </div>
        </div>
    )
}

export default Accountinfo