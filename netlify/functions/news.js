const fetch = require("node-fetch");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

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
};
