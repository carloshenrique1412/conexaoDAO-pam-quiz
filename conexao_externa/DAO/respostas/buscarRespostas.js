import {conexao} from '../conexao.js'

export async function buscarResposta(){
    console.log('DAO de resposta')
      const sql = `SELECT * FROM respostas`
      
      const conn = await conexao()
      try {
          // Executar a consulta
          const [rows, fields] = await conn.query(sql);
          await conn.end()
          return rows
        } catch (err) {
          return err.message
        }
  }
  