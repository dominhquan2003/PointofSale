$(document).ready(function () {
      const dateElements = document.querySelectorAll('.dateOfPurchase');
      dateElements.forEach(formatDate);
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
      
     
});

