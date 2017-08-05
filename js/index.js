/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var baseURL = 'http://wadhwanmandir.org/api/public/';
var authorizationType = 'Basic';
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTI6VzRkaHckbiExMDA4';
var storage = window.localStorage;

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
        document.addEventListener('backbutton', this.exitAppFunction, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $('body').height(($(window).height() * 0.9));
        registerPushNotification();
        return;
    },
    exitAppFunction: function() {
        navigator.app.exitApp();
    },

};

app.initialize();

function registerPushNotification() {

    var push = PushNotification.init({ "android": {"senderID": "476875120878"} });

    push.on('registration', function(data) {
        storeRegIdToServer(data.registrationId);
    });

    push.on('notification', function(data) {
        alert("Notification Message: " + data.message)
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
    });

    push.on('error', function(e) {
        // alert("Notification Error: " + e.message);
        alert("There was some error in receiving notifications, please report this problem via 'Contact Us'.");
    });

}

function storeRegIdToServer(reg_id) {
    // alert("Storing Registration Id to Server: " + reg_id);
    var existingRegId = storage.getItem('Notification-Registration-Id');
    var jsonData = {
        "reg_id" : reg_id
    };

    if(existingRegId) {
        if(existingRegId == reg_id) {
            // alert("Registration Id already stored on server.");
        } else {
            // alert("Updating Registration Id to server.");
            var notificationTableId = storage.getItem("Notification-Table-Id");
            $.ajax({
                type: 'PATCH',
                url: baseURL + 'notification/' + notificationTableId,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(jsonData),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
                }
            })
            .done((data, textStatus, jqXHR) => {
                // alert("Registration key updated successfully!");
                storage.setItem("Notification-Table-Id", data.id);
                storage.setItem("Notification-Registration-Id", reg_id);
            })
            .fail((xhr, textStatus, errorThrown) => {
                alert("There was some error in receiving notifications, please report this problem via 'Contact Us'.");
                // alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                // alert("responseText: " + xhr.responseText);
                // alert("textStatus: " + textStatus);
                // alert("errorThrown: " + errorThrown);
            });
        }
    } else {
        // alert("Inserting Registration Id to server.");
        $.ajax({
            type: 'POST',
            url: baseURL + 'notification',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', authorizationType + ' ' + authorizationHash);
            }
        })
        .done((data, textStatus, jqXHR) => {
            // alert("Registration key inserted successfully!");
            storage.setItem("Notification-Table-Id", data.id);
            storage.setItem("Notification-Registration-Id", reg_id);
        })
        .fail((xhr, textStatus, errorThrown) => {
            alert("There was some error in receiving notifications, please report this problem via 'Contact Us'.");
            // alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            // alert("responseText: " + xhr.responseText);
            // alert("textStatus: " + textStatus);
            // alert("errorThrown: " + errorThrown);
        });
    }
}

