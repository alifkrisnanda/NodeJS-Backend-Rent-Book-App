'use strict';

module.exports = function(app) {
    const todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/user')
        .get(todoList.user);
 
// Login & Register With JWT
    app.route('/user/register')
        .post(todoList.register);

    app.route('/user/login')
        .get(todoList.login);

    app.route('/user/verify')
        .get(todoList.verify);

// Create Read Update Delete Book
    app.route('/book/create')
        .post(todoList.create);         
    
    app.route('/book/')
        .get(todoList.read);

    app.route('/book/:book_id')
        .put(todoList.update);
        
    app.route('/book/:book_id')
        .delete(todoList.delete);


// Borrrow Book




// Return Book





// Search Book
    app.route('/book/search/:search')
        .get(todoList.search);
    
};

