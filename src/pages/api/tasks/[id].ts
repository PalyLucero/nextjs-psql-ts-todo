import { NextApiRequest, NextApiResponse } from "next"
import { conn } from 'src/utils/database'

const byId = async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, query, body } = req

    switch (method) {
        case "GET":
            try {
                const consult = 'SELECT * FROM tasks WHERE id = $1'
                const value = [query.id]
                const result = await conn.query(consult, value)
                if (result.rows.length < 1) {
                    throw new Error('Invalid ID');
                }
                return res.json(result.rows)
            } catch (error: any) {
                console.log(error)
                return res.status(400).json([{ error: error.message }])
            }

        case "PUT":
            try {
                const { title, description } = body
                const consult = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *'
                const value = [title, description, query.id]
                const result = await conn.query(consult, value)
                // if(result.rows.length < 1){
                //     throw new Error('Invalid ID');
                // }
                return res.json(result.rows)
            } catch (error: any) {
                console.log(error)
                return res.status(400).json([{ error: error.message }])
            }

        case "DELETE":
            try {
                const consult = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
                const value = [query.id]
                const result = await conn.query(consult, value)
                if (result.rows.length < 1) {
                    throw new Error('Invalid ID');
                }
                return res.json(result.rows)
            } catch (error: any) {
                console.log(error)
                return res.status(400).json([{ error: error.message }])
            }

        default:
            return res.status(400).json('Method not allowed')
    }
}

export default byId