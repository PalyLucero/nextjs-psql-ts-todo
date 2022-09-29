import { NextApiRequest, NextApiResponse } from "next"
import { conn } from 'src/utils/database'

const tasks = async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body } = req

    switch (method) {
        case 'GET':
            // console.log('\x1b[42m%s\x1b[0m', req.method, req.url)

            try {
                const query = 'SELECT * FROM tasks'
                const response = await conn.query(query)

                return res.status(200).send(response.rows)
            } catch (error: any) {
                console.log(error)
                return res.status(400).json({ error: error.message })
            }

        case 'POST':
            // console.log('\x1b[42m%s\x1b[0m', req.method, req.url)
            try {
                const { title, description } = body
                const query = 'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *'
                const values = [title, description]

                const response = await conn.query(query, values)

                return res.status(200).send(response.rows)
            } catch (error: any) {
                console.log(error)
                return res.status(400).json({ error: error.message })
            }

        default:
            // console.log('\x1b[41m%s\x1b[0m', req.method, req.url)
            return res.status(400).send('invalid task')
    }
}

export default tasks