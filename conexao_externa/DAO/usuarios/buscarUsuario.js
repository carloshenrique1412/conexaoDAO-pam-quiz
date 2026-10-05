import {conexao} from '../conexao.js'

export async function buscarusuario(){
    console.log('DAO de usuario')
      const sql = `SELECT * FROM usuarios`
      
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
  