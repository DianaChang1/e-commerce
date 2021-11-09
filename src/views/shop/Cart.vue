<template>
    <div class="mask" v-show="showCart" @click="showCartHandler"></div>
    <div class="cart">
        <div class="product" v-show="showCart">
            <div class="product__header">
                <div class="product__all">
                    <div
                        class="product__check"
                        @click="setCheckAll(shopid, calculate.allChecked)"
                    >
                        <div v-show="calculate.allChecked">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div v-show="!calculate.allChecked">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    全選
                </div>
                <div class="product__clear">
                    <span @click="clearCartProduct(shopid)">清空購物車</span>
                </div>
            </div>
            <!-- <template v-for="item in list" :key="item._id">
                <div class="product__item" v-if="item.count > 0"> -->
            <div class="product__item" v-for="item in list" :key="item._id">
                <div
                    class="product__check"
                    @click="changeCheckStatus(shopid, item._id)"
                >
                    <div v-show="item.check">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div v-show="!item.check">
                        <i class="far fa-check-circle"></i>
                    </div>
                </div>
                <img class="product__img" :src="item.imgUrl" alt="" />
                <div class="product__detail">
                    <h4 class="product__title">{{ item.name }}</h4>
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
                        @click="changeCartItemInfo(shopid, item._id, item, -1)"
                    >
                        -
                    </div>
                    {{ item.count || 0 }}
                    <div
                        class="product__plus"
                        @click="changeCartItemInfo(shopid, item._id, item, 1)"
                    >
                        +
                    </div>
                </div>
            </div>
            <!-- </div>
            </template> -->
        </div>
        <div class="check">
            <div class="check__icon" @click="showCartHandler">
                <img
                    class="check__img"
                    src="http://www.dell-lee.com/imgs/vue3/basket.png"
                    alt=""
                />
                <div class="check__tag">{{ calculate.count }}</div>
            </div>
            <div class="check__info">
                總計:
                <span class="check__price">&yen;{{ total }}</span>
            </div>
            <div class="check__btn" v-show="total > 0">
                <router-link :to="{ path: `/orderConfirm/${shopid}` }"
                    >去結算</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from '../../effects/cart.js';

const useCartEffect = shopId => {
    const store = useStore();
    const { changeCartItemInfo, list, total } = useCommonCartEffect(shopId);

    const cartList = store.state.cartList;
    const showCart = ref(false);

    const calculate = computed(() => {
        const products = cartList[shopId]?.productList;
        const result = { count: 0, allChecked: false };
        // products第一次undefined，後續為空物件
        if (products && Object.keys(products).length > 0) {
            result.count = Object.keys(products).length;
            result.allChecked = true;

            for (const i in products) {
                const productInfo = products[i];
                if (!productInfo.check) {
                    result.allChecked = false;
                }
            }
        } else {
            showCart.value = false;
        }

        return result;
    });

    const changeCheckStatus = (shopid, productid) => {
        store.commit('changeStatus', { shopid, productid });
    };

    const clearCartProduct = shopid => {
        store.commit('clearCartProduct', { shopid });
    };

    const setCheckAll = (shopid, allChecked) => {
        store.commit('setCheckAll', { shopid, allChecked });
    };

    const showCartHandler = () => {
        if (calculate.value.count > 0) {
            showCart.value = !showCart.value;
        }
    };

    return {
        total,
        calculate,
        showCart,
        list,
        changeCartItemInfo,
        changeCheckStatus,
        clearCartProduct,
        setCheckAll,
        showCartHandler
    };
};

export default {
    name: 'Cart',
    setup() {
        const route = useRoute();
        const shopid = route.params.shopid;
        const {
            total,
            calculate,
            showCart,
            list,
            changeCartItemInfo,
            changeCheckStatus,
            clearCartProduct,
            setCheckAll,
            showCartHandler
        } = useCartEffect(shopid);

        return {
            total,
            calculate,
            showCart,
            list,
            shopid,
            changeCartItemInfo,
            changeCheckStatus,
            clearCartProduct,
            setCheckAll,
            showCartHandler
        };
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/_mixins.scss';
.cart {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
}

.check {
    display: flex;
    line-height: 0.5rem;
    &__icon {
        position: relative;
        width: 0.84rem;
    }

    &__tag {
        position: absolute;
        left: 0.46rem;
        top: 0.04rem;
        min-width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        padding: 0 0.04rem;
        background-color: #e93b3b;
        border-radius: 0.1rem;
        font-size: 0.12rem;
        text-align: center;
        color: #fff;
        transform: scale(0.5);
        transform-origin: left center;
    }

    &__img {
        display: block;
        width: 0.28rem;
        height: 0.28rem;
        margin: 0.12rem auto;
    }

    &__info {
        flex: 1;
        font-size: 0.12rem;
        color: #333;
    }

    &__price {
        font-size: 0.18rem;
        color: #e93b3b;
    }

    &__btn {
        width: 0.98rem;
        background-color: #4fb0f9;
        color: #fff;
        font-size: 0.14rem;
        text-align: center;

        a {
            color: #fff;
        }
    }
}

.product {
    overflow-y: scroll;
    flex: 1;

    &__header {
        display: flex;
        line-height: 0.52rem;
        border-bottom: 1px solid #f1f1f1;
    }

    &__all {
        width: 0.64rem;
        margin-left: 0.16rem;
    }

    &__clear {
        flex: 1;
        text-align: right;
        font-size: 0.14rem;
        margin-right: 0.16rem;
    }

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 0.16rem;
        padding: 0.12rem 0;
        border-bottom: 1px solid #f1f1f1;
    }

    &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
    }

    &__title {
        line-height: 0.2rem;
        margin: 0;
        font-size: 0.14rem;
        color: #333;
        font-weight: bold;
        @include ellipsis;
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

    &__check {
        display: inline-block;
        font-size: 0.18rem;
        margin-right: 0.08rem;
    }
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
