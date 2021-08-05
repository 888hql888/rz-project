<template>
  <div>
      <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole } from '@/api/setting'
export default {
    props:['showDialog'],
    model:{
        prop:"showDialog",
        event:'btnCancel'
    },
    data(){
        return{
            roleForm:{
                name:"",
                description:""
            },
            rules:{
              name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
              descriptionme: [{ required: true, message: 'miaoshu不能为空', trigger: 'blur' }]
            }
        }
    },
    methods:{
        btnCancel(){
            this.$emit('btnCancel',false)
            this.roleForm.name = ''
            this.roleForm.description = ''
        },
        async btnOK(){
          const res = await addRole(this.roleForm)
          const {code,message}  = res
          if(code==10000){
            this.$message.success(message)
          }
          this.$emit('updateRoleData')
          console.log(res,'res...')
          this.btnCancel()
        }
    }
}
</script>

<style>

</style>