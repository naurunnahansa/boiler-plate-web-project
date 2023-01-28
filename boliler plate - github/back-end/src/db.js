var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let dbSqlite3 = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        dbSqlite3.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            email text UNIQUE NOT NULL,
            password text  NOT NULL,
            type text NOT NULL,
            createdAt DATETIME,
            updatedAt DATETIME,
            CONSTRAINT email_unique UNIQUE (email)
            )`  
            ,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insertAdmin = `INSERT INTO user (username, email, password, type, createdAt, updatedAt) VALUES (?,?,?,'admin',datetime('now','0 day','localtime'),NULL)`
                var insertUser = `INSERT INTO user (username, email, password, type, createdAt, updatedAt) VALUES (?,?,?,'user',datetime('now','0 day','localtime'),NULL)`
                dbSqlite3.run(insertAdmin, ["admin","admin@example.com",md5("admin123456")])
                dbSqlite3.run(insertUser, ["user","user@example.com",md5("user123456")])
                dbSqlite3.run(`
                CREATE TABLE example (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    exampleData VARCHAR,
                    created_at DATETIME,
                    updated_at DATETIME,
                    FOREIGN KEY (user_id)
                    REFERENCES user (id)
                )`)
                dbSqlite3.run(`
                CREATE TABLE blacklistedTokens (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    token VARCHAR NOT NULL
                )`)
            }
        });  
    }
});

let db = require('aa-sqlite')
async function openDb(){await db.open(DBSOURCE)} openDb();

module.exports = db