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
        StatusEvent: "?",
        ModusEvent: "?",
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
            // Event "Status"
            if (ev.eventName === "Status") {
                this.StatusEvent = ev.eventData.message;
            }
            if (ev.eventName === "Modus") {
                this.ModusEvent = ev.eventData.message;
            }
            
        },
        // call the function "slowDown" in your backend
        slowDown: function (nr) {
            axios.post(rootUrl + "/api/device/" + nr + "/function/slowDown", { arg: "" })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
                })
        },
        // get the value of the variable "kurven" on the device with number "nr" from your backend
        getKurven: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/kurven")
                .then(response => {
                    // Handle the response from the server
                    this.kurven = response.data.result;
                })
                },
        getBeschl: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/beschl")
                .then(response => {
                // Handle the response from the server
                this.beschl = response.data.result;
                })
                },

        getBrems: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/brems")
                .then(response => {
                // Handle the response from the server
                this.brems = response.data.result;
                })
                },                
        
    }
})
