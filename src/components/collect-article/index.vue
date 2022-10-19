<template>
  <div class="collect-article">
    <van-button :loading="loading" clickable="null">
      <van-icon
        color="#777"
        @click="clickCollect"
        :name="value ? 'star' : 'star-o'"
        :color="value ? '#ffa500' : ''"
      />
    </van-button>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-spacing
import {collectArticle, deCollectArticle} from '@/api/article'
export default {
  name: 'collect-index',
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean
    },
    id: {
      required: true
    }
  },
  methods: {
    async clickCollect() {
      this.loading = true
      // console.log(this.id)
      try {
        if (this.value) {
          await deCollectArticle(this.id)
        } else {
          await collectArticle(this.id)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
