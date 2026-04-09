exports.handler = async function () {
  const tituloPrincipal = "Moradores denunciam conduta de motoristas da Atlântico em linha da zona norte de Ilhéus";
  const imagemPrincipal = "https://ilheuseventos.com.br/site/wp-content/uploads/2026/04/IMG_5912.jpeg";

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
