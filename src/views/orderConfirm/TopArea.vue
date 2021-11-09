<template>
    <div class="top">
        <div class="top__bgcolor"></div>
        <div class="top__header">
            <div class="top__back" @click="handleBack">
                <i class="fas fa-chevron-left"></i>
            </div>
            確認訂單
        </div>
        <div class="top__receiver">
            <div class="top__title">收穫地址</div>
            <div class="top__address">台北市松山區市民大道四段</div>
            <div class="top__info">
                <span class="top__name">皇阿瑪</span>
                <span class="top__phone">098856266</span>
            </div>
            <div class="top__enter">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'TopArea',
    setup() {
        const router = useRouter();
        const handleBack = () => {
            router.back();
        };
        return { handleBack };
    }
};
</script>

<style lang="scss" scoped>
.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
    );
    background-repeat: no-repeat;

    &__header {
        position: relative;
        padding-top: 0.26rem;
        line-height: 0.24rem;
        color: #fff;
        text-align: center;
        font-size: 0.16rem;
    }

    &__back {
        position: absolute;
        left: 0.18rem;
    }

    &__receiver {
        position: absolute;
        left: 0.18rem;
        right: 0.18rem;
        bottom: 0;
        height: 1.11rem;
        background-color: #fff;
        border-radius: 0.04rem;
    }

    &__title {
        padding: 0.16rem 0 0.14rem 0.16rem;
        font-size: 0.16rem;
        color: #333;
        line-height: 0.22rem;
    }

    &__address {
        line-height: 0.2rem;
        padding: 0 0.4rem 0 0.16rem;
        font-size: 0.14rem;
        color: #333;
    }

    &__info {
        padding: 0.06rem 0 0 0.16rem;
    }

    &__name {
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: #666;
    }

    &__enter {
        position: absolute;
        right: 0.16rem;
        top: 0.53rem;
        color: #666;
        font-size: 0.16rem;
    }
}
</style>
