import React, {useState, useEffect} from 'react'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import styles from './components/accountPage.module.css'

function Display(){
    const [projectArray, setProjectArray] =  useState([])
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
                
                <p className={styles.creatorname}><strong>{project.Creator}</strong></p>
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
                
                <p className={styles.creatorname}><strong>{project.Creator}</strong></p>
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
        sessionStorage.setItem("dataCondition", false)
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
        return(
            <div className={styles.display}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                {username === props.Creator && (<div><Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} title={props.description} name={props.Project_Title} className={styles.edit} src='/edit.svg' /></a></Link>
                <img name={props.Project_Title} src="/delete.svg" className={styles.delete} onClick={deleteProject}/></div>)}
                <p className={styles.description}><strong>{props.Description}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Roadmap</strong></h1>
                <p className={styles.text}><strong>{props.Roadmap}</strong></p>
                <br />
                <h1 className={styles.textHead}><strong>Changes</strong></h1>
                <p className={styles.text}><strong>{props.Changes}</strong></p>
                <br />
                <br />
                
                <p className={styles.creatorName}><strong>{props.Creator}</strong></p>
                <br />
                <div className={styles.userDisplayTags}>{props.Categories.map(each => <Tag tag={each}/>)}</div>
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
        />}</div>
    )
}

export default Display