/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', controllers.login) //router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

//get queryUser
router.get('/queryuser', controllers.user)

//get demo
router.get('/demo', controllers.demo)

//get start Info
//router.get('/start', controllers.startInfoSv)

//post input data one
router.post('/input', controllers.inputBeforeHSv.post)
router.get('/input', controllers.inputBeforeHSv.get)

//post input data two
router.post('/inputtwo', controllers.inputAfterHSv.post)
router.get('/inputtwo', controllers.inputAfterHSv.get)

//post userInfo interface
//router.post('/newuser', controllers.checkUserSv)

//get user H info
router.get('/userhinfo', controllers.userSv)

//get user all H data
router.get('/allhdata', controllers.allRecordsSv)

//Image OCR interfaxe
router.get('/ocr', controllers.recognizerSv.get)
router.post('/ocr', controllers.recognizerSv.post)

//test sample
//router.get('/aaa', controllers.aSample)

//test nodejs
//router.get('/in', controllers.trySample)

//404
router.get('/404', async (ctx, next) => {
  ctx.response.body = '<h1>404 Not Found</h1>'
})

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

module.exports = router
