/**
 * Created by lata on 25/12/18.
 */

import React, { Component } from 'react';

const AddToDo = ( props ) => {

    const {
        onChangeHandler,
        addToDo,
        title,
        date,
        content,
        editingToDo,
        underEdit,
        cancelEdit,
        id
    } = props

    return (
        <div>
            <form>
                <div style={{position: 'relative', display: 'inline-block'}}>
                    {
                        underEdit  >= 0 ?
                            <div style={{position: 'absolute', opacity: '0.7px', height: '100%', width: '100%', cursor: 'not-allowed'}}/>
                            : null
                    }
                    <div>
                        <input type="date" name="date" placeholder="date" onChange={onChangeHandler} value={date}/>
                        <input type="text" name="title" placeholder="title" onChange={onChangeHandler} value={title} required/>
                        <input type="text" name="content" placeholder="content" onChange={onChangeHandler} value={content}/>
                    </div>
                </div>
                {
                    id ?
                        <div style={{display: 'inline-block'}}>
                            <button onClick={(event)=>{event.preventDefault(); return editingToDo(id)}}>Update</button>
                            <button onClick={(event)=>{event.preventDefault(); return cancelEdit(id)}}>cancel</button>
                        </div>
                        : <button onClick={addToDo} style={underEdit >= 0 ? {pointerEvents: 'none', cursor: 'not-allowed'}: {}}>Add</button>
                }
            </form>
        </div>
    )
}

export default AddToDo;