window.onload = function () {
           if (!localStorage.getItem("language")) {
               localStorage.setItem("language", "Gujarati");
           }
           ChangeLanguage(localStorage.getItem("language"));
       }

       function ChangeLanguage(strLanguage) {
           if (strLanguage == "Gujarati") {
               document.getElementById("mantrajap").innerHTML = "<b>મંત્રજાપ</b>";
               document.getElementById("mantrajap").className = "gujaratiFont";
               document.getElementById("mantralekhan").innerHTML = "<b>મંત્રલેખન</b>";
               document.getElementById("mantralekhan").className = "gujaratiFont";
               document.getElementById("nityadarshan").innerHTML = "<b>નિત્ય દર્શન</b>";
               document.getElementById("nityadarshan").className = "gujaratiFont";
               document.getElementById("gallary").innerHTML = "<b>ફોટો ગેલેરી</b>";
               document.getElementById("gallary").className = "gujaratiFont";
               document.getElementById("liveevent").innerHTML = "<b>લાઇવ કાર્યક્રમ</b>";
               document.getElementById("liveevent").className = "gujaratiFont";
               document.getElementById("audio").innerHTML = "<b>ઓડિયો ગેલેરી</b>";
               document.getElementById("audio").className = "gujaratiFont";
               document.getElementById("aachary").innerHTML = "<b>આચાર્ય પરંપરા</b>";
               document.getElementById("aachary").className = "gujaratiFont";
               document.getElementById("shastro").innerHTML = "<b>સત્શાસ્ત્રો</b>";
               document.getElementById("shastro").className = "gujaratiFont";
               document.getElementById("nirnay").innerHTML = "<b>નિર્ણય</b>";
               document.getElementById("nirnay").className = "gujaratiFont";
               document.getElementById("rkdym").innerHTML = "<b>યુવક મંડળ</b>";
               document.getElementById("rkdym").className = "gujaratiFont";
               document.getElementById("social").innerHTML = "<b>સામાજિક મીડિયા</b>";
               document.getElementById("social").className = "gujaratiFont";
               document.getElementById("contact").innerHTML = "<b>સંપર્ક માટે</b>";
               document.getElementById("contact").className = "gujaratiFont";
               document.getElementById("btnEnglish").style.backgroundColor = "#53392d";
               document.getElementById("btnGujarati").style.backgroundColor = "#f6f1ee";
               document.getElementById("mantra").innerHTML = "<b>|| શ્રી સ્વામિનારાયણો વિજયતેતરામ્ ||<b>";
               document.getElementById("mantra").className = "gujaratiFont";
			   document.getElementById("Quiz").className="gujaratiFont";
			   document.getElementById("Quiz").innerHTML="<b>સત્સંગ ક્વિઝ</b>";
			   document.getElementById("history").className="gujaratiFont";
			   document.getElementById("history").innerHTML="<b>મંદિરનો ઈતિહાસ</b>";
           } else {
               document.getElementById("mantrajap").innerHTML = "<b>Mantra Jaap</b>";
               document.getElementById("mantralekhan").innerHTML = "<b>Mantra Lekhan</b>";
               document.getElementById("nityadarshan").innerHTML = "<b>Daily Darshan</b>";
               document.getElementById("gallary").innerHTML = "<b>Photo Gallery</b>";
               document.getElementById("liveevent").innerHTML = "<b>Live Event</b>";
               document.getElementById("audio").innerHTML = "<b>Audio Gallery</b>";
               document.getElementById("aachary").innerHTML = "<b>Aacharya</b>";
               document.getElementById("shastro").innerHTML = "<b>Scripture</b>";
               document.getElementById("nirnay").innerHTML = "<b>Nirnay</b>";
               document.getElementById("rkdym").innerHTML = "<b>RKDYM</b>";
               document.getElementById("social").innerHTML = "<b>Social Media</b>";
               document.getElementById("contact").innerHTML = "<b>Contact Us</b>";
			   document.getElementById("Quiz").innerHTML="<b>Satsang Quiz</b>";
			   document.getElementById("history").innerHTML="<b>Temple History</b>";
               document.getElementById("mantrajap").className = "englishFont";
               document.getElementById("mantralekhan").className = "englishFont";
               document.getElementById("nityadarshan").className = "englishFont";
               document.getElementById("gallary").className = "englishFont";
               document.getElementById("liveevent").className = "englishFont";
               document.getElementById("audio").className = "englishFont";
               document.getElementById("aachary").className = "englishFont";
               document.getElementById("shastro").className = "englishFont";
               document.getElementById("nirnay").className = "englishFont";
               document.getElementById("rkdym").className = "englishFont";
               document.getElementById("social").className = "englishFont";
               document.getElementById("contact").className = "englishFont";
               document.getElementById("btnEnglish").style.backgroundColor = "#f6f1ee";
               document.getElementById("btnGujarati").style.backgroundColor = "#53392d";
               document.getElementById("mantra").innerHTML = "<b>|| Shree Swaminarayano Vijaytetram ||<b>";
               document.getElementById("mantra").className = "englishFont";
			   document.getElementById("Quiz").className="englishFont";
			   document.getElementById("history").className="englishFont";
			   
           }
           localStorage.setItem("language", strLanguage);
       }