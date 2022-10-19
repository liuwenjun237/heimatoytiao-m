<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-history')">全部删除&nbsp;&nbsp;</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon
        v-else
        name="delete-o"
        @click="isDeleteShow = true"
        class="search-icon"
      />
    </van-cell>
    <van-cell
      :title="val"
      v-for="(val, index) in SearchHistories"
      :key="index"
      @click="onSearchItemDelete(val, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" class="close-icon"
    /></van-cell>
  </div>
</template>

<script>
export default {
  methods: {
    onSearchItemDelete (val, index) {
      if (this.isDeleteShow) {
        this.SearchHistories.splice(index, 1)
      } else {
        this.$emit('search', val)
      }
    }
  },
  props: {
    SearchHistories: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
}
</style>
