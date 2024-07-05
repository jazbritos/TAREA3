const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
const orderSummaryElement = document.getElementById("orderSummary");
let purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  const productName = priceElement.options[priceElement.selectedIndex].getAttribute('data-name');

  if (price && number && productName) {
    let purchase = {
      price: price,
      number: number,
      name: productName
    };

    purchases.push(purchase);
    updateOrderSummary();
    
    // Mostrar ventana emergente con la información del producto añadido
    alert(`Producto añadido:\nNombre: ${productName}\nCantidad: ${number}`);
  } else {
    alert("Por favor seleccione un producto y una cantidad válida.");
  }
}

function updateOrderSummary() {
  let summaryHTML = "<h3>Resumen del pedido:</h3><ul>";

  for (let i = 0; i < purchases.length; i++) {
    summaryHTML += `<li>${purchases[i].name} - ${purchases[i].number} x ${purchases[i].price} yenes</li>`;
  }

  summaryHTML += "</ul>";
  orderSummaryElement.innerHTML = summaryHTML;
}

function calc() {
  let subtotal = 0;

  for (let i = 0; i < purchases.length; i++) {
    subtotal += purchases[i].price * purchases[i].number;
  }

  let shipping = 0;
  if (subtotal < 2000) {
    shipping = 500;
  } else if (subtotal < 3000) {
    shipping = 250;
  }

  const total = subtotal + shipping;

  let details = "Detalles del pedido:\n";
  for (let i = 0; i < purchases.length; i++) {
    details += `Producto: ${purchases[i].name}, Precio: ${purchases[i].price} yenes, Cantidad: ${purchases[i].number}\n`;
  }

  details += `Subtotal: ${subtotal} yenes\n`;
  details += `Gastos de envío: ${shipping} yenes\n`;
  details += `Importe total: ${total} yenes\n`;

  alert(details);
  
  // Reset
  purchases = [];
  priceElement.value = "0";
  numberElement.value = "1";
  orderSummaryElement.innerHTML = "";
}
