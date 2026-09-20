import {conexao} from '../conexao.js'

async function inserirResultado(infos){
    const data = [infos]
    const sql = `INSERT INTO resultados (usuario_id, acertos) VALUES ?`
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

export {inserirResultado}