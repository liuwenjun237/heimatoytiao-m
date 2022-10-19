<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人信息内容 -->
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image class="avater" fit="cover" round :src="user.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUserProfileNameShow = true"
      />
      <van-cell
        title="性别"
        :value="!user.gender ? '男' : '女'"
        label="描述信息"
        is-link
      />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup
      v-model="isUserProfileNameShow"
      position="bottom"
      :style="{height: '100%'}"
    >
      <updataName
        @fixName="fixName"
        v-if="isUserProfileNameShow"
        @close="isUserProfileNameShow = false"
        v-model="user.name"
      ></updataName>
    </van-popup>
  </div>
</template>

<script>
// import router from '@/router'
// eslint-disable-next-line object-curly-spacing
import {getUserProfile} from '@/api/user'
import updataName from './components/updata-name.vue'
export default {
  name: 'user-profile',
  // eslint-disable-next-line object-curly-spacing
  components: {updataName},
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      user: {},
      isUserProfileNameShow: false
    }
  },
  // eslint-disable-next-line space-before-function-paren
  created() {
    this.loadUserProfile()
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    async loadUserProfile() {
      try {
        // eslint-disable-next-line object-curly-spacing
        const {data} = await getUserProfile()
        this.user = data.data
        // console.log(this.user)
      } catch (error) {
        this.$toast('加载用户信息失败')
      }
    },
    // eslint-disable-next-line space-before-function-paren
    fixName(data) {
      this.user.name = data
      this.isUserProfileNameShow = false
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .van-popup {
    background-color: #f5f7f9;
  }
  .avater {
    width: 60px;
    height: 60px;
  }
  /deep/span.van-nav-bar__text {
    color: #fff !important;
  }
  /deep/ i.van-nav-bar__arrow {
    color: #fff !important;
  }
  /deep/ .van-nav-bar__content {
    /deep/ .van-nav-bar__left {
    }
    .van-nav-bar__title {
      color: #fff;
    }

    background-color: #3e9cfa;
  }
}
</style>
