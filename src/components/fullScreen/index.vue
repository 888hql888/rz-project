<template>
  <div>
      <div class="screenFull" @click="changeScreen">全屏</div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    methods:{
        changeScreen(){
            if(screenfull.isEnabled){
                screenfull.toggle()
            }else{
                this.$message.error('该浏览器不支持全屏')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .screenFull{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: red;
        position: absolute;
        right: 100px;
        top: 20px;
        margin-top: -15px;
        text-align: center;
        line-height: 40px;
        color: white;
    }
</style>