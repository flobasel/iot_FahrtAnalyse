var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
        buttonState_0: "unknown", // the state of the button on device 0
        buttonState_1: "unknown", // the state of the button on device 1
        buttonPressCounter: 0,    // how many times the buttons were pressed
        buttonsSync: false,       // true if the buttons were pressed within 1 second
        blinking_0: false,        // true if device 0 is blinking.
        blinking_1: false,        // true if device 0 is blinking.
        // add your own variables here ...
        kurven: "unknown",
        beschl: "unknown",
        brems: "unknown",
        zAchse: "unknown",
    },
    // This function is executed once when the page is loaded.
    mounted: function () {
        this.initSse();
    },
    methods: {
        // Initialise the Event Stream (Server Sent Events)
        // You don't have to change this function
        initSse: function () {
            if (typeof (EventSource) !== "undefined") {
                var url = rootUrl + "/api/events";
                var source = new EventSource(url);
                source.onmessage = (event) => {
                    this.updateVariables(JSON.parse(event.data));
                };
            } else {
                this.message = "Your browser does not support server-sent events.";
            }
        },
        // react on events: update the variables to be displayed
        updateVariables(ev) {
            // Event "buttonStateChanged"
            if (ev.eventName === "buttonStateChanged") {
                this.buttonPressCounter = ev.eventData.counter;
                if (ev.eventData.message === "pressed") {
                    this.buttonsSync = ev.eventData.pressedSync;
                }
            }
            // Event "blinkingStateChanged"
            else if (ev.eventName === "blinkingStateChanged") {
                if (ev.eventData.message === "started blinking") {
                    if (ev.deviceNumber === 0) {
                        this.blinking_0 = true;
                    }
                    else if (ev.deviceNumber === 1) {
                        this.blinking_1 = true;
                    }
                }
                if (ev.eventData.message === "stopped blinking") {
                    if (ev.deviceNumber === 0) {
                        this.blinking_0 = false;
                    }
                    else if (ev.deviceNumber === 1) {
                        this.blinking_1 = false;
                    }
                }
            }
        },
        // call the function "blinkRed" in your backend
        blinkRed: function (nr) {
            var duration = 2000; // blinking duration in milliseconds
            axios.post(rootUrl + "/api/device/" + nr + "/function/blinkRed", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
                })
        },
        // get the value of the variable "buttonState" on the device with number "nr" from your backend
        getKurven: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/kurven")
                .then(response => {
                    // Handle the response from the server
                    this.kurven = response.data.result;
                })
                },
        
    }
})
