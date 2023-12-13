

const errorAlert = document.querySelector('.alert-danger');
if (errorAlert) {
      setTimeout(function () {
            errorAlert.style.transition = "opacity 0.5s";
            errorAlert.style.opacity = 0;
      }, 2000);
}
$(document).ready(function () {
      loadProductinCart()
      $('#checkCustomer').click(function (event) {
            event.preventDefault();
            var phoneCustomerInput = $('#phone_customer').val();
            getCustomer(phoneCustomerInput);
      })
      $('#confirmation-information').on('click', function () {
            // Reset error message
            $('#paymentErrorMessage').text('');

            const phone = $('#phone_customer').val().trim();
            const name = $('#name_customer').val().trim();
            const address = $('#address_customer').val().trim();
            const paymentAmount = parseFloat($('#payment_customer').val());
            const totalAmount = parseFloat($('#total_customer').val());
            if (!phone) {
                  $('#paymentErrorMessage').text('Phone of customer must not be empty .');
                  return;
            }
            if (!name) {
                  $('#paymentErrorMessage').text('Name of customer must not be empty .');
                  return;
            }
            if (!address) {
                  $('#paymentErrorMessage').text('Address of customer must not be empty .');
                  return;
            }
            if (paymentAmount < totalAmount) {
                  $('#paymentErrorMessage').text('Cash is not enough to pay this invoice.');
                  return;
            }


            $('#checkForm').submit();


      });
      $('#bodyHistoryPurchaseCustomer').on('click', '.btn-orderdetail-information', function () {
            const id = $(this).data('id');
            console.log(id);
            $('#informationOrderdetailModal').modal('show');
            getOrderdetails(id);
      });
      formatMoney()

});

function formatMoney1(value) {
      var formattedPrice = parseFloat(value).toLocaleString('vi-VN');
      return formattedPrice;
}


$('#phone_customer_purchased').on('change', function () {
      const phoneInput = $(this).val();
      getCustomerPurchaseHistory(phoneInput);
      getHistoryPurchased(phoneInput)
});
$('#phone_customer_purchased').on('keydown', function () {
      setTimeout(() => {
            const phoneInput = $(this).val();
            getCustomerPurchaseHistory(phoneInput);
            getHistoryPurchased(phoneInput)
      }, 0);
});

function getCustomerPurchaseHistory(phoneInput) {
      const url = window.location.origin;
      fetch(`${url}/cart/cartCustomerInfor?phone=${phoneInput}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => response.json())
            .then(response => {
                  if (response.code == 0) {
                        $('#name_customer_purchased').val(response.customer.name);
                        $('#phone_customer_purchased').val(response.customer.phone);
                        $('#address_customer_purchased').val(response.customer.address);
                        $('#historyErrorMessage').text('');
                  } else {
                        $('#phone_customer_purchased').val(response.customer.phone);

                        $('#historyErrorMessage').text(response.message);
                  }
            })
            .catch(error => {
                  console.log('Failed to update session:', error);
            });
}

$('#phone_customer').on('change', function () {
      const phoneInput = $(this).val();
      getCustomer(phoneInput);
});

$('#phone_customer').on('keydown', function () {

      setTimeout(() => {
            const phoneInput = $(this).val();
            getCustomer(phoneInput);
      }, 0);
});
function moveToHistory() {
      $('#enterCustomerModal').modal('hide');
      $('a[data-toggle="pill"][href="#customer-information"]').click();
      const phone = $('#phone_customer_purchased').val();
      console.log(phone);
      getHistoryPurchased(phone)
}

$('#moveToHistory').on('click', moveToHistory);
function getHistoryPurchased(phone) {
      const url = window.location.origin;
      fetch(`${url}/cart/customerHistoryPurchase?phone=${phone}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(data => data.json())
            .then(data => {
                  if (data.code === 0) {
                        UpdateUIHistoryPurchased(data.data);
                  }
            })
            .catch(error => {
                  console.log('Failed to update session:', error);
            });
}

function UpdateUIHistoryPurchased(historyData) {
      const tbody = document.getElementById('bodyHistoryPurchaseCustomer');

      // Clear existing rows in tbody
      tbody.innerHTML = '';

      // Iterate through historyData and create table rows
      historyData.forEach((purchase, index) => {
            const tr = document.createElement('tr');

            const totalprice = formatMoney1(`${purchase.totalprice}`)
            const payment = formatMoney1(`${purchase.payment}`)
            const refund = formatMoney1(`${purchase.refund}`)
            tr.innerHTML = `
              <td>${index + 1}</td>
              <td>${purchase.id}</td>
              <td>${totalprice}</td>
              <td>${payment}</td>
              <td>${refund}</td>
              <td class="dateOfPurchase">${purchase.createdAt}</td>
              <td>
                  <div class="d-flex align-items-center list-action">
                     
                      <a type="button" class="btn-orderdetail-information badge badge-warning mr-2"
                          data-id="${purchase.id}" data-toggle="modal" data-placement="top">
                          <i class="fa-solid fa-receipt"></i>
                      </a>
                  </div>
              </td>
          `;

            tbody.appendChild(tr);
      });
      const dateElements = document.querySelectorAll('.dateOfPurchase');
      dateElements.forEach(formatDate);
}

function formatDate(dateElement) {
      const dateString = dateElement.textContent;
      const date = new Date(dateString);
      const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Ho_Chi_Minh'
      };
      dateElement.textContent = new Intl.DateTimeFormat('vi-VN', options).format(date);
}


