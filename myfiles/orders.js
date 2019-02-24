exp = require("express")

rt = exp.Router()
 mj=require("mongojs")
//  conn=mj("mongodb://localhost:27017/demo")
conn=mj("mongodb://pathakabhishek:1.jaanabhi@ds021741.mlab.com:21741/demo")





router.post("/product",function(req,res){
           
    ob=req.body
      
        conn.tbl_purchaseorder.find({userid:ob.uid}, function(err,result){
            //console.log(result)
            res.send(result)
        
        
        })
  
})


module.exports=rt;