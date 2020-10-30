var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
        datasets: [{
            label: 'Tank Level',
            borderColor: 'orange',
            data: [0, 10, 5, 2, 20, 30, 0]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: true


    }
});

$(document).ready(() => {

    $.ajax({
        url: "http://localhost:3000/data",
        method: 'GET',
        success: function(response) {
            //var data = JSON.parse(response);
            // $('Testresponse').append(response);
            document.getElementById("demo").innerHTML =
                this.response;
            /*
                        if (data.rows.length > 0) {
                            for (let index = 0; index < data.rows.length; index++) {
                                var newRow = $("<tr>");
                                var cols = "";
                                var ID = '';
                                var Level = '';
                                var Date = '';
                                cols += '<td> ' + data.rows[index].ID + '</td>';
                                cols += '<td> ' + data.rows[index].Level + '</td>';
                                cols += '<td> ' + data.rows[index].Date + '</td>';
                                newRow.append(cols);
                                $("#tableData .tbody").append(newRow);
                            }

                        }
            */
        }
    })
})