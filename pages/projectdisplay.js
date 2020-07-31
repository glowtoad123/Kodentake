import React, {useState, useEffect} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'
import url from 'url'
import { getURL } from 'next/dist/next-server/lib/utils'

function Display(){
    const [projectArray, setProjectArray] =  useState([])
    //const [receivedKeys, setreceivedKeys] = useState([])
    const [yourWorks, setyourWorks] = useState("")
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });



    function Tag(props){
        return(
            <p className={styles.tags}><strong>{props.tag}</strong></p>
        )
    }


    projectArray.length == 0 && serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("projects"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then(ret => {setProjectArray(ret.data.map(project => project.data)), console.log(ret.data.map(project => project.data))})

    const taggies = projectArray.map(project => project.Categories)
/*     const creators = projectArray.map(project => project.Creator)
    const [keyCheck, setkeyCheck] = useState(true)

    console.log(creators)

    keyCheck && creators.map(name => {serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("dublicateUsername"), name)),
            q.Lambda("X", q.Get(q.Var("X")))
        )
    ).then(ret => {ret.data.map(key => {
        setreceivedKeys(current => {return [...current, {Key: key.ref.id, username: key.data.username}]})
            }), 
            setkeyCheck(false)
        })}
    )
    console.log(receivedKeys)
    const keys = receivedKeys.slice(0, creators.length)

    keys.map((key, index) => {return creators[index] === key.username[index]})

    console.log(keys) */

    const [searchValue, setsearchValue] = useState("")
    const [searchTagsList, setsearchTagsList] = useState([])
    const [queriedList, setqueriedList] = useState([])

    function settingsearchValue(event){
        setsearchValue(event.target.value)
    }

    function settingsearchList(){
        var selection = document.getElementById("searchtype")
        if(selection.value === "tags"){
            setsearchTagsList(none => {return [...none, searchValue]})
            setsearchValue("")
        }
    }


    function findProjects(){
        var selection = document.getElementById("searchtype")
        if(selection.value === "title"){
            const results = projectArray.filter(project => {return project.Project_Title.includes(searchValue)})
            if(results.length > 0){
                setqueriedList(results)
            } else {
                alert("none of the projects contain: " + searchValue)
            }
        }

        if(selection.value === "tags"){
            const searchResults = searchTagsList.map(one => projectArray.filter(each => each.Categories.includes(one)))
            const finalResults = []
            const enhancedResults = searchResults.map(queriedProjectLists => queriedProjectLists.filter(project => finalResults.push(project)))
            if(finalResults.length > 0){
                setqueriedList(finalResults)
            } else {
                alert("none of the projects contain any of these tags" )
            }
        }
        if(selection.value === "description"){
            const results = projectArray.filter(project => {return project.Description.includes(searchValue)})
            if(results.length > 0){
                setqueriedList(results)
            } else {
                alert("none of the projects contain: " + searchValue)
            }
        }
    }

    function Displayprop() {
        return(

            projectArray.map((project, index) => {return (<div className={styles.display}>
                <Link href={`/project?title=${project.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1></a></Link>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />
                
                <Link href={`/accountPage?title=${project.Creator}`}><a className={styles.creatorName}><strong>{project.Creator}</strong></a></Link>
                <br />
                <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
            </div>)})
        )
    }

    function Querieddisplay(){

        const tagList = queriedList.map(one => one.Categories)

        return(
        queriedList.map((project, index) => {return (<div className={styles.display}>
                <h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />
                
                <p className={styles.creatorName}><strong>{project.Creator}</strong></p>
                <br />
                <div className={styles.tagDiv}>{tagList[index].map(each => <Tag tag={each}/>)}</div>
            </div>)})
    )}





    return(
        <div><Navbar />
        <div className="search">
            <input type="search" placeholder="search" className="searchfield" value={searchValue} onChange={settingsearchValue}/>
            <img src="/plus.svg" className={styles.button} onClick={settingsearchList}/>
            <img src="/search.png" className={styles.button} onClick={findProjects}/>
            <select id="searchtype" class={styles.searchtype}>
                <option id="1" value="tags">tags</option>
                <option id="2" value="title">title</option>
                <option id="3" value="description">description</option>
            </select>
            <br />
            <div className="searchdiv">
                <div className={styles.list}>
                    <label className="searchLabel">Tags search Values</label>
                    {searchTagsList.map(each => <Tag tag={each}/>)}
                </div>
            </div>    
        </div>
        {queriedList.length == 0 ? <Displayprop /> : queriedList.length > 0 && <Querieddisplay />}</div>
    )
}

export default Display