                //alert('it`s alive');
                var map,
                geocoder,
                currentPosition,
                directionsDisplay,
                trafficLayerD,
                directionsMatrix, 
                directionsService;

                function initialize(lat, lon){   
                startLS("time-directions");
                trafficLayerD = new google.maps.TrafficLayer();
                geocoder = new google.maps.Geocoder();
                directionsDisplay = new google.maps.DirectionsRenderer(); 
                directionsService = new google.maps.DirectionsService();
                directionsMatrix = new google.maps.DistanceMatrixService();

                currentPosition = new google.maps.LatLng(lat, lon);

                var orig = (document.getElementById('origem'));
                var dest = (document.getElementById('destino'));

                var autoOrig = new google.maps.places.Autocomplete(orig);
                var autoDest = new google.maps.places.Autocomplete(dest);

                console.log(JSON.parse(window.localStorage.getItem("time-directions")));
                
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                directionsDisplay.setMap(map);
                trafficLayerD.setMap(map);
                var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Current position"
                });

                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
                    infowindow.open(map, currentPositionMarker);
                });
            codeLatLng(currentPosition.toString(),"#origem");
            }

            function locError(error) { 
               
               alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
               // initialize map with a static predefined latitude, longitude
               initialize(-23.00037, -43.36590);
            }

            function locSuccess(position) {
              //alert('locSuccess');
                initialize(position.coords.latitude, position.coords.longitude);
            }
            function clearRoute() {
              var da = [];
              window.localStorage.setItem("time-directions", JSON.stringify(da));
            }
            function calculateRoute() {

              var da = [];

              


              da = [];

              da[0] = $("#mode").val();
              da[1] = $("#origem").val();
              da[2] = $("#destino").val();
              console.log(da);
              saveLS("time-directions",da);
              /*
              da[0] = [];
              da[0]['from'] = "Avenida Malibu, 968-1078 - Barra da Tijuca, Rio de Janeiro - RJ, 22793-295, República Federativa do Brasil";
              da[0][ 'to' ] = "Rua Florianópolis, Praça Seca, Rio de Janeiro, República Federativa do Brasil";
              da[0]['mode'] = "DRIVING";
              */
        
                var targetDestination = $("#destino").val();
                var currentPositionText = $("#origem").val();

                if (currentPositionText && currentPositionText != '' && targetDestination && targetDestination != '') {
                    var request = {
                        origin:currentPositionText, 
                        destination:targetDestination,
                        travelMode: google.maps.DirectionsTravelMode[$("#mode").val()]
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
              
                            directionsDisplay.setPanel(document.getElementById("directions"));
                            directionsDisplay.setDirections(response); 
              //console.log(response.routes[0].legs[0].duration.value);
              
              var totalSec = response.routes[0].legs[0].duration.value;
              var hours = parseInt( totalSec / 3600 ) % 24;
              var minutes = parseInt( totalSec / 60 ) % 60;
              var seconds = totalSec % 60;
              
              if(seconds > 30)
                minutes++;
                
              var result = (hours < 10 ? "0" + hours : hours) + " H"+(hours > 1 ? "s" : "")+", " + (minutes < 10 ? "0" + minutes : minutes) + " Min";
              console.log(result);
              result = result.replace("00 Min", "").replace("00 H, ","");
              if(result == "")
                result = "Desconhecido";
              $("#tempo").html(result);
                            
              $("#resultado").show();
                        }
                        else {
                            $("#resultado").hide();
                        }
                    });
                }
                else {
                    $("#resultado").hide();
                }
            }
      
      function codeLatLng(latlngString,update) {
        console.log(latlngString);
        var input = latlngString.replace("(", "").replace(")","");
        var latlngStr = input.split(',', 2);

        var lat = parseFloat(latlngStr[0]);
        var lng = parseFloat(latlngStr[1]);
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          //console.log(results);         
          $(update).val(results[0].formatted_address);
          console.log(results[0].address_components[4].short_name+","+results[0].address_components[5].short_name+","+results[0].address_components[6].short_name);
          //return results[0].formatted_address;
          //infowindow.open(map, marker);
          } else {
          alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
        });
      }

            $(document).on('click', '#directions-button', function(e){
                e.preventDefault();
                calculateRoute();
            });

            $(document).on('click', '#SetPositionOrig', function(e){
                e.preventDefault();
                if(currentPosition != undefined)
                  codeLatLng(currentPosition.toString(),"#origem");
                else
                  geoTest();
            });

            $(document).on('click', '#SetPositionDest', function(e){
                e.preventDefault();       
                codeLatLng(currentPosition.toString(),"#destino");
            }); 


    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        initialize(-23.00037, -43.36590);
    }

    function geoTest() {
        navigator.geolocation.getCurrentPosition(locSuccess, onError);
    }

    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            //alert("deviceready");
            geoTest();
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
          /*
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
          */
            console.log('Received Event: ' + id);
        }
    };

    app.initialize();