<template>
  <div class="commentReply">
    <div class="replyHeader">
      <van-icon
        name="cross"
        class="reply-cross"
        slot="left"
        @click="$emit('onCloseReply')"
      ></van-icon
      ><span>{{
        currentComment.reply_count
          ? '回复  ' + currentComment.reply_count
          : '暂无回复'
      }}</span>
    </div>

    <!-- <van-button type="primary">主要按钮</van-button> -->
    <CommentItem
      :commentItem="currentComment"
      @onReply="commentReplyshow = true"
    ></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <!-- 这是评论区 -->
    <ArticleComment
      :ArticleId="currentComment.com_id"
      type="c"
      :CommentList="commentList"
      @onReply="commentReplyshow = true"
    ></ArticleComment>
    <!-- 回复按钮 -->
    <van-button
      @click="commentReplyshow = true"
      plain
      hairline
      type="info"
      class="replyPostComment"
      size="normal"
      round
      >回复评论</van-button
    >
    <!-- <form action="/">
      <van-search
        v-model="replyCommentvalue"
        show-action
        placeholder="请输入评论内容"
      />
    </form> -->
    <!-- 这是评论回复弹层 -->
    <van-popup
      v-model="commentReplyshow"
      closeable
      position="bottom"
      :style="{height: '30%'}"
    >
      <CommentPost
        :articleId="currentComment.com_id"
        @publishSuccess="publishSuccess"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import ArticleComment from '../components/article.comment.vue'
import CommentPost from '../components/comment-post.vue'
export default {
  data () {
    return {
      // replyCommentvalue: '',
      commentReplyshow: false,
      commentList: []
    }
  },
  created () {
    // console.log(this.currentComment)
  },
  components: { CommentItem, ArticleComment, CommentPost },
  props: ['currentComment'],
  methods: {
    publishSuccess (data) {
      this.currentComment.reply_count++
      this.commentReplyshow = false
      this.commentList.unshift(data)
    }
  }
}
</script>

<style lang="less" scoped>
.commentReply {
  /deep/ .replyPostComment {
    position: fixed;
    bottom: 3px;
    right: 100px;
  }
  /deep/ .replyHeader {
    height: 80px;
    // background-color: #3296fa;
    .reply-cross {
      color: #000;
      margin-left: 35px;
      font-size: 50px;
      line-height: 80px;
    }
    span {
      margin-left: 230px;
      font-size: 35px;
    }
  }
}
</style>
