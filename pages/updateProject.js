import React, {useState} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
import styles from "./components/NewProject.module.css"
import Link from 'next/link'
import Navbar from './navbar'

function Updateproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    
    const refid = sessionStorage.getItem("ref")
    console.log("refid: " + refid)
    const username = sessionStorage.getItem("username")
    console.log(username)
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Version_num: "",
        Description: "",
        Categories: [],
        Changes: "",
        Roadmap: "",
        Creator: "",
    })
    const [tagList, settagList] = useState([])
    console.log(projectData)
    const [dataCondition, setdataCondition] = useState(sessionStorage.getItem("dataCondition"))
    dataCondition !== "true" && serverClient.query(
            q.Get(q.Ref(q.Collection('Projects'), refid))
        )
        .then((ret) => {setProjectData(ret.data); setdataCondition("true"); settagList(ret.data.Categories); console.log(ret.data)})
    
    console.log(dataCondition)
    console.log(projectData.Categories)

    const {Project_Title, Version_num, Description, Categories, Changes, Roadmap} = projectData
    const [tagName, settagName] = useState("")
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

    function saveData(event){
        projectData.Categories = tagList
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

    return(
        <div><Navbar /><form id={styles.npform} >
            <input type="text" className={styles.newProjectItem} onChange={settingData} name="Project_Title"     value={Project_Title}   placeholder=" Project Title"   id={styles.Project_Title}    ></input>
            <input className={styles.newProjectItem} onChange={settingData} name="Version_num"       value={Version_num}     placeholder=" Version_num"     id={styles.Version_num}      ></input>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id={styles.Description}      ></textarea>
            <input type="text" className={styles.newProjectItem} onChange={settingtagName} name="Categories"        value={tagName}      placeholder=" Categories"      id={styles.Categories}       ></input>
                <button onClick={settingtagList} id={styles.addCategory} type="submit">Add Category</button>
                <div>{tagList.map((current, index) => <p id={index} onClick={() => removeTag(index)} className={styles.tags} ><strong>{current}</strong></p> )}</div>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Changes"           value={Changes}         placeholder=" Changes"         id={styles.Changes}          ></textarea>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Roadmap"           value={Roadmap}         placeholder=" Roadmap"         id={styles.Roadmap}          ></textarea>
            <Link href="/projectdisplay"><a href="/projectdisplay"><button id={styles.submit} onClick={saveData} type="submit">Save</button></a></Link>
        </form></div>
    )
}

export default Updateproject