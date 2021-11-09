import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';

export const useCommonCartEffect = shopId => {
    const store = useStore();
    // toRef會轉成ref，程式内要加value，視圖不用
    // 一般物件用toRef資料會更新視圖則不會
    const { cartList } = toRefs(store.state);

    // 新增店家名稱
    const changeShopName = (shopid, shopName) => {
        store.commit('changeShopName', {
            shopid,
            shopName
        });
    };
    // 新增產品內容
    const changeCartItemInfo = (shopid, productid, product, num) => {
        store.commit('changeCartItem', {
            shopid,
            productid,
            product,
            num
        });
    };

    // 獲取購物車清單
    const list = computed(() => {
        return cartList.value[shopId]?.productList || {};
    });

    // 獲取訂單
    const getOrderList = list => {
        const orderList = {};
        for (const i in list) {
            if (list[i].check) {
                orderList[i] = list[i];
            }
        }

        return orderList;
    };

    // 獲取店家名稱
    const shopName = computed(() => {
        // 還是要用computed，因''不是響應式，未來有值不會再次改變視圖
        return cartList.value[shopId]?.shopName || '';
    });

    // 計算總價
    const total = computed(() => {
        // count/total/checked 都偵聽productList
        const products = cartList.value[shopId]?.productList;
        let total = 0;
        // products第一次undefined，後續為空物件
        if (products && Object.keys(products).length > 0) {
            for (const i in products) {
                const productInfo = products[i];
                if (productInfo.check) {
                    total += productInfo.count * productInfo.price;
                }
            }
        }
        total = total.toFixed(2);
        return total;
    });

    return {
        total,
        cartList,
        list,
        shopName,
        changeCartItemInfo,
        changeShopName,
        getOrderList
    };
};
