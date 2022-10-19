<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPublish" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { publishComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    articleId: { required: true }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  inject: ['articleid'],
  created () {},
  mounted () {},
  methods: {
    async onPublish () {
      //   this.toast.loading({
      //     message: '发布中...',
      //     forbidClick: true
      //   })
      try {
        const data = await publishComment({
          target: this.articleId.toString(),
          content: this.message,
          art_id: this.articleid ? this.articleid.toString() : null
        })
        // console.log('1232456发布评论', data)
        this.$emit('publishSuccess', data.data.data.new_obj)
        this.message = ''
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布评论失败啦啦啦')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
