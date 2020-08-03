import React, {useState, useEffect} from 'react'
import Updateproject from './updateProject'
//import me from '/me.jpg'
import faunadb, { query as q } from "faunadb"
//import edit from '/edit.svg'
import Navbar from './navbar'
import Link from 'next/link'
import { getURL } from 'next/dist/next-server/lib/utils'

export default () => {

    const [urlName, seturlName] = useState("")

    useEffect(() => {
        seturlName(getURL)
    })

    

    return (
        projectArray.map((project, index) => {return (<div className={styles.display}>
            <Link href={`/project?title=${project.Project_Title}`}><a><h1 className={styles.displaytitle}><strong>{project.Project_Title}</strong></h1></a></Link>
            <div className={styles.descriptionDiv}><strong >{project.Description}</strong></div>
            <br />
            <br />
            
            <Link href={`/accountPage?title=${project.Creator}`}><a className={styles.creatorName}><strong>{project.Creator}</strong></a></Link>
            <br />
            <div className={styles.tagDiv}>{taggies[index].map(each => <Tag tag={each}/>)}</div>
        </div>)}),
        "nothing"
    )
}