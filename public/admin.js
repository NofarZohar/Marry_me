let orders = [];
let rings = [];

function loadUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch("http://localhost:3000/getUsers", requestOptions)
    .then((response) => response.text())
    .then((users) => {
      // Build the users list
      const usersList = document.getElementById("users");
      const u = JSON.parse(users);
      u.forEach((user) => {
        usersList.innerHTML += `<div>
          <p>Name: ${user.username}</p>
          <input id="${user._id}" type="text" value="${
          user.userType ?? "user"
        }">
          <input type="button" value="Save User" onclick="saveUser('${
            user._id
          }')">
        </div>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCatalog() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch("http://localhost:3000/listRings", requestOptions)
    .then((response) => response.text())
    .then((rings) => JSON.parse(rings))
    .catch((error) => {
      console.log(error);
    });
}

function loadOrders() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  getCatalog().then((catalog) => {
    rings = catalog;
    fetch("http://localhost:3000/listOrders", requestOptions)
      .then((response) => response.text())
      .then((userOrders) => {
        // Build the users list
        const ordersList = document.getElementById("orders");
        ordersList.innerHTML = "<h3>Orders</h3>";
        orders = JSON.parse(userOrders);
        orders.forEach((order) => {
          const orderTime = new Date(order.orderTime);
          ordersList.innerHTML += `<div>
            <p>Name: ${order.name}</p>
            <p>Address: ${order.address}</p>
            <p>Payment: ${order.payment}</p>
            <p>Order Time: ${orderTime.toUTCString()}</p>
            <p>Status: ${order.complete ? "Complete" : "Incomplete"}</p>
            <p>Cart:
          `;

          // Iterate the cart entries. key = ringId, value = amount.
          Object.entries(order.cart).forEach(([ringId, amount]) => {
            const ring = rings.find((r) => r._id === ringId);
            ordersList.innerHTML += `${ring.name}: ${amount}<br>`;
          });

          ordersList.innerHTML += `</p>`;

          if (!order.complete) {
            ordersList.innerHTML += `<input type="button" value="Complete Order" onclick="completeOrder('${order._id}')">`;
          } else {
            const completeTime = new Date(order.completeTime);
            ordersList.innerHTML += `<p>Complete Time: ${completeTime.toUTCString()}</p>`;
          }

          ordersList.innerHTML += `</div>`;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function completeOrder(orderId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    id: window.localStorage.getItem("id"),
    orderId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/completeOrder", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        alert("Order updated successfully!");
        loadOrders();
      } else {
        alert("Failed to update the order");
      }
    })
    .catch((_) => {
      alert("Order updated successfully!");
    });
}

function saveUser(userId) {
  const userType = document.getElementById(userId).value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    requestingUser: window.localStorage.getItem("id"),
    targetUser: userId,
    userType: userType,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/setUserType", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        alert("Changed successfully!");
      } else {
        alert("Failed to set user type");
      }
    })
    .catch((_) => {
      alert("Failed to set user type");
    });
}

function setError(error) {
  const err = document.getElementById("error");
  err.innerHTML = error;
}

function newRing() {
  setError("");
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value;

  if (name.length === 0 || price <= 0 || imageUrl.length === 0) {
    setError("Invalid ring");
  }

  // save the ring
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    requestingUser: window.localStorage.getItem("id"),
    name,
    price,
    imageUrl,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/newRing", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        alert("Created successfully!");
      } else {
        alert("Failed to create the new ring");
      }
    })
    .catch((_) => {
      alert("Failed to create the new ring");
    });
}

loadUsers();
loadOrders();
