<template>
    <TopArea />
    <ProductList />
    <Order />
</template>

<script>
import TopArea from './TopArea';
import ProductList from './ProductList';
import Order from './Order';
export default {
    name: 'OrderConfirm',
    components: {
        TopArea,
        ProductList,
        Order
    }
};
</script>

<style lang="scss" scoped></style>
