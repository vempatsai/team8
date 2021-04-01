var bodyParser = require('body-parser');
var mysql = require('mysql');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "coffee"
});

module.exports = function(app) {

    app.get('/Home', function(req, res) {

        res.render('Home', {});
    });

    app.get('/About', function(req, res) {

        res.render('About', {});
    });
    app.get('/Register', function(req, res) {

        res.render('Register', { alert: "empty" });
    });

    app.get('/Login', function(req, res) {
        if (req.session.loggedin) {
            res.redirect('home1');
        } else
            res.render('Login', { alert: "empty" });
    });

    app.get('/AdminLogin', function(req, res) {
        if (req.session.loggedin) {
            res.redirect('Ahome1');
        } else
            res.render('AdminLogin', { alert: "empty" });
    });


    app.get('/Gallery', function(req, res) {

        res.render('Gallery', {});
    });

    app.get('/Contact', function(req, res) {

        res.render('Contact', {});
    });

    app.post('/AddBooking', urlencodedParser, function(req, res) {

        var table = req.body.table;
        var bdate = req.body.bdate;
        var btime = req.body.time;
        var username = req.session.username;
        console.log("Connected!");
        var sql = "INSERT INTO booking (btable,bdate,btime,username) VALUES ('" + table + "','" + bdate + "','" + btime + "','" + username + "')";
        console.log(sql);
        con.query(sql, function(err, result) {
            if (err) res.render('BookTable', { alert: "fail" });
            else {
                console.log("1 record inserted");
                //alert("Registration success");
                res.render('BookTable', { alert: "success" });
            }
        });

    });
    app.post('/RegisterUser', urlencodedParser, function(req, res) {

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;



        console.log("Connected!");
        var sql = "INSERT INTO userregister (username,password,email,phone) VALUES ('" + username + "','" + password + "','" + email + "','" + phone + "')";
        console.log(sql);
        con.query(sql, function(err, result) {
            if (err) res.render('Register', { alert: "fail" });
            else {
                console.log("1 record inserted");
                //alert("Registration success");
                res.render('Register', { alert: "success" });
            }
        });
    });



    app.post('/contactuser', urlencodedParser, function(req, res) {

        var name = req.body.name;
        var email = req.body.email;
        var msg = req.body.msg;

        console.log("Connected!");
        var sql = "INSERT INTO contact (name,email,msg) VALUES ('" + name + "','" + email + "','" + msg + "')";
        console.log(sql);
        con.query(sql, function(err, result) {
            if (err) res.render('Contact', { alert: "fail" });
            else {
                console.log("1 record inserted");
                //alert("Registration success");
                res.render('Contact', { alert: "success" });
            }
        });
    });




    app.get('/Logout', function(request, response) {
        request.session.loggedin = false;
        request.session.username = null;
        response.redirect('Home');
    });

    app.get('/Ahome1', function(request, response) {
        if (request.session.loggedin) {
            response.render('WelcomeAdminHome', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });
    app.get('/home1', function(request, response) {
        if (request.session.loggedin) {
            response.render('WelcomeHome', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/Menus', function(request, response) {
        if (request.session.loggedin) {
            response.render('Menus', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/Type2', function(request, response) {
        if (request.session.loggedin) {
            response.render('Type2', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });
    app.get('/Type3', function(request, response) {
        if (request.session.loggedin) {
            response.render('Type3', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/Type4', function(request, response) {
        if (request.session.loggedin) {
            response.render('Type4', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/Type5', function(request, response) {
        if (request.session.loggedin) {
            response.render('Type5', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/Type6', function(request, response) {
        if (request.session.loggedin) {
            response.render('Type6', { uname: request.session.username });
        } else {
            response.send('Please login to view this page!');
        }

    });



    app.get('/BookTable', function(request, response) {
        if (request.session.loggedin) {
            response.render('BookTable', { uname: request.session.username, alert: "empty" });
        } else {
            response.send('Please login to view this page!');
        }

    });
    app.get('/ViewBookings', function(request, response) {
        data = "";
        var username = request.session.username;
        if (request.session.loggedin) {

            con.query("SELECT * from booking where username='" + username + "'", function(err, result, fields) {
                if (err) throw err;

                data = JSON.parse(JSON.stringify(result));
                console.log("The data is " + data);
                response.render('ViewBookings', { uname: request.session.username, todos: data });

            });
        } else {
            response.send('Please login to view this page!');
        }

    });

    app.get('/ViewUBookings', function(request, response) {
        data = "";
        var username = request.session.username;
        if (request.session.loggedin) {

            con.query("SELECT * from booking ", function(err, result, fields) {
                if (err) throw err;

                data = JSON.parse(JSON.stringify(result));
                console.log("The data is " + data);
                response.render('ViewUBookings', { uname: request.session.username, todos: data });

            });
        } else {
            response.send('Please login to view this page!');
        }

    });
    app.post('/ALoginCheck', urlencodedParser, function(req, res) {

        var username = req.body.username;
        var password = req.body.password;
        if (username == "admin" && password == "admin") {
            req.session.loggedin = true;
            req.session.username = username;
            // res.render('AdminHome',{});
            res.redirect("Ahome1")
        } else {
            res.render("AdminLogin", { alert: "failed" });
        }

    });
    app.post('/LoginCheck', urlencodedParser, function(req, res) {

        var username = req.body.username;
        var password = req.body.password;

        var sql = "select * from userregister where username='" + username + "' and password='" + password + "'";
        con.query(sql, function(err, result, fields) {
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                // res.render('WelcomeHome',{});
                res.redirect("home1")
            } else {
                res.render("Login", { alert: "failed" });
            }

        });

    });

    app.delete('/coffee/:item', function(req, res) {



    });

};