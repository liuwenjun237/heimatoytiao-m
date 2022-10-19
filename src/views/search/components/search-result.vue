<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  props: {
    searchText: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(data)
        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }

      // 加载状态结束

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true
      // }
    }
  }
}
</script>

<style></style>
