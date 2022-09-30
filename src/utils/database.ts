import { Pool } from 'pg'

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const database = process.env.DB_NAME

let conn: any

if (!conn) {
    conn = new Pool({
        user: user,
        password: password,
        host: host,
        port: 5432,
        database: database
    })
}

export { conn }
