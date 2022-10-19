<template>
  <div class="updataName">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="finishFix"
    />
    <van-field
      v-model="message"
      class="field-wrap"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { fixUserName } from '@/api/user'
export default {
  props: ['value'],
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async finishFix () {
      try {
        await fixUserName({
          name: this.message
        })
        this.$toast.success('修改成功')
        this.$emit('fixName', this.message)
        // console.log('1122', data)
      } catch (error) {
        this.$toast('修改昵称失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  width: unset !important;
}
.field-wrap {
  margin: 30px;
  //   margin-right: 30px;
}
</style>
