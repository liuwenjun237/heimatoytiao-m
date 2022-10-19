<template>
  <div class="my-container">
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="jump">
        <img src="@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="header user-info" v-else>
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" to="/user/profile" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-state">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <span slot="text">收藏</span>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="文字" class="grid-item">
        <span slot="text">历史</span>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="xiaozhi" />
    </van-cell-group>
    <van-cell class="cell-group-outlogin" v-if="user" @click="onLogOut">
      <p slot="title">退出登录</p>
    </van-cell>
  </div>
</template>

<script>
// import {log} from 'console'
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },

  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取登录信息失败！')
      }
    },
    jump () {
      this.$router.push('/login')
    },
    onLogOut () {
      console.log(111)
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          this.$store.commit('updataUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .cell-group-outlogin {
    margin-top: 10px !important;
    padding: 0;
    p {
      text-align: center;
      color: #d86262;

      // background-color: blue;
      font-size: 28px !important;
    }
  }
  // .xiaozhi {
  //   margin-bottom: 19px;
  // }
  .user-info {
    .base-info {
      height: 231px;
      // background-color: rgb(215, 151, 151);
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 30px;
          color: #fff;
        }
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
      }
    }
    .data-state {
      height: 130px;
      // background-color: rgb(236, 238, 196);
    }
  }
  .data-state {
    display: flex;
    // justify-content: space-evenly;
    align-items: center;
    .data-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .header {
    width: 100%;
    height: 361px;
    background: url('../../assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;

    span {
      font-size: 28px !important;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .toutiao {
      font-size: 45px !important;
    }
  }
  // .van-grid-item__text {
  //   font-size: 48px !important;
  // }
}
</style>
