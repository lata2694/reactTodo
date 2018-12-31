/**
 * Created by lata on 20/12/18.
 */

import React, { Component } from 'react';
import '../assets/images/favicon.ico';
import AddToDo from './addToDo';
import ShowToDo from './showTodo'

class App extends Component {
    constructor() {
        super();
        this.state = {
            saveMsg: '',
            todoList: [],
            deletionMsg: '',
            currentEdit: {}
        }
    }

    componentDidMount() {
        this.showToDo();
    }


    onChangeHandler = (event) => {
        console.log('=====event.target.name = ',event.target.name, "------event.target.value = ",event.target.value)
        this.setState({ [event.target.name]: event.target.value }, ()=>console.log('this.state = ',this.state));
    };

    addToDo = (event) => {
        event.preventDefault();

        if (this.state.title == '' || this.state.title == null ) {
            this.setState({saveMsg: 'Please enter title'});
            return;
        }

        let payload = {
            date: this.state.date,
            title: this.state.title,
            content: this.state.content
        }

        fetch('/api/submit',
            { method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( payload )
            })
            .then ( (data)=> {
                    this.setState({saveMsg: 'Saved '+this.state.title,
                                    date: '',
                                    title: '',
                                    content: ''},()=>{
                        this.setState(prevState => ({
                            todoList: [...prevState.todoList, payload],
                        }))
                    });
                }
            )
            .catch( (err)=> {
                console.log("some error in saving", err)
                this.setState({saveMsg: 'Failed to save '+this.state.title});
            } );
    }

    showToDo = () => {
        this.fetchToDos('/api');
    }

    deleteToDo = (id, index, title) => {
        event.preventDefault();

        let payload = {
            id: id,
            title: title
        };

        fetch('/api/remove',
            { method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(( data ) => {
            if (index > -1) {
                this.setState({
                    toDoList : this.state.todoList.splice(index, 1)
                },()=>{
                    this.setState({ deletionMsg: `Deleted ${title}`})
                });
            }
        })
        .catch( (err)=> {
            console.log("some error", err);
            this.setState({ deletionMsg: `Error in deleting ${title}`});
        } );
    }

    sortToDo = () => {
        this.fetchToDos('/api/sort');
    }

    fetchToDos = (url) => {
        fetch(url,
            { method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(( data ) => data.json())
            .then(( jsonResult ) => {
                this.setState ({ todoList : jsonResult});
            })
            .catch( (err) => {
                console.log("some error", err)
            } );
    }

    editToDo = (id, index, title) => {
        event.preventDefault();
        let todoList = this.state.todoList;
        let editableToDo = todoList.find((item) => {
            return item._id === id;
        });
        let item = todoList.indexOf(editableToDo);
        if (todoList.indexOf(editableToDo) > -1)
            this.setState({currentEdit : todoList.indexOf(editableToDo), title: todoList[item].title, date:todoList[item].date, content:todoList[item].content});
    }

    cancelEdit = (id) => {
        event.preventDefault();
        this.setState({currentEdit : -1});
    }

    editingToDo = (id) => {
        let payload = {};
        if (this.state.date) {
            payload['date'] = this.state.date && this.state.date;
        } if (this.state.title) {
            payload['title'] = this.state.title && this.state.title;
        } if (this.state.content) {
            payload['content'] = this.state.content && this.state.content;
        }

        if (Object.keys(payload).length === 0) {
            return;
        } else {
            payload['id'] = id;
            fetch('/api/edit',
                { method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify(payload)
                })
                .then(( data ) => {
                    return data.json();
                })
                .then((json)=>{
                    this.setState({currentEdit : -1});
                })
                .catch( (err)=> {
                    console.log("some error", err);
                } );
        }
    }

    render () {
        const {
            saveMsg,
            todoList,
            deletionMsg,
            currentEdit,
            title,
            date,
            content
        } = this.state
        const listToDos = todoList.map((item, index)=>{
            let finalArray = [];
            if ( currentEdit == index ) {
                finalArray.push(
                    <AddToDo onChangeHandler={this.onChangeHandler}
                             editingToDo={this.editingToDo}
                             title={title}
                             date={date}
                             content={content}
                             id={item._id}
                             cancelEdit={this.cancelEdit}/>
                )
            } else {
                finalArray.push (
                    <ShowToDo
                        deleteToDo={this.deleteToDo}
                        date={item.date}
                        title={item.title}
                        editToDo={this.editToDo}
                        key={index}
                        index={index}
                        id={item._id}/>
                )
            }
            return finalArray;
        })

        return (
            <div>
                <div>{saveMsg}</div>
                <AddToDo onChangeHandler={this.onChangeHandler}
                         addToDo={this.addToDo}
                         underEdit={currentEdit}/>
                <div>{deletionMsg}</div>
                <button onClick={this.sortToDo} style={currentEdit >= 0 ? {pointerEvents: 'none'}: {}}>Sort</button>
                <ul>
                    {listToDos}
                </ul>
            </div>
        )
    }
}

export default App;