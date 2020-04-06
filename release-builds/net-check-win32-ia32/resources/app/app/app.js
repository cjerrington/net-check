 // for file saving
const fs = require('fs');
const path = require('path');
// for checking if ports are open
var isPortReachable = require("is-port-reachable");

$(document).ready(function() {

    //$(".status").html(successState);

    $("#add_form").submit(function(e) {
        e.preventDefault();
    });

    $(".add-row").click(function(){
        var rowCount = $('#urltable tr').length;
        var url = $("#hostname").val();
        var port = $("#port").val();
        var markup = "<tr><td>" + rowCount + "</td><td><input type='checkbox' name='record'></td><td class='edit' contenteditable='true'>" + url + "</td><td class='edit'  contenteditable='true'>" + port + "</td><td class='status'><img src='assets/icons/question-circle.svg' role='img' alt='' width='16' height='16' title='Unknown'></td></tr>";

        if(url.length !==0 || port.length !==0){
            $("table tbody").append(markup);
        }else{
            $("#invalidinput").modal('toggle')
        }
    });

    // Find and remove selected table rows
    $(".delete-row").click(function(){
        $("table tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                //remove row
                $(this).parents("tr").remove();
            }

        });

        // Reset the row counts. 
        var i = 0; 
        $("tr").find("td:first").each(function (i) {
        // For each TR find the first TD and replace it with the row count
        // We should have a small enough list updating the whole table 
        // shouldn't be an issue instead of only modifying the ones that are after
        $(this).html(i + 1);
        });
    });

    // Save the table to a JSON file
    $('#convert-table').click( function(e) {
        e.preventDefault();
        // convert table to json
        var table = $('#urltable').tableToJSON();
        // log table to make sure we see if correctly. 
        console.log('Output of current table: ')
        console.log(table);
        // create file 
        var filepath = path.join(__dirname,"urls.json");    
        // Open file for writing, will always overwrite the current file
        fs.open(filepath, 'w+', function(err, fd) {
            if (err) {
                throw 'error opening file: ' + err;
            }
        
            // writeFileSync does not return a value, need to be a try/catch
            try {
                fs.writeFileSync(filepath, JSON.stringify(table, null, 2) , 'utf-8', (err) => {
                    if (err) throw err   
                });
                console.log('The file has been saved to: ' + filepath);
                $('.savefile').html(filepath);
                $("#saveurlsModalCenter").modal('toggle');
            } catch (err) {
                console.log(err);
            }
        });  
    });

    // Run checks for each row in the html table
    var successState = `<img src="assets/icons/check.svg" role="img" alt="" width="16" height="16" title="Success">`;
    var failState = `<img src="assets/icons/exclamation-circle-fill.svg" role="img" alt="" width="16" height="16" title="Fail">`;
    var unknownState = `<img src="assets/icons/question-circle.svg" role="img" alt="" width="16" height="16" title="Unknown">`;

    $('#runcheck').click(function(e){
        // For each row run the checks
        $('#urltable > tbody  > tr').each(function() {
            // Get hostname and port
            var hostname = $(this).closest('tr').find('td:eq(2)').text();
            var port = $(this).closest('tr').find('td:eq(3)').text();
            //console.log(hostname+":"+port);

            // Start the check
            (async () => {
                // use the hostname and port from the table. 
                var cmd = await isPortReachable(port, {host: hostname});
                if(cmd == true){
                    // if port works, send to console
                    console.log(hostname+":"+port+" is open.");
                    // and set the staus to success
                    $(this).closest('tr').find('td:eq(4)').html(successState);
                }
                else{
                    // if port is not open, send to console
                    console.log(hostname+":"+port+" is closed.");
                    // and set the status to failed
                    $(this).closest('tr').find('td:eq(4)').html(failState);
                }
                //=> true
            })();
        });
    });
});
