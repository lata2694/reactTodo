/**
 * Created by lata on 25/12/18.
 */

import Todo from './todoSchema';

let services = {}

const addtodo = (request, reponse) => {
    "use strict";
    let todo, currentDate;
    currentDate = new Date();
    if (request.body) {
        let payload = {
            date: request.body.date && request.body.date || (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`),
            title: request.body.title && request.body.title,
            content: request.body.content && request.body.content
        };
        todo = new Todo(payload);
        todo.save((error, data)=>{
            if(error) {
                console.log('Error in saving', error);
            } else {
                reponse.send(data);
            }
        })
    } else {
        console.log('Error in creation');
    }
}

const gettodo = (request, reponse) => {
    "use strict";
    let todo, date, title, content;
    if (request.body.date || request.body.title || request.body.content) {
        date = request.body.date && request.body.date;
        title = request.body.title && request.body.title;
        content = request.body.content && request.body.content;
        Todo.find({ date: date, title: title, content: 'content'}).exec((error, data)=>{
            if (error) {
                console.log('No data found');
            } else {
                reponse.send(data);
            }
        });
    } else {
        Todo.find().exec((error, data)=>{
            if (error) {
                console.log('No data found');
            } else {
                reponse.send(data);
            }
        });
    }
};

const deletetodo = (request, reponse) => {
    "use strict";
    let id, title;
    if (request.body.id || request.body.title) {
        id = request.body.id && request.body.id;
        title = request.body.title && request.body.title;
       Todo.deleteOne({_id: id, title: title}, (error, data) => {
           if (error) {
               console.log('Error in deletion');
           } else {
               reponse.send(data);
           }
       })
    } else {
        console.log('Error in deleting todo')
    }
}

const edittodo = (request, reponse) => {
    "use strict";
    let payload = {};
    if (request.body.date) {
        payload['date'] = request.body.date;
    } if (request.body.title) {
        payload['title'] = request.body.title;
    } if (request.body.content) {
        payload['content'] = request.body.content;
    }
    if (payload) {
        Todo.find({_id: request.body.id}).updateOne(payload,(error, data) => {
            if (error) {
                console.log('Error in updation');
            } else {
                console.log('updated = ',JSON.stringify(data));
                reponse.send(data);
            }
        })
    } else {
        console.log('Not updating todo');
    }
}

const sorttodo = (request, reponse) => {
    "use strict";
    Todo.find().sort({date: 'desc'}).exec((error, data)=>{
        if (error) {
            console.log('No data found for sorting');
        } else {
            reponse.send(data);
        }
    });
}

export default services= {
    addtodo : addtodo,
    gettodo : gettodo,
    deletetodo : deletetodo,
    edittodo : edittodo,
    sorttodo : sorttodo
};