const orderlist = document.querySelector(".orderlist");

function displayOrders() {
    const orderitems = JSON.parse(localStorage.getItem("order")) || [];
    orderlist.innerHTML = "";

    orderitems.forEach((ele, orderIndex) => {
        orderlist.innerHTML += `<h2>Order Number: ${orderIndex + 1}</h2>`;

        ele.forEach((order, itemIndex) => {
            orderlist.innerHTML += `
            <div>
                <img src="${order.thumbnail}" alt="${order.title}">
                <h3>${order.title}</h3>
                <h3>$${order.price * order.qty}</h3>
                <h3>Quantity: ${order.qty}</h3>
                <button class="delete-btn" onclick="deleteOrder(${orderIndex}, ${itemIndex})">Delete</button>
            </div>
            `;
        });

        orderlist.innerHTML += `<hr>`;
    });
}


function deleteOrder(orderIndex, itemIndex) {
    let orders = JSON.parse(localStorage.getItem("order")) || [];
    

    orders[orderIndex].splice(itemIndex, 1);
    
    
    if (orders[orderIndex].length === 0) {
        orders.splice(orderIndex, 1);
    }


    localStorage.setItem("order", JSON.stringify(orders));


    displayOrders();
}


displayOrders();




   