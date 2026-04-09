const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const res = await fetch("https://ilheuseventos.com.br/");

    if (!res.ok) {
      throw new Error(`Falha ao acessar o site: ${res.status}`);
    }

    const html = await res.text();

    const imagemMatch = html.match(
      /<img[^>]+src="(https:\/\/ilheuseventos\.com\.br\/[^"]+\.(jpg|jpeg|png|webp))"/i
    );

    const tituloMatch = html.match(
      /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*title="([^"]+)"/i
    );

    const imagemPrincipal = imagemMatch ? imagemMatch[1] : "";
    const linkNoticia = tituloMatch ? tituloMatch[1] : "";
    const tituloPrincipal = tituloMatch ? tituloMatch[2] : "Sem título";

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
