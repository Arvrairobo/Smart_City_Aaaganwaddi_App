# Smart_City_Aaaganwaddi_App
An Aaganwadi App to track attendance,immunization and nutrition services provided to Aaganwadi kids

## Current Scenario
* Lack of immunization & vaccination. India comes 3rd in World Child Mortality Rate Ranking
* Inefficient monitoring of health. 41.6% children in Gujarat are stunted or malnourished, according to UNICEF
* AWC records on paper turn out to be fake or forged.
* More manual labour, less automation hence error prone.

![Alt text](/rajkoy.jpg?raw=true "Optional Title")


## Our Solution 

An easy to use app for the aaganwadi workers having all these functionalities :
1. <b>Real time daily attendance </b> tracking of students using Biometric integrated in our app.

2. <b>Student enrollement </b> with app with crendentials like figerprints and aadhar number.

3. <b>Real time food tracking for the government officials</b>. 
    * It will track the vehicle which is been used for transporting the food.
    * Its whole route will becaptured and shown to the government officials. Track of position with time is also stored in our        database so that it can be used for further investigation in case of any issues.

    * Each food packet contains a QR code which is been encoded such that it contains three things:
   1. Date & Time when it was issued.
   2. Weight of the packet.
   3. Location (lat & long of the Aaganwadi Center).
    
    * Every month every packet has to be scanned by aaganwadi worker for authentiation whether it reached or not as well as the weight of the packet has to be filled by the worker. As she scans the GPS location of the smartphone is transferred to the server along with the weight entered.

    * This location is checked with the location stored in our DB for that packet. If that location is within 50 meteres radius of the location in our DB then this packet will be ensured as it is reached.

    * There weight will also be checked as well and stored. Depending upon number of packets scanned a list is been made and finally at the end of the month wholestaticitcs is done like : <br>
      * How many packets are scanned ? 
      * How many packets are scanned at the correct position ?
      * How many of them are unscanned ?
  
Depending on these statictics we can control the next month supply of food packets.We can ask aaganwadi worker answerable for all scanned items.

4. <b>Immunization & Nutrition </b> 
    * A proper immnunization service is created in which the description of immunization is entered and authenticated through the
   fingerprint of the kid or their parents if stored in the db.

5. <b>Complain Section</b> 
    * Complain section for the aaganwadi worker is opened 24*7 which will assist them in case of any issues related to the app or network issues.

6. <b>Multilingual Support</b> 
    * App is made such that it supports various language such as Hindi,Marathi,Telgu and by default English. This feature is added because the aaganwadi workers are not so much educated so by using their languages it makes the app more user friendly.

7. <b> Gamification </b> 
    * A leaderboard is made for the aaganwadi workers depending on their past work and feedback provided by the parents kid at the end of the month.Whoso ever is at the top of the leader board can be given some sort of bonus by the government officials.
 
## Goverment officials website

1. Records of all the aaganwadi centers can be accessed here with proper GUI.
2. Showing analysis of the data obtained through app in varioud pie-chars and Bar graph. So that it can be easily understood by officials.
3. Real time tracking info of each and every packet can be viewed on googel maps (Using google maps API)

## Web Technology
1. <b>Cross platoform app</b> : Using Appache Cordova for creation of our app. This app can run on various platforms such as Android, Windows, IOS, Blackberry.
2. <b>Database</b> : MongoDB
3. <b>Frontend</b> : HTML,CSS, Jquery and Javascript. Frameworks : Materialise.css
4. <b>Server</b>: Node.js

## Future Scope :
1. Integrating the aadhar API with the project and the biometric sensors
2. Apply data analytics to monitor growth trends and recommend diet according to the evaluation.

## Contributors :
<a href="https://github.com/Vella-Contributor" target="_blank">Shivam Singh </a> <br>
<a href="https://github.com/NehaJeevan" target="_blank">Neha Jeevan </a>  <br>
<a href="" target="_blank">Sudhnashu Joshi </a>  <br>
<a href="" target="_blank">Utkarsh </a> <br>


## Copyright and license
Code copyright 2017 Pune Prodigies. Code released under the MIT license.







