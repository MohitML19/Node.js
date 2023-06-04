const express = require("express")
const router = express.Router();
const connection = require("../db/dbconnect");

router.get("/products",function(req, resp){
    connection.query("select * from product", (err,data,fields)=>{
        if(err){
            resp.status(500).send("no data found "+JSON.stringify(err));
        }
        else{
            resp.render("index" ,{proddata:data})
        }
    })
})


router.get("/displayaddform",(req,resp)=>{
    resp.render("add-product")
})

router.post("/insertProduct", (req,resp)=>{
    var prodid = req.body.prodid;
    var pname = req.body.pname;
    var price = req.body.price;

    connection.query("insert into product values(?,?,?)",[prodid,pname,price],(err,result)=>{
        if(err){
            resp.status(500).send("data not added"+JSON.stringify(err))
        }
        else{
            resp.redirect("/products")
        }
    })

})

router.get("/edit/:pid",(req,resp)=>{
    console.log("prodid", req.params.pid)
    connection.query("select * from product where prodid=?",[req.params.pid],(err,data,fields)=>{
        console.log(data);
        if(err){
            resp.status(500).send("data not added"+JSON.stringify(err));
        }
        else{
            resp.render("update-product",{prod:data[0]});
        }
    })
})

router.post("/updateProduct",(req,resp)=>{
    var prodid = req.body.prodid;
    var pname = req.body.pname;
    var price = req.body.price;
    connection.query("update product set pname=? , price=? where prodid=?", [pname, price,prodid],(err,result)=>{
        if(err){
            resp.status(500).send("data not added"+JSON.stringify(err));
        }
        else{
            resp.redirect("/products")
        }
    })

})


router.get("/delete/:pid",(req,resp)=>{
    connection.query("delete from product where prodid=?",[req.params.pid],(err,result)=>{
        if(err){
            resp.status(500).send("data not found"+JSON.stringify(err))
        }
        else{
            resp.redirect("/products")
        }
    })
})

module.exports=router;