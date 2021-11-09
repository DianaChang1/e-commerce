<template>
    <div class="wrapper">
        <div class="title">我的訂單</div>
        <div class="orders">
            <div class="order" v-for="(item, index) in list" :key="index">
                <div class="order__title">
                    {{ item.shopName }}
                    <span class="order__status">{{
                        item.isCanceled ? '已取消' : '已下單'
                    }}</span>
                </div>
                <div class="order__content">
                    <div class="order__imgs">
                        <img
                            class="order__img"
                            v-for="(innnerItem, innerIndex) in item.products"
                            :key="innerIndex"
                            :src="innnerItem.product.img"
                        />
                    </div>
                    <div class="order__info">
                        <div class="order__price">&yen;{{ item.total }}</div>
                        <div class="order__count">共{{ item.num }}件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currectIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import Docker from '../../components/Docker.vue';
import { get } from '../../utils/request.js';

const useOrderListEffect = () => {
    const data = reactive({ list: [] });
    const getNearbyList = async () => {
        const result = await get('/api/order');
        if (result?.errno === 0 && result?.data?.length) {
            const orderList = result.data; // 傳址
            orderList.forEach(item => {
                const products = item.products;
                let total = 0;
                let num = 0;
                products.forEach(item => {
                    num += item?.orderSales || 0;
                    total += item?.product?.price * item?.product?.sales || 0;
                });
                item.total = total.toFixed(0);
                item.num = num;
            });
            data.list = orderList;
        }
    };
    getNearbyList();
    const { list } = toRefs(data);
    return {
        list
    };
};
export default {
    name: 'OrderList',
    setup() {
        const { list } = useOrderListEffect();

        return { list };
    },
    components: {
        Docker
    }
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 0.16rem;
    line-height: 0.44rem;
    background-color: #fff;
    color: #333;
    text-align: center;
}

.orders {
}

.order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background-color: rgb(236, 235, 235);

    &__title {
        margin-bottom: 0.16rem;
        font-size: 0.13rem;
        line-height: 0.22rem;
        color: #333;
    }

    &__status {
        float: right;
        font-size: 0.14rem;
        color: #999;
    }

    &__content {
        display: flex;
    }

    &__imgs {
        flex: 1;
    }

    &__img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
    }

    &__info {
        width: 0.7rem;
    }

    &__price {
        font-size: 0.14rem;
        color: #e93b3b;
        margin-bottom: 0.4rem;
        line-height: 0.2rem;
        text-align: right;
    }

    &__count {
        font-size: 0.12rem;
        color: #333;
        line-height: 0.14rem;
        text-align: right;
    }
}
</style>
