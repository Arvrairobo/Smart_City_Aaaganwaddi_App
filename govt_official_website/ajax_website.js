
var store_the_supply=[];

function do_aaganwadi_login(){

  var e = document.getElementById("aaganwadi_selection");
  var strUser = e.options[e.selectedIndex].text;

  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/get_me_the_aagan_id",
    "method": "GET",
    "headers":
     {
      "aaganwadiname": strUser,
      "content-type": "application/x-www-form-urlencoded"
     }
  }

  $.ajax(settings).done(function (response)
  {
    acess_respone=response;   // this is the response from the server it may  contain data it is checked further in the code as below

    if(acess_respone.length!=0)
    {
      $("#aagan_name_1").text(strUser);
      $("#aagan_name_2").text(strUser);
      $("#aagan_name_3").text(strUser);
      $("#aagan_name_4").text(strUser);
      $("#aagan_name_5").text(strUser);
      get_me_supply(acess_respone._id);
    }

    console.log(acess_respone);
  });
}

function get_me_supply(aaganidvalue){
  store_the_supply=[];

  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/get_me_the_supply",
    "method": "GET",
    "headers":
     {
      "aaganwadiid": aaganidvalue,
      "content-type": "application/x-www-form-urlencoded"
     }
  }

  $.ajax(settings).done(function (response)
  {
    acess_respone=response;
    // this is the response from the server it may  contain data it is checked further in the code as below
    if(acess_respone.length!=0)
    {
      store_the_supply=acess_respone;
      $("#table_supply").text("");
      $("#table_supply").append("date_of_scan :"+store_the_supply[0].date_of_scan+" qr_code : "+store_the_supply[0].qr_code);
      $("#table_supply").append("date_of_supply :"+store_the_supply[0].date_of_supply+" item_name : "+store_the_supply[0].item_name);
      $("#main_screen").css('display','none');
      $("#second_screen").css('display','block');
    }
    else {

    }

    console.log(store_the_supply);
  });
}
