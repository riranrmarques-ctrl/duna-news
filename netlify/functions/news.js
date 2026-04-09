const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const $ = cheerio.load(html);

  let tituloPrincipal = "";
  let imagemPrincipal = "";

  // Pega qualquer título válido (mais seguro)
  $("a").each((i, el) => {
    const texto = $(el).text().trim();

    if (
      texto.length > 30 && 
      texto.length < 200 &&
      !tituloPrincipal
    ) {
      tituloPrincipal = texto;
    }
  });

  // Pega primeira imagem real (ignora base64)
  $("img").each((i, el) => {
    const src =
      $(el).attr("data-src") ||
      $(el).attr("data-lazy-src") ||
      $(el).attr("src");

    if (src && !src.startsWith("data:image") && !imagemPrincipal) {
      imagemPrincipal = src;
    }
  });

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
