const enviarMensagem = () => {
  const links = document.querySelectorAll('a[data-product]');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const product = this.getAttribute('data-product');
      const message = `Olá, gostaria de comprar o perfume ${product}.`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/5587988440740?text=${encodedMessage}`;
      window.open(url, '_blank');
    });
  }
}
enviarMensagem();

// const ampliarImagem = () => { //amplia a imagem
//   const divs = document.querySelectorAll(".a1");
//   divs.forEach((div) => {
//     const img = div.querySelector(".img1");
//     div.addEventListener("touchstart", (e) => {
//       const x = e.clientX - e.target.offsetCenter;
//       const y = e.clientY - e.target.offsetCenter;
//       img.style.transformOrigin = `${x}px ${y}px`;
//       img.style.transform = "scale(1.5)";
//     });
//     div.addEventListener("touchend", () => {
//       img.style.transformOrigin = "center center";
//       img.style.transform = "scale(1)";
//     });
//   });
// }
// ampliarImagem();