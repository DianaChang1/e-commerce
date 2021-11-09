<template>
    <div class="content">
        <div class="category">
            <div
                class="category__item"
                :class="{ 'is-active': currentTab === item.tab }"
                v-for="item in categories"
                :key="item.name"
                @click="handleCategoryClick(item.tab)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in list" :key="item._id">
                <img class="product__img" :src="item.imgUrl" alt="" />
                <div class="product__detail">
                    <h4 class="product__title">{{ item.name }}</h4>
                    <div class="product__sales">月售{{ item.sales }}件</div>
                    <div class="product__price">
                        <span class="product__yen">&yen;{{ item.price }}</span>
                        <span class="product__origin"
                            >&yen;{{ item.oldPrice }}</span
                        >
                    </div>
                </div>
                <div class="product__number">
                    <div
                        class="product__minus"
                        @click="
                            changeCartItem(shopid, item._id, item, -1, shopName)
                        "
                    >
                        -
                    </div>
                    {{
                        cartList?.[shopid]?.productList?.[item._id]?.count || 0
                    }}
                    <div
                        class="product__plus"
                        @click="
                            changeCartItem(shopid, item._id, item, 1, shopName)
                        "
                    >
                        +
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { get } from '../../utils/request.js';
import { useCommonCartEffect } from '../../effects/cart.js';

const categories = [
    {
        name: '全部商品',
        tab: 'all'
    },
    {
        name: '秒殺',
        tab: 'seckill'
    },
    {
        name: '新鮮水果',
        tab: 'fruit'
    }
];

// 只有tab邏輯
const useTabEffect = () => {
    const currentTab = ref(categories[0].tab);
    const handleCategoryClick = tab => {
        currentTab.value = tab;
    };

    return {
        currentTab,
        handleCategoryClick
    };
};

// 只有list邏輯
const useCurrentListEffect = (currentTab, shopid) => {
    const content = reactive({ list: [] });
    const getContentData = async () => {
        // 請求api/shop/1/products?tab=all
        const result = await get(`api/shop/${shopid}/products`, {
            tab: currentTab.value
        });
        if (result?.errno === 0 && result?.data.length) {
            content.list = result.data;
        }
    };

    // watchEffect => 初始和動態資料改變時觸發
    watchEffect(() => {
        getContentData();
    });
    const { list } = toRefs(content);

    return {
        list
    };
};

// 只有購物車邏輯
const useCartEffect = () => {
    const {
        cartList,
        changeCartItemInfo,
        changeShopName
    } = useCommonCartEffect();

    const changeCartItem = (shopid, productid, item, num, shopName) => {
        changeShopName(shopid, shopName);
        changeCartItemInfo(shopid, productid, item, num);
    };

    return {
        cartList,
        changeCartItem
    };
};

export default {
    name: 'Content',
    props: ['shopName'],
    setup() {
        // 也可以用ref([])，但還是會轉成reactive
        // const data = reactive({
        //     contentList: [],
        //     currentTab: categories[0].tab
        // });

        // const route = useRoute();
        // const getContentData = async tab => {
        //     // 請求api/shop/1/products?tab=all
        //     const result = await get(
        //         `api/shop/${route.params.shopid}/products`,
        //         { tab }
        //     );
        //     if (result?.errno === 0 && result?.data.length) {
        //         data.contentList = result.data;
        //     }
        // };

        // getContentData(data.currentTab);

        // const handleCategoryClick = tab => {
        //     data.currentTab = tab;
        //     getContentData(tab);
        // };
        // const { contentList, currentTab } = toRefs(data);
        const route = useRoute();
        const shopid = route.params.shopid;
        const { currentTab, handleCategoryClick } = useTabEffect();
        const { list } = useCurrentListEffect(currentTab, shopid);
        const { cartList, changeCartItem } = useCartEffect();
        return {
            shopid,
            list,
            categories,
            currentTab,
            cartList,
            handleCategoryClick,
            changeCartItem
        };
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/_mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: 0.5rem;
}

.category {
    overflow-y: scroll;
    height: 100%;
    width: 0.76rem;
    background-color: #f5f5f5;
    &__item {
        line-height: 0.4rem;
        text-align: center;
        font-size: 14px;
        color: #333;

        &.is-active {
            background: rgb(61, 60, 60);
            color: #fff;
        }
    }
}

.product {
    overflow-y: scroll;
    flex: 1;

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 0.16rem;
        padding: 0.12rem 0;
        border-bottom: 1px solid #f1f1f1;
    }

    &__img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;

        &--sm {
            width: 0.46rem;
            height: 0.46rem;
        }
    }

    &__title {
        line-height: 0.2rem;
        margin: 0;
        font-size: 0.14rem;
        color: #333;
        font-weight: bold;
        @include ellipsis;
    }

    &__sales {
        margin: 0.06rem 0;
        line-height: 0.16rem;
        font-size: 0.12rem;
        color: #333;
    }

    &__price {
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #e93b3b;
    }

    &__yen {
        font-size: 0.12rem;
    }

    &__origin {
        line-height: 0.2rem;
        margin-left: 0.06rem;
        font-size: 0.12rem;
        color: #999;
        text-decoration: line-through;
    }

    &__number {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
    }

    &__minus,
    &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.17rem;
        border-radius: 50%;

        text-align: center;
        font-size: 0.2rem;
    }

    &__minus {
        border: 1px solid #666;
        margin-right: 0.05rem;
        color: #666;
    }

    &__plus {
        margin-left: 0.05rem;
        background-color: #0091ff;
        color: #fff;
    }

    &__detail {
        overflow: hidden;
    }
}
</style>
