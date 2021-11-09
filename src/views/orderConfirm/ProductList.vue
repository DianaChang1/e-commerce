<template>
    <div class="products">
        <div class="products__title">{{ shopName }}</div>
        <div class="products__list">
            <div class="product">
                <div
                    class="product__item"
                    v-for="item in order"
                    :key="item._id"
                >
                    <img class="product__img" :src="item.imgUrl" alt="" />
                    <div class="product__detail">
                        <h4 class="product__title">{{ item.name }}</h4>
                        <div class="product__price">
                            <span class="product__yen"
                                >&yen;{{ item.price }}*{{ item.count }}</span
                            >
                            <span class="product__yen"
                                >&yen;{{
                                    (item.price * item.count).toFixed(2)
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from '../../effects/cart.js';
export default {
    name: 'ProductList',
    setup() {
        const route = useRoute();
        const shopid = route.params.shopid;
        const { list, shopName, getOrderList } = useCommonCartEffect(shopid);
        const order = getOrderList(list.value);

        return { order, shopName };
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/_mixins.scss';
.products {
    margin: 0.16rem 0.18rem 0.55rem 0.18rem;
    background-color: #fff;

    &__title {
        font-size: 0.16rem;
        padding: 0.16rem 0.16rem 0 0.16rem;
    }
}

.product {
    overflow-y: scroll;
    flex: 1;

    &__detail {
        flex: 1;
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

    &__price {
        display: flex;
        justify-content: space-between;
        line-height: 0.2rem;
        font-size: 0.14rem;
    }

    &__yen {
        font-size: 0.12rem;
        & + & {
            margin-left: 0.04rem;
        }
    }
}
</style>
