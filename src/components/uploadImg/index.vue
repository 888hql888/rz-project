<template>
  <div class="upload-img">
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
      list-type="picture-card"
      :limit="1"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        @click.stop.prevent="preview"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      
      <el-progress
        v-if="showPercent"
        style="width: 180px"
        :percentage="percent"
      />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imageUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import Cos from "cos-js-sdk-v5";
export default {
  props: ["imageUrl"],
  model: {
    prop: "imageUrl",
  },
  data() {
    this.cos = new Cos({
      SecretId: "AKIDpW1JMCrKacPxJTSIuJUQ8ebLr8Azd5JL",
      SecretKey: "qRnulMhmeGciePwEI7kAMJ1XoqdATUFk",
    });
    return {
      showDialog: false, // 控制显示弹层
      percent: 0,
      showPercent:false
    };
  },
  methods: {
    handleRemove() {
        this.$emit('input','')
    },
    //预览
    preview() {
      this.showDialog = true;
    },
    //自定义上传图片
    httpRequest(data) {
      if (!data.file) this.$message({ message: "图像不存在", type: "error" });
      let that = this;
      this.cos.putObject(
        {
          Bucket: "renzi-1300263766" /* 必须 */,
          Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
          Key: data.file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: data.file, // 上传文件对象
          onProgress: function (progressData) {
            this.showPercent = true
           setTimeout(()=>{
                this.percent = params.percent * 100;
           },1000)
          },
        },
        function (err, data) {
          if (!err) {
            that.$message({
              message: "上传成功",
              type: "success",
            });
          }
          let imageUrl = "http://" + data.Location;
          that.$emit("input", imageUrl);
        }
      );
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file, "sss");
    },
    beforeAvatarUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.includes(file.type)) {
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        return false;
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024;
      if (maxSize < file.size) {
        this.$message.error("图片大小最大不能超过5M");
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>