import {conexao} from '../conexao.js'

async function inserirUsuario(infos){
    const data = [infos]
    const sql = `INSERT INTO usuarios (nome, email, estado, sexo) VALUES?`
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql,[data]);

        await conn.end()
        return results
      } catch (err) {
        throw new Error(err.message)
      }
}

export {inserirUsuario}