import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

/**
 * Return a promise containing an instance of the SQLite database
 */
export const getDBConnection = async () => {
    return openDatabase({ name: "database.sqlite3", createFromLocation : "~database.sqlite3"},
        (db) => {console.log("Database open : ", db)},
        (err) => console.log("Database error will opening :\n", err));
}

/**
 * Use to populate the database with medicines
 * @param db
 * @param cis
 * @param name
 * @param form
 */
export const insertMed = async (db: SQLiteDatabase, cis: number, name: String, form: String) => {
    name = name.split(",")[0]
    name = name.replaceAll("\"", "")
    const sql = `INSERT INTO medicine VALUES (${cis}, \"${name}\", \"${form}\");`;
    await db.executeSql(sql)
}

/**
 * Use to populate the database with medicine's administration routes
 * @param db
 * @param cis
 * @param route
 */
export const insertRoute = async (db: SQLiteDatabase, cis: number, route: String) => {
    route = route.replaceAll("\"", "")
    const sql = `INSERT INTO admin_route (cis, route) VALUES (${cis}, \"${route}\")`;
    await db.executeSql(sql)
}

/**
 * Use to populate the database with medicine's owners
 * @param db
 * @param cis
 * @param company
 */
export const insertOwner = async (db: SQLiteDatabase, cis: number, company: String) => {
    company = company.replaceAll("\"", "")
    const sql = `INSERT INTO owner (cis, company) VALUES (${cis}, \"${company}\")`;
    await db.executeSql(sql)
}