<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult
      v-if="isResultShow"
      :searchText="this.searchText"
    ></SearchResult>
    <SearchSuggestion
      @search="onSearch"
      v-else-if="searchText"
      :searchText="this.searchText"
    ></SearchSuggestion>
    <SearchHistory
      v-else
      :SearchHistories="SearchHistories"
      @search="onSearch"
      @clear-history="SearchHistories = []"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { getItem, setItem } from '@/utiles/stroage'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  watch: {
    SearchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
