// load our app server using express 
const express = require('express')
const app = express()
const morgan = require('morgan')
const pg = require('pg')

const bodyParser = require('body-parser')

// Process requests easier
app.use(bodyParser.urlencoded({extended: false}))

// Serve all files inside folder "public"
app.use(express.static('./public'))

// Tool das Informationen zu allen requests gibt.
app.use(morgan('short'))

// Passing data from our form
app.post('/user_create', (req, res) => {
    console.log("Trying to create a new user ...")
    console.log("How do we get the form data??")

    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name // Speichern von Input aus dem Feld "create_first_name" in die Datenbank
    const lastName = req.body.create_last_name 
    const email = req.body.create_email 
    const street = req.body.create_street 
    const houseNumber = req.body.create_house_number 
    const postCode = req.body.create_post_code 
    const city = req.body.create_city 
    const age = req.body.create_age 
    

    const queryString = "INSERT INTO users (first_name, last_name, email, street, house_number, post_code, city, age) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)"
    getConnection().query(queryString, [firstName, lastName, email, street, houseNumber, postCode, city, age], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertId);
        res.end()    
    })

   //res.end()
})

function getConnection() {
    var conString = "postgres://qoxkyjqonastys:d09d2f56a0fdbe15008c9944b7464536e0dd2a4deb9f7081c09e2ba38934a3db@ec2-54-243-235-153.compute-1.amazonaws.com:5432/d8shhik6c8ht1r";
    var client = new pg.Client(conString);
    client.connect();

    return client;
}

// Verbindung zur localhost DB
app.get('/users/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)
    
    const connection = getConnection()

// Ausgabe aller Datensätze der Tabelle einer bestimmten ID
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id =?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) { // Wenn Error, dann sende Error Status
            console.log("Failed to query for users " + err)
            res.sendStatus(500)
            return
        }
    
    console.log("Users has been fetched successfully")

    // Ausgabe von definierten Feldern
    const users = rows.map(row => {
        return{firstName: row.first_Name, lastName: row.last_Name, email: row.email, stree: row.street, housenumber: row.house_number, postcode: row.post_code, city: row.city, age: row.age, quizpoints: row.quiz_points }
    })

    res.json(users)
})

    // res.end()
})



 // Verbindung zur localhost DB
app.get('/users', (req, res) => {
    console.log("Fetching all users")

    var conString = "postgres://qoxkyjqonastys:d09d2f56a0fdbe15008c9944b7464536e0dd2a4deb9f7081c09e2ba38934a3db@ec2-54-243-235-153.compute-1.amazonaws.com:5432/d8shhik6c8ht1r";
    var client = new pg.Client(conString);
    client.connect();

    // Ausgabe aller Zeilen der Tabelle
    client.query("SELECT * FROM users", (err, rows, fields) => {
      console.log("Users has been fetched successfully")
      res.json(rows)
    })
})

app.get('/create_user', function(req,res){
 res.sendfile(__dirname + '/public/form.html');
}); 


// Ausgabe von "Hello from Root" bei request von Root Pfad
/* 
app.get("/", (req, res) => {
console.log("Responding to root route")
res.send("Hello from Root")
})
*/

// Localhost:3006

app.listen(process.env.PORT || 3006, () => {
    console.log("Server is up and listening on port: " + process.env.PORT || 3006)
})

