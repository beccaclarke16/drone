var Cylon = require('cylon');
var bot;

// Initialise the robot
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
        after(10 * 1000, function () {
            bot.drone.right(0.2);
        });
    
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
        });

}

//bot.nav.on("navdata", function(data) {
//    console.log(data);
//});

Cylon.start();