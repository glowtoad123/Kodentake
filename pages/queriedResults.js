import React, {useState, useEffect} from 'react'
import Updateproject from './updateProject'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'

function Queriedresults(){

    /*var alphaArray = localStorage.getItem('queriedProjects')
    var alphaArrayLength = alphaArray.length - 1
    alphaArray.slice[0]
    alphaArray.slice[alphaArrayLength]
    console.log(alphaArray[0])
    localStorage.setItem('queriedProjects', alphaArray.slice(1, alphaArrayLength - 2))*/

    var newTestArray = JSON.parse(localStorage.getItem('queriedProjects'))

    const taggies = newTestArray.map(one => one.map(current => current.Categories))
    console.log(taggies)
    console.log(newTestArray.Categories)

    const [searchValue, setsearchValue] = useState("")
    const [searchTitleList, setsearchTitleList] = useState([])
    const [searchTagsList, setsearchTagsList] = useState([])
    const [searchDescriptionList, setsearchDescriptionList] = useState([])
    const [queriedList, setqueriedList] = useState([])
    const [chosenOne, setChosenOne] = useState("nothing")

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
            localStorage.setItem('queriedProjects', JSON.stringify(results))
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

    function choseOne(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data)})
    }

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

    return(
            <div>
                <Navbar />
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
                    <Link href="/queriedResults" ><a href="/queriedResults"><img src="/search.png" style={{
                            width: '24px', 
                            height: '24px',
                            marginRight: '5x',
                            cursor: "pointer"
                            }} className="searchbutton"
                        onClick={findProjects}
                    /></a></Link>
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
                {newTestArray.map((One, index) => {return One.map((Current, index) => {return (<div className="display" style={{width: '300px'}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{Current.Project_Title}</strong></h1>
                <p><strong>{Current.Description.slice(0, 99) + "..."}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src='/me.jpg' />
                <p className="creatorname"><strong>{Current.Creator}</strong></p>
                <br />
                {taggies.map(each => each[index].map(eachone =>  <Tag tag={eachone}/>))}
            </div>)})})}
            </div>
        )
}

export default Queriedresults