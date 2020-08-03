import React, {useState, useEffect} from 'react'
import Updateproject from './updateProject'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
import styles from './components/accountPage.module.css'
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import { getURL } from 'next/dist/next-server/lib/utils'

export default () => {

    const [urlName, seturlName] = useState("")
    const [altId, setaltId] = useState("")
    const [spaceCheck, setspaceCheck] = useState(true)
    const [selection, setSelection] = useState("title")
    const [projectArray, setProjectArray] =  useState([])
    const [queriedList, setqueriedList] = useState([])

    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    
    projectArray.length === 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("projects"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then(ret => {setProjectArray(ret.data.map(project => project.data)), console.log(ret.data.map(project => project.data))})
    
    useEffect(() => {
        seturlName(getURL())
        setSelection(sessionStorage.getItem("selection"))
    })

    console.log(urlName)
    const urlShort = urlName.slice(22, urlName.length)
    console.log(urlShort)
    const searchTagsList = urlShort.split("%20")
    console.log(searchTagsList)
    
        
        if(selection === "title"){
            const results = projectArray.filter(project => {return project.Project_Title.includes(urlShort)})
            if(results.length > 0 && queriedList.length == 0){
                setqueriedList(results)
                console.log(results)
            }
        }


        if(selection === "categories"){
            const searchTagsList = urlShort.split("%20")
            const searchResults = searchTagsList.map(one => projectArray.filter(each => each.Categories.includes(one)))
            const finalResults = []
            const enhancedResults = searchResults.map(queriedProjectLists => queriedProjectLists.filter(project => finalResults.push(project)))
            if(finalResults.length > 0 && queriedList.length == 0){
                setqueriedList(finalResults)
                console.log(finalResults)
            }
        }
        if(selection === "description"){
            const results = projectArray.filter(project => {return project.Description.includes(urlShort)})
            if(results.length > 0 && queriedList.length == 0){
                setqueriedList(results)
                console.log(results)
            }
        }


    function Tag(props){
        return(
            <p className={styles.tags}><strong>{props.tag}</strong></p>
        )
    }

    const tagList = queriedList.map(one => one.Categories)

    return (
        <div>
            <Navbar />
            {queriedList.map((project, index) => {return (<div className={styles.display}>
                <Link href={`/project?title=${project.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1></a></Link>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />

                <Link href={`/accountPage?title=${project.Creator}`}><a className={styles.creatorName}><strong>{project.Creator}</strong></a></Link>
                <br />
                <div className={styles.tagDiv}>{tagList[index].map(each => <Tag tag={each}/>)}</div>
            </div>)})}
        </div>
    )
}