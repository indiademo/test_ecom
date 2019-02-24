exp=require("express")
bp=require("body-parser")

jst=require("jsonwebtoken")
bc=require("bcrypt")
var path = require('path')

//app.use()
app=exp()
app.use(bp.json())
sec=require("./myfiles/encript")

catfile=require("./myfiles/cat_server")
subcatfile=require("./myfiles/sub_cat")
sscat=require("./myfiles/sub_subcat")
pro=require("./myfiles/product")
userd=require("./myfiles/userlog")
orde=require("./myfiles/orders")
pay=require("./myfiles/payment")

var PORT = process.env.PORT || 3000
app.use(exp.static('src/assets/images'))


app.use(exp.static(__dirname + '/dist/user'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/user/index.html'));
});


app.use("/catser",catfile)
app.use("/subcatser",subcatfile)
app.use("/subsubcatser",sscat)
app.use("/productser",pro)
app.use("/userser",userd)
app.use("/userorders",orde)
app.use("/payment",pay)
app.listen(PORT)
console.log("2244")


