<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articles.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articles.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div slot="title" class="user-name">{{ articles.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articles.pubdate }}</div>
          <van-button
            v-if="articles.is_followed"
            class="follow-btn"
            @click="onFollow"
            round
            :loading="loadingStatus"
            size="small"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            @click="onFollow"
            :loading="loadingStatus"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articles.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论 -->
        <ArticleComment
          :ArticleId="articles.art_id"
          :CommentList="commentList"
          @commentCount="totleComment = $event"
          @onReply="CommentReply"
        ></ArticleComment>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            @click="isPostShow = true"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="this.totleComment" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <CollectArticle
            :id="articles.art_id"
            v-model="articles.is_collected"
          ></CollectArticle>
          <van-icon color="#777" name="good-job-o" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup
          v-model="isPostShow"
          position="bottom"
          :style="{height: '90%'}"
        >
          <CommentPost
            :articleId="articles.art_id"
            @publishSuccess="publishSuccess"
          ></CommentPost>
        </van-popup>
        <!-- /发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus == 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadAgin" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 评论回复 -->
      <van-popup
        v-model="isReplyShow"
        position="bottom"
        :style="{height: '90%'}"
      >
        <CommentReply
          v-if="isReplyShow"
          :currentComment="currentComment"
          @onCloseReply="isReplyShow = false"
        ></CommentReply>
      </van-popup>

      <!-- 评论回复 -->
    </div>
  </div>
</template>

<script>
import { getConArticle } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, daleteFollow } from '@/api/user'
import CollectArticle from '@/components/collect-article'
import ArticleComment from './components/article.comment.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
// 加载图片
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1,
//   onClose() {
//     this.$toast('关闭')
//   }
// })
export default {
  name: 'ArticleIndex',
  components: {
    CollectArticle,
    ArticleComment,
    CommentPost,
    CommentReply
  },

  provide: function () {
    return {
      articleid: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articles: {},
      loading: true,
      errStatus: 0,
      loadingStatus: false,
      totleComment: 0,
      isPostShow: false,
      isReplyShow: false,
      commentList: [],
      currentComment: {}
    }
  },
  computed: {},
  watch: {
    // articles: {
    //   deep: true,
    //   immediate: true
    // }
    // totleComment: {
    //   immediate: true
    // }
  },
  created () {
    this.speciArtile()
  },
  mounted () {},
  methods: {
    // showPopup() {
    //   this.show = true
    // },
    // getCommentList(list) {
    //   this.commentList = list
    //   // console.log(list)
    // },
    // 点击回复按钮，回复评论
    CommentReply (commentItem) {
      // console.log('www', commentItem)
      this.currentComment = commentItem
      this.isReplyShow = true
    },
    publishSuccess (newList) {
      this.isPostShow = false
      this.totleComment++
      this.commentList.unshift(newList)
    },
    // 点击关注
    async onFollow () {
      this.loadingStatus = true
      try {
        if (this.articles.is_followed) {
          this.articles.is_followed = false
          await daleteFollow(this.articles.aut_id)
        } else {
          this.articles.is_followed = true
          await addFollow(this.articles.aut_id)
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('不能关注自己！')
        }
        this.$toast('操作失败')
      }
      this.loadingStatus = false
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      const imgurl = []
      imgs.forEach((img, index) => {
        imgurl.push(img.src)
        img.onclick = () => {
          // console.log(123)
          ImagePreview({
            images: imgurl,
            startPosition: index
          })
        }
      })
    },
    loadAgin () {
      this.loading = true
    },
    async speciArtile () {
      try {
        const { data } = await getConArticle(this.articleId)
        this.articles = data.data
        // console.log('3456', this.articles)
        this.loading = false

        setTimeout(() => {
          this.previewImage()
          // this.$refs['article-content']
        }, 0)
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        // this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../styles/github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
      background-color: #fff;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }

  /deep/ .van-nav-bar .van-icon {
    color: #fff !important;
  }
}
</style>
