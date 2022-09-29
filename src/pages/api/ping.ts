import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

type Data = {
  message: string
  time: string
}

const ping = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const response = await conn.query("SELECT NOW()")
  console.log(response.rows)

  return res.json({ message: 'pong', time: response.rows[0].now })
}

export default ping