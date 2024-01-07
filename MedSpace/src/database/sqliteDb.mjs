import sqlite3 from "sqlite3";

/*
CREATE TABLE medicine (cis INT PRIMARY KEY, name TEXT, form TEXT)
CREATE TABLE admin_route (id INT PRIMARY KEY, cis INT, route TEXT, FOREIGN KEY (cis) REFERENCES medicine)
CREATE TABLE owner (id INT PRIMARY KEY, cis INT, company TEXT, FOREIGN KEY (cis) REFERENCES medicine)
 */
export const SqliteDb = {
    InsertMed(db, cis, name, form) {
        name = name.split(",")[0]
        name = name.replaceAll("\"", "")
        const sql = `INSERT INTO medicine VALUES (${cis}, \"${name}\", \"${form}\");`;
        db.run(sql)
    },

    InsertRoute(db, cis, route) {
        route = route.replaceAll("\"", "")
        const sql = `INSERT INTO admin_route (cis, route) VALUES (${cis}, \"${route}\")`;
        db.run(sql)
    },

    InsertOwner(db, cis, company) {
        company = company.replaceAll("\"", "")
        const sql = `INSERT INTO owner (cis, company) VALUES (${cis}, \"${company}\")`;
        db.run(sql)
    }
}
