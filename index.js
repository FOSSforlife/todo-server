const express = require('express');
const path = require('path');
const todo = require('./todo');

const app = express();

// todo module variables
const dirPath = '/code/directory/goes/here';
const customTags = ['XTRA'];

// ejs variables
const colors = {
    FIXME: '#e00',
    TODO: '#ee0',
    XTRA: '#0aa'
};

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    todo.getTodos(dirPath, customTags)
    .then(todos => {
        res.render('index', {
            todos: todos
        });
        
    })
});

app.get('/richtext', (req, res) => {
    todo.getTodos(dirPath, customTags)
    .then(todos => {
        res.render('richtext', {
            todos: todos,
            colors: colors
        });
        
    })
});

const server = app.listen(2300, () => {
    console.log('todo-server is running');
});
