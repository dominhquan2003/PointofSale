$(document).ready(function () {
      $('.btn-personal-information').on('click', function () {
            const customerId = $(this).data('id');
            const customerName = $(this).data('name');
            const customerPhone = $(this).data('phone');
            const customerAddress = $(this).data('address');
            $('#informationCustomerModal').modal('show');
            $('#id_customer_order').val(customerId);
            $('#phone_customer_order').val(customerPhone);
            $('#name_customer_order').val(customerName);
            $('#address_customer_order').val(customerAddress);

      });
      $('.btn-orderdetail-information').on('click', function () {
            const id = $(this).data('id');
            console.log(id);
            $('#informationOrderdetailModal').modal('show');
            getOrderdetails(id);

      });
      getOrderdetails = id => {
            const url = window.location.origin ; 
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
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="text-center">${index + 1}</td>
                    <td>${detail.id}</td>
                    <td><img src="../assets/images/table/product/${detail.Product.image}" alt="Product Image" width="50"></td>
                    <td class="text-center">${detail.quantity}</td>
                    <td class="text-center">${detail.Product.retailprice}</td>
                    <td class="text-center">${detail.quantity * detail.Product.retailprice}</td>
                `;
        
                tableBody.appendChild(newRow);
            });
        }
});

