import React, {useState, useEffect} from 'react'
import faunadb, { query as q } from "faunadb"
import styles from "./components/NewProject.module.css"
import Navbar from "./navbar"

function Newproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    //const [username, setusername] = useState("")
    //setusername(sessionStorage.getItem("username"))
    const username = sessionStorage.getItem("username")
    console.log(username)
    
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Version_num: "",
        Description: "",
        Categories: [],
        Changes: "",
        Roadmap: "",
        Creator: username,
    })

    const {Project_Title, Version_num, Description, Categories, Changes, Roadmap} = projectData
    const [tagName, settagName] = useState("")
    const [tagList, settagList] = useState([])

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
        settagName("")
        event.preventDefault()
    }

    function saveData(event){
        projectData.Categories = tagList
        console.log(Categories)
        serverClient.query(
            q.Create(
              q.Collection('Projects'),
              { data: projectData },
            )
          ).then(ret => console.log(ret.data))
        event.preventDefault()
    }


    function removeTag(id){

        settagList((current) => {
            return current.filter((tagList, index) => {return index !== id})
        })

    }

    return(
        <div><Navbar /><form id={styles.npform} onSubmit={saveData}>
            <input type="text" className={styles.newProjectItem} onChange={settingData} name="Project_Title"     value={Project_Title}   placeholder=" Project Title"   id={styles.Project_Title}    ></input>
            <input className={styles.newProjectItem} onChange={settingData} name="Version_num"       value={Version_num}     placeholder=" Version_num"     id={styles.Version_num}      ></input>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id={styles.Description}      ></textarea>
            <input type="text" className={styles.newProjectItem} onChange={settingtagName} name="Categories"        value={tagName}      placeholder=" Categories"      id={styles.Categories}       ></input>
                <button onClick={settingtagList} id={styles.addCategory} type="submit">Add Category</button>
                <div>{tagList.map((current, index) => <p onClick={() => removeTag(index)} className={styles.tags}><strong>{current}</strong></p>)}</div>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Changes"           value={Changes}         placeholder=" Changes"         id={styles.Changes}          ></textarea>
            <textarea className={styles.newProjectItem} onChange={settingData} name="Roadmap"           value={Roadmap}         placeholder=" Roadmap"         id={styles.Roadmap}          ></textarea>
            <button id={styles.submit} type="submit">Save</button>
        </form></div>
    )
}

export default Newproject