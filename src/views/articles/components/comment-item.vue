<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    > -->
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="commentItem.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{
        commentItem.aut_name
      }}</span>
      <div slot="label">
        <p style="color: #363636">{{ commentItem.content }}</p>
        <p>
          <span style="margin-right: 10px">{{ commentItem.pubdate }}</span>
          <van-button
            size="mini"
            @click="$emit('onReply', commentItem)"
            type="default"
            >回复{{ commentItem.reply_count }}</van-button
          >
        </p>
      </div>
      <div>
        <van-icon
          @click="onCommentLike"
          :class="{liked: commentItem.is_liking}"
          slot="right-icon"
          :name="commentItem.is_liking ? 'like' : 'like-o'"
        />
        <span>{{ commentItem.like_count || '&nbsp;赞' }}</span>
      </div>
    </van-cell>
    <!-- </van-list> -->
    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>  -->
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    commentItem: {
      required: true
    }
  },
  created () {
    // console.log(this.commentItem)
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async onCommentLike () {
      try {
        if (!this.commentItem.is_liking) {
          await addCommentLike(this.commentItem.com_id)
          this.commentItem.like_count++ // 占时改变视图
          this.commentItem.is_liking = true
          // console.log(123)
        } else {
          await deleteCommentLike(this.commentItem.com_id)
          this.commentItem.like_count--
          this.commentItem.is_liking = false
        }
      } catch (error) {
        this.$toast('点赞失败')
      }
    }
    // onLoad() {
    //   this.loading = false
    // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 120px;
  width: 100%;
}
.liked {
  color: #e5645f;
}

.van-list {
  margin-bottom: 45px;
}
</style>
