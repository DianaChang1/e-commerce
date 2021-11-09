<template>
    <div class="position">
        <span class="position__map">
            <i class="fas fa-map-marker-alt"></i>
        </span>
        <span class="position__title">
            台北市松山區市民大道五段台北市松山區市民大道五段
        </span>
        <span class="position__notice">
            <i class="far fa-bell"></i>
        </span>
    </div>
    <div class="search">
        <span class="search__icon">
            <i class="fas fa-search"></i>
        </span>
        <span class="search__title">山姆會員商店優惠商品</span>
    </div>
    <div class="banner">
        <img class="banner__img" src="../../assets/images/banner.jpg" alt="" />
    </div>
    <div class="icons">
        <div class="icons__item" v-for="item in iconList" :key="item.title">
            <img class="icons__img" :src="item.imgUrl" alt="" />
            <div class="icons__title">{{ item.title }}</div>
        </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
    name: 'StaticPart',
    setup() {
        const iconList = [
            {
                imgUrl: require('../../assets/images/market.png'),
                title: '超市便利'
            },
            {
                imgUrl: require('../../assets/images/vegetable-market.png'),
                title: '菜市場'
            },
            {
                imgUrl: require('../../assets/images/fruit.png'),
                title: '水果店'
            },
            {
                imgUrl: require('../../assets/images/market.png'),
                title: '鮮花綠植'
            },
            {
                imgUrl: require('../../assets/images/vegetable-market.png'),
                title: '醫藥健康'
            },
            {
                imgUrl: require('../../assets/images/fruit.png'),
                title: '家居時尚'
            },
            {
                imgUrl: require('../../assets/images/market.png'),
                title: '烘培蛋糕'
            },
            {
                imgUrl: require('../../assets/images/vegetable-market.png'),
                title: '簽到'
            },
            {
                imgUrl: require('../../assets/images/fruit.png'),
                title: '大肆免運'
            },
            {
                imgUrl: require('../../assets/images/market.png'),
                title: '紅包套餐'
            }
        ];

        return {
            iconList
        };
    }
};
</script>

<style lang="scss" scoped>
// 共用的只有css，該頁用到變數，還是需要imprt來源檔
@import '@/assets/css/_mixins';

.position {
    display: flex;
    position: relative;
    padding: 0.16rem 0.24rem 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;

    &__title {
        @include ellipsis;
    }

    &__map + &__title {
        margin-left: 0.05rem;
    }

    &__map,
    &__notice {
        display: inline-block;
        font-size: 0.2rem;
    }

    &__notice {
        position: absolute;
        top: 0.16rem;
        right: 0;
    }
}

.search {
    line-height: 0.32rem;
    background: #f5f5f5;
    color: #b7b7b7;
    border-radius: 0.16rem;
    margin-bottom: 0.16rem;
    padding: 0 0.16rem;
    font-size: 0.14rem;
    &__icon {
        display: inline-block;
        font-size: 0.2rem;
        vertical-align: middle;
    }

    &__icon + &__title {
        margin-left: 0.08rem;
    }
}

.banner {
    // 事先撐出大小，防止圖片載入太慢而抖動
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;

    &__img {
        width: 100%;
    }
}

.icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.16rem;

    &__item {
        width: 20%;
        text-align: center;
    }

    &__img {
        width: 0.4rem;
        height: 0.4rem;
    }

    &__title {
        margin-top: 0.04rem;
        margin-bottom: 0.16rem;
    }
}

.gap {
    height: 0.1rem;
    background: #f1f1f1;
}
</style>
