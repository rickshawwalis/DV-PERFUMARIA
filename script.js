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
