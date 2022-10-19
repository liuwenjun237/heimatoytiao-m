<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        class="search-btn"
        to="/search"
      >
        <van-icon class="searchIcon" slot="icon" name="search" />
        搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channels-tabs" v-model="active" animated swipeable>
      <van-tab :title="obj.name" v-for="(obj, index) in channels" :key="index">
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="humburger-btn" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{height: '100%'}"
      ><ChannelEdit
        :channels="this.channels"
        :active="this.active"
        @update-active="updateactive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/channel-edit.vue'
import ArticleList from './components/articleList.vue'
import { getItem } from '@/utiles/stroage'
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        if (this.user) {
          const { data } = await getUserChannels()
          // console.log(data.data)
          this.channels = data.data.channels
        } else {
          this.channels =
            getItem('TouTiaoChannels') ||
            (await (
              await getUserChannels()
            ).data.data.channels)
        }
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    },
    updateactive (index, isChannelShow) {
      this.active = index
      this.show = isChannelShow
    }
  },
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 168px;
  padding-bottom: 100px;
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
  .humburger-btn {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
  .searchIcon {
    color: #fff !important;
    font-size: 32px !important;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfa;
    font-size: 28px;
    border: none;
  }
}
</style>
