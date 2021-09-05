<template>
  <div>
    <div slot="header" class="clearfix">
      <h2>日历组件</h2>
    </div>
    <div style="float: right">
      <el-select
        v-model="yearsValue"
        placeholder="请选择年份"
        style="margin-right: 8px"
        @change="changeEvent"
      >
        <el-option
          :label="item"
          :value="item"
          v-for="item in yearArray()"
          :key="item"
        ></el-option>
      </el-select>
      <el-select
        v-model="monthValue"
        placeholder="请选择月份"
        @change="changeEvent"
      >
        <el-option
          :label="item"
          :value="item"
          v-for="item in 12"
          :key="item"
        ></el-option>
      </el-select>
    </div>
    <el-calendar v-model="calendarTime">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
        <span v-show="showSpan(date)">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    let date = new Date();
    return {
      calendarTime: new Date(),
      yearsValue: date.getFullYear(),
      monthValue: date.getMonth() + 1,
      yearArray: () => {
        let date = new Date();
        let currentYear = date.getFullYear();
        let arr = [];
        for (let i = currentYear - 6; i <= currentYear + 6; i++) {
          arr.push(i);
        }
        return arr;
      },
    };
  },
  methods: {
    showSpan(params) {
      let day = params.getDay(); //周日是0
      let month_ = params.getMonth() + 1;
      if ((day == "0" || day == "6") && month_ == this.monthValue) {
        return true;
      } else {
        return false;
      }
    },
    changeEvent(params) {
      let date = new Date();
      let currentYear = date.getFullYear();
      let currentMonth = date.getMonth() + 1;
      //当前时间
      if (currentYear == this.yearsValue && currentMonth == this.monthValue) {
        this.calendarTime = new Date();
      } else {
        this.calendarTime = new Date(`${this.yearsValue}-${this.monthValue}-1`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.work-calender {
}
</style>