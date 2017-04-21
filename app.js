require( "babel-polyfill" );

//var fs = require( 'fs' )
var webpack = require( 'webpack' )
 
//var webpackMiddleware = require( 'koa-webpack-middleware' );
//var devMiddleware = webpackMiddleware.devMiddleware;
//var hotMiddleware = webpackMiddleware.hotMiddleware;
//var getDevMiddleWare = webpackMiddleware.getDevMiddleWare;

var koaWebpack = require('koa-webpack');

var webpackConf = require( './webpack.config' )

var Koa = require( 'koa' )

var app = new Koa()

var compiler = webpack( webpackConf );

var middleware = koaWebpack({
  compiler:compiler , 
  dev:{
  noInfo: false,
  publicPath: webpackConf.output.publicPath
} 
}) 

//var webpackdevMiddleware = devMiddleware( compiler, );
//app.use( webpackdevMiddleware  )
app.use( middleware  )

//app.use( hotMiddleware( compiler ) );

app.use( ctx => {
  console.log(middleware.dev.fileSystem);
  const htmlBuffer = middleware.dev.fileSystem.readFileSync(`./index.html`);
  ctx.type = 'html';
  //ctx.body = fs.createReadStream( './index.html' );
  //ctx.body = fs.readFileSync( './index.html' );
  ctx.body = htmlBuffer; 
} )

app.listen( 3000 );

