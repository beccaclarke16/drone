function init() {
        tracker = initTracker("#droneView");
        droneConnection.streamImage(tracker, "#droneView .drone");
    }

function initTracker(element) {

    var tracker = new tracking.ColorTracker();
    //TrackerUtils.startTrackingColors(tracker);
    TrackerUtils.addTrackingColor("#A9070F", "red", tracker);
   // TrackerUtils.addTrackingColor("FF0E16", "brighter red",tracker);
    TrackerUtils.addTrackingColor("#5EA24E", "green", tracker);
    //TrackerUtils.addTrackingColor("#CB7F84", "magenta", tracker);
    //TrackerUtils.addTrackingColor("#5EA24E", "bright green", tracker);
    TrackerUtils.startTrackingColors(tracker);
    // Whenever there is a new color detected, mark them

    tracker.on('track', function (event) {
        markColors(event.data, element);
        decideDroneMovement(event.data);
    });


    return tracker;

}
function markColors(colors,element){
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, context.width, context.height);

    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output");
    }
}
function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
function writeRectangle(rect, element) {
    $(element)
        .append("<p>")
        .append(rect.color + ": " + rect.width + "X" + rect.height)
        .append(" @ " + rect.x + ":" + rect.y)
}
function decideDroneMovement(colors){
    var move = {
        left: false,
        right: false
    };

    colors.forEach(function(rectangle) {
        if (rectangle.color === "green") {
            if (rectangle.width &gt; 250) {
                move.left = true;
            }
        }

        else if (rectangle.color === "red") {
            if (rectangle.width &gt; 250) {
                move.right = true;
            }
        }

    });

    console.log("Move", move);
    droneConnection.send(move);
}


window.addEventListener("load", init);
