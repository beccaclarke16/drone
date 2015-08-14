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
    device("nav", {
    driver: "ardrone-nav",
    connection: "ardrone"
})
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
bot=robot;
}


robot.drone.takeoff();
.device("drone",{
    driver:"ardrone",
    connection:"ardrone"
})
var bot;
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function (data) {
        bot.drone.disableEmergency();
        bot.drone.ftrim();
        bot.drone.takeoff();
        after(5 * 1000, function () {
            bot.drone.right(0.2);
        });
        after(6 * 1000, function () {
            bot.drone.right(0);
        });
        after(7 * 1000, function () {
            bot.drone.left(0.1);
        });
        after(9 * 1000, function () {
            bot.drone.left(0);
        });
        after(14 * 1000, function () {
            bot.drone.land();
        });
        after(18 * 1000, function () {
            bot.drone.stop();
        });
    });
}

bot.nav.on("navdata", function(data) {
    console.log(data);
});

Cylon.start();