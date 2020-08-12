import React, {useState, useEffect} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'
import url from 'url'
import { getURL } from 'next/dist/next-server/lib/utils'
import { openDB, deleteDB, wrap, unwrap } from 'idb';

function Display(){
    const [projectArray, setProjectArray] =  useState([])
    const [indexedArray, setindexedArray] = useState([])
    const [indexedCheck, setindexedCheck] = useState(true)
    const [networkStatus, setnetworkStatus] = useState(false)
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
    ).then(ret => {
        setProjectArray(ret.data.map(project => project.data)), 
        console.log(ret.data.map(project => project.data),
        setnetworkStatus(true)
        )})

        
        /* idb.open('projectList', 1, function(upgradeDB) {
            var store = IDBTransaction("projects", "readwrite")
            var storing = store.objectStore('projects', {autoIncrement: true});
            storing.add(ret.data.map(project => project.data));    
        }) */

        async function doDatabaseStuff() {
            console.log("await is working")
            await deleteDB("projectList", {
                blocked(){}
            });
            const db = await openDB("projectList", 1, {
                 upgrade(db){
                    const store = db.createObjectStore("projects", {
                        keyPath: "id", autoIncrement: true})
                    
                },
            })
                await db.add("projects", projectArray)
                console.log(await db.getAll("projects"))
                setindexedArray(await db.getAll("projects"))
                setnetworkStatus(false)
                setindexedCheck(false)
        }


        async function getindexedData() {
            console.log("await is working")
            const db = await openDB("projectList", 1, {
                upgrade(){}
            });
             console.log(await db.getAll("projects")) 
             setindexedArray(await db.getAll("projects"))
             setnetworkStatus(false)
        }

        networkStatus && indexedCheck && doDatabaseStuff()
        !networkStatus && getindexedData() 


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
    const [selection, setSelection] = useState("")

    console.log(selection)

    function settingsearchValue(event){
        setsearchValue(event.target.value)
        setSelection(document.getElementById("searchtype").value)
    }

    function settingsearchList(){
        var selection = document.getElementById("searchtype")
        if(selection.value === "categories"){
            setsearchTagsList(none => {return [...none, searchValue]})
            setsearchValue("")
        }
    }
    const categorySearchList = searchTagsList.join(" ")
    console.log("categorySearchList: " + categorySearchList)


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

        if(selection.value === "categories"){
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

    console.log(networkStatus)
    console.log(indexedArray)
    console.log(projectArray)

    function Displayprop() {
        return(
            <>
            {networkStatus && projectArray.map((project, index) => {return (<div className={styles.display}>
                <Link href={`/project?title=${project.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1></a></Link>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />
                
                <Link href={`/accountPage?title=${project.Creator}`}><a className={styles.creatorName}><strong>{project.Creator}</strong></a></Link>
                <br />
                <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
            </div>)})}

            {!networkStatus && indexedArray.map(array => array.map((project, index) => {return (<div className={styles.display}>
                <Link href={`/project?title=${project.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1></a></Link>
                <h1>afdsfcdsafdsfa</h1>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />
                
                <Link href={`/accountPage?title=${project.Creator}`}><a className={styles.creatorName}><strong>{project.Creator}</strong></a></Link>
                <br />
                <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
            </div>)}))}
            </>
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


    useEffect(() => {
        sessionStorage.setItem("dataCondition", false)
        sessionStorage.setItem("selection", selection)
    })


    return(
        <div><Navbar />
        <div className="search">
            <input type="search" placeholder="search" className="searchfield" value={searchValue} onChange={settingsearchValue}/>
            <img src="/plus.svg" className={styles.button} onClick={settingsearchList}/>
            {(selection === "title" || selection === "description") && <Link href={`queriedResults?title=${searchValue}`}><a><img src="/search.png" className={styles.button}/></a></Link>}
            {selection === "categories" && <Link href={`queriedResults?title=${searchTagsList.join(" ")}`}><a><img src="/search.png" className={styles.button}/></a></Link>}
            <select id="searchtype" class={styles.searchtype}>
                <option id="1" value="categories">categories</option>
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
        {/* queriedList.length == 0 ? <Displayprop /> : queriedList.length > 0 && <Querieddisplay /> */}
        <Displayprop />
        </div>
    )
}

export default Display