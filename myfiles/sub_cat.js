exp = require("express")
router = exp.Router()
mj=require("mongojs")
// conn=mj("mongodb://localhost:27017/demo")

conn=mj("mongodb://pathakabhishek:1.jaanabhi@ds021741.mlab.com:21741/demo")



router.get("/get_scat",function(req,res){
    conn.tbl_subcat.find(function(err,result){
        res.send(result)
    })
})


    
module.exports=router;