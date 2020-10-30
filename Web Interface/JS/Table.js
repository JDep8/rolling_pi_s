$(document).ready(() => {

    $.ajax({
        url: "http://localhost:3000/data",
        //method: 'GET',
        dataType: 'json',
        success: function(response) {


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