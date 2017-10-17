
var current_user=[];
var sample_output_mongo;
var data_longi;
var data_lati;
var actual_longi;
var actual_lati;
var shivam_id="597b96ef8ad278de54ddcc02"

var maximum_limit_value=50;
var value_that_i_got;


function login_authorisation_with_fingerprint(){

  current_user={
	"aagan_id" : "5977c22636d8f08cb3cb57d5",
	"name" : "Hadapsar Aaganwadi Kendra",
	"address" : "Balewadi,Pune,Maharastra",
	"avreage_num_of_students" : 15,
	"latitude" : 22.367375,
	"longitude" : 70.794973,
	"pincode" : 410241
};


  var encryptConfig = {
      clientId: "myAppName",
      username: "currentUser",
      password: "currentUserPassword",
      maxAttempts: 50,
      locale: "en_US",
      dialogTitle: "Hey dude, your finger",
      dialogMessage: "Put your finger on the device",
      dialogHint: "No one will steal your identity, promised"
  };

      var Handlers = {
          fingerprintAvailable: function(result){
              document.getElementById('hey').append = "FingerprintAuth available: " + JSON.stringify(result);

              if (result.isAvailable) {
                  FingerprintAuth.encrypt(encryptConfig, Handlers.encryptSuccess, Handlers.encryptError);
              }
          },
          fingerprintUnavailable: function(message){
              document.getElementById('hey').append = "isAvailableError(): " + message;
          },
          encryptSuccess: function(result){
              console.log("successCallback(): " + JSON.stringify(result));

              if (result.withFingerprint) {
                  document.getElementById('hey').append = "Successfully encrypted credentials.";
                  document.getElementById('hey').append="Encrypted credentials: " + result.token;
                  $("#change_text").text(current_user.name);
                  $("#login_screen").css('display','none');
                  $("#screen_2").css('display','block');
              } else if (result.withBackup) {
                  document.getElementById('hey').append = "Authenticated with backup password";
              }
          },
          encryptError: function(error){
              if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                  document.getElementById('hey').append = "FingerprintAuth Dialog Cancelled!";
              } else {
                  document.getElementById('hey').append = "FingerprintAuth Error: " + error;
              }
          }
      }

      function call_me_gain()
      {
         FingerprintAuth.isAvailable(Handlers.fingerprintAvailable, Handlers.fingerprintUnavailable);
      }

      call_me_gain();

}

function tryThis(){

  current_user=[];
  var url = 'http://192.168.43.98:3000/tryThis?usernameinput='+ $("#input_aaganwadi_user_name").val()+'&password='+$("#hey_there").val();
	 $.ajax(url,{
            success: function(data) {
              if(data.user_name!=undefined && data.password!=undefined){
                  current_user=data;
                  $("#change_text").text(current_user.name);
                  $("#login_screen").css('display','none');
                  $("#screen_2").css('display','block');
              }

            },
            error: function() {
            	alert("err")
            }
         });
}


function qr_code_scan_input(){

  var url = 'http://192.168.43.98:3000/qrScan?qrcodescannedvalue='+ $("#qr_code_after_scan_value").val()+'&dateqrcode='+$("#date_of_scanning_qr_code").val()+'&aaganid='+current_user.aagan_id;
	 $.ajax(url,{
            success: function(data) {
            sample_output_mongo=data.val;

            if(sample_output_mongo>=1)
            {
              alert('Supplied');
              $("#qr_code_scan_screen").css('display','none');
              $("#screen_2").css('display','block');
            }
            else {
              alert('Wrong Packet Scanned or Network issues ');
            }
              // if(data.user_name!=undefined && data.password!=undefined){
              //     $("#login_screen").css('display','none');
              //     $("#screen_2").css('display','block');
              // }

            },
            error: function() {
            	alert("err");
            }
         });
}

function get_me_the_latitude_and_longi(position){

  actual_lati=position.coords.latitude;
  actual_longi=position.coords.longitude;


  var url = 'http://192.168.43.98:3000/getGeo';
   $.ajax(url,{
            success: function(data) {

              data_lati=data[0].latitude;
              data_longi=data[0].longitude;
              find_the_distance();
            },
            error: function() {
              alert("err");
            }
         });
}

