<template>
  <div class="channel-edit">
    <div>
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button
          type="danger"
          plain
          round
          size="mini"
          class="edit-btn"
          @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button
        >
      </van-cell>
      <van-grid :gutter="10" class="mychannel-item">
        <van-grid-item
          class="grid-item"
          v-for="(val, index) in channels"
          :key="index"
          @click="onMyChannelClick(val, index)"
          ><van-icon
            slot="icon"
            name="close"
            v-show="isEdit && !fixedchannel.includes(val.id)"
          ></van-icon>
          <span slot="text" :class="{redtext: active === index}">{{
            val.name
          }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div>
      <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
          class="grid-item"
          v-for="(value, index) in recommendChannels"
          :key="index"
          icon="plus"
          :text="value.name"
          @click="onAddChannels(value)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utiles/stroage'

export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      required: true,
      type: Number
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const RChannels = []
      this.allChannels.forEach(channel => {
        const ret = this.channels.find(mychannel => {
          return mychannel.id === channel.id
        })
        if (!ret) {
          RChannels.push(channel)
        }
      })
      return RChannels
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedchannel: [0]
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
        // console.log(this.allChannels)
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannels (val) {
      // console.log(val)
      this.channels.push(val)
      if (this.user) {
        try {
          await addUserChannels({
            id: val.id,
            seq: this.channels.length
          })
        } catch (error) {
          this.$toast('保存失败稍后再试')
        }
      } else {
        setItem('TouTiaoChannels', this.channels)
      }
    },
    async deleteChannels (channel) {
      if (this.user) {
        try {
          await deleteUserChannels(channel.id)
        } catch (error) {
          this.$toast('删除失败稍后再试')
        }
      } else {
        setItem('TouTiaoChannels', this.channels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixedchannel.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.channels.splice(index, 1)
        this.deleteChannels(channel)
      } else {
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style lang="less">
.channel-edit {
  padding: 85px 0;
  .van-grid-item__icon-wrapper {
    position: unset !important;
  }
  .mychannel-item {
    .van-grid-item__icon-wrapper i {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }

  .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-grid-item__text {
          margin-top: 0 !important;
        }
        .van-grid-item__icon {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  .van-grid-item__content {
    background-color: #f4f5f6;
    span {
      font-size: 28px !important;
      color: #222;
      margin-top: 0;
    }
  }
  .van-grid-item__text {
    font-size: 28px !important;
    color: #222;
    margin-top: 0;
  }
  .grid-item {
    width: 160px;
    min-height: 86px;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .redtext {
    color: red !important;
  }
}
</style>
