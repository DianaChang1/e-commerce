<template>
    <div class="docker">
        <div
            class="docker__item"
            :class="{ 'is-active': index === currectIndex }"
            v-for="(item, index) in dockerList"
            :key="item.iconName"
        >
            <router-link :to="item.link">
                <div class="docker__icon">
                    <i :class="item.iconClass"></i>
                </div>
                <div class="docker__title">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Docker',
    props: ['currectIndex'],
    setup() {
        const dockerList = [
            {
                iconClass: ['fas', 'fa-home'],
                title: '首頁',
                link: { name: 'Home' }
            },
            {
                iconClass: ['fas', 'fa-shopping-cart'],
                title: '購物車',
                link: { name: 'Home' }
            },
            {
                iconClass: ['fas', 'fa-file-alt'],
                title: '訂單',
                link: { name: 'OrderList' }
            },
            {
                iconClass: ['fas', 'fa-user'],
                title: '我的',
                link: { name: 'Home' }
            }
        ];

        return {
            dockerList
        };
    }
};
</script>

<style lang="scss" scoped>
.docker {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;
    padding: 0 0.18rem;
    background-color: #fff;

    &__item {
        flex: 1;
        text-align: center;
        cursor: pointer;
        &.is-active {
            a {
                color: #1fa4fc;
            }
        }

        a {
            color: #000;
        }
    }

    &__icon {
        font-size: 0.18rem;
    }

    &__title {
        font-size: 0.16rem;
    }

    &__icon + &__title {
        margin-top: 4px;
    }
}
</style>
