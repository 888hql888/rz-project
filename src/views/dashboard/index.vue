<template>
  <div class="dashboard-container">
    <div class="container">
      <!-- 左侧日历组件 可封装成组件-->
      <el-card class="box-card left">
       <workCalender />
      </el-card>
      <!-- 右侧其它组件 -->
      <el-card class="box-card right">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import workCalender from "./components/work-calender.vue"
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components:{
    workCalender
  }
  // data() {
  //   let date = new Date();
  //   return {
  //     calendarTime: new Date(),
  //     yearsValue: date.getFullYear(),
  //     monthValue: date.getMonth() + 1,
  //     yearArray: () => {
  //       let date = new Date();
  //       let currentYear = date.getFullYear();
  //       let arr = [];
  //       for (let i = currentYear - 6; i <= currentYear + 6; i++) {
  //         arr.push(i);
  //       }
  //       return arr;
  //     },
  //   };
  // },
  // methods: {
  //   showSpan(params) {
  //     let day = params.getDay(); //周日是0
  //     let month_ = params.getMonth()+1
  //     if ((day == "0" || day == "6") && month_==this.monthValue) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  //   changeEvent(params) {
  //     let date = new Date();
  //     let currentYear = date.getFullYear();
  //     let currentMonth = date.getMonth() + 1;
  //     //当前时间
  //     if (currentYear == this.yearsValue && currentMonth == this.monthValue) {
  //       this.calendarTime = new Date();
  //     } else {
  //       this.calendarTime = new Date(`${this.yearsValue}-${this.monthValue}-1`);
  //     }
  //   },
  // },
};
</script>
<style scoped>
.el-calendar ::v-deep.el-calendar__header {
  display: none;
}
</style>
<style lang="scss" scoped>
.dashboard-container {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    width: 480px;
  }
  .container {
    display: flex;
    padding: 20px;
    .left {
      flex: 5;
      margin-right: 12px;
      .is-selected {
        color: #1989fa;
      }
    }
    .right {
      flex: 3;
    }
  }
}
</style>
