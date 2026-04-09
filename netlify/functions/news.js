const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const res = await fetch("https://ilheuseventos.com.br/");

    if (!res.ok) {
      throw new Error(`Falha ao acessar o site: ${res.status}`);
    }

    const html = await res.text();

    const match = html.match(
      /data-bg-image="url\((https:\/\/ilheuseventos\.com\.br\/site\/wp-content\/uploads\/[^"]+)\)"[\s\S]*?<h1 itemprop="name" class="entry-title qode-post-title">[\s\S]*?<a[^>]*href="([^"]+)"[^>]*title="([^"]+)"/i
    );

    const imagemPrincipal = match ? match[1] : "";
    const linkNoticia = match ? match[2] : "";
    const tituloPrincipal = match ? match[3] : "Sem título";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify([
        {
          titulo: tituloPrincipal,
          imagem: imagemPrincipal,
          link: linkNoticia
        }
      ])
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        erro: "Erro ao buscar notícia",
        detalhe: error.message
      })
    };
  }
};
