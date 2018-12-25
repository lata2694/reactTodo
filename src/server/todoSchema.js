/**
 * Created by lata on 25/12/18.
 */
let mongoose = require('mongoose');
let schema = mongoose.Schema;

let todo = new schema ({
    date: String,
    title: String,
    content: String,
});

module.exports = mongoose.model('todo',todo);