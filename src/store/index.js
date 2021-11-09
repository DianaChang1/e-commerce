import { createStore } from 'vuex';

const setLocalStorage = state => {
    const { cartList } = state;
    const cartListString = JSON.stringify(cartList);
    localStorage.cartList = cartListString;
};

const getLocalStorage = () => {
    return localStorage.cartList ? JSON.parse(localStorage.cartList) : {};
};

export default createStore({
    state: {
        cartList: getLocalStorage()
        // cartList: {
        //     第一層級為店舖id名稱
        //     shopId: {
        //         shopName:'沃尔玛',
        //         // 第二層級為商品id名稱
        //         productList:{
        //              productId: {
        //                  id: '1',
        //                  name: '番茄 250g / 份',
        //                  imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
        //                  sales: 10,
        //                  price: 33.6,
        //                  oldPrice: 39.6,
        //                  count: 2
        //              }
        //         }
        //     }
        // }
    },
    mutations: {
        // 店家名稱
        changeShopName(state, payload) {
            const { shopid, shopName } = payload;
            const shopInfo = state.cartList[shopid] || {
                shopName: '',
                productList: {}
            };
            shopInfo.shopName = shopName;
            // 第一次未建立不會參考到state.cartList[shopid]
            state.cartList[shopid] = shopInfo;
            setLocalStorage(state);
        },
        // 產品
        changeCartItem(state, payload) {
            const { shopid, productid, product, num } = payload;
            const shopInfo = state.cartList[shopid] || {
                shopName: '',
                productList: {}
            };
            let productInfo = shopInfo.productList[productid];
            if (!productInfo) {
                productInfo = product;
                productInfo.count = 0;
                productInfo.check = false;
            }

            productInfo.count += num;

            // 存回去status，傳址
            shopInfo.productList[productid] = productInfo;
            state.cartList[shopid] = shopInfo;

            if (productInfo.count <= 0) {
                delete shopInfo.productList[productid];
            }
            setLocalStorage(state);
        },
        // 清除購物車
        clearCartProduct(state, payload) {
            const { shopid } = payload;
            state.cartList[shopid].productList = {};

            setLocalStorage(state);
        },
        // 改變選擇狀態
        changeStatus(state, payload) {
            const { shopid, productid } = payload;
            const productInfo = state.cartList[shopid].productList[productid];
            productInfo.check = !productInfo.check;
            setLocalStorage(state);
        },
        // 全選功能
        setCheckAll(state, payload) {
            const { shopid, allChecked } = payload;
            const products = state.cartList[shopid].productList;

            if (products && Object.keys(products).length > 0) {
                for (const i in products) {
                    products[i].check = !allChecked;
                }
            }
            setLocalStorage(state);
        }
    }
});
