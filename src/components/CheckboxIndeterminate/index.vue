<template>
  <span>
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ name }}</el-checkbox>
    <el-checkbox-group v-model="currentValue">
      <el-checkbox v-for="item in items" :key="item.label" :label="item.label">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
  </span>
</template>

<script>
export default {
  name: 'CheckboxIndeterminate',
  props: {
    name: {
      type: String,
      default: '全选'
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: this.options,
      checkAll: false,
      isIndeterminate: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  watch: {
    currentValue: 'handleCheckedsChange'
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        // 如果 currentValue 不包含 options 所有值则添加
        for (const key in this.items) {
          if (this.currentValue.indexOf(this.items[key].label) === -1) {
            this.currentValue.push(this.items[key].label)
          }
        }
      } else {
        // 删除 options 包含的所有值
        for (const key in this.items) {
          var index = this.currentValue.indexOf(this.items[key].label)
          if (index > -1) {
            this.currentValue.splice(index, 1)
          }
        }
      }
      // this.currentValue = val ? options : []
      this.isIndeterminate = false
    },
    handleCheckedsChange() {
      // const checkedCount = value.length
      // 计算 value 包含 选择 items 的个数
      let checkedCount = 0
      for (const key in this.items) {
        if (this.currentValue.indexOf(this.items[key].label) > -1) {
          checkedCount++
        }
      }
      this.checkAll = checkedCount === this.items.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
