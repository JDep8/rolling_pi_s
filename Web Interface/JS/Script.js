var startDate = new Date(); //YYYY-MM-DD
var endDate = new Date() - 7; //YYYY-MM-DD

var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

var dateArr = getDateArray(startDate, endDate);



var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: timestamps,
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


var d = new Date();
document.getElementById("output").innerHTML = d.getDate + "/" + d.getMonth + "/" + d.getUTCFullYear