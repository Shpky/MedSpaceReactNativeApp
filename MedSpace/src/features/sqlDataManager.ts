import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';


const uri = "mongodb://167.71.43.120:27016/";
/*
export const MongoDb = {
    async RefreshData() {

        const db = await getDBConnection()

        await db.executeSql("DELETE FROM medicine;")
        await db.executeSql("DELETE FROM admin_route;")
        await db.executeSql("DELETE FROM owner;")
        /*
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
*/

/*
CREATE TABLE medicine (cis INT PRIMARY KEY, name TEXT, form TEXT)
CREATE TABLE admin_route (id INT PRIMARY KEY, cis INT, route TEXT, FOREIGN KEY (cis) REFERENCES medicine)
CREATE TABLE owner (id INT PRIMARY KEY, cis INT, company TEXT, FOREIGN KEY (cis) REFERENCES medicine)
*/
export const getDBConnection = async () => {
    return openDatabase({ name: "../database/database.sqlite3" },
        (success) => {console.log("Database open successful")},
        (err) => console.log("Database error will opening :\n", err));
}

export const insertMed = async (db: SQLiteDatabase, cis: number, name: String, form: String) => {
    name = name.split(",")[0]
    name = name.replaceAll("\"", "")
    const sql = `INSERT INTO medicine VALUES (${cis}, \"${name}\", \"${form}\");`;
    await db.executeSql(sql)
}

export const insertRoute = async (db: SQLiteDatabase, cis: number, route: String) => {
    route = route.replaceAll("\"", "")
    const sql = `INSERT INTO admin_route (cis, route) VALUES (${cis}, \"${route}\")`;
    await db.executeSql(sql)
}

export const insertOwner = async (db: SQLiteDatabase, cis: number, company: String) => {
    company = company.replaceAll("\"", "")
    const sql = `INSERT INTO owner (cis, company) VALUES (${cis}, \"${company}\")`;
    await db.executeSql(sql)
}