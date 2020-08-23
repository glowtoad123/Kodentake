import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'
import crypto from 'crypto'
import { getURL } from 'next/dist/next-server/lib/utils'
import * as localForage from "localforage"


function Accountinfo(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [projectsArray, setprojectsArray] = useState([])
    const [indexedArray, setindexedArray] = useState([])
    const [worksIdArray, setworksIdArray] = useState([])
    const [chosenOne, setChosenOne] = useState("nothing")
    const [chosenId, setchosenId] = useState("")
    const [refid, setrefid] = useState("")
    const [userName, setuserName] = useState("")
    const [offlineuserName, setofflineuserName] = useState("")
    const [urlName, seturlName] = useState("")
    const [yourWorks, setyourWorks] = useState("")
    const [receivedKey, setreceivedKey] = useState("")
    const [offlinereceivedKey, setofflinereceivedKey] = useState("")
    const [altId, setaltId] = useState("")
    const [spaceCheck, setspaceCheck] = useState(true)
    const [networkStatus, setnetworkStatus] = useState(false)
    const [foragedData, setforagedData] = useState(false)


    useEffect(() => {
        //setuserName(sessionStorage.getItem("username"));
        sessionStorage.setItem("dataCondition", false)
        console.log(getURL())
        seturlName(getURL())
        setyourWorks(sessionStorage.getItem("yourWorks"))
    })

    const userId = urlName.slice(19, urlName.length)
    //userId.includes("%20") && spaceCheck ? (setspaceCheck(false), setaltId(userId.replace("%20", " "))) : console.log("all good")
    userId.includes("%20") && spaceCheck ? (setspaceCheck(false), setaltId(userId.split("%20").join(" "))) : console.log("all good")
    console.log(altId)

    userName.length === 0 && serverClient.query(
        q.Get(q.Ref(q.Collection("Accounts"), userId))
    ).then(ret => {setuserName(ret.data.username); localForage.setItem("offlineuserName", ret.data.username); localForage.setItem("offlinereceivedKey", ret.data.password); setreceivedKey(ret.data.password); setnetworkStatus(true)}, (err) => {
        serverClient.query(
            q.Get(q.Match(q.Index("dublicateUsername"), userId))
        ).then((ret, Index) => {setuserName(ret.data.username); localForage.setItem("offlineuserName", ret.data.username); localForage.setItem("offlinereceivedKey", ret.data.password); setreceivedKey(ret.data.password); setnetworkStatus(true)}, (err) => {
            serverClient.query(
                q.Get(q.Match(q.Index("dublicateUsername"), altId))
            ).then((ret, Index) => {setuserName(ret.data.username); localForage.setItem("offlineuserName", ret.data.username); localForage.setItem("offlinereceivedKey", ret.data.password); setreceivedKey(ret.data.password); setnetworkStatus(true)})
        })
    })

    worksIdArray.length === 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("creatorsworks"), userName)),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {console.log(ret); setworksIdArray(ret.data.map(work => work.ref.id)); setprojectsArray(ret.data.map(project => project.data)); localForage.setItem("accountProjects", ret.data.map(project => project.data))})

    /*refid.length === 0 && serverClient.query(
        q.Get(q.Match(q.Index("dublicateUsername"), userName))
    ).then((ret, Index) => {setrefid(ret.ref.id)})*/

    if (!foragedData && yourWorks !== offlinereceivedKey) {
        localForage.getItem("accountProjects").then(project => {setindexedArray(project); setforagedData(true)}).then(
            ret => console.log("got data")
        ).catch(err => console.log(err))
        
        localForage.getItem("offlineuserName").then(user => setofflineuserName(user))

        localForage.getItem("offlinereceivedKey").then(thekey => setreceivedKey(thekey))
    }
    const taggies = projectsArray.map(current => current.Categories)

    var tagArray = []

    if (foragedData && indexedArray !== null){
        tagArray = indexedArray.map(project => project.Categories)
    }

    console.log(worksIdArray)
    console.log(taggies)


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
            {!networkStatus && offlineuserName !== null &&  <div className={styles.head}>
                                                                <h1 className={styles.displaytitle}><strong>{offlineuserName}</strong></h1>                
                                                            </div>
            }
            <div>
                {networkStatus && projectsArray.map((Current, index) => {const Categories = Current.Categories; return (<div className={styles.display}>
                    <Link href={`/project?title=${Current.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{Current.Project_Title}</strong></h1></a></Link>
                    <div className={styles.descriptionDiv}><strong >{Current.Description}</strong></div>
                    <br />
                    <br />
                    
                    <p className={styles.creatorName}><strong>{Current.Creator}</strong></p>
                    <br />
                    <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
                    {yourWorks === receivedKey && (<div className={styles.projectFooter}>
                        <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                        <Link href={`/updateProject?title=${worksIdArray[index]}`}><a href="/updateProject" className={styles.edit}><img id={Current.Id} onClick={setRef} title={Current.description} name={Current.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                    </div>)}
                </div>)})}

                {!networkStatus && foragedData && indexedArray !== null && indexedArray.map((Current, index) => {const Categories = Current.Categories; return (<div className={styles.display}>
                    <Link href={`/project?title=${Current.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{Current.Project_Title}</strong></h1></a></Link>
                    <div className={styles.descriptionDiv}><strong >{Current.Description}</strong></div>
                    <br />
                    <br />
                    
                    <p className={styles.creatorName}><strong>{Current.Creator}</strong></p>
                    <br />
                    <div className={styles.tagDiv}>{tagArray[index].map(each => <Tag tag={each}/>)}</div>
                    {yourWorks === offlinereceivedKey && (<div className={styles.projectFooter}>
                        <img src="/offline.svg" className={styles.delete} />
                        <img name={Current.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/>
                        <Link href="/updateProject"><a href="/updateProject" className={styles.edit}><img id={Current.Id} onClick={setRef} title={Current.description} name={Current.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                    </div>)}
                </div>)})}
            </div>
        </div>
    )
}

export default Accountinfo