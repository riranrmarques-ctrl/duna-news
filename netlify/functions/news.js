const fetch = require("node-fetch");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const blocoMatch = html.match(
    /<div class="qode-news-item qode-slider1-item[\s\S]*?<div class="qode-news-item-image-holder[\s\S]*?data-bg-image="url\((.*?)\)"[\s\S]*?<h1[^>]*class="entry-title qode-post-title"[\s\S]*?<a[^>]*title="(.*?)"/i
  );

  let imagemPrincipal = "";
  let tituloPrincipal = "";

  if (blocoMatch) {
    imagemPrincipal = blocoMatch[1] || "";
    tituloPrincipal = blocoMatch[2] || "";
  }

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
