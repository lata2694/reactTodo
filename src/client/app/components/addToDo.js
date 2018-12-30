/**
 * Created by lata on 25/12/18.
 */

import React, { Component } from 'react';

const AddToDo = ( props ) => {

    const {
        onChangeHandler,
        addToDo,
        item,
        editingToDo,
        underEdit,
        cancelEdit
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
                        <input type="date" name="date" placeholder="date" onChange={onChangeHandler} value={item && item.date}/>
                        <input type="text" name="title" placeholder="title" onChange={onChangeHandler} value={item && item.title} required/>
                        <input type="text" name="content" placeholder="content" onChange={onChangeHandler} value={item && item.content}/>
                    </div>
                </div>
                {
                    item ?
                        <div style={{display: 'inline-block'}}>
                            <button onClick={()=>editingToDo(item._id)}>Update</button>
                            <button onClick={()=>cancelEdit(item._id)}>cancel</button>
                        </div>
                        : <button onClick={addToDo} style={underEdit >= 0 ? {pointerEvents: 'none', cursor: 'not-allowed'}: {}}>Add</button>
                }
            </form>
        </div>
    )
}

export default AddToDo;