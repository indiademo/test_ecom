exp = require("express")
router = exp.Router()
mj=require("mongojs")

ses=require("express-session")
app.use(ses({secret:"gfg",saveUninitialized:true,resave:true}))
// conn=mj("mongodb://localhost:27017/demo")
conn=mj("mongodb://pathakabhishek:1.jaanabhi@ds021741.mlab.com:21741/demo")



router.get("/get_product",function(req,res){
    conn.tbl_product.find(function(err,result){
        res.send(result)
    })
})

router.post("/getproductss",function(req,res){
    ob=req.body
    //console.log(ob)
    conn.tbl_product.find({subsubcatid:ob.id}, function(err,result){
        conn.tbl_wishlist.find(function(err,wishprores){
            //console.log(wishprores)
            arr=[]
            obb={}
               // console.log(result[i])
                
            for(i=0;i<result.length;i++){
                obb=result[i]
                //console.log(ob)
                for(j=0;j<wishprores.length;j++){
                    if(result[i]._id==wishprores[j]._id){
                        obb.aactive=wishprores[j]._id
                        // console.log(obb.aactive)
                    }
                }
                
                //arr.push(ob)
                //console.log(obb)
            }
           // console.log(arr)
           // res.send(arr)

        })
        
        // function(err,res){}
      
       
    })
  
})
////////////////////////////////////////////////////////////////////


router.post("/getproducts",function(req,res){
    rss=req.body
    conn.tbl_product.find({subsubcatid:rss.id},function(req,proresult){       
        conn.tbl_wishlist.find(function(req,brandresult){    
          // console.log(rss)
                        arr=[]
                        
                        for(i=0;i<proresult.length;i++){
                            ob={}
                           // console.log(proresult[i])
                            ob=proresult[i]
                            //console.log(ob)
                            for(j=0;j<brandresult.length;j++){
                                if(proresult[i]._id==brandresult[j]._id){
                                    ob.active=brandresult[j].active
                                   // console.log(ob.brand)
                                }
                            }
                           // console.log(ob)
                            arr.push(ob)
                        }
                        //console.log(arr)
                        res.send(arr)
                
            
        })    
    })  //  
     
     
 })

 ///////////////////////////////////////////////////////////////////////

///////////////
router.post("/prodetails",function(req,res){
    ob=req.body
   // console.log(ob)
    conn.tbl_product.find({_id:ob.id}, function(err,result){
        
        res.send(result)
    })
})
///////////////


///////////////
router.post("/proamount",function(req,res){
    ob=req.body
    // console.log(ob.subsub)
    // conn.tbl_product.find({subsubcatid:ob.subsub,price:{$gte:ob.maxamo}}, function(err,result){

 conn.tbl_product.find( { $and: [ { subsubcatid:ob.subsub }, { price: { $gte:ob.min } },{ price: { $lte:ob.maxamo } } ] } , function(err,result){

//  })
        // console.log(result)
        res.send(result)
        //console.log(result),price:{$gte:ob.maxamo}//{subsubcatid:ob.subsub,price:{$gte:ob.maxamo}}
    })
})
///////////////wishlist

router.post("/wishlist",function(req,res){
    
    ob=req.body
    proo=ob.wishpr
   // console.log(ob)
    var id=conn.tbl_wishlist.find().sort({_id:-1}).limit(1,function(err,result){
    
         
        conn.tbl_wishlist.insert({_id:proo[0]._id,userid:ob.userid,catid:proo[0].catid,subcatid:proo[0].subcatid,subsubcatid:proo[0].subsubcatid,brandid:proo[0].brandid,product:proo[0].product,quantity:proo[0].quanity,price:proo[0].price,productcolor:proo[0].procolor,pimg:proo[0].pimg,active:0})
        res.send("Inserted")
    })
    
    
    
    })
    //////////////////////////////////////////  END ////////////////////////////////


    //////////////////////GET WISH PRODUCT ID WISE////////////////////////////////////////
    router.post("/wishpro",function(req,res){
        wishob=req.body
       
        conn.tbl_product.find({_id:wishob.id}, function(err,result){
            
            res.send(result)
          
           
        })
      
    })

        //////////////////////GET WISH PRODUCT USER ID WISE////////////////////////////////////////

        router.post("/getwishpro",function(req,res){
           
            ob=req.body
               // console.log(ob)
                conn.tbl_wishlist.find({userid:ob.userid}, function(err,result){
                    
                    res.send(result)
                
                
                })
          
        })

        //////////////////////////////////////////  END ////////////////////////////////

/////////////////////////



router.post("/product",function(req,res){
           
    ob=req.body
      
        conn.tbl_purchaseorder.find({userid:ob.uid}, function(err,result){
            //console.log(result)
            res.send(result)
        
        
        })
  
})

///////////////////////////// ACTIVE WISH CART //////////////////////////////////////////////////

router.post("/wishactive",function(req,res){
    act=req.body
   // console.log(act)
    conn.tbl_wishlist.update({_id:act._id},{$set:{active:act.active}})
    res.send("Updated...")
})

router.post("/wishinactive",function(req,res){
    act=req.body
    //console.log(act)
    conn.tbl_wishlist.update({_id:act._id},{$set:{active:act.active}})
    res.send("Updated...")
})

    
module.exports=router;