function getCustomer(phoneInput) {
      const url = window.location.origin;
      fetch(`${url}/cart/cartCustomerInfor?phone=${phoneInput}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => response.json())
            .then(response => {
                  if (response.code == 0) {
                        $('#name_customer').val(response.customer.name);
                        $('#phone_customer').val(response.customer.phone);
                        $('#address_customer').val(response.customer.address);
                        $('#name_customer_purchased').val(response.customer.name);
                        $('#phone_customer_purchased').val(response.customer.phone);
                        $('#address_customer_purchased').val(response.customer.address);
                        $('#paymentErrorMessage').text('');
                        $('#historyErrorMessage').text('');
                        // const phone = response.customer.phone

                  } else {
                        $('#phone_customer').val(response.phone);
                        $('#paymentErrorMessage').text(response.message);
                        $('#historyErrorMessage').text(response.message);



                  }
            })
            .catch(error => {
                  console.log('Failed to update session:', error);
            });
}

async function loadProductinCart() {
      const response = await fetch('/cart/getCart');
      const data = await response.json();
      console.log(data);
      if (data.code === 0) {
            updateCartUI(data.data);
            updateTotalCartPrice();
      }
}
$('.btn-addCart').click(e => {
      e.preventDefault();
      let id = e.target.dataset.id;
      addToCart(id)
})
function addToCart(id) {
      const url = window.location.origin;

      fetch(`${url}/cart/addToCart`, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${encodeURIComponent(id)}`
      })
            .then(response => response.json())
            .then(data => {
                  if (data.code === 0) {
                        updateCartUI(data.data);
                        updateTotalCartPrice()

                  }
            })
            .catch(error => {
                  console.error('Error adding to cart:', error);
            });
}

