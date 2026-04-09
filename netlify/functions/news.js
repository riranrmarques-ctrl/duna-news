const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const $ = cheerio.load(html);

  const capa = $(".jeg_heroblock");

  const tituloPrincipal = capa.find(".jeg_post_title a").first().text().trim();

  let imagemPrincipal =
    capa.find("img").first().attr("data-src") ||
    capa.find("img").first().attr("src");

  if (imagemPrincipal && imagemPrincipal.startsWith("data:image")) {
    imagemPrincipal = "";
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
