<template>
  <div>
    <!-- 通过file来选择需要上传的文件 -->
    <!-- 选择文件：<input type="file" class="file"> -->

    <el-upload
      ref="upload"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSuccess"
    >
      <div>{{ $t('MRV.Specifiedfile') }}：<el-button slot="trigger" size="small" type="primary">{{$t('MRV.Selectfile')}}</el-button></div>
      <div slot="tip" class="el-upload__tip">{{ $t('common.OnlyJPG') }}</div>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" @click="submitUpload">{{ $t('voyage.upload') }}</el-button>
    <el-button style="margin-left: 10px;" size="small">{{ $t('common.returns') }}</el-button>
    <el-button style="margin-left: 10px;" size="small">{{ $t('common.Historyquery') }}</el-button>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList, '文件上传成功')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
<style scoped lang="">

</style>
