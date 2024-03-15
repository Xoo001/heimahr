import router from '@/router'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const whileList = ['/login', '/404']

/**
 * 前置守卫
 */
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 我去的页面是否是登录页
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
      // 拦截了没有经过后置守卫，中转了。这里手动结束进度条
      nprogress.done()
    } else {
      // 如果不是登录页放行
      // 获取用户信息：是否获取过
      if (!store.getters.userId) {
        // console.log('没有获取')
        // 获取用户信息
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token
    // 检测去的地址是否在白名单
    if (whileList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
