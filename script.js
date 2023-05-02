(produtos = () =>{
  const links = document.querySelectorAll('a[data-product]');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const product = this.getAttribute('data-product');
      const message = `Olá, gostaria de comprar o produto ${product}.`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/5587988440740?text=${encodedMessage}`;
      window.open(url, '_blank');
    });
  }
})()



async function calcularFrete(cepOrigem, cepDestino) {
  // Consulta os dados de endereço a partir do CEP de origem
  const urlOrigem = `https://viacep.com.br/ws/${cepOrigem}/json/`;
  const responseOrigem = await fetch(urlOrigem);
  const dataOrigem = await responseOrigem.json();

  // Consulta os dados de endereço a partir do CEP de destino
  const urlDestino = `https://viacep.com.br/ws/${cepDestino}/json/`;
  const responseDestino = await fetch(urlDestino);
  const dataDestino = await responseDestino.json();

  // Obtém as coordenadas geográficas dos dois endereços
  const latOrigem = dataOrigem.lat;
  const lngOrigem = dataOrigem.lng;
  const latDestino = dataDestino.lat;
  const lngDestino = dataDestino.lng;

  // Consulta a rota entre os dois endereços
  const urlRota = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=SUA_CHAVE_DE_API&start=${lngOrigem},${latOrigem}&end=${lngDestino},${latDestino}`;
  const responseRota = await fetch(urlRota);
  const dataRota = await responseRota.json();

  // Obtém a distância em quilômetros da rota calculada
  const distanciaEmKm = dataRota.features[0].properties.segments[0].distance / 1000;

  // Calcula o valor do frete com base na distância obtida
  const precoPorKm = 1.5; // preço por quilômetro
  const valorFrete = distanciaEmKm * precoPorKm;

  // Retorna o valor do frete
  return valorFrete;
}
