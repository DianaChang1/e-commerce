<template>
    <div class="nearby">
        <div class="nearby__title">附近店鋪</div>
        <div class="nearby__content">
            <router-link
                class="o-link"
                v-for="item in nearbyList"
                :key="item._id"
                :to="`/shop/${item._id}`"
            >
                <Shopinfo :item="item" :hasBorder="true" />
            </router-link>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { get } from '../../utils/request.js';
import Shopinfo from '../../components/Shopinfo';

const useNearbyEffect = () => {
    const nearbyList = ref([]);
    const getNearbyList = async () => {
        const result = await get('/api/shop/hot-list');
        if (result?.errno === 0 && result?.data?.length) {
            nearbyList.value = result.data;
        }
    };

    return { nearbyList, getNearbyList };
};

export default {
    name: 'Nearby',
    components: {
        Shopinfo
    },
    setup() {
        const { nearbyList, getNearbyList } = useNearbyEffect();
        getNearbyList();

        return {
            nearbyList,
            getNearbyList
        };
    }
};
</script>

<style lang="scss" scoped>
.nearby {
    &__title {
        margin: 0.16rem 0 0.02rem 0;
        font-size: 0.18rem;
    }
}
</style>
