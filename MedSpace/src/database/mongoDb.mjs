import {MongoClient} from "mongodb";
import {SqliteDb} from "./sqliteDb.mjs";
import sqlite3 from "sqlite3";

const uri = "mongodb://167.71.43.120:27016/";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const MongoDb =  {
    async RefreshData() {

        const db = new sqlite3.Database("./database.sqlite3");

        db.run("DELETE FROM medicine")
        db.run("DELETE FROM admin_route")
        db.run("DELETE FROM owner")

        const client = new MongoClient(uri);
        const database = client.db("medspace");
        const cis = database.collection("cis");

        const medicines = cis.find({});
        for await (const doc of medicines) {
            SqliteDb.InsertMed(db, doc._id, doc.medName, doc.pharmaForm)
            for (const route of doc.administrationRoutes) {
                SqliteDb.InsertRoute(db, doc._id, route)
            }
            for (const company of doc.owners) {
                SqliteDb.InsertOwner(db, doc._id, company)
            }
        }
        await client.close();
        db.close();
    }
}
