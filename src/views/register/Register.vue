<template>
    <div class="enterpoint">
        <img
            class="enterpoint__img"
            src="../../assets/images/user.png"
            alt=""
        />
        <div class="enterpoint__input">
            <input
                type="text"
                class="input"
                placeholder="請輸入帳號"
                v-model="username"
            />
        </div>
        <div class="enterpoint__input">
            <input
                type="password"
                class="input"
                placeholder="請輸入密碼"
                autocomplete="new-password"
                v-model="password"
            />
        </div>
        <div class="enterpoint__input">
            <input
                type="password"
                class="input"
                placeholder="請確認密碼"
                v-model="ensure"
            />
        </div>
        <div class="enterpoint__button" @click="handleRegister">註冊</div>
        <div class="enterpoint__link" @click="handleToLogin">
            已有帳號去登入
        </div>
    </div>
    <Toast v-if="show" :msg="msg" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request.js';
import Toast, { useToastEffect } from '../../components/Toast';
const useRegisterEffect = showToast => {
    const router = useRouter();
    const data = reactive({
        username: '',
        password: '',
        ensure: ''
    });
    const handleRegister = async () => {
        try {
            const result = await post('/api/user/register', {
                username: data.username,
                password: data.password
            });
            if (result?.errno === 0) {
                router.push({ name: 'Login' });
            } else {
                showToast('註冊失敗');
            }
        } catch (e) {
            showToast('請求失敗');
        }
    };

    const { username, password, ensure } = toRefs(data);

    return { username, password, ensure, handleRegister };
};

const useLoginEffect = () => {
    const router = useRouter();
    const handleToLogin = () => {
        router.push({ name: 'Login' });
    };

    return {
        handleToLogin
    };
};

export default {
    name: 'Register',
    components: {
        Toast
    },
    setup() {
        const { show, msg, showToast } = useToastEffect();
        const { handleToLogin } = useLoginEffect();
        const {
            username,
            password,
            ensure,
            handleRegister
        } = useRegisterEffect(showToast);

        return {
            username,
            password,
            ensure,
            show,
            msg,
            handleRegister,
            handleToLogin
        };
    }
};
</script>

<style lang="scss" scoped>
.enterpoint {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);

    &__img {
        display: block;
        width: 0.66rem;
        height: 0.66rem;
        margin: 0 auto 0.4rem;
    }

    &__input {
        margin: 0 0.4rem 0.16rem 0.4rem;
    }

    &__button {
        line-height: 0.48rem;
        box-shadow: 0 0.04rem 0.08rem rgba(0, 145, 255, 0.32);
        border-radius: 0.04rem;
        margin: 0.32rem 0.4rem 0.16rem 0.4rem;
        background-color: #0091ff;
        color: #fff;
        text-align: center;
        font-size: 0.16rem;
    }

    &__link {
        font-size: 0.14rem;
        text-align: center;
        color: #777;
    }
}
</style>
