<template>
  <div>
    <el-dialog title="分配权限" :visible="disDialog" @close="btnPermCancel">
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getTreeData } from '@/utils/common'
import { getPermissionList } from '@/api/permission'
import {getRoleDetail,assignPerm} from "@/api/setting";

export default {
  props: ["disDialog"],
  model: {
    prop: "disDialog",
    // event: "btnCancel",
  },
  data(){
    return{
      defaultProps: {
        label: 'name'
      },
       permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null // 用来记录分配角色的id
    }
  },
  methods: {
    // 点击分配权限
  // 获取权限点数据 在点击的时候调用 获取权限点数据
    async assignPerm(id) {
      let res = await getPermissionList()
      this.permData = getTreeData(res.data, '0') // 转化list到树形数据
      this.roleId = id
      // 应该去获取 这个id的 权限点
      // 有id 就可以 id应该先记录下来
      const res2 = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      const { permIds } = res2.data // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds // 将当前角色所拥有的权限id赋值
      // this.showPermDialog = true
      this.$emit('input',true)
    },
    async  btnPermOK() {
      // 调用el-tree的方法
      // console.log(this.$refs.permTree.getCheckedKeys())
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.$emit('input',false)
    },
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.$emit('input',false)
    }
  },
};
</script>

<style>
</style>