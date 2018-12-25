/**
 * Created by lata on 25/12/18.
 */

import React, { Component } from 'react';

const AddToDo = ( props ) => {

    const {
        onChangeHandler
    } = props

    return (
        <div>
            <form>
                <input type="date" name="date" placeholder="date" onChange={onChangeHandler}/>
                <input type="text" name="title" placeholder="title" onChange={onChangeHandler}/>
                <input type="text" name="content" placeholder="content" onChange={onChangeHandler}/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddToDo;