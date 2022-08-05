let rings = [];

// redirect to login if not logged in
const id = window.localStorage.getItem("id");
if (!id) {
  window.location.href = "login.html";
}

function search() {

  showTable();
}

function showTable() {
  
  fetch("http://localhost:3000/listRings")
    .then((response) => response.text())
    .then((data) => {
      rings = JSON.parse(data);
      console.log(rings)
      const filterString = document.getElementById("query").value;
      showCart();
      var myTables = `<table class="styled-table">`;
      myTables += `
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    </tr>`;

      rings
        .filter((r) => r.name.includes(filterString))
        .forEach((ring) => {
          myTables += `
                    <tr>
                   
                    <td>${ring.name}</td>
                    <td>${ring.price}</td>
                    <td>
                        <img src="${ring.imageUrl}" width="60" height="60">
                    </td>

                    <td>
                    <datalist id="quan">
                      <option value="1">
                      <option value="2">
                      <option value="3">
                      <option value="4">
                    </datalist>
                    
                    <form style="border:1px solid #ccc">

                    <input id="${ring._id}" list="quan" placeholder="Enter Quantity" name="quan" required>
                    <br>
                    <button type="button" class="signupbth" onclick="addToCart('${ring._id}')">Add To Cart<i class="icon-arrow-right22" ></i></button></td>
                </tr>
            `;
        });
      myTables += `</table>`;
      document.getElementById("myData").innerHTML = myTables;
    });
}

function addToCart(ringId) {
  const quantity = +document.getElementById(ringId).value;

  // add to cart localstorage
  let cart = window.localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  }

  if (ringId in cart) {
    cart[ringId] += quantity;
  } else {
    cart[ringId] = quantity;
  }

  // save to localstorage
  window.localStorage.setItem("cart", JSON.stringify(cart));

  // repaint the cart
  showCart();
}

function showCart() {
  let cart = window.localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  }

  var cartTable = `<table class="styled-table">`;
  // take only the rings in the cart
  const cartRings = rings.filter((r) => r._id in cart);
  if (cartRings.length === 0) {
    document.getElementById("cartSection").hidden = true;
  } else {
    document.getElementById("cartSection").hidden = false;
  }
  cartRings.forEach((ring) => {
    cartTable += `
                <tr>
                    <th>Remove</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    </tr>

                    <tr>
                   
                    <td><button onclick="removeFromCart('${
                      ring._id
                    }')">X</button></td>
                    <td>${ring.name}</td>
                    <td>${ring.price}</td>
                    <td>
                        <img src="${ring.imageUrl}" width="60" height="60">
                    </td>

                    <td>
                    ${cart[ring._id]}
                    </td>
                </tr>
            `;
  });
  cartTable += `</table>`;
  document.getElementById("cart").innerHTML = cartTable;
}

function removeFromCart(ringId) {
  let cart = window.localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  }

  if (ringId in cart) {
    delete cart[ringId];
  }

  window.localStorage.setItem("cart", JSON.stringify(cart));
  // repaint the cart
  showCart();
}

function setError(error) {
  const err = document.getElementById("error");
  err.innerHTML = error;
}

function orderCart() {
  setError("");
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  let cart = window.localStorage.getItem("cart");
  cart = JSON.parse(cart);

  if (name.length === 0) {
    setError("Name is required!");
    return;
  }
  if (address.length === 0) {
    setError("Address is required!");
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    id,
    cart,
    name,
    address,
    payment,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/order", requestOptions)
    .then((result) => {
      console.log(result);
      if (result.status === 200) {
        alert("Ordered successfully");
        // clear the cart on success
        window.localStorage.setItem("cart", "{}");
        showCart();
      } else {
        alert("Failed ordering");
      }
    })
    .catch((error) => alert("Failed ordering"));
}

showTable();
