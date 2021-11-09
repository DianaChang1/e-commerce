<template>
    <div class="toast">{{ msg }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
    name: 'Toast',
    props: ['msg']
};

export const useToastEffect = () => {
    const toastData = reactive({
        show: false,
        msg: ''
    });

    const showToast = msg => {
        toastData.show = true;
        toastData.msg = msg;

        setTimeout(() => {
            toastData.show = false;
            toastData.msg = '';
        }, 1000);
    };
    const { show, msg } = toRefs(toastData);
    return { show, msg, showToast };
};
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.1rem;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 0.05rem;
    color: #fff;
}
</style>
