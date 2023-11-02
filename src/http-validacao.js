import chalk from "chalk";

function extaiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checarStatus(listaUrl) {
    const arrStatus = await Promise
        .all(
            listaUrl.map(async (url) => {
                try {
                    const response = await fetch(url);
                    return `${response.status} - ${response.statusText}`;
                } catch (erro) {
                    return manejaErro(erro);
                }
            })
        )
    return arrStatus;
}

function manejaErro(erro){
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    }
}

export default async function listaValidada(listaDeLinks) {
    const links = extaiLinks(listaDeLinks);
    const status = await checarStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice],
    }))

}

