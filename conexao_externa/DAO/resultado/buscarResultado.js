import {conexao} from '../conexao.js'

export async function buscarResultado(){
    console.log('DAO de resultado')
      const sql = `SELECT * FROM resultados`
      
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
  