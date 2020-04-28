'use strict';

const response = require('./res');
const connection = require('./conn');
const jwt = require('jsonwebtoken');

exports.index = function (req, res) {
    response.ok("NodeJS Backend Rent_Book App", res)

};

exports.user = function (req, res) {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const username = req.body.username;	

	connection.query('SELECT first_name, last_name, username FROM user',
	[ first_name, last_name, username ],
	function
	(error, rows, fields){
		if(error){
            console.log(error)
		} else {
			response.ok(rows, res)
		}
	});
};

// Register & Login
exports.register = function (req, res){
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;

    connection.query('INSERT INTO user (first_name, last_name, username, password) VALUES (?,?,?,?)',
    [ first_name, last_name, username, password ],
    function
    (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Register Succesfull", res)
        }
    });
};

exports.login = function (req, res){
    const username = req.body.username
    const password = req.body.password

    connection.query(`SELECT * FROM user WHERE username = ? AND password = ?`, 
    [ username, password ],
    function
    (error, user){
        if(error){
        console.log(error)
        } else {
        let token = jwt.sign({ id: user[0].id, username: user[0].username }, "SECRET_KEY", {
            expiresIn: 86400
        })
        console.log(token)
        response.ok(token, res)
        }
    });
};


// JWT verify
exports.verify = function (req, res){
    let token = req.headers['x-acces-token'];
    if (!token) return res.status(401).send({ auth: false, message: "No token provided!" });

    jwt.verify(token, "SECRET_KEY", function(err, decoded){
        if(err) return res.status(500).send({ auth: false, message: "Failed to authenticate token!" });

        res.status(200).send(decoded)
    });
};


// CRUD Books
exports.create = function(req, res){
    const title = req.body.title
    const description = req.body.description
    const data_released = req.body.data_released
    const available = req.body.available

    connection.query('INSERT INTO buku (title, description, data_released, available) VALUES (?,?,?,?)', 
    [ title, description, data_released, available],
    function
    (error, rows, fields){
        if (error){
            console.log(error)
        } else {
            response.ok("succesfully added books!", res)
        }
    });
};

exports.read = function(req, res){
    let base_url = 'SELECT buku.title, buku.description, buku.data_released, buku.available, genre.genre from buku LEFT JOIN genre ON buku.id_genre = genre.id'

// Search Book
    const {search} = req.query
    if(search && search.length > 0){
        base_url += ` WHERE title LIKE '%${search}%'`
    }

// Sort Book By Title, Release Date, Genre
    const sortby = req.body.sortby || 'title' || 'release_date' || 'genre'
    const order = req.body.order || 'ASC'

    base_url += ` ORDER BY ${sortby} ${order}`

// Pagination
    const limit = parseInt(req.body.limit) || 5
    const page = parseInt(req.body.page) || 1 
    const offset = (page-1)*limit
    base_url += ` LIMIT ${limit} OFFSET ${offset}`

    console.log(limit)
    console.log(page)
    console.log(base_url)

    connection.query(base_url, function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.update = function (req, res){
    let book_id = req.params.book_id;
    let book_data

    connection.query('SELECT * FROM person where id = ?',
    [ book_id ],
    function(error, rows, fields){
        if(error){
            console.log(error)
        } else { 
            book_data = rows[0]
        }
    });
    let title = req.body.title || book_data.title;
    let description = req.body.description || book_data.title;
    let data_released = req.body.data_released || book_data.data_released
    let available = req.body.available || book_data.available

    connection.query('UPDATE book SET title = ?, description = ?, data_released = ?, available = ? WHERE id = ?',
    [ title, description, data_released, available ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Succesfully update books!", res)
        }
    })
};

exports.delete = function (req, res){
    const book_id = req_param.book_id;

    connection.query('DELETE FROM book WHERE id = ?', 
    [ book_id ],
    function (error, rows,  fields){
        if (error){
            console.log(error);
        } else {
            response.ok("Sucesfully delete books!", res)
        }
    });
};

// Borrrow Book








// Return Book









// Search Book
exports.search = function (req, res){
    const {search} = req.query
    console.log(search)

    connection.query(`SELECT * FROM buku WHERE title LIKE '%${search}%'`,
    function(error, rows, fields){
        if (error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};