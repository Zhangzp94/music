var express = require('express');
var router = express.Router();
var Pic = require('../model/pic')
var axios = require('axios')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/pic',function (req,res,next) {
  Pic.find(function (err,doc) {
  if (err){
    res.json({
      status:"1",
      msg:err.message,
      result:''
    })
  }else{
    res.json({
      status:'0',
      msg:'',
      result:doc
    })
  }
  })
})
router.get('/getDiscList',function (req,res,next) {
  let url = 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag'
    axios.get(url,{
      headers:{
        referer: 'https://y.qq.com/',
      },
      params:req.query
    }).then(response=>{
    res.json(response.data)
    }).catch(e=>{
    console.log(e)
    })
})

//获取歌手列表
router.get("/singerList",function (req,res,next) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url,{
    headers:{
      referer: 'https://y.qq.com/portal/singer_list.html',
    },
    params:req.query
  }).then(response=>{
    res.json(response.data)
  }).catch(e=>{
    console.log(e)
  })
})

router.get('/singerDetail',function (req,res,next) {
  let url = "https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg"
  axios.get(url,{
    headers:{
      referer: 'https://y.qq.com/n/yqq/singer/0025NhlN2yWrP4.html',
    },
    params:req.query
  }).then(response=>{
    res.json(response.data)
  }).catch(e=>{
    console.log(e)
  })
})
module.exports = router;
