<template>
  <span>
    <img :src="images[0]" style="height:45px;" alt="" @click="dialogVisible=true">
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="70%"
    >
      <picture-card :images="images" />
    </el-dialog>
  </span>
</template>

<script>
import PictureCard from '@/components/PictureCard'
export default {
  name: 'TableImg',
  components: {
    PictureCard
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
  },
  created() {
  }
}
</script>

<style scoped>
</style>
