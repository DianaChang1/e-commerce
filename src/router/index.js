import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        // webpackChunkName => webpack 包檔=>去network的js可以看到
        component: () =>
            import(/* webpackChunkName: "home_123123" */ '../views/home/Home')
    },
    {
        // shop網址對應商品不同，給予id做區分
        path: '/shop/:shopid',
        name: 'Shop',
        component: () =>
            import(/* webpackChunkName: "shop_123123" */ '../views/shop/Shop')
    },
    {
        path: '/orderConfirm/:shopid',
        name: 'OrderConfirm',
        component: () =>
            import(
                /* webpackChunkName: "shop_123123" */ '../views/orderConfirm/OrderConfirm'
            )
    },
    {
        path: '/orderList',
        name: 'OrderList',
        component: () =>
            import(
                /* webpackChunkName: "shop_123123" */ '../views/orderList/OrderList'
            )
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(
                /* webpackChunkName: "login_123123" */ '../views/login/Login'
            ),
        // 只有訪問login頁前會執行，不必再多判斷to.name === 'Login'
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage;
            isLogin ? next({ name: 'Home' }) : next();
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import(
                /* webpackChunkName: "login_123123" */ '../views/register/Register'
            ),
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage;
            isLogin ? next({ name: 'Home' }) : next();
        }
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 跳轉任何頁面會觸發
router.beforeEach((to, from, next) => {
    const { isLogin } = localStorage;
    const { name } = to;
    const isLoginOrRegister = name === 'Login' || name === 'Register';
    // 邏輯:先登入才可以進頁面
    // 已登入或訪問Login頁面會繼續執行，反之跳轉到login頁面
    isLogin || isLoginOrRegister ? next() : next({ name: 'Login' });
});

export default router;
