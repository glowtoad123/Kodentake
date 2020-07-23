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
    const [userName, setuserName] = useState("")
    const [creatorName, setcreatorName] = useState("")

    useEffect(() => {
        setuserName(sessionStorage.getItem("username"));
        setcreatorName(sessionStorage.getItem("username"))
    })

    

    worksIdArray.length === 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data))})
    

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
            sessionStorage.setItem("dataCondition", false)
          })

    }

    function choseOne(event){
        chosenOne === "nothing" && serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data);})
    }

    function setRef(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {alert("refid: " + ret.ref.id); sessionStorage.setItem("ref", ret.ref.id);})
    }

    function deleteProject(event){
        var confirmDeletion = confirm("Are you sure you want to delete that project?");
            if (confirmDeletion == true) {

                chosenId.length === 0 && serverClient.query(
                    q.Get(
                    q.Match(q.Index("Project_Title"), event.target.name)
                )).then((ret, index) => {console.log(ret); setchosenId(ret.ref.id); serverClient.query(
                    q.Delete(
                      q.Ref(q.Collection('Projects'), ret.ref.id)
                    )
                  )
                  .then((ret) => console.log(ret))
                })

                
                  serverClient.query(
                    q.Map(
                        q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
                        q.Lambda("X", q.Get(q.Var("X")))
                      )
                ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data))})
                alert("item has been deleted")
            }

    }



    function Userdisplay(props){
        return(
            <div className={styles.display}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                <Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} title={props.description} name={props.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                <img name={props.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                <p className={styles.description}><strong>{props.Description}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Roadmap</strong></h1>
                <p className={styles.text}><strong>{props.Roadmap}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Changes</strong></h1>
                <p className={styles.text}><strong>{props.Changes}</strong></p>
                <br />
                <br />
                
                <p className={styles.creatorName}><strong>{props.Creator}</strong></p>
                <br />
                {props.Categories.map(each => <Tag tag={each}/>)}
            </div>)
    }

    function Tag(props){
        return(
            <p className={styles.tags}><strong>{props.tag}</strong></p>
        )
    }

    return(
        <div>
            <Navbar />
            <div className={styles.head}>
                <input value={creatorName} onChange={editName} type="text" className={styles.changeName}></input>
                <Link  className={styles.save}
                 href="/"><a href="/"><img src="/save.svg" className={styles.save} onClick={updateName}/></a></Link>
                
            </div>
            <div>
                {chosenOne === "nothing" ? projectsArray.map((Current, index) => {const Categories = Current.Categories; return (<div className={styles.display}>
                    <h1 onClick={choseOne} className={styles.displaytitle}><strong>{Current.Project_Title}</strong></h1>
                    <div className={styles.descriptionDiv}><strong >{Current.Description}</strong></div>
                    <br />
                    <br />
                    
                    <p className={styles.creatorname}><strong>{Current.Creator}</strong></p>
                    <br />
                    <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
                    <div className={styles.projectFooter}>
                        <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                        <Link href="/updateProject"><a href="/updateProject" className={styles.edit}><img id={Current.Id} onClick={setRef} title={Current.description} name={Current.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                    </div>
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