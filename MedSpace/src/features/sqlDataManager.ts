import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

/*
CREATE TABLE medicine (cis INT PRIMARY KEY, name TEXT, form TEXT)
CREATE TABLE admin_route (id INT PRIMARY KEY, cis INT, route TEXT, FOREIGN KEY (cis) REFERENCES medicine)
CREATE TABLE owner (id INT PRIMARY KEY, cis INT, company TEXT, FOREIGN KEY (cis) REFERENCES medicine)
*/
export const getDBConnection = async () => {
    return openDatabase({ name: "database.sqlite3", createFromLocation : "~database.sqlite3"},
        (db) => {console.log("Database open : ", db)},
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