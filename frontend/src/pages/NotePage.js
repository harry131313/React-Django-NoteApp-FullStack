import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate } from "react-router-dom";

const NotePage = () => {

    let params = useParams()

    let [note, setNote] = useState()

    useEffect(()=>{
        getNote()
    }, [params.id])

     let getNote = async () => {
        if (params.id === 'new') return 

        let response = await fetch(`/api/notes/${params.id}/`)
        let data = await response.json()
        setNote(data)
     }


     let createNote = async () => {
    
        fetch(`/api/notes/create/`, {
            method: "POST",

            'headers': {
                'Content-Type':'application/json',
                'X-CSRFToken': CSRF
            },
            body: JSON.stringify(note)
        })
    }


     let CSRF = document.cookie.slice(10)
    let updateNote = async () => {
    
        fetch(`/api/notes/${params.id}/update/`, {
            method: "PUT",

            'headers': {
                'Content-Type':'application/json',
                'X-CSRFToken': CSRF
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${params.id}/delete/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type':'application/json'
            }
        })
        navigate('/')  
    }

     let navigate = useNavigate();

     const HandleSubmit = () => {

        if (params.id !== 'new' && !note.body){
            deleteNote()
        } else if (params.id !== 'new'){
            updateNote()
        } else if (params.id == 'new' && note !== null){
            createNote()
        }
        // updateNote()
        navigate('/')

    }

    //  let handlechange = () => {
    //     updateNote()
    //     history('/')
    //  }


  return (
    <div className='note'>
        <div className="note-header">
        
            <h3>
                <ArrowLeft onClick= {HandleSubmit}/>
                
            </h3>
            {params.id !== 'new' ? (
                 <button onClick={deleteNote} >delete</button>
            ): (
                <button onClick={HandleSubmit}>Done</button>
            )}
           
            
        </div>
        <textarea onChange={(e)=> {setNote({...note, 'body': e.target.value})}} value={note?.body} ></textarea>
        
    </div>
  )
}

export default NotePage