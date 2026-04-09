const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const res = await fetch("https://ilheuseventos.com.br/");
    const html = await res.text();

    // Regex para pegar imagem de fundo + título principal
    const match = html.match(
      /data-bg-image="url\((https:\/\/ilheuseventos\.com\.br\/site\/wp-content\/uploads\/[^"]+)\)"[\s\S]*?<h1 itemprop="name" class="entry-title qode-post-title">[\s\S]*?<a[^>]*title="([^"]+)"/i
    );

    const imagemPrincipal = match ? match[1] : "";
    const tituloPrincipal = match ? match[2] : "Sem título";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify([
        {
          titulo: tituloPrincipal,
          imagem: imagemPrincipal
        }
      ])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        erro: "Erro ao buscar notícia",
        detalhe: error.message
      })
    };
  }
};
