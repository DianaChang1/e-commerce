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
                v-model="username"
                placeholder="請輸入帳號"
            />
        </div>
        <div class="enterpoint__input">
            <input
                type="password"
                class="input"
                v-model="password"
                placeholder="請輸入密碼"
            />
        </div>
        <div class="enterpoint__button" @click="handleLogin">登入</div>
        <div class="enterpoint__link" @click="handleToRegister">立即註冊</div>
    </div>
    <Toast v-if="show" :msg="msg" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request.js';
import Toast, { useToastEffect } from '../../components/Toast';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

const useLoginEffect = showToast => {
    const router = useRouter();
    const data = reactive({
        username: '',
        password: ''
    });
    const handleLogin = async () => {
        // await 則是可以暫停非同步函式的運行（中止 Promise 的運行），
        // 直到非同步進入 resolve 或 reject，當接收完回傳值後繼續非同步函式的運行
        const { username, password } = data;
        if (username.trim() === '' || password.trim() === '') {
            showToast('不得為空值');
            return;
        }
        try {
            const result = await post('/api/user/login', {
                username: data.username,
                password: data.password
            });
            // ?. => es6的Optional chaining，避免找不到物件呈現undefined而抱錯
            if (result?.errno === 0) {
                localStorage.isLogin = true;
                router.push({ name: 'Home' });
            } else {
                showToast('登入失敗');
            }
        } catch (e) {
            showToast('請求失敗'); // try 網址錯誤接不到時觸發或內容邏輯錯誤觸發，防止直接抱錯
        }
    };

    const { username, password } = toRefs(data);

    return { username, password, handleLogin };
};

const useRegisterEffect = () => {
    const router = useRouter();
    const handleToRegister = () => {
        router.push({ name: 'Register' });
    };
    return {
        handleToRegister
    };
};

export default {
    name: 'Login',
    components: {
        Toast
    },
    setup() {
        // 封裝成函式，相同邏輯在一起，好維護
        const { show, msg, showToast } = useToastEffect();
        const { username, password, handleLogin } = useLoginEffect(showToast);
        const { handleToRegister } = useRegisterEffect();
        // const handleLogin = () => {
        //     axios
        //         .post(
        //             'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login',
        //             {
        //                 username: postData.username,
        //                 password: postData.password
        //             }
        //         )
        //         .then(result => {
        //             if (result.dzzata.errno === 0) {
        //                 localStorage.isLogin = true;
        //                 router.push({ name: 'Home' });
        //             } else {
        //                 console.log('登入失敗');
        //             }
        //         })
        //         // 網址錯誤接不到時觸發或內容邏輯錯誤觸發
        //         .catch(err => {
        //             console.log(err);
        //         });
        // };

        // console.log(handleLogin()); 返回promise

        return {
            username,
            password,
            show,
            msg,
            handleLogin,
            handleToRegister
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
