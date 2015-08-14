var Cylon = require('cylon');
var utils = require('./utils/droneUtils.js');

// Initialise the robot
var bot;
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
    driver: "ardrone-nav",
    connection: "ardrone"
})
    .on("ready", fly);

var bot;
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function (data) {
    });
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    /*after(10 * 1000, function () {
     //   bot.drone.right(0.2);
    //});

    after(11 * 1000, function () {
        bot.drone.right(0);
    });
    after(12 * 1000, function () {
        bot.drone.left(0.1);
    });
    after(13 * 1000, function () {
        bot.drone.left(0);
    });
    after(18 * 1000, function () {
        bot.drone.land();
    });
    after(23 * 1000, function () {
        bot.drone.stop();
    });*/
    after(5*1000, function() {
        bot.drone.forward(0.05);
    });

    after(40*1000, function() {
        bot.drone.land();
    });
    after(45*1000, function() {
        bot.drone.stop();
    utils.instructionListener.on('move', moveDrone);
    bot.drone.getPngStream()
        .on("data", utils.sendFrame);
}
    function moveDrone(move) {
        if (move.left) {
            console.log("Moving left");
            bot.drone.left(0.25);
            bot.drone.forward(0);
            after(1 * 1000, function () {
                bot.drone.left(0);
                bot.drone.forward(0.05);
            });
            if (move.right) {
                console.log("Moving right");
                bot.drone.right(0.25);
                bot.drone.forward(0);
                after(1 * 1000, function () {
                    bot.drone.right(0);
                    bot.drone.forward(0.05);
                });
            }

        }
    }
//bot.nav.on("navdata", function(data) {
//    console.log(data);
//});

Cylon.start();