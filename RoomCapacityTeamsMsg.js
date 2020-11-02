/**
Copyright (c) 2020 Cisco and/or its affiliates.

This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at

               https://developer.cisco.com/docs/licenses

All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
 */

const xapi = require('xapi');

//Variables you are able to adjust as needed for the Room Capacity and Messaging
const maxPeople = 1;  //Not to exceed occupancy for this room
const alertTime = 20; //Time in seconds to display alert on screen and touch 10
const text2Display = 'Room capacity has been limited, please reduce the number of people in this room to ' + maxPeople + ' people'; //Alert Text

// Replace with your bot token
const token = "BOT_TOKEN";
// replace with a space your bot is part of
const roomId = "ROOM_ID";

xapi.config.set('HttpClient AllowHTTP',"True");
xapi.config.set('HttpClient AllowInsecureHTTPS',"True");

function sendTeamsMessage(msg) {

   // Post message
   let payload = {
      "markdown": msg,
      "roomId": roomId
   }

   xapi.command(
      'HttpClient Post',
      {
         Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
         Url: "https://webexapis.com/v1/messages",
         AllowInsecureHTTPS: "True",
         ResultBody: 'plaintext'
      },
      JSON.stringify(payload))
      .then((response) => {
         console.debug(`received response with status code: ${response.StatusCode}`);

         if (response.StatusCode == 200) {
            console.log("message pushed to Webex Teams");

            // Retrieve message id
            let result = JSON.parse(response.Body);
            console.log(`message id: ${result.id}`);
            return;
         }

         // This should not happen as Webex REST API always return 200 OK for POST requests
         console.log("failed with status code: " + response.StatusCode);
      })
      .catch((err) => {
         console.log(`failed with err message: ${err.message}`);
         console.log(`failed with err status: ${err.data.status}`);
          // Typically: hostname not found  
          if (err.data.Message) {
              console.log("data message: " + err.data.Message);
          }

          // Typically: the response status code is 4xx or 5xx
          if (err.data.StatusCode) {
              console.log("status code: " + err.data.StatusCode);                     
          }
      

      })
}

//Listed below is the code that runs the Room Capacity Alerting using the variables you edited above.  Generally this should not be edited.

//This enables the Room Analytics required for the Macro to function properly
function init() {
  xapi.config.set('RoomAnalytics PeopleCountOutOfCall', 'On')
    .catch((error) => { console.error(error); });
    console.log('RoomAnalytics PeopleCountOutOfCall Has been Enabled');
}

function alertDisplay() {
	xapi.command(
	  	'UserInterface Message Alert Display',
	  	{Title : 'Room Capacity Limit Reached',
	  	Text : (text2Display),
	  	Duration : (alertTime) }
	  )
}

function checkCount(count) {
  if (count > maxPeople) {
    alertDisplay()
    sendTeamsMessage(text2Display);
    console.log('*** There are too many people in the room. ',count)
  }
}

//Run init function to setup prerequisite configurations
init();
  

// Fetch current count and set feedback for change in peoplecount
xapi.status
    .get('RoomAnalytics PeopleCount')
    .then((count) => {
        console.log('Max occupancy for this room is: ' + maxPeople);
        console.log(`Initial people count is: ${count.Current}`);
        checkCount(count.Current);

        // Listen to events
        console.log('Adding feedback listener to: RoomAnalytics PeopleCount');
        xapi.feedback.on('/Status/RoomAnalytics/PeopleCount', (count) => {
            checkCount(count.Current);
            console.log(`Updated count to: ${count.Current}`);
        });

    })
    .catch((err) => {
        console.log(`Failed to fetch PeopleCount, err: ${err.message}`);
        console.log(`Are you interacting with a Room Series? exiting...`);
        xapi.close();
    });