<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon
        slot="left"
        @click="$router.back()"
        name="cross"
        size="25"
        class="icon-login"
      />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="LoginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        left-icon="smile-o"
        name="密码"
        type="number"
        maxlength="6"
        placeholder="请填写验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
            format="ss 秒"
          />
          <van-button
            v-else
            round
            class="btn-send-mas"
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-spacing
import {login, SendMs} from '../../api/user'
export default {
  name: 'LoginIndex',
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      //   console.log('submit', values)
      try {
        // eslint-disable-next-line object-curly-spacing
        const {data} = await login(user)
        this.$toast.success('成功')
        this.$store.commit('updataUser', data.data)
        this.$router.back()
        // console.log('登录成功', res)
      } catch (err) {
        console.log(user)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败')
        }
      }
    },
    // eslint-disable-next-line space-before-function-paren
    async onSendSms() {
      try {
        await this.$refs.LoginForm.validate('mobile')
      } catch (error) {
        return console.log('失败', error)
      }
      this.isCountDownShow = true
      try {
        const res = await SendMs(this.user.mobile)
        this.$toast('发送成功')
        console.log(res)
      } catch (error) {
        this.$toast('发送失败')
        this.isCountDownShow = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao-shouji,
  .toutiao-yanzhengma {
    font-size: 37px;
  }
  .btn-send-mas {
    background-color: #ededed;
    width: 160px !important;
    height: 46px !important;
    line-height: 46px !important;
    font-size: 22px !important;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
