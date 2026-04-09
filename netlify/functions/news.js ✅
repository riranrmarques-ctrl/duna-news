const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const $ = cheerio.load(html);

  const capa = $(".jeg_heroblock .jeg_post");
  const tituloPrincipal = capa.find(".jeg_post_title a").first().text().trim();
  const imagemPrincipal = capa.find("img").first().attr("src");

  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        titulo: tituloPrincipal,
        imagem: imagemPrincipal
      }
    ])
  };
};
