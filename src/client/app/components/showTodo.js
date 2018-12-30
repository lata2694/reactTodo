/**
 * Created by lata on 25/12/18.
 */

import React, { Component } from 'react';

const ShowToDo = ( props ) => {

    const {
        deleteToDo,
        date,
        title,
        editToDo,
        index,
        id
    } = props

    return (
        <li>
            <span> {date} </span>
            <span> {title} </span>
            <button onClick={()=>deleteToDo(id, index, title)}>Delete</button>
            <button onClick={()=>editToDo(id, index, title)}>Edit</button>
        </li>
    )
}

export default ShowToDo;