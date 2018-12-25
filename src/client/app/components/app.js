/**
 * Created by lata on 20/12/18.
 */

import React, { Component } from 'react';
import '../assets/images/favicon.ico';
import AddToDo from './addToDo'

class App extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value }, ()=>console.log('this.state = ',this.state));
    };

    addToDo = () => {

    }

    render () {
        return (
            <div>
                <AddToDo onChangeHandler={this.onChangeHandler}/>
            </div>
        )
    }
}

export default App;