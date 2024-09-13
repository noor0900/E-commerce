const main = document.querySelector(".main");
const btn = document.querySelector(".btn");
const sidebar = document.querySelector(".sidebar");


let products

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => (
    myFunction(data.products),
    products = data.products
  ))

function myFunction(data) {

  main.innerHTML = "";
  data.map((ele, index) => {
    main.innerHTML += `
             <div class="card" id="one">
        <div class="card-image-container">
         <img src=${ele.thumbnail}>
        </div>
        <p class="card-title">${ele.title}</p>
        <p class="card-des">
          ${ele.description}
        </p>
        <button onclick="Addtocard(${index})">Add to Card</button>
      </div>`
  })
};

function Addtocard(index) {

  const currentProduct = products[index];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const isProductExist = cart.find((ele) => ele.id === currentProduct.id)

  if (isProductExist) {
    isProductExist.qty += 1
  }
  else {
    currentProduct.qty = 1
    cart.push(currentProduct);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart()
};

btn.onclick = () => {
  sidebar.classList.toggle("right")
}


function displayCart() {

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  sidebar.innerHTML ="Order Summary: "  + cartItems.length + " items";
  sidebar.style.color="#d1d5db"; sidebar.style.fontSize="23px";
  cartItems.map((ele, index) => {
    sidebar.innerHTML += `
     <div class="cart-item">
        <div class="item-details">
          <div class="item-image">
            <img
              src=${ele.thumbnail}
              class="img-object"
            />
          </div>
          <div class="item-info">
            <h3 class="item-title">${ele.title}</h3>
            <h6 class="remove-item" onclick="removeItem(${index})">Remove</h6>

            <div class="size-and-quantity">
              
              <div class="quantity-selector">
                <button type="button" class="quantity-button">
                
                  <svg onclick="qtydecrease(${index})"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    viewBox="0 0 124 124"
                  >
                    <path
                      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    ></path>
                  </svg>
                  <span>${ele.qty}</span>
                  <svg onclick="qtyincrease(${index})"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    viewBox="0 0 42 42"
                  > 
                    <path
                      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="item-price">
          <h4>$${ele.price * ele.qty}</h4>
        </div>
      </div>
      
      `
  })
  sidebar.innerHTML += ` <button class="checkout" onclick="checkout()">Check-Out</button>`
};
displayCart();


function qtyincrease(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentProduct = cart[index];
  currentProduct.qty += 1

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart()

}
function qtydecrease(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentProduct = cart[index];
  if (currentProduct.qty > 1) {
    currentProduct.qty -= 1
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart()
}
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentProduct = cart[index];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.qty
  }, 0);

  const totalqty = cart.reduce((acc,ele)=>{
    return acc + ele.qty
  },0);

  const orderConfirmation = confirm(`Are You Sure You Want To Checkout With \n Total Amount : $${totalPrice} \n Total Quantity : ${totalqty} `);

  if (orderConfirmation) {
    console.log("order placed");
    
    const order=JSON.parse(localStorage.getItem("order")) || [];
    order.push(cart);
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("cart", JSON.stringify([]));
  displayCart();


  }
  else {
    console.log("order cancelled");
  }

}