function find_the_distance(){

  d=0;

  convert_to_radian = function(degrees) {
   return degrees * Math.PI / 180;
  };

  var lat1=data_lati;
  var lon1=data_longi;

  //alert(actual_lati+actual_longi);
  var lat2=actual_lati;
  var lon2=actual_longi;

  var R = 6371e3;
  var sub1 = convert_to_radian(lat1);
  var sub2 = convert_to_radian(lat2);
  var delta1 = convert_to_radian(lat2-lat1);
  var delta2 = convert_to_radian(lon2-lon1);

  var a = Math.sin(delta1/2) * Math.sin(delta1/2) +
          Math.cos(sub1) * Math.cos(sub2) *
          Math.sin(delta2/2) * Math.sin(delta2/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  if(d>=0){
    callBio();
  }

}

function get_me_all_the_students(){

  var url = 'http://192.168.43.98:3000/getTheAagan?studid='+shivam_id+'&aaganitattend='+current_user.aagan_id;
	 $.ajax(url,{
            success: function(data) {
              if(data.val==1)
              {
                change_student_registry();
              }
              else {
                alert('There are some issues');
              }
            },
            error: function() {
            	alert("err")
            }
         });
}

function change_student_registry(){

  var url = 'http://192.168.43.98:3000/addtoRegistry?studid_new='+shivam_id;
   $.ajax(url,{
            success: function(data) {
              if(data.val==1)
              {
                alert('Attendance taken successfully');
                $("#attendance_screen").css('display','none');
                $("#screen_2").css('display','block');

              }
              else {
                alert('Attendance Not Taken');
              }
            },
            error: function() {
              alert("err")
            }
         });
}


function submit_immunization(){

  var encryptConfig = {
      clientId: "myAppName",
      username: "currentUser",
      password: "currentUserPassword",
      maxAttempts: 50,
      locale: "en_US",
      dialogTitle: "Hey dude, your finger",
      dialogMessage: "Put your finger on the device",
      dialogHint: "No one will steal your identity, promised"
  };

      var Handlers = {
          fingerprintAvailable: function(result){
              document.getElementById('hey').append = "FingerprintAuth available: " + JSON.stringify(result);

              if (result.isAvailable) {
                  FingerprintAuth.encrypt(encryptConfig, Handlers.encryptSuccess, Handlers.encryptError);
              }
          },
          fingerprintUnavailable: function(message){
              document.getElementById('hey').append = "isAvailableError(): " + message;
          },
          encryptSuccess: function(result){
              console.log("successCallback(): " + JSON.stringify(result));

              if (result.withFingerprint) {
                  document.getElementById('hey').append = "Successfully encrypted credentials.";
                  document.getElementById('hey').append="Encrypted credentials: " + result.token;
                  store_immunization_values_to_the_database_now();

              } else if (result.withBackup) {
                  document.getElementById('hey').append = "Authenticated with backup password";
              }
          },
          encryptError: function(error){
              if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                  document.getElementById('hey').append = "FingerprintAuth Dialog Cancelled!";
              } else {
                  document.getElementById('hey').append = "FingerprintAuth Error: " + error;
              }
          }
      }

      function call_me_for_immunization()
      {
         FingerprintAuth.isAvailable(Handlers.fingerprintAvailable, Handlers.fingerprintUnavailable);
      }

      call_me_for_immunization();
}

function store_immunization_values_to_the_database_now(){
  var url = 'http://192.168.43.98:3000/take_immunisation?immuneDesc='+$("#input_description_immunization").val()+'&shivamidvalue='+shivam_id+'&aaganidvalue='+current_user.aagan_id;
   $.ajax(url,{
            success: function(data) {
              alert('Immunization Sucessfull');
              $("#immnization__screen").css('display','none');
              $("#screen_2").css('display','block');
            },
            error: function() {
              alert("err")
            }
         });
}

function nutrition_level_frontend_submit(){

  var Handlers = {
      fingerprintAvailable: function(result){
          document.getElementById('hey').append = "FingerprintAuth available: " + JSON.stringify(result);

          if (result.isAvailable) {
              FingerprintAuth.encrypt(encryptConfig, Handlers.encryptSuccess, Handlers.encryptError);
          }
      },
      fingerprintUnavailable: function(message){
          document.getElementById('hey').append = "isAvailableError(): " + message;
      },
      encryptSuccess: function(result){
          console.log("successCallback(): " + JSON.stringify(result));

          if (result.withFingerprint) {
              document.getElementById('hey').append = "Successfully encrypted credentials.";
              document.getElementById('hey').append="Encrypted credentials: " + result.token;
              store_nutrition_details();

          } else if (result.withBackup) {
              document.getElementById('hey').append = "Authenticated with backup password";
          }
      },
      encryptError: function(error){
          if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
              document.getElementById('hey').append = "FingerprintAuth Dialog Cancelled!";
          } else {
              document.getElementById('hey').append = "FingerprintAuth Error: " + error;
          }
      }
  }

  function call_me_for_nutrition()
  {
     FingerprintAuth.isAvailable(Handlers.fingerprintAvailable, Handlers.fingerprintUnavailable);
  }

  call_me_for_nutrition();


}

function store_nutrition_details(){

  var url = 'http://192.168.43.98:3000/take_nutrition_details?nutheight='+$("#input_height").val()+'&nutweight='+$("#input_weight").val()+'&nutage='+$("#input_current_age").val()+'&studidnut='+shivam_id+'&aaganidnut='+current_user.aagan_id+'&waistsize='+$("#input_waist_size").val();
   $.ajax(url,{
            success: function(data) {
              if(data.val==1){
                  alert("Recorded Sucessfully");
                  $("#nutrition_level__screen").css('display','none');
                  $("#screen_2").css('display','block');
              }
            },
            error: function() {
              alert("err")
            }
         });
}
