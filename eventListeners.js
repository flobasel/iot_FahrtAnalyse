// remember the last event so that we can check if two buttons were pressed within 1 second
var lastButtonPressEvent = {
    deviceId: "",
    timestamp: 0
}

// remember how many times the buttons were pressed
var buttonPressCounter = 0;

// react on the "Status" Event
function handleStatus (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "started blinking" or "stopped blinking"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    

    // the data we want to send to the clients
    let data = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("Status", data, evDeviceId, evTimestamp );
}

// react on the "buttonStateChanged" Event
function handleModus (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    let data = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    sendData("Modus", data, evDeviceId, evTimestamp );
}

function handleScores (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    let data = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    sendData("Scores", data, evDeviceId, evTimestamp );
}



function sendData(evName, evData, evDeviceId, evTimestamp ) {
    
    // map device id to device nr
    let nr = exports.deviceIds.indexOf(evDeviceId)

    // the message that we send to the client
    let data = {
        eventName: evName,
        eventData: evData,
        deviceNumber: nr,
        timestamp: evTimestamp,
    };

    // send the data to all connected clients
    exports.sse.send(data)
}

exports.deviceIds = [];
exports.sse = null;

// export your own functions here as well
exports.handleStatus = handleStatus;
exports.handleModus = handleModus;
exports.handleScores = handleScores;