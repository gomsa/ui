<template>
  <span>
    <template>
      <img
        :style="styleObject"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        style="cursor:pointer"
        @click="pictureDialogVisible = true"
      >
    </template>
    <el-dialog :visible.sync="pictureDialogVisible">
      <img
        :src="src"
        class="img-responsive img-rounded img-atuo"
        :alt="alt"
      >
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'DialogPicture',
  props: {
    styleObject: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '80px'
    }
  },
  data() {
    return {
      pictureDialogVisible: false
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .img-responsive{
    display:block;
    height:auto;
  }
  .img-circle{
    border-radius:50%
  }
  .img-rounded{
    border-radius:6px
  }
  .img-atuo{
    width: 100%
  }
</style>
