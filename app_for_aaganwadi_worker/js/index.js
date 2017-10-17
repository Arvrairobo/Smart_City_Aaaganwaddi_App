
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
      $('.modal').modal();
      $('ul.tabs').tabs();
      $(".button-collapse").sideNav();
      $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 15, // Creates a dropdown of 15 years to control year,
       today: 'Today',
       clear: 'Clear',
       close: 'Ok',
       closeOnSelect: false // Close upon selecting a date,
     });

     document.getElementById('my_first_screen').setAttribute('style','display:block');

        setTimeout(function(){
          document.getElementById('my_first_screen').setAttribute('style','display:none');
          document.getElementById('login_screen').setAttribute('style','display:block');
      },2000)
        console.log('Received Event: ' + id);
    }
};

app.initialize();
