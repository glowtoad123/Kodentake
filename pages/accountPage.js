import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'
import crypto from 'crypto'
import { getURL } from 'next/dist/next-server/lib/utils'


function Accountinfo(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [projectsArray, setprojectsArray] = useState([])
    const [worksIdArray, setworksIdArray] = useState([])
    const [chosenOne, setChosenOne] = useState("nothing")
    const [chosenId, setchosenId] = useState("")
    const [refid, setrefid] = useState("")
    const [userName, setuserName] = useState("")
    const [urlName, seturlName] = useState("")
    const [yourWorks, setyourWorks] = useState("")
    const [receivedKey, setreceivedKey] = useState("")
    const [altId, setaltId] = useState("")
    const [spaceCheck, setspaceCheck] = useState(true)


    useEffect(() => {
        //setuserName(sessionStorage.getItem("username"));
        sessionStorage.setItem("dataCondition", false)
        console.log(getURL())
        seturlName(getURL())
        setyourWorks(sessionStorage.getItem("yourWorks"))
    })

    const userId = urlName.slice(19, urlName.length)
    userId.includes("%20") && spaceCheck ? (setspaceCheck(false), setaltId(userId.replace("%20", " "))) : console.log("all good")
    console.log(altId)

    userName.length === 0 && serverClient.query(
        q.Get(q.Ref(q.Collection("Accounts"), userId))
    ).then(ret => {setuserName(ret.data.username); setreceivedKey(ret.data.password)}, (err) => {
        serverClient.query(
            q.Get(q.Match(q.Index("dublicateUsername"), userId))
        ).then((ret, Index) => {setuserName(ret.data.username); setreceivedKey(ret.data.password)}, (err) => {
            serverClient.query(
                q.Get(q.Match(q.Index("dublicateUsername"), altId))
            ).then((ret, Index) => {setuserName(ret.data.username); setreceivedKey(ret.data.password)})
        })
    })

    worksIdArray.length === 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data))})

    /*refid.length === 0 && serverClient.query(
        q.Get(q.Match(q.Index("dublicateUsername"), userName))
    ).then((ret, Index) => {setrefid(ret.ref.id)})*/

    const taggies = projectsArray.map(current => current.Categories)


    function updateName(event){

        var changeuserName = prompt("please update your username")

        if (changeuserName !== "" && changeuserName !== null) {
            var updatePassword = prompt("please enter your old password or change your password to continue")
            if(updatePassword !== "" && updatePassword !== null) {
                const hashedPassword = updatePassword + changeuserName
                const hash = crypto.createHash('sha256')
                hash.update(hashedPassword)
                const alphaPassword = hash.digest("hex")
                console.log("alphaPassword: " + alphaPassword)
                crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
                    if (err) throw err;
                    serverClient.query(
                        q.Get(
                          q.Match(q.Index('dublicateUsername'), changeuserName)
                        )
                      )
                      .then((ret) => {console.log(ret.data.username); alert("Sorry, but this username has alread been taken")}, (err) => {
                        serverClient.query(
                            q.Update(
                              q.Ref(q.Collection("Accounts"), userId),
                              { data: {
                                  username: changeuserName,
                                  password: derivedKey.toString('hex')
                                }},
                            )
                          )
                          .then((ret) => {console.log(ret); sessionStorage.setItem("username", changeuserName)});
                    
                        worksIdArray.map(id => {serverClient.query(
                          q.Update(
                            q.Ref(q.Collection('Projects'), id),
                            { data: {Creator: changeuserName}},
                          )
                        )
                        .then((ret) => console.log(ret))})
                      })

                })
            } else {
                alert("username not changed")
            }
        } else {
            alert("username not changed")
        }
             






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

        const changeLog = chosenOne.Update.map(project => project.Changes)

        return(
            <div className={styles.userDisplay}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                {yourWorks === receivedKey && <div><Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} title={props.description} name={props.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                <img name={props.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/></div>}
                <a className={styles.respository} href={props.Repository}>{props.Repository}</a>
                <br />
                {props.Links.map(each => <a className={styles.respository} href={each}>{each}</a>)}
                <p className={styles.description}><strong>{props.Description}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Roadmap</strong></h1>
                <br />
                {props.Roadmap.map(each => <Tag tag={each}/>)}
                <br />
                <h1 className={styles.textHead}><strong>Changes</strong></h1>
                <br />
                <p className={styles.text}><strong>{props.Changes}</strong></p>
                <br />
                
                <p className={styles.creatorName}><strong>{props.Creator}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Categories</strong></h1>
                <br />
                {props.Categories.map(each => <Tag tag={each}/>)}
                <br />
                <div className={styles.updateList}>{props.Update.length > 0 && props.Update.map((current, index) => {return (<div className={styles.update} /*onClick={() => removeUpdate(index)}*/><h2 className={styles.textHead}>Version {current.Version}</h2><br /><h3 className={styles.changelogLabel}>Changelog</h3><br /><div className={styles.changeDiv}>{changeLog[index].map(one => <p className={styles.tags}><strong>{one}</strong></p>)}</div></div>)})}</div>
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
            <h1 className={styles.displaytitle}><strong>{userName}</strong></h1>
                {yourWorks === receivedKey && <Link  className={styles.save}
                 href={`/accountPage?title=${userId}`}><a href="/accountPage"><img src="/edit.svg" className={styles.save} onClick={updateName}/></a></Link>}
                
            </div>
            <div>
                {chosenOne === "nothing" ? projectsArray.map((Current, index) => {const Categories = Current.Categories; return (<div className={styles.display}>
                    <h1 onClick={choseOne} className={styles.displaytitle}><strong>{Current.Project_Title}</strong></h1>
                    <div className={styles.descriptionDiv}><strong >{Current.Description}</strong></div>
                    <br />
                    <br />
                    
                    <p className={styles.creatorName}><strong>{Current.Creator}</strong></p>
                    <br />
                    <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
                    {yourWorks === receivedKey && (<div className={styles.projectFooter}>
                        <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                        <Link href="/updateProject"><a href="/updateProject" className={styles.edit}><img id={Current.Id} onClick={setRef} title={Current.description} name={Current.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                    </div>)}
            </div>)}) : 
            <Userdisplay 
                Project_Title= {chosenOne.Project_Title}
                Description= {chosenOne.Description}
                Roadmap={chosenOne.Roadmap}
                Changes={chosenOne.Changes}
                Creator={chosenOne.Creator}
                Categories={chosenOne.Categories}
                Repository={chosenOne.Repository}
                Id={chosenOne.Id}
                Links={chosenOne.Links}
                Update={chosenOne.Update}
            />}
            </div>
        </div>
    )
}

export default Accountinfo