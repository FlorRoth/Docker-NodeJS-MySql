import express from "express";
import { createPool}  from "mysql2";
import { config } from "dotenv";

config();

const app = express();
const pool= createPool({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    port: process.env.MYSQLDB_PORT_DOCKER,
    database: process.env.MYSQLDB_DATABASE 
})
app.get('/',(req,res) => {
    res.send('holi')
})

app.get('/ping', async (req,res) => {
    pool.query('SELECT NOW()', (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.send(results[0]);
        }
    });
});


app.listen(process.env.NODE_PORT_DOCKER);

console.log("Server on port",process.env.NODE_PORT_DOCKER)
