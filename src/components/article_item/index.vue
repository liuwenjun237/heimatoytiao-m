<template>
  <div class="article-item">
    <van-cell value="内容" label="描述信息" :to="`/article/${article.art_id}`">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <van-image
            class="cover-item"
            fit="cover"
            v-for="(val, index) in article.cover.images"
            :key="index"
            :src="val"
          />
        </div>
        <div class="label-info-wrap">
          <span> {{ article.aut_name }} </span>
          <span> {{ article.comm_count }}评论</span>
          <span> {{ article.pubdate }}</span>
        </div>
      </div>
      <div slot="default">
        <van-image
          v-if="article.cover.type === 1"
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
        />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'article-index',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .cover-wrap {
    display: flex;
    padding: 25px 0;
    width: 92vw;

    .cover-item {
      height: 146px;
      flex: 1;
      &:not(:last-child) {
        padding-right: 11px;
      }
    }
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .title {
    padding-right: 25px;
    flex: unset !important;
    width: 450px;
    font-size: 32px;
    color: #3a3a3a;
  }
  //   .van-cell__title {
  //     flex: unset !important;
  //     width: 450px;
  //   }
  .van-cell__value {
    width: 232px !important;
    height: 146px;
  }
}
</style>
