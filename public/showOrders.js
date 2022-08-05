function showTable() {
    fetch('/getOrders')
        .then(Response => Response.text())
        .then(data => {
            var Types = JSON.parse(data);
            var myTables= "";
            Types.array.forEach(element => {

                myTables += `
                
             <form form action="/getOrders" method="get">
                
                <label for="first" name = "name"><b>Order Id</b></label>
                <td id="name"><a>${element.id}</a><td>
                <input type= "hidden" name="_id" value="${element.id}"><br>

                <label for="last" name="price"><b>Full Name</b></label>
                <td id="price"><a>${element.full_name}</a><td>
                <input type="hidden" name="full_name" value="${element.full_name}"> <br>

                <label for="last" name="price"><b>email</b></label>
                <td id="price"><a>${element.email}</a><td>
                <input type ="hidden" name="email" value="${element.email}"><br>
                
                <label for="last" name="price"><b>Address</b></label>
                <td id="price"><a>${element.Address}</a><td>
                <input type ="hidden" name="Address" value="${element.Address}"><br>
                
                <label for="last" name="price"><b>City</b></label>
                <td id="price"><a>${element.City}</a><td>
                <input type ="hidden" name="City" value="${element.City}"><br>

                <label for="last" name="price"><b>State</b></label>
                <td id="price"><a>${element.State}</a><td>
                <input type ="hidden" name="State" value="${element.State}"><br>

                <label for="last" name="price"><b>Zip</b></label>
                <td id="price"><a>${element.Zip}</a><td>
                <input type ="hidden" name="Zip" value="${element.Zip}"><br>

                <label for="last" name="price"><b>Name on Card</b></label>
                <td id="price"><a>${element.name_on_card}</a><td>
                <input type ="hidden" name="Name on Card" value="${element.name_on_card}"><br>

                <label for="last" name="price"><b>Credit Card</b></label>
                <td id="price"><a>${element.credit_card}</a><td>
                <input type ="hidden" name="Credit Card" value="${element.credit_card}"><br>

                <label for="last" name="price"><b>Exp Month</b></label>
                <td id="price"><a>${element.exp_month}</a><td>
                <input type ="hidden" name="Exp Month" value="${element.exp_month}"><br>

                <label for="last" name="price"><b>Exp Year</b></label>
                <td id="price"><a>${element.exp_year}</a><td>
                <input type ="hidden" name="Exp Year" value="${element.exp_year}"><br>

                <label for="last" name="price"><b>CVV</b></label>
                <td id="price"><a>${element.cvv}</a><td>
                <input type ="hidden" name="CVV" value="${element.cvv}"><br>

                <label for="last" name="price"><b>Product Name</b></label>
                <td id="price"><a>${element.name}</a><td>
                <input type ="hidden" name="Product Name" value="${element.name}"><br>

                <label for="last" name="price"><b>Price</b></label>
                <td id="price"><a>${element.price}</a><td>
                <input type ="hidden" name="Price" value="${element.price}"><br>

                <label for="last" name="price"><b>Quantity</b></label>
                <td id="price"><a>${element.quan}</a><td>
                <input type ="hidden" name="Quantity" value="${element.quan}"><br>

                <label for="last" name="price"><b>Img Name</b></label>
                <td id="price"><a>${element.url_img}</a><td>
                <input type ="hidden" name="Img Name" value="${element.url_img}"><br>

                <label for="last" name="price"><b>Order Date</b></label>
                <td id="price"><a>${element.order_date}</a><td>
                <input type ="hidden" name="Order Date" value="${element.order_date}"><br>

                <label for="last" name="price"><b>Status</b></label>
                <td id="price"><a>${element.status}</a><td>
                
                <label for="last" name="price"><b>Close Date</b></label>
                <td id="price"><a>${element.close_date}</a><td>

            </form>

            <form form action="/changeOrders method="get">

                <label for="first" name="name"><b>Update Status Order</b></label>
                <input type="hidden" name="stayus" ${element.status}>
                <td><button type="submit" class="signupbtn"><Close Order</button></td><br>

                <a>------------------------------------------------------------------------</a></br>
                <br>
                <br>

            </form>

                `
            
                
            });
            document.getElementById("myData").innerHTML= myTables

        })
}