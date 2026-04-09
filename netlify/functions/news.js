const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const res = await fetch("https://ilheuseventos.com.br/");

    if (!res.ok) {
      throw new Error(`Falha ao acessar o site: ${res.status}`);
    }

    const html = await res.text();

    const regex =
      /data-bg-image="url\((https:\/\/ilheuseventos\.com\.br\/[^)]+)\)"[\s\S]*?<h1 itemprop="name" class="entry-title qode-post-title">\s*<a itemprop="url" href="([^"]+)" title="([^"]+)"/gi;

    const noticias = [];
    let match;

    while ((match = regex.exec(html)) !== null && noticias.length < 3) {
      noticias.push({
        imagem: match[1] || "",
        link: match[2] || "",
        titulo: match[3] || "Sem título"
      });
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(noticias)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        erro: "Erro ao buscar notícias",
        detalhe: error.message
      })
    };
  }
};
