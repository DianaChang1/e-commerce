<template>
    <div class="order">
        <div class="order__price">實付金額 {{ total }}</div>
        <div class="order__btn" @click="handleMaskClick(true)">提交訂單</div>
    </div>
    <div class="mask" v-show="showMask" @click="handleMaskClick(false)">
        <div class="mask__content" @click.stop>
            <div class="mask__title">確認要離開收銀台?</div>
            <div class="mask__desc">請盡快完成支付，否則將被取消</div>
            <div class="mask__actions">
                <div class="mask__btn">
                    <div
                        class="o-btn o-btn--secondary"
                        @click="confirmOrder(true)"
                    >
                        取消訂單
                    </div>
                </div>
                <div class="mask__btn">
                    <div
                        class="o-btn o-btn--primary"
                        @click="confirmOrder(false)"
                    >
                        確認支付
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { post } from '../../utils/request.js';
import { useCommonCartEffect } from '../../effects/cart.js';

const useMakeOrderEffect = (list, shopName, getOrderList, shopid) => {
    const router = useRouter();
    const store = useStore();

    const confirmOrder = async isCanceled => {
        const products = [];
        const order = getOrderList(list.value);
        for (const i in order) {
            const product = list.value[i];
            products.push({
                id: parseInt(product._id, 10),
                num: product.count
            });
        }
        const result = await post('/api/order', {
            addressId: 1,
            shopId: shopid,
            shopName: shopName.value,
            isCanceled,
            products
        });

        if (result?.errno === 0) {
            store.commit('clearCartProduct', { shopid });
            router.push({ name: 'Home' });
        }
    };

    return {
        confirmOrder
    };
};

const useMaskEffect = () => {
    const showMask = ref(false);
    const handleMaskClick = status => {
        showMask.value = status;
    };
    return {
        showMask,
        handleMaskClick
    };
};

export default {
    name: 'Order',
    setup() {
        const route = useRoute();
        const shopid = parseInt(route.params.shopid, 10);
        const { total, list, shopName, getOrderList } = useCommonCartEffect(
            shopid
        );
        const { confirmOrder } = useMakeOrderEffect(
            list,
            shopName,
            getOrderList,
            shopid
        );
        const { showMask, handleMaskClick } = useMaskEffect();
        return { total, showMask, confirmOrder, handleMaskClick };
    }
};
</script>

<style lang="scss" scoped>
.order {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    line-height: 0.49rem;
    height: 0.49rem;
    background-color: rgb(225, 231, 233);

    &__price {
        flex: 1;
        text-indent: 0.24rem;
        font-size: 0.14rem;
    }

    &__btn {
        width: 0.98rem;
        background-color: #4fb0f9;
        color: #fff;
        font-size: 0.14rem;
        text-align: center;
        font-weight: bold;
    }
}

.mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);

    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 1.56rem;
        background-color: #fff;
        border-radius: 0.04rem;
        text-align: center;
    }

    &__title {
        font-size: 0.18rem;
        color: #333;
        margin-top: 0.24rem;
    }

    &__desc {
        font-size: 0.14rem;
        margin-top: 0.08rem;
    }

    &__actions {
        display: flex;
        margin-top: 0.24rem;
        justify-content: center;
    }

    &__btn + &__btn {
        margin-left: 0.16rem;
    }
}
</style>