function updateCartUI(cart) {
      const cartTableBody = document.getElementById('cartTableBody'); // Adjust this based on your HTML structure
      cartTableBody.innerHTML = '';
      if (cart.length > 0) {
            cart.forEach(item => {
                  const row = document.createElement('tr');
                  row.id = `${item.product_id}`;

                  var product_price = formatMoney1(`${item.product_price}`)
                  row.innerHTML = `
                    <td>
                        <div class="crm-profile-img-edit position-relative">
                            <div class="image">
                                <i class="fas fa-times-circle fa-lg" style="color: #ff1a1a;"
                                    onclick="remove_item('${item.product_id}')"></i>
                            </div>
                            <img class="img-fluid rounded avatar-80 mr-3 w- h-auto"
                                src="../assets/images/table/product/${item.product_image}" alt="profile-pic">
                            ${item.product_name}
                        </div>
                    </td>
                    <td >
                        <input id="quantity_product_card" type="number" data-id="${item.product_id}"
                            class="form-control quantity-input text-center" min="1"
                            max="${item.maxquantity}" value="${item.quantity}"
                            onchange="updateTotalPrice(this)"
                            onkeydown="updateTotalPrice(this)">
                    </td>
                    <td></td>
                    <td id="product_price">${item.product_price}</td>
                    <td class="total-price-col" hidden></td>
                `;
                  cartTableBody.appendChild(row);


            });
            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
            <td colspan="3" align="right"><b style="padding-left: 16%;">Total</b></td>
            <td class="d-flex">
            <div id="totalpricecart"> </div>
            <strong class="ml-1">VND</strong>
            </td>
            <td>&nbsp;</td>
            `;
            cartTableBody.appendChild(totalRow);
            const checkoutRow = document.createElement('tr');
            checkoutRow.innerHTML = `
            <td colspan="4" align="center">      
                  <button href="#enterCustomerModal"  style="width: 80%;" class="btn btn-info" id="btn-enter-checkout"   
                  data-toggle="modal" data-placement="top"
                  >Check out</button>
            </td>
            `;
            cartTableBody.appendChild(checkoutRow);

            document.getElementById('cartTableBody').addEventListener('click', function (e) {
                  if (e.target && e.target.id === 'btn-enter-checkout') {
                        e.preventDefault();
                        var totalCustomer = document.getElementById('total_customer');
                        var totalPriceCart = document.getElementById('totalpricecart');
                        const totalCart = formatMoney1(totalPriceCart.innerText)

                        totalCustomer.value = totalCart;
                  }
            });
            formatMoney()
      } else {
            const emptyCartRow = document.createElement('tr');
            emptyCartRow.innerHTML = ` <td colspan="5" align="center"><h3 style="color:#888;">Your Cart is empty</h3></td>  `;
            cartTableBody.appendChild(emptyCartRow);
      }
}
function formatMoney() {
      var elements = document.querySelectorAll('.formatmoney');
      elements.forEach(function (element) {
            var retailPrice = element.textContent.trim();
            var formattedPrice = parseFloat(retailPrice).toLocaleString('vi-VN');
            var div = document.createElement('div');
            div.innerHTML = formattedPrice + ' <sp>VND</sp>';
            element.innerHTML = div.innerHTML;
      });
}


function remove_item(item_id) {
      const url = window.location.origin;
      fetch(`${url}/cart/remove_item?id=${item_id}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            },

      })
            .then(res => res.json())
            .then(json => {
                  if (json.code === 0) {
                        console.log("Successful");
                        $(`tr#${item_id}`).remove();
                        json.cartlength === 0 ? window.location.reload() : updateTotalCartPrice();
                  } else {
                        console.log(json.message);
                  }
            })
            .catch(e => console.log(e.errorAlert));
}
function updateTotalPrice(inputElement) {
      const quantity = parseInt(inputElement.value);
      const pricePerUnit = parseInt(inputElement.closest('tr').querySelector('#product_price').textContent);
      const totalPrice = isNaN(quantity) ? 0 : quantity * pricePerUnit;

      inputElement.closest('tr').querySelector('.total-price-col').textContent = totalPrice;
      updateTotalCartPrice();
      // Update session
      const productId = inputElement.dataset.id;
      updateSession(productId, quantity);
}
function updateSession(key, value) {
      const url = window.location.origin;
      fetch(`${url}/cart/updateQuantityItem`, {
            method: 'POST',
            body: JSON.stringify({ key: key, value: value }),
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => response.json())
            .then(response => {
                  if (response.code === 0) {
                        console.log('update quantity product in cart successfully', response.quantity);
                  } else {
                        console.log('error');
                  }
            })
            .catch(error => {

                  console.log('Failed to update session:', error);
            });
}
function updateTotalCartPrice() {
      const quantityInputs = document.querySelectorAll('.quantity-input');
      const productPrices = document.querySelectorAll('#product_price');
      let totalPrice = 0;

      for (let i = 0; i < quantityInputs.length; i++) {
            const quantity = parseInt(quantityInputs[i].value);
            const price = parseFloat(productPrices[i].innerText);

            totalPrice += quantity * price;
      }

      const totalPriceElement = document.querySelector('#totalpricecart');
      if (totalPriceElement) {
            totalPriceElement.textContent = totalPrice;
      } else {
            console.log("Element with id 'totalpricecart' not found");
      }
}
function showError(message) {
      var errorMessageElement = document.getElementById('paymentErrorMessage');
      errorMessageElement.innerHTML = message;

      // Add the "bounce" class
      errorMessageElement.classList.add('bounce');

      // Remove the "bounce" class after the animation duration
      setTimeout(function () {
            errorMessageElement.classList.remove('bounce');
      }, 2000);
}


getOrderdetails = id => {
      const url = window.location.origin;
      fetch(`${url}/cart/getOrderdetails?id=${id}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => response.json())
            .then(response => {
                  if (response.code == 0) {
                        updateOrderDetailsTable(response.data)
                  } else {
                        console.log('Fail to fetch history purchase');
                  }
            })
            .catch(error => {
                  console.log('Failed to update session:', error);
            });
};
function updateOrderDetailsTable(orderDetails) {
      const tableBody = document.getElementById('body-orderdetail');

      tableBody.innerHTML = '';

      orderDetails.forEach((detail, index) => {
            const retailPrice = formatMoney1(`${detail.Product.retailprice}`)
            let tmp = detail.quantity * detail.Product.retailprice
            const subtotal = formatMoney1(`${tmp}`)
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td class="text-center">${index + 1}</td>
              <td>${detail.id}</td>
              <td><img src="../assets/images/table/product/${detail.Product.image}" alt="Product Image" width="50"></td>
              <td class="text-center">${detail.quantity}</td>
              <td class="text-center">${retailPrice}</td>
              <td class="text-center">${subtotal}</td>
          `;

            tableBody.appendChild(newRow);
      });
}


