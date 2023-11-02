import fs from 'fs';
import chalk from "chalk";


function extaiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultado = capturas.map(captura => ({ [captura[1]]: captura[2] }))
    return resultado.length !== 0 ? resultado : 'Não há links no arquivo';
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivos no diretorio'));

}

//Promises com async/await
async function pegaArquivo(caminhoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extaiLinks(texto);

    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo;


