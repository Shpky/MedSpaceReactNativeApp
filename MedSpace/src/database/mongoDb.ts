import {MongoClient} from "mongodb";
import {getDBConnection, insertMed, insertRoute, insertOwner} from "./tests";

const uri = "mongodb://167.71.43.120:27016/";

export const MongoDb =  {
    async RefreshData() {

        const db = await getDBConnection()

        await db.executeSql("DELETE FROM medicine;")
        await db.executeSql("DELETE FROM admin_route;")
        await db.executeSql("DELETE FROM owner;")

        const client = new MongoClient(uri);
        const database = client.db("medspace");
        const cis = database.collection("cis");

        const medicines = cis.find({});
        for await (const doc of medicines) {
            await insertMed(db, doc._id, doc.medName, doc.pharmaForm)
            for (const route of doc.administrationRoutes) {
                await insertRoute(db, doc._id, route)
            }
            for (const company of doc.owners) {
                await insertOwner(db, doc._id, company)
            }
        }
        await client.close();
    }
}