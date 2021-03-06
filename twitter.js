var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    // logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

var fs = require('fs');

var data = fs.read("config/t_cookie.txt")
phantom.cookies = JSON.parse(data)


casper.start('https://twitter.com/login?lang=ja', function(){
    
    this.echo("test");
    // this.capture('img/login.png');

    this.capture('img/login.png');

    this.fillSelectors('form.js-signin', {
        'input[name="session[username_or_email]"]':    'parkour12019@gmail.com',
        'input[name="session[password]"]':    'kuro1212',
    }, true);

    this.waitForSelector('.DashboardProfileCard-content', function(){
        this.capture('img/after.png');
        //クッキー保存
        var cookies = JSON.stringify(phantom.cookies)
        fs.write("config/t_cookie.txt", cookies, 644)

    })

    /*
    *
    * 処理
    *
    */

});

// casper.then(function(){
// })

//実行する
casper.run();

// casper.run(function() {

//     this.exit();   //終了

// });