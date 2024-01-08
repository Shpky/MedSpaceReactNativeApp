/*
import {MongoClient} from "mongodb";
import sqlite3 from "sqlite3";
import {MongoDb} from "./mongoDb.ts";

const db = new sqlite3.Database("<PathToDatabaseFile>")
const sql = "<YourSqlRequest>"
db.all(sql, (err, rows) => {
    //DO SOMETHING
})
db.close()
async function testMDB() {
    const uri = "mongodb://167.71.43.120:27016/";
    const client = new MongoClient(uri);
    const database = client.db("medspace");
    const cis = database.collection("cis");
    const medicine = await cis.findOne({});
    console.log(typeof medicine._id)
    await client.close();
}

function testSqlite() {
    const db = new sqlite3.Database("./database.sqlite3");
    let sql = "INSERT INTO medicine (\"3\", \"Coucou\", \"pommade\")"
    db.run(sql)
    sql = "SELECT * FROM medicine"
    db.all(sql, (err, rows) => {
        console.log(rows)
    })
    db.close()
}

function test() {
    let str = "STEROGYL 15 \"H\" 600 000 UI/1"
    str = str.replaceAll("\"", "")
    console.log(str)
}

await MongoDb.RefreshData();
//testSqlite();
//test();

 */