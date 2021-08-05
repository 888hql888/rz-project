<template>
  <div>
    <el-dialog title="分配权限" :visible="disDialog" @close="btnCancel">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @setChecked="setChecked"
      >
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["disDialog"],
  model: {
    prop: "disDialog",
    event: "btnCancel",
  },
  methods: {
    btnCancel() {
      this.$emit("btnCancel", false);
    },
    setChecked(data,checked,deep){
        console.log(data,checked,deep,'data checked deep')
    }
  },
};
</script>

<style>
</style>