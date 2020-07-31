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
    const [chosenOne, setChosenOne] = useState("nothing")
    function choseOne(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data)})
    }



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
                <h1 onClick={choseOne} className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1>
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
                <h1 onClick={choseOne} className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1>
                <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
                <br />
                <br />
                
                <p className={styles.creatorName}><strong>{project.Creator}</strong></p>
                <br />
                <div className={styles.tagDiv}>{tagList[index].map(each => <Tag tag={each}/>)}</div>
            </div>)})
    )}

    function setRef(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {sessionStorage.setItem("ref", ret.ref.id); console.log("refid: " + ret.ref.id)})
    }

    const [username, setusername] = useState("")
     useEffect(() => {
        setusername(sessionStorage.getItem("username")),
        console.log(username),
        console.log(getURL())
        sessionStorage.setItem("dataCondition", false)
        setyourWorks(sessionStorage.getItem("yourWorks"))
    })

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
                {username === props.Creator && (<div><Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} title={props.description} name={props.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                <img name={props.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/></div>)}
                <p className={styles.description}><strong>{props.Description}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Roadmap</strong></h1>
                {props.Roadmap.map(each => <Tag tag={each}/>)}
                <br />
                <h1 className={styles.textHead}><strong>Changes</strong></h1>
                <p className={styles.text}><strong>{props.Changes}</strong></p>
                <br />
                <br />
                
                <p className={styles.creatorName}><strong>{props.Creator}</strong></p>
                <br />
                <div className={styles.userDisplayTags}>{props.Categories.map(each => <Tag tag={each}/>)}</div>
                <br />
                <div className={styles.updateList}>{props.Update.length > 0 && props.Update.map((current, index) => {return (<div className={styles.update} /*onClick={() => removeUpdate(index)}*/><h2 className={styles.textHead}>Version {current.Version}</h2><br /><h3 className={styles.changelogLabel}>Changelog</h3><br /><div className={styles.changeDiv}>{changeLog[index].map(one => <p className={styles.tags}><strong>{one}</strong></p>)}</div></div>)})}</div>
            </div>)
    }




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
        {chosenOne === "nothing" && queriedList.length == 0 ? <Displayprop /> : queriedList.length > 0 ? <Querieddisplay /> : <Userdisplay 
        Project_Title= {chosenOne.Project_Title}
        Description= {chosenOne.Description}
        Roadmap={chosenOne.Roadmap}
        Changes={chosenOne.Changes}
        Creator={chosenOne.Creator}
        Categories={chosenOne.Categories}
        Id={chosenOne.Id}
        Update={chosenOne.Update}
        />}</div>
    )
}

export default Display