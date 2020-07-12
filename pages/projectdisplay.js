import React, {useState, useEffect} from 'react'
import Updateproject from './updateProject'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'

function Display(){
    const [projectArray, setProjectArray] =  useState("")
    const testArray = []
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [page, setPage] = useState(false)
    const [chosenOne, setChosenOne] = useState("nothing")

    function choseOne(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data)})
    }

    console.log(page)
    console.log(chosenOne)



    function Tag(props){
        return(
            <p style={{
                display: 'inline-block',
                backgroundColor: '#84a98c',
                color: "black",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                margin: '12px',
                border: 'none',
                borderRadius: '6px'}}><strong>{props.tag}</strong></p>
        )
    }


    serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("projects"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {ret.data.map(one => {console.log(one.data); testArray.push(one.data); localStorage.setItem('projects', JSON.stringify(testArray));})})

    var newTestArray = JSON.parse(localStorage.getItem('projects'))
    console.log(newTestArray)
    const [tagNames, settagNames] = useState([])

    const taggies = newTestArray.map(current => current.Categories)
    console.log(taggies)
    console.log(newTestArray.Categories)

    function Displayprop() {
        return(

            newTestArray.map((Current, index) => {const Categories = Current.Categories; return (<div className="display" style={{width: '300px'}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{Current.Project_Title}</strong></h1>
                <p><strong>{Current.Description.slice(0, 99) + "..."}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src='/me.jpg' />
                <p className="creatorname"><strong>{Current.Creator}</strong></p>
                <br />
                {taggies[index].map(each => <Tag tag={each}/>)}
            </div>)})
        )
    }

    const [refid, setrefid] = useState("")

    function setRef(event){
        
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.name)
        )).then((ret, index) => {setrefid(ret.ref); console.log("ref: " + ret.ref.id); sessionStorage.setItem("ref", ret.ref.id)})
    }

    const username = sessionStorage.getItem("username")
    console.log(username)
    console.log("refid: " + refid)

    function Userdisplay(props){
        return(
            <div className="display" style={{width: '300px',}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                {props.Creator === username && <Link href="/updateProject"><a href="/updateProject"><img id={props.Id} onClick={setRef} style={{
                width: '48px', 
                height: '48px',
                marginRight: '20px',
                position: 'relative',
                left: "10px",
                cursor: "pointer"
                }} title={props.description} name={props.Project_Title} className="navpic" src='/edit.svg' /></a></Link>}
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Description}</strong></p>
                <br />
                <h1 className="textHead"><strong>Roadmap</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Roadmap}</strong></p>
                <br />
                <h1 className="textHead"><strong>Changes</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Changes}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src='/me.jpg' />
                <p className="creatorname"><strong>{props.Creator}</strong></p>
                <br />
                {props.Categories.map(each => <Tag tag={each}/>)}
            </div>)
    }

    const [searchValue, setsearchValue] = useState("")
    const [searchTitleList, setsearchTitleList] = useState([])
    const [searchTagsList, setsearchTagsList] = useState([])
    const [searchDescriptionList, setsearchDescriptionList] = useState([])

    function settingsearchValue(event){
        setsearchValue(event.target.value)
    }

    function settingsearchList(event){
        var selection = document.getElementById("searchtype")
        if(selection.value === "title"){
            setsearchTitleList(none => {return [...none, searchValue]})
        }
        if(selection.value === "tags"){
            setsearchTagsList(none => {return [...none, searchValue]})
        }
        if(selection.value === "description"){
            setsearchDescriptionList(none => {return [...none, searchValue]})
        }
    }

    function findProjects(){
        var selection = document.getElementById("searchtype")
        alert(selection.value)
        if(selection.value === "title"){
            //const results = newTestArray.filter(one => searchTitleList.map(each => one.Project_Title.includes(each)))
            //const results = searchTitleList.filter(one => newTestArray.map(each => each.Project_Title.includes(one)))
            //newTestArray(current => searchTitleList.filter(one => current.Project_Title.includes(one)))
            const results = searchTitleList.map(one => newTestArray.filter(each => each.Project_Title.includes(one)))
            console.log(results)
            if(results){
                alert("yes it does")
            } else {
                alert("no it does not contain " + searchValue)
            }
        }
        if(selection.value === "tags"){
            const results = newTestArray.filter(one => {return one.Categories.includes(searchTagsList)})
            console.log(results)
            if(results){
                alert("yes it does contain that tag")
            } else {
                alert("no it does not contain " + searchValue)
            }
        }
        if(selection.value === "description"){
            const results = newTestArray.filter(one => {return one.Description.includes(searchDescriptionList)})
            console.log(results)
            if(results.length !== 0){
                alert("yes it does contain that tag")
            } else {
                alert("no it does not contain " + searchValue)
            }
        }
    }

    return(
        <div><Navbar />
        <div className="search">
            <input type="search" placeholder="search" className="searchfield" value={searchValue} onChange={settingsearchValue}/>
            <img src="/plus.svg" style={{
                    width: '24px', 
                    height: '24px',
                    marginRight: '5px',
                    cursor: "pointer"
                    }} className="searchbutton"
                onClick={settingsearchList}
            />
            <img src="/search.png" style={{
                    width: '24px', 
                    height: '24px',
                    marginRight: '5x',
                    cursor: "pointer"
                    }} className="searchbutton"
                onClick={findProjects}
            />
            <select id="searchtype">
                <option id="1" value="tags">tags</option>
                <option id="2" value="title">title</option>
                <option id="3" value="description">description</option>
            </select>
            <br />
            <div className="searchdiv">
                <label className="searchLabel">Title search Values</label>
                {searchTitleList.map(each => <Tag tag={each}/>)}
                <label className="searchLabel">Tags search Values</label>
                {searchTagsList.map(each => <Tag tag={each}/>)}
                <label className="searchLabel">Description search Values</label>
                {searchDescriptionList.map(each => <Tag tag={each}/>)}
            </div>    
        </div>
        {chosenOne === "nothing" ? <Displayprop /> : chosenOne !== "nothing" && refid === "" ? <Userdisplay 
        Project_Title= {chosenOne.Project_Title}
        Description= {chosenOne.Description}
        Roadmap={chosenOne.Roadmap}
        Changes={chosenOne.Changes}
        Creator={chosenOne.Creator}
        Categories={chosenOne.Categories}
        Id={chosenOne.Id}
        /> : <Updateproject />}</div>
    )
}

export default Display