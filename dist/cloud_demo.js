var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
        // add your own variables here ...
        kurven: "unknown",
        beschl: "unknown",
        brems: "unknown",
        zAchse: "unknown",
        scoreF: 0,
        scoreU: 0,
        StatusEvent: "?",
        ModusEvent: "?",
        ScoresEvent: "?",
        minuten: 0,
        
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
            if (ev.eventName === "Scores") {
                this.ScoresEvent = ev.eventData.message;
                this.getScoreF(0);
                this.getScoreU(0);
                this.getMinuten(0);

                setTimeout(() => {

                        document.documentElement.style.setProperty('--lichtL12', 0.3);
                        document.documentElement.style.setProperty('--lichtL11', 0.3);
                        document.documentElement.style.setProperty('--lichtL10', 0.3);
                        document.documentElement.style.setProperty('--lichtL9', 0.3);
                        document.documentElement.style.setProperty('--lichtL8', 0.3);
                        document.documentElement.style.setProperty('--lichtL7', 0.3);
                        document.documentElement.style.setProperty('--lichtL6', 0.3);
                        document.documentElement.style.setProperty('--lichtL5', 0.3);
                        document.documentElement.style.setProperty('--lichtL4', 0.3);
                        document.documentElement.style.setProperty('--lichtL3', 0.3);
                        document.documentElement.style.setProperty('--lichtL2', 0.3);
                        document.documentElement.style.setProperty('--lichtL1', 0.3);

                        document.documentElement.style.setProperty('--lichtU12', 0.3);
                        document.documentElement.style.setProperty('--lichtU11', 0.3);
                        document.documentElement.style.setProperty('--lichtU10', 0.3);
                        document.documentElement.style.setProperty('--lichtU9', 0.3);
                        document.documentElement.style.setProperty('--lichtU8', 0.3);
                        document.documentElement.style.setProperty('--lichtU7', 0.3);
                        document.documentElement.style.setProperty('--lichtU6', 0.3);
                        document.documentElement.style.setProperty('--lichtU5', 0.3);
                        document.documentElement.style.setProperty('--lichtU4', 0.3);
                        document.documentElement.style.setProperty('--lichtU3', 0.3);
                        document.documentElement.style.setProperty('--lichtU2', 0.3);
                        document.documentElement.style.setProperty('--lichtU1', 0.3);

                    

                
                        if (this.scoreF > 11){
                        document.documentElement.style.setProperty('--lichtL12', 1);
                        }
                        if (this.scoreF > 10){
                        document.documentElement.style.setProperty('--lichtL11', 1);
                        }
                        
                        if (this.scoreF > 9){
                        document.documentElement.style.setProperty('--lichtL10', 1);
                        }
                        
                        if (this.scoreF > 8) {
                        document.documentElement.style.setProperty('--lichtL9', 1);
                        }
                        
                        if (this.scoreF > 7) {
                        document.documentElement.style.setProperty('--lichtL8', 1);
                        }
                        
                        if (this.scoreF > 6) {
                        document.documentElement.style.setProperty('--lichtL7', 1);
                        }
                        
                        if (this.scoreF > 5) {
                        document.documentElement.style.setProperty('--lichtL6', 1);
                        }
                        
                        if (this.scoreF > 4) {
                        document.documentElement.style.setProperty('--lichtL5', 1);
                        }
                        
                        if (this.scoreF > 3) {
                        document.documentElement.style.setProperty('--lichtL4', 1);
                        }
                        
                        if (this.scoreF > 2) {
                        document.documentElement.style.setProperty('--lichtL3', 1);
                        }
                        
                        if (this.scoreF > 1) {
                        document.documentElement.style.setProperty('--lichtL2', 1);
                        }
                        
                        if (this.scoreF > 0) {
                        document.documentElement.style.setProperty('--lichtL1', 1);
                        }

                        if (this.scoreU > 11){
                            document.documentElement.style.setProperty('--lichtU12', 1);
                            }
                        if (this.scoreU > 10){
                            document.documentElement.style.setProperty('--lichtU11', 1);
                            }
                            
                        if (this.scoreU > 9){
                            document.documentElement.style.setProperty('--lichtU10', 1);
                            }
                            
                        if (this.scoreU > 8) {
                            document.documentElement.style.setProperty('--lichtU9', 1);
                            }
                            
                        if (this.scoreU > 7) {
                            document.documentElement.style.setProperty('--lichtU8', 1);
                            }
                            
                        if (this.scoreU > 6) {
                            document.documentElement.style.setProperty('--lichtU7', 1);
                            }
                            
                        if (this.scoreU > 5) {
                            document.documentElement.style.setProperty('--lichtU6', 1);
                            }
                            
                        if (this.scoreU > 4) {
                            document.documentElement.style.setProperty('--lichtU5', 1);
                            }
                            
                        if (this.scoreU > 3) {
                            document.documentElement.style.setProperty('--lichtU4', 1);
                            }
                            
                        if (this.scoreU > 2) {
                            document.documentElement.style.setProperty('--lichtU3', 1);
                            }
                            
                        if (this.scoreU > 1) {
                            document.documentElement.style.setProperty('--lichtU2', 1);
                            }
                            
                        if (this.scoreU > 0) {
                            document.documentElement.style.setProperty('--lichtU1', 1);
                            }

                    }, 2000);




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
            axios.get(rootUrl + "/api/device/" + nr + "/variable/beschleunigungen")
                .then(response => {
                // Handle the response from the server
                this.beschl = response.data.result;
                })
                },

        getBrems: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/bremsungen")
                .then(response => {
                // Handle the response from the server
                this.brems = response.data.result;
                })
                },
        
        getScoreF: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/scoreF")
                .then(response => {
                // Handle the response from the server
                this.scoreF = response.data.result;
                })
                },

        getScoreU: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/scoreU")
            .then(response => {
            // Handle the response from the server
            this.scoreU = response.data.result;
            })
            }, 
        getMinuten: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/minuten")
            .then(response => {
            // Handle the response from the server
            this.minuten = response.data.result;
            })
            }, 
        
    }
})
