    // Initialize everything when the window finishes loading
    window.addEventListener("load", function(event) {
      var socket;

      var url = "wss://127.0.0.1:8082";

      // Create a new connection when the Connect button is clicked
        socket = new WebSocket(url, "share-protocol");

        socket.addEventListener("open", function(event) {
          //status.textContent = "Connected";
         
        });

        // Display messages received from the server
        socket.addEventListener("message", function(event) {
          //message.textContent = "Server Says: " + event.data;
            var evt = JSON.parse(event.data)
            if(evt.type === 'channel'){
               var channel_item = "<li><a href='/channels/"+encodeURIComponent(evt.id)+"' target='blank' data-id='"+evt.id+"'>"+evt.title+"</a></li>"
               $('#channels_list').append(channel_item)
            }
            if(evt.type === 'rude'){
               var table = document.getElementById("rude_response").getElementsByTagName('tbody')[0];
               var row = table.insertRow(-1);
               var cell1 = row.insertCell(0);
               var cell2 = row.insertCell(1);
               var cell3 = row.insertCell(2);
               cell1.innerHTML = evt.payload;
               cell2.innerHTML = evt.message;
               cell3.innerHTML = evt.message.length;
               //$('#rude_response').val($('#rude_response').val()+"\n\n"+evt.message)
            }
            if(evt.type === 'incomming'){
               //var message_item = "<li><a class='incommingmsg' href='#' data-id='/incomming/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' onclick='incommingMsgClick(this)'>"+evt.title+"</a></li>"
               //$('#messages_in_list').append(message_item)
               //var message_item = "<a class='incommingmsg' href='#' data-id='/incomming/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' onclick='incommingMsgClick(this)'>"+evt.title+"</a>"
               var message_item = "<td data-id='/incomming/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' data-row='"+evt.id+"' onclick='incommingMsgClick(this)'>"+evt.title+"</td>"
               var table = document.getElementById("messages_in_list");
               var row = table.insertRow(0);
               row.setAttribute('id' , "in_"+evt.id);
               row.innerHTML = message_item;
            }
            if(evt.type === 'outgoing'){
               //var message_item = "<li><a class='outgoingmsg' href='#' data-id='/outgoing/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' onclick='outgoingMsgClick(this)'>"+evt.title+"</a></li>"
               //$('#messages_out_list').append(message_item)
               //var message_item = "<a class='outgoingmsg' href='#' data-id='/outgoing/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' onclick='outgoingMsgClick(this)'>"+evt.title+"</a>"
               var message_item = "<td data-id='/outgoing/"+encodeURIComponent(evt.channel)+"/"+evt.id+"' data-row='"+evt.id+"' onclick='outgoingMsgClick(this)'>"+evt.title+"</td>"
               var table = document.getElementById("messages_out_list");
               var row = table.insertRow(0);
               row.setAttribute('id' , "out_"+evt.id);
               row.innerHTML = message_item;

            }
        });

        // Display any errors that occur
        socket.addEventListener("error", function(event) {
          //message.textContent = "Error: " + event;
        });

        socket.addEventListener("close", function(event) {
          //status.textContent = "Not Connected";
        });
});


