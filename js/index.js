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
var authorizationHash = 'd2FkaHdhbm1hbmRpcmFwaTpXNGRodyRuYXBpITEwMDg=';
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
