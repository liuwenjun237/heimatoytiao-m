<template>
  <div class="search-suggestion">
    <van-cell
      :title="val"
      icon="search"
      v-for="(val, index) in suggestions"
      @click="fn(val)"
      :key="index"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  methods: {
    fn (val) {
      // console.log(123)
      this.$emit('search', val)
    }
  },
  props: {
    searchText: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    searchText: {
      async handler (value) {
        try {
          const { data } = await getSearchSuggestion(value)
          //   console.log(data)
          this.suggestions = data.data.options
        } catch (error) {
          this.$toast('获取数据失败')
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
