var sess;
router.get('/', function(req,res){
    sess = req.session;
    sess.email;
    sess.username;
    //session set when user request our app via URL
    
    if(sess.email){
        /* this line checks for session existence, if it existed it will do the following */
        res.redirect('/admin');
    }
       else {
        res.render('/');
       }
        });
router.post('/login', function(req, res){
    sess = req.session;
    //in this we are assigning email to sess.emial variable, email comes from the web-page
    sess.email=req.body.email;
    res.end('done');
})

router.get('/admin', function(req, res){
    sess = req.session;
    if(sess.email){
        res.write('<h1>Hello' +sess.email+'</h1>');
        res.end('<a href="+">Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="+">Login</a>');
    }
});

router.get('/logout', function(req, res){
    req.session.destrot(function(err){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
})

//Index etc.
<html>
<head>
<title>Session Management in NodeJS using Express4.2</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> 
<script>
$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        /*
        * Perform some validation here.
        */
        $.post("http://localhost:8000/login",{email:email,pass:pass},function(data){        
            if(data==='done')           
            {
                window.location.href="/admin";
            }
        });
    });
});
</script>
</head>
<body>
<input type="text" size="40" placeholder="Type your email" id="email"><br />
<input type="password" size="40" placeholder="Type your password" id="password"><br />
<input type="button" value="Submit" id="submit">
</body>
</html>