<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back" @click="handleBackClick">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="search__content">
                <span class="search__icon">
                    <i class="fas fa-search"></i>
                </span>
                <input
                    type="text"
                    class="search__input"
                    placeholder="請輸入商品名稱"
                />
            </div>
        </div>
        <!-- v-show="item.imgUrl" 避免為載入就出現 -->
        <Shopinfo :item="item" v-show="item.imgUrl" />
        <Content :shopName="item.name" />
        <Cart />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { get } from '../../utils/request.js';
import Shopinfo from '../../components/Shopinfo';
import Content from './Content';
import Cart from './Cart';

// 獲取當前商店訊息
const useShopInfoEffect = () => {
    const route = useRoute();
    const data = reactive({ item: {} });
    const getItemData = async () => {
        const result = await get(`api/shop/${route.params.shopid}`);
        if (result?.errno === 0 && result?.data) {
            data.item = result.data;
        }
    };

    const { item } = toRefs(data);
    return {
        item,
        getItemData
    };
};

const backEffect = () => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };

    return {
        handleBackClick
    };
};

export default {
    name: 'Shop',
    components: {
        Shopinfo,
        Content,
        Cart
    },
    setup() {
        const { item, getItemData } = useShopInfoEffect();
        const { handleBackClick } = backEffect();
        getItemData();

        return {
            item,
            handleBackClick
        };
    }
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    margin: 0.14rem 0 0.04rem 0;

    &__back {
        width: 0.3rem;
        font-size: 0.3rem;
        color: #e6e6e6;
    }

    &__content {
        display: flex;
        align-items: center;
        flex: 1;
        padding: 0 0.1rem;
        background-color: #f5f5f5;
        border-radius: 0.16rem;
    }

    &__icon {
        font-size: 0.2rem;
        color: #b7b7b7;
    }

    &__input {
        display: block;
        width: 100%;
        height: 0.32rem;
        margin-left: 0.1rem;
        border: none;
        outline: 0;
        background: none;
    }
}
</style>
