const fs = require('fs');

const appVersion = require('electron').remote.app.getVersion();
//const { version, productName, repository, author } = require('../package.json');
const pkginfo = require('pkginfo')(module, 'productName','version', 'author', 'repository');

pkg = module.exports;
console.dir(pkg);

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
$( document ).ready(function() {
    document.title = pkg.productName;

    $(".navbar-brand").text(pkg.productName);
    
    $('#myTab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    
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
    $('.repo').html("<a href='"+pkg.repository+"' target='_blank'>"+pkg.repository+"</a>");
});
