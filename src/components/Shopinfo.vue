<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgUrl" alt="" />
        <div
            class="shop__content"
            :class="{ 'shop__content--bordered': hasBorder }"
        >
            <div class="shop__subtitle">{{ item.name }}</div>
            <div class="shop__tags">
                <span class="shop__tag">月售: {{ item.sales }}</span>
                <span class="shop__tag">起送: {{ item.expressLimit }}</span>
                <span class="shop__tag">基礎運費: {{ item.expressPrice }}</span>
            </div>
            <div class="shop__highlight">{{ item.slogan }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shopinfo',
    props: ['item', 'hasBorder']
};
</script>

<style lang="scss" scoped>
.shop {
    display: flex;
    padding-top: 0.12rem;

    &__img {
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.16rem;
    }

    &__content {
        flex: 1;
        padding-bottom: 0.12rem;

        &--bordered {
            border-bottom: 1px solid #f1f1f1;
        }
    }

    &__subtitle {
        line-height: 0.22rem;
        font-size: 0.16rem;
    }

    &__tags {
        line-height: 0.18rem;
        margin-top: 0.04rem;
        font-size: 0.13rem;
    }

    &__tag {
        margin-right: 0.16rem;
    }

    &__highlight {
        line-height: 0.18rem;
        margin-top: 0.04rem;
        font-size: 0.13rem;
        color: #e93b3b;
    }
}
</style>
