<template>
  <div class="article-comment">
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        :title="item.content"
      /> -->
      <CommentItem
        v-for="(item, index) in CommentList"
        :key="index"
        @onReply="$emit('onReply', $event)"
        :commentItem="item"
      ></CommentItem>
    </van-list>

    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info"> 发布 </van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  components: {
    CommentItem
  },
  props: {
    ArticleId: {
      required: true
    },
    CommentList: {
      default: () => []
    },

    type: {
      default: 'a'
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      //   CommentList: [],
      offset: null,
      limit: 10,
      totleComment: 0
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.ArticleId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        this.totleComment = data.data.total_count
        this.$emit('commentCount', this.totleComment)
        // console.log('评论', data)
        this.CommentList.push(...data.data.results)
        this.loading = false
        if (!data.data.results.length) {
          this.finished = true
        } else {
          this.offset = data.data.last_id
        }
        // this.$emit('Comment-list', this.CommentList)
      } catch (error) {
        this.$toast('获取评论数据失败')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.publish-wrap {
  display: none;
  position: fixed;
  left: 0;
  bottom: 0px;
  width: 100%;
  margin-bottom: 100px;
  z-index: 7;
}
</style>
