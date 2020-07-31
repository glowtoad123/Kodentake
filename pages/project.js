import React, {useState, useEffect} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'
import url from 'url'
import { getURL } from 'next/dist/next-server/lib/utils'

export default (() => {
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [urlName, seturlName] = useState("")
    const [yourWorks, setyourWorks] = useState("")
    const [receivedKey, setreceivedKey] = useState("")
    const [projectInfo, setprojectInfo] = useState("")
    const [altId, setaltId] = useState("")
    const [spaceCheck, setspaceCheck] = useState(true)
    const [chosenId, setchosenId] = useState("")
    const [Links, setLinks] = useState([])
    const [Roadmap, setRoadmap] = useState([])
    const [Categories, setCategories] = useState([])
    const [Creator, setCreator] = useState("")
    const [Update, setUpdate] = useState([])

    useEffect(() => {
        //setuserName(sessionStorage.getItem("username"));
        sessionStorage.setItem("dataCondition", false)
        console.log(getURL())
        seturlName(getURL())
        setyourWorks(sessionStorage.getItem("yourWorks"))
    })

    const urlShort = urlName.slice(15, urlName.length)
    urlShort.includes("%20") && spaceCheck ? (setspaceCheck(false), setaltId(urlShort.replace("%20", " "))) : console.log("all good")
    console.log(urlShort)
    console.log(altId)

    projectInfo.length === 0 && serverClient.query(
        q.Get(
        q.Match(q.Index("Project_Title"), urlShort)
    )).then((ret, index) => {console.log(ret); setprojectInfo(ret.data); setCreator(ret.data.Creator); setLinks(ret.data.Links); setRoadmap(ret.data.Roadmap); setCategories(ret.data.Categories); setUpdate(ret.data.Update)}, (err) => {
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), altId)
        )).then((ret, index) => {console.log(ret); setprojectInfo(ret.data); setCreator(ret.data.Creator); setLinks(ret.data.Links); setRoadmap(ret.data.Roadmap); setCategories(ret.data.Categories); setUpdate(ret.data.Update)})
    })

    console.log(Creator)

    receivedKey.length === 0 && serverClient.query(
        q.Get(q.Match(q.Index("dublicateUsername"), projectInfo.Creator))
    ).then(ret => {setreceivedKey(ret.data.password)})

    console.log(receivedKey)

    function setRef(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {sessionStorage.setItem("ref", ret.ref.id); console.log("refid: " + ret.ref.id)})
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
                alert("item has been deleted")
            }

    }

    //const {Project_Title, Id, Repository, Links, Description, Roadmap, Creator, Categories, Update} = projectInfo

    /* const changeLog = Update.map(project => project.Changes) */

    /* const Categories = projectInfo.Categories
    const Links = projectInfo.Links
    const Roadmap = projectInfo.Roadmap
    const Update = projectInfo.Update */

    const changeLog = Update.map(one => one.Changes)

    console.log(Categories)

    Categories.map(each => console.log(each))



    function Tag(props){
        return(
            <p className={styles.tags}><strong>{props.tag}</strong></p>
        )
    }

    return (
        <div className={styles.userDisplay}>
            <Navbar />
            <h1 className="displaytitle"><strong>{projectInfo.Project_Title}</strong></h1>
            {yourWorks === receivedKey && <div><Link href="/updateProject"><a href="/updateProject"><img id={projectInfo.Id} onClick={setRef} title={projectInfo.description} name={projectInfo.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
            <img name={projectInfo.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/></div>}
            <br />
            <br />
            <Link href={`/accountPage?title=${projectInfo.Creator}`}><a className={styles.creatorName}><strong>{projectInfo.Creator}</strong></a></Link>
            <br />
            <a className={styles.respository} href={projectInfo.Repository}>{projectInfo.Repository}</a>
            <br />
            {Links.length > 0 && Links.map(each => <a className={styles.respository} href={each}>{each}</a>) }
            <p className={styles.description}><strong>{projectInfo.Description}</strong></p>
            <br />
            <h1 className={styles.textHead}><strong>Roadmap</strong></h1>
            <br />
            {Roadmap.length > 0 && Roadmap.map(each => <Tag tag={each}/>)}
            <br />
            <br />
            <br />
            <h1 className={styles.textHead}><strong>Categories</strong></h1>
            <br />
            {Categories.length > 0 && Categories.map(each => <Tag tag={each}/>)}
            <br />
            {<div className={styles.updateList}>{Update.length > 0 && Update.map((current, index) => {return (<div className={styles.update}><h2 className={styles.textHead}>Version {current.Version}</h2><br /><h3 className={styles.changelogLabel}>Changelog</h3><br /><div className={styles.changeDiv}>{changeLog[index].map(one => <p className={styles.tags}><strong>{one}</strong></p>)}</div></div>)})}</div>}
        </div>
    )
})