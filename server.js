/**
 * Created by lata on 24/12/18.
 */
import express from "express";
import webpack from 'webpack';
import config from './webpack.config';
const app = express();
const mongoose = require('mongoose');
const port = "9000";
const bodyParser = require('body-parser');
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/todo');

app.use( require( 'webpack-dev-middleware' ) ( compiler, {
    noInfo: true,
    publicPath: '/',
    historyApiFallback: true,
} ) );

app.use( require( 'webpack-hot-middleware')( compiler ));

app.use( bodyParser() );

app.use ( '/*', ( req, res, next ) => {
    res.sendFile(__dirname+'/dist/main.js');
    // res.sendFile(__dirname+'\\src\\client\\app\\public');
});

app.listen(process.env.PORT || port, ()=> console.log("app started"));
