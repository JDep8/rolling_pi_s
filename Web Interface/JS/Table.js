$(document).ready(() => {

    $.ajax({
        url: "http://localhost:3000/data",
        //method: 'GET',
        dataType: 'json',
        success: function(response) {

            // var myArray = Object.values(response);
            //alert(response[0]); // alert the 0th value
            //var data1 = JSON.stringify(response);

            //console.log(typeof(myArray));
            //console.log(response.rows.length);
            // var String1
            // $('Testresponse').append(response);

            // for (var i = 0; i < response.rows.length; i++) {
            // outputfromserver[i] can be used to get each value
            //     String1 += response.rows[i].ID + " " + response.rows[i].Level + " " + response.rows[i].Date + "\n";
            //console.log(response.rows[i].ID + " " + response.rows[i].Level + " " + response.rows[i].Date + "\n");
            //}

            //   document.getElementById("demo").innerHTML = String1
            //   console.log(String1);
            //   console.log(myArray);


            if (response.rows.length > 0) {

                for (let index = 0; index < response.rows.length; index++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var ID = '';
                    var Level = '';
                    var Date = '';
                    cols += '<td> ' + response.rows[index].ID + '</td>';
                    cols += '<td> ' + response.rows[index].Level + '</td>';
                    cols += '<td> ' + response.rows[index].Date + '</td>';
                    newRow.append(cols);
                    $("#tableData .tbody").append(newRow);
                }

            }

        }
    })
})