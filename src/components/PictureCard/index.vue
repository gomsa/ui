<template>
  <span>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="img"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="32%"
    >
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'PictureCard',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    img() {
      const img = []
      this.images.forEach(image => {
        img.push({ url: image })
      })
      return img
    }
  },
  created() {
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
</style>
