import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {ObjectId} from "mongodb";

/*
CREATE TABLE medicine (cis INT PRIMARY KEY, name TEXT, form TEXT)
CREATE TABLE admin_route (id INT PRIMARY KEY, cis INT, route TEXT, FOREIGN KEY (cis) REFERENCES medicine)
CREATE TABLE owner (id INT PRIMARY KEY, cis INT, company TEXT, FOREIGN KEY (cis) REFERENCES medicine)
*/

enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase({name: "database.sqlite3"});
}

export const insertMed = async(db: SQLiteDatabase, cis: ObjectId, name: String, form: String) => {
    name = name.split(",")[0]
    name = name.replaceAll("\"", "")
    const sql = `INSERT INTO medicine VALUES (${cis}, \"${name}\", \"${form}\");`;
    await db.executeSql(sql)
}

export const insertRoute= async(db: SQLiteDatabase, cis: ObjectId, route: String) => {
    route = route.replaceAll("\"", "")
    const sql = `INSERT INTO admin_route (cis, route) VALUES (${cis}, \"${route}\")`;
    await db.executeSql(sql)
}

export const insertOwner = async(db: SQLiteDatabase, cis: ObjectId, company: String) => {
    company = company.replaceAll("\"", "")
    const sql = `INSERT INTO owner (cis, company) VALUES (${cis}, \"${company}\")`;
    await db.executeSql(sql)
}
