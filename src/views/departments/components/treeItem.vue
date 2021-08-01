<template>
  <div class="tree-container">
    <span>{{itemObj.name}}</span>
    <div>
      <span v-if="itemObj.manager" style="marginRight:20px">{{itemObj.manager}}</span>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" command="add">新增</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus" command="edit" v-show="!isRoot">编辑</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus" command="delete" v-show="!isRoot">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isRoot:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    handleCommand(command){
      this.$emit('handleCommand',command,this.itemObj)
      this.$Bus.$emit('editEvent',this.itemObj)
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-container{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
