<template>
    <div class="wrapper">
        <StaticPart />
        <Nearby />
    </div>
    <Docker :currectIndex="0" />
</template>

<script>
import StaticPart from './StaticPart.vue';
import Docker from '../../components/Docker.vue';
import Nearby from './Nearby.vue';

export default {
    name: 'Home',
    components: {
        StaticPart,
        Docker,
        Nearby
    }
};
</script>

<style lang="scss" scoped></style>
