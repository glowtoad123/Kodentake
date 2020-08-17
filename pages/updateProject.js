import React, {useState, useEffect} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
import styles from "./components/NewProject.module.css"
import Link from 'next/link'
import Navbar from './navbar'

function Updateproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [refid, setrefid] = useState("")
    const [username, setusername] = useState("")
    const [dataCondition, setdataCondition] = useState("false")
    useEffect(() => {
        setrefid(sessionStorage.getItem("ref"));
        setusername(sessionStorage.getItem("username"));
        //setdataCondition(sessionStorage.getItem("dataCondition"))
    })
    console.log("refid: " + refid)
    console.log(username)
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Description: "",
        Categories: [],
        Roadmap: [],
        Repository: "",
        Creator: "",
        Links: [],
        Update: [{
            Version: "",
            Changes: []
        }],
    })
    const [tagList, settagList] = useState([])
    const [linklist, setlinkList] = useState([])
    console.log(projectData)
    dataCondition === "false" && serverClient.query(
            q.Get(q.Ref(q.Collection('Projects'), refid))
        )
        .then((ret) => {setProjectData(ret.data); setdataCondition("true"); setlinkList(ret.data.Links); settagList(ret.data.Categories); console.log(ret.data)})
    
    console.log(dataCondition)
    console.log(projectData.Categories)

    const {Project_Title, Update, Version_num, Description, Categories, Creator, Changes, Roadmap, Repository} = projectData    
    const [buttonCheck, setbuttonCheck] = useState(false)
    const [tagName, settagName] = useState("")
    const [link, setlink] = useState("")
    const [goal, setgoal] = useState("")
    const [roadmap, setroadmap] = useState([])
    const [change, setchange] = useState("")
    const [changes, setchanges] = useState([])
    const [version, setversion] = useState("")
    //const [tagList, settagList] = useState(projectData.Categories)
    //const tagList = projectData.Categories
        console.log(tagList)
    function settingData(event){
        const name = event.target.name
        console.log(event.target.name)
        const value = event.target.value
        setProjectData((current) => ({...current, [name]: value}))
        
    }

    function settingtagName(event){
        settagName(event.target.value)

    }

    function settingtagList(event){
        settagList(current => {return [...current, tagName]})
        //tagList.push(tagName)
        settagName("")
        event.preventDefault()
    }

    function settingGoal(event){
        setgoal(event.target.value)
    }

    function settingroadmap(event){
        setroadmap(current => {return [...current, goal]})
        setgoal("")
        event.preventDefault()
    }

    function settingLink(event){
        setlink(event.target.value)
    }

    function settingLinkList(event){
        setlinkList(current => {return [...current, link]})
        setlink("")
        event.preventDefault()
    }

    function settingChange(event){
        setchange(event.target.value)
    }

    function settingChanges(event){
        setchanges(current => {return [...current, change]})
        setchange("")
        event.preventDefault()
    }

    function saveData(event){
        projectData.Categories = tagList
        projectData.Roadmap = roadmap
        projectData.Links = linklist
        Update.push({
            Version: version,
            Changes: changes
        })
        console.log(Categories)
        serverClient.query(
            q.Update(
              q.Ref(q.Collection('Projects'), refid),
              { data: projectData },
            )
          )
          .then((ret) => console.log(ret))
          setdataCondition(false)
        //event.preventDefault()
    }

    function removeTag(id){

        settagList((current) => {
            return current.filter((tagList, index) => {return index !== id})
        })

    }

    console.log(tagList)

    function removeGoal(id){

        setroadmap((current) => {
            return current.filter((roadmap, index) => {return index !== id})
        })

    }

    function removeLink(id){

        setlinkList((current) => {
            return current.filter((linklist, index) => {return index !== id})
        })

    }

    function removeChange(id){

        setchanges((current) => {
            return current.filter((changes, index) => {return index !== id})
        })

    }

    function removeUpdate(id){
        Update.forEach(function(current){
            return current.filter((Update, index) => {return index !== id})
        })
    }
    const changeLog = Update.map(project => project.Changes)
    console.log(Update)

    function setVersion(event){
        setbuttonCheck(current => !current)
        event.preventDefault()
    }

    function settingVer(event){
        setversion(event.target.value)
    }

    return(
        <div><Navbar /><form id={styles.npform} >
            <input type="text" className={styles.newProjectItem} onChange={settingData} name="Project_Title"     value={Project_Title}   placeholder=" Project Title"   id={styles.Project_Title}    ></input>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id={styles.Description}      ></textarea>
            <input className={styles.newProjectItem} onChange={settingData} name="Repository"       value={Repository}     placeholder=" Repository"     id={styles.Repository}      ></input>
            <div>   
                <input type="text" className={styles.newProjectItem} onChange={settingtagName} name="Categories"        value={tagName}      placeholder=" Categories"      id={styles.Categories}       ></input>
                <button onClick={settingtagList} id={styles.addCategory} type="submit">Add Category</button>
                <div className={styles.tagsDiv}>{tagList.map((current, index) => <p id={index} onClick={() => removeTag(index)} className={styles.tags} ><strong>{current}</strong></p> )}</div>
            </div>
            <br />
            <div>
                <input type="text" className={styles.newProjectItem} onChange={settingLink} name="Link"        value={link}      placeholder="Link"      id={styles.Repository}       ></input>
                <button onClick={settingLinkList} id={styles.addCategory} type="submit">Add Link</button>
                <div className={styles.tagsDiv}>{linklist.map((current, index) => <p onClick={() => removeLink(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
            </div>
            <div>   
                <input type="text" className={styles.newProjectItem} onChange={settingGoal} name="Roadmap"           value={goal}         placeholder="Roadmap"         id={styles.Categories}          ></input>
                <button onClick={settingroadmap} id={styles.addCategory} type="submit">Add Goal</button>
                <div className={styles.tagsDiv}>{roadmap.map((current, index) => <p onClick={() => removeGoal(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
            </div>
            <br />
            <center><button onClick={setVersion} id={styles.addUpdate} type="submit">Add Version</button></center>
            {buttonCheck === true && (
                    <div className={styles.versionDiv} name={Update} Value={Update}>
                        <input className={styles.newProjectItem} onChange={settingVer} name="Version"       value={version}     placeholder=" Version #"     id={styles.Version_num}      ></input>
                        <textarea className={styles.newProjectItem} onChange={settingChange} name="Changes"           value={change}         placeholder=" Changes"         id={styles.Changes}          ></textarea>
                        <button onClick={settingChanges} id={styles.addCategory} type="submit">Add Change</button>
                        <div className={styles.tagsDiv}>{changes.map((current, index) => <p onClick={() => removeChange(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
                    </div>
                )}
            <div className={styles.updateList}>{Update.length > 0 && Update.map((current, index) => {return (<div className={styles.update} /*onClick={() => removeUpdate(index)}*/><h2>Version {current.Version}</h2><h3 className={styles.changelogLabel}>Changelog</h3><br />{changeLog[index].map(one => <p className={styles.tags}><strong>{one}</strong></p>)}</div>)})}</div>
            <Link href="/projectdisplay"><a href="/projectdisplay"><button id={styles.submit} onClick={saveData} type="submit">Save</button></a></Link>
        </form></div>
    )
}

export default Updateproject