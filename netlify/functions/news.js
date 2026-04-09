const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const $ = cheerio.load(html);

  const titulo = $(".jeg_post_title a").first().text().trim();

  let imagem =
    $(".jeg_thumb img").first().attr("data-src") ||
    $(".jeg_thumb img").first().attr("src");

  if (imagem && imagem.startsWith("data:image")) {
    imagem = "";
  }

  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        titulo,
        imagem
      }
    ])
  };
};
