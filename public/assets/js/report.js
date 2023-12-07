$(document).ready(function () {
      var start = moment().subtract(29, 'days');
      var end = moment();
      function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM, D, YYYY') + ' - ' + end.format('MMMM, D, YYYY'));
            var formattedStartDate = start.format('YYYY-MM-DD');
            var formattedEndDate = end.format('YYYY-MM-DD');
            fetchGetOrderByTimeline(formattedStartDate, formattedEndDate);
      }
      $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                  'Today': [moment(), moment()],
                  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
      }, cb);
      cb(start, end);
      $(document).on('click', '.btn-orderdetail-report', function () {
            const id = $(this).data('id');
            console.log(id);
            getOrderdetails(id);
      });




function fetchGetOrderByTimeline(start, end) {
      const url = window.location.origin;
      fetch(`${url}/report/getOrder?startDate=${start}&endDate=${end}`, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json',
            },
      })
            .then(response => response.json())
            .then(data => {
                  authorizationReport(data)
                  UpdateUIReport(data)
                  console.log(data);

            })
            .catch(error => console.log('Error fetching orders:', error));
}
authorizationReport = (data) => {
      if (data.role === 'Admin') {
            $('#totalprice').text(data.totalprice + ' VND');
            $('#totalorderssold').text(data.totalOrders);
            $('#totalproduct').text(data.totalProduct);
            $('#totalprofit').text(data.totalProfit + ' VND');
      } else {
            $('#totalprice').text(data.totalprice + ' VND');
            $('#totalorderssold').text(data.totalOrders);
            $('#totalproduct').text(data.totalProduct);
      }
}

UpdateUIReport = (data) => {
      if (data.role != 'Admin') {
            $("#profit-report").hide();
      }

      const tbody = document.getElementById('tbodyreport');

      // Clear existing rows
      tbody.innerHTML = '';
      data.orders.forEach(order => {
            const row = document.createElement('tr');
            const statusBadge = order.status === 1
                  ? '<span class="badge badge-success" id="paid">Paid</span>'
                  : '<span class="badge badge-danger" id="unpaid">Unpaid</span>';

            const formattedDate = new Date(order.createdAt).toLocaleString();
            row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.totalprice}</td>
            <td>${order.payment}</td>
            <td>${order.refund}</td>
            <td>${statusBadge}</td>
            <td>${formattedDate}</td>
            <td>
            <div class="d-flex align-items-center list-action">
                  <a type="button"
                  class="btn-orderdetail-report badge badge-warning mr-2"
                  data-id="${order.id}" data-toggle="modal"
                  data-placement="top" title="" data-original-title="View" 
                  href="#informationOrderdetailModal_Report"><i class="ri-eye-line mr-0"></i></a>
                  
            </div>                      
            </td>
        `;

            tbody.appendChild(row);
      });

}



getOrderdetails = (id) => {
      const url = window.location.origin;

      fetch(`${url}/report/getOrderdetails?id=${id}`, {
            method: 'GET',
            header: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => response.json())
            .then(response => {
                  if (response.code == 0) {
                        console.log(response.data);
                        UpdateUIOrderDetail_Report(response.data);
                  } else {
                        console.log("Fail");
                  }
            })
            .catch(error => {
                  console.log('Failed to update session:', error);
            });


}

function UpdateUIOrderDetail_Report(orderDetails) {
      const tbody = document.querySelector('#body-orderdetail_report');
      tbody.innerHTML = '';

      orderDetails.forEach((detail, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <th class="text-center black" scope="row">${index + 1}</th>
            <td class="black">${detail.id}</td>
            <td>
            <div class="d-flex align-items-center">
                  <img src="../assets/images/table/product/${detail.Product.image}"
                  class="img-fluid rounded avatar-80" alt="image">

            </div>
            </td>
            <td class="text-center black">${detail.quantity}</td>
            <td class="text-center black">${detail.Product.retailprice}</td>
            <td class="text-center black">${detail.quantity * detail.Product.retailprice}</td>
          `;
            tbody.appendChild(tr);
      });
}
});