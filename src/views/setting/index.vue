<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="$refs.dispatchRole.assignPerm(scope.row.id)">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(scope.row.id)"
                  >删除</el-button
                >
                </template>
                
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination layout="prev,pager,next" />
            </el-row>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <addRole v-model="showDialog" @updateRoleData="getRoleList" />
      <!-- 分配权限 -->
      <dispatch-role v-model="disDialog" ref="dispatchRole" />
    </div>
  </div>
</template>
<script>
import { getRoleList, getCompanyInfo,deleteRole} from "@/api/setting";
import { mapGetters } from "vuex";
import addRole from "./components/addRole.vue";
import dispatchRole from "./components/dispatchRole.vue";
export default {
  components: {
    addRole,
    dispatchRole
  },
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 2,
        total: 0, // 记录总数
      },
      formData: {
        name: "",
        companyAddress: "",
        mailbox: "",
        remarks: "",
      },
      showDialog: false,
      disDialog:false
    };
  },
  computed: {
    ...mapGetters(["companyId"]),
  },
  created() {
    this.getRoleList(); // 获取角色列表
    this.getCompanyInfo();
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList(this.page);
      if (res.code != 10000) return;
      const { total, rows } = res.data;
      this.page.total = total;
      this.list = rows;
      console.log(this.list, "list");
    },
    // 获取的公司的信息
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.companyId);
      this.formData = res.data;
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage; // 将当前页码赋值给当前的最新页码
      this.getRoleList();
    },
    async deleteRole(id){
      const res = await deleteRole(id)
      const {code,message} = res
      if(code===10000){
        this.$message.success(message)
        this.getRoleList()
      }
    }
  },
};
</script>
