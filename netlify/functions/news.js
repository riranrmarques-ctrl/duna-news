const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function () {
  const res = await fetch("https://ilheuseventos.com.br/");
  const html = await res.text();

  const $ = cheerio.load(html);

  let tituloPrincipal = "";
  let imagemPrincipal = "";

  const candidatosTitulo = [
    ".jeg_heroblock .jeg_post_title a",
    ".jeg_hero_item_1 .jeg_post_title a",
    ".featured-post .jeg_post_title a",
    ".jeg_main_content .jeg_post_title a",
    "h1 a",
    "h2 a"
  ];

  for (const seletor of candidatosTitulo) {
    const texto = $(seletor).first().text().trim();
    if (texto) {
      tituloPrincipal = texto;
      break;
    }
  }

  const candidatosImagem = [
    ".jeg_heroblock img",
    ".jeg_hero_item_1 img",
    ".featured-post img",
    ".jeg_main_content img",
    "img"
  ];

  for (const seletor of candidatosImagem) {
    const el = $(seletor).first();
    const src =
      el.attr("src") ||
      el.attr("data-src") ||
      el.attr("data-lazy-src") ||
      el.attr("srcset");

    if (src) {
      imagemPrincipal = src.split(",")[0].trim().split(" ")[0];
      break;
    }
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
