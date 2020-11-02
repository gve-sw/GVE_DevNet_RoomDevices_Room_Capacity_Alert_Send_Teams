# GVE_DevNet_RoomDevices_Room_Capacity_Alert_Send_Teams
Enhancement to Cisco Webex Room Devices Room Capacity Alert sample to send alert to a Webex Teams Space as well. 

## Contacts
* Gerardo Chaves

## Solution Components
* Collaboration Endpoints
*  Javascript

## Requirements
1. Cisco Webex Room Device (Room, Board or Desk Series)
2. Firmware CE9.12.3 or newer if wanting to use new algorithim which detects heads or Cloud Based RoomOS Stable


## Installation/Configuration

Load the Javascript code included in the the **RoomCapacityTeamsMsg.js** file in this repository into a new Macro in the Macro editor of your Cisco room video device.  
  
Set the **roomId** constant in the code to the ID of the Webex Teams Space (room) where you want the messages to be sent.  
Set the **token** constant in the code to the Webex Teams access token to be used to send the messages (typically that of a [Webex Teams Bot](https://developer.webex.com/docs/bots))  
Set the following constants in the code to your preferences:  
 **maxPeople**: Maximum number of people allowed in the room, if the number of people exceed this number, the alert will be triggered  
 **alertTime**: Time in seconds the alert is displayed on the main screen of the room device  
 **text2Display**: Text that will be displayed   

If you are unfamiliar with Cisco Room device macros, this is a good article to get started:
https://help.webex.com/en-us/np8b6m6/Use-of-Macros-with-Room-and-Desk-Devices-and-Webex-Boards



## Usage

Once the macro is configured, turn it on so it starts detecting people in the room and sending alerts when relevant.  

This macro displays an alert on the device when a set capacity is exceeded - Based on people count API

Example of the UI of the alert displayed on the UI of the device:
![Sample UI Screenshot of Room Capacity Alert](IMAGES/ScreenshotRoomCapacity.jpeg)

It also sends a Webex Teams message to the space defined in constant **roomId** in the macro code. 

## Additional Information
##### XAPI
Documentation for the XAPI can be found in the [Command References overview](https://www.cisco.com/c/en/us/support/collaboration-endpoints/telepresence-quick-set-series/products-command-reference-list.html).



### LICENSE

Provided under Cisco Sample Code License, for details see [LICENSE](LICENSE.md)

### CODE_OF_CONDUCT

Our code of conduct is available [here](CODE_OF_CONDUCT.md)

### CONTRIBUTING

See our contributing guidelines [here](CONTRIBUTING.md)

#### DISCLAIMER:
<b>Please note:</b> This script is meant for demo purposes only. All tools/ scripts in this repo are released for use "AS IS" without any warranties of any kind, including, but not limited to their installation, use, or performance. Any use of these scripts and tools is at your own risk. There is no guarantee that they have been through thorough testing in a comparable environment and we are not responsible for any damage or data loss incurred with their use.
You are responsible for reviewing and testing any scripts you run thoroughly before use in any non-testing environment.
