//const appVersion = require('electron').remote.app.getVersion();
//const { version, productName, repository, author } = require('../package.json');
const pkginfo = require('pkginfo')(module, 'productName','version', 'author', 'repository');
const { shell } = require('electron')

pkg = module.exports;

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

/* var curpage = document.location.pathname.match(/[^\/]+$/)[0];
curpage = curpage.replace(".html", "");
if(curpage === "index"){
  curpage = "home";
} */

//title = productName;
$(document).ready(function() {
    // Set title window
    document.title = pkg.productName;
    $(".navbar-brand").text(pkg.productName);
    
    // Open About modal
    $("#about").on('click', function(e){
        e.preventDefault();
        $("#aboutModalCenter").modal('toggle');
    });
    
    // TD content editable
    $(".edit").click(function(){
        if($(this).attr("contentEditable") == true){
            $(this).attr("contentEditable","false");
        } else {
            $(this).attr("contentEditable","true");
        }
    });
    
    // About Menu
    date = moment().format("MMM Do, YYYY");
    $(".date").text(date);
    $('.version').text(pkg.productName + " Version: " + pkg.version);
    $(".author").text(pkg.author);
    //$('.repo').html("<button id='open-repo' type='button' class='btn btn-primary'>View Source Code</button>");
    $('.repo').html("<a href='#' id='open-repo'>"+pkg.repository+"</a>");


    // Setup links for the user
    $('#open-repo').click(function(e){
        e.preventDefault();
        shell.openExternal(pkg.repository);

    });

    $('#help').click(function(e){
        e.preventDefault();
        shell.openExternal('https://github.com/cjerrington/net-check/issues/new/choose');

    });
});
