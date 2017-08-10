require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var request = require('request');
var qs = require('querystring');
var cn = require('./connect.js');
console.log(cn)
app.get('/login',function(a,b){
   var  username = a.query.username;
   var  password = a.query.password;
   cn.connect(function(db){
      if(db){
          //数据库链接成功 
          
          //拿到所以数据
          var sql = `SELECT * FROM USER`;
          db.query(sql,function(err,results,fields){
               if(err){
                    console.log('插入失败' + err);
                    return           
               };
                            
               // 操作数据判断注册账户是否存在
               for(var x in results){
                    if(results[x].username == username && results[x].password == password){
                      var data = {
                          code:1,
                          msg:results[x]  
                      };
                      b.send(JSON.stringify(data))
                      return   
                    }
               }
             
               var err = {
                 code:0,
                 msg:'登陆失败'
               }
             b.send(JSON.stringify(err))
          })
      }else{
        // 数据库连接失败
        console.log('数据库连接失败'+db);
      }
   })
})
//注册
app.get('/select',function(req,res){
  var username = req.query.username;
  var password = req.query.password;
  cn.connect(function(db){
    if(db){
      //数据库连接成功
     var sql = `SELECT * FROM USER WHERE username = '${username}'`;
     db.query(sql,function(err,results,fields){
         if(err){
                    console.log('插入失败' + err);
                    return           
            }
            console.log(results)
            if(!results.length){
               
               var sql2 = `INSERT INTO user(username,password) VALUES ('${username}','${password}')`
               db.query(sql2,function(err,results,fields){
                   if (err) {
                      console.log('插入失败2:'+err);
                      return;
                    }
                    var success = {
                      coke : 1,
                      data:results
                    }

                    res.send(success)
               })
            }else{
               var err = {
                      coke : 0,
                      data:'用户已注册'
                    }
              res.send(err)
            }
     }) 

    }else{
        console.log('数据库连接失败'+db);
    }

  })
})

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


app.get('/geturl',function (a,b) {
  // 服务端发起ajax请求;
  // 要引入 request 的依赖库,来发起http请求
  if(a.query.url){
    // 发起http请求
    request(a.query.url,function(err,response,body){
      b.send({code:1,msg:JSON.parse(body)});
    })
  }else{
    // 没有参数,报错
    b.send({code:0,msg:'no_url'});
  }
});
app.post('/posturl',function (req,res) {
  var postData = "";
    req.addListener("data", function (data) {
        postData += data;
    });
    /**
     * 这个是如果数据读取完毕就会执行的监听方法
     */
    req.addListener("end", function () {
      // 格式化字符串为对象
        var query = qs.parse(postData);
        request.post(query.url,{form:query},function (err,response,body) {
      res.send({code:1,msg:JSON.parse(body)});          
        })
    });

})


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
