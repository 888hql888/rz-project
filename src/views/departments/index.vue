<template>
  <div class="departments">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组织架构" name="departments">
        <div class="card-container">
          <el-card class="box-card" shadow="never">
            <tree-item :itemObj="company" :isRoot="true" @handleCommand="handleCommand"  />
          </el-card>
          <hr />
          <!-- 树形结构 -->
          <div class="tree-container">
            <el-tree
              :data="departList"
              show-checkbox
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            >
              <tree-item
                slot-scope="{ data }"
                :itemObj="data"
                @handleCommand="handleCommand"
              />
            </el-tree>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <add-depart :dialogShow.sync="dialogShow" :allDepart="allDepart" :detailData="detailData" @addDe="addDe" 
    :actionName="actionName" @editDe="editDe"
    />
  </div>
</template>

<script>
import treeItem from "./components/treeItem.vue";
import { getDepartments, delDepartments ,addDepartments,updateDepartments} from "@/api/department"
import { getTreeData } from "@/utils/common";
import  addDepart from "./components/addDepart.vue";

export default {
  components: {
    treeItem,
    addDepart
  },
  data() {
    return {
      actionName:"",
      activeName: "departments",
      departList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      company: {
        name: "娃哈哈责任有限公司",
        manager: "负责人",
        id:''
      },
      dialogShow:false, //控制弹窗
      allDepart:[],
      detailData:{}
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async editDe(params){
      const res = await updateDepartments(params)
      const {code,data,message} = res
      if(code === 10000 && data){
        this.$message({
          message,
          type:"success"
        })
        this.getDepartments()
      }else{
        this.$message({
          message,
          type:"waring"
        })
      }
    },
    async addDe(params){
      const res = await addDepartments(params)
      const {code,data,message} = res
      if(code === 10000 && data){
        this.$message({
          message,
          type:"success"
        })
        this.getDepartments()
      }else{
        this.$message({
          message,
          type:"waring"
        })
      }
    },
    async getDepartments() {
      try {
        const res = await getDepartments();
        const { code, data, message } = res;
        if (code === 10000) {
          if (data.depts && !data.depts.length) return;
          this.allDepart = data.depts
          this.departList = getTreeData(data.depts);
          // console.log(this.departList,'dls')
        }
      } catch (e) {}
    },
    handleCommand(params, itemObj) {
      switch (params) {
        case "add":
          this.addDeparts(itemObj,'add');
          break;
        case "edit":
          this.addDeparts(itemObj,'edit');
          break;
        case "delete":
          this.deleteDepart(itemObj.id);
          break;
        default:
          console.log("没有操作");
      }
    },
    addDeparts(item,str){
      console.log(item,'item....')
      this.dialogShow = true
      this.detailData = item
      this.actionName = str
    },
    //删除
    deleteDepart(id) {
      delDepartments(id).then((res) => {
        const { code, data, message } = res;
        if (code === 10000) {
          this.$message({
            message,
            type: "success",
          });
          this.getDepartments();
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.departments {
  background: #fff;
  padding: 20px 30px;
  font-size: 14px;
  .card-container {
    .box-card {
      border: 0;
    }
  }
}
</style>