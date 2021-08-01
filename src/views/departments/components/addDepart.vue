<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogShow" @close="dialogEvent">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      label-width="120px"
      :rules="rules"
      ref="ruleForm"
      :model="formData"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="suremitEvent"
          >确定</el-button
        >
        <el-button size="small" @click="cancelEvent">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from "@/api/department";
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
    allDepart: {
      type: Array,
    },
    detailData: {
      type: Object,
    },
    actionName:{
      type:String,
      default:''
    },
  },
  watch:{
      actionName(n,o){
          if(n!=o){
              console.log(this.detailData,'edit data')
              for(let key in this.formData){
                  for(let key2 in this.detailData){
                      if(key==key2){
                          this.formData[key] = this.detailData[key]
                      }
                  }
              }
          }
          if(n=='add'){
              for(let key in this.formData){
                  this.formData[key] = ''
              }
          }
      }
  },
  created() {
    this.$Bus.$on('editEvent',(p1,p2)=>{
        console.log(p1,p2)
    })
    this.getEmployeeSimple();
  },
  beforeDestroy(){
     this.$Bus.$off('ditEvent')
  },
  data() {
    var checkNameRepeat = (rule, value, callback) => {
      let sonData = this.allDepart.filter((item) => {
        return item.pid === this.detailData.id;
      });
      let flag = sonData.some((item) => {
        return item.name == this.formData.name;
      });
      flag ? callback(new Error("部门名字重复!!!!")) : callback();
    };
    var checkCodeRepeat = (rule, value, callback) => {
      let sonData = this.allDepart.filter((item) => {
        return item.pid === this.detailData.id;
      });
      let flag = sonData.some((item) => {
        return item.code == this.formData.code;
      });
      flag ? callback(new Error("部门编码重复!!!!")) : callback();
    };
    return {
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      managerList: [],
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkNameRepeat, // 自定义函数的形式校验
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkCodeRepeat,
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "change" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 1,
            max: 300,
            message: "部门介绍要求1-50个字符",
          },
        ],
      },
    };
  },
  methods: {
    //获取负责人数据
    async getEmployeeSimple() {
        const res = await getEmployeeSimple()
        this.managerList = res.data
    },
    //确定
    suremitEvent() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if(this.actionName=='edit'){
              this.$emit('editDe',{...this.formData,pid:this.detailData.id})
          }
          if(this.actionName=='add'){
          this.$emit('addDe',{...this.formData,pid:this.detailData.id})
          }
        //   this.$emit('addDe',{...this.formData,pid:this.detailData.id})
          this.dialogEvent();
        } else {
          return false;
        }
      });
    },
    //取消
    cancelEvent() {
      this.dialogEvent();
    },
    //关闭
    dialogEvent() {
      this.$emit("update:dialogShow", false);
    },
  },
};
</script>
