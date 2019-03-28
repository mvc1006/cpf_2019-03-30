<template>
  <div class="box">
    <div class="nav">
      <el-form :inline="true" :model="ruleForm"  :rules="rules" ref="ruleForm"  style="margin-top: 26px;" class="demo-form-inline">
        <el-form-item label="查询方式">
          <el-select v-model="ruleForm.type" placeholder="查询方式"   size="medium"  @change="checkType">
            <el-option label="按姓名查找" value="Name"></el-option>
            <el-option label="按工号查找" value="GongHao"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询条件"  prop="value">
          <el-input
            v-model="value"
            placeholder="查询条件"
            size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="选择月份" prop="time">
          <el-date-picker
            v-model="time"
            type="month"
            value-format="yyyy-MM"
            @change="timeVal"
            placeholder="选择月份"
            size="medium"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary"   size="medium" @click="submitForm('ruleForm')">查询</el-button>-->
        <!--</el-form-item>-->
        <el-form-item label="" style="margin-left: 150px;" class="hoverPointer" >
          <i class="el-icon-download" style="color: #ffffff;font-size: 24px; font-weight: 600;margin-left: -5px;margin-top: 8px;" @click="downLoad"></i>
          <!--<span style="color: #ffffff;font-size: 14px;" @click="downLoad">下载</span>-->
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%;margin-top: 15px; height: auto; min-height: 529px;">
      <el-table-column
        prop="SignDay"
        align="center"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="Name"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="GongHao"
        align="center"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="ontime"
        align="center"
        label="签到时间">
      </el-table-column>
      <el-table-column
        prop="offtime"
        label="签退时间">
      </el-table-column>
      <el-table-column
        prop="comelatefmt"
        align="center"
        label="迟到情况">
      </el-table-column>
      <el-table-column
        prop="goearlyfmt"
        align="center"
        label="早退情况">
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="totals"
      style="margin-top: 30px;margin-bottom: 20px;float: right;margin-right: 100px;">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Yqmxb",
    data() {
      return {
        ruleForm: {
          type:'Name',
        },
        rules: {
          value: [
            {required: false, message: '请输入查询条件', trigger: 'blur'}
          ],
        },
        tableData:[],
        loading:true,
        value:'',
        time: new Date(),
        totals:null,
        groupid:'',
      };
    },
    watch:{
      //  监听条件变化是查询
      value(val){
        this.checkCondition();
      },
      $route(to,from){
        console.log(to.query.groupid);
        this.groupid = to.query.groupid;
        //-------------------------监听查看所有部门人员时
        if(this.groupid===undefined){
          this.check();
        }else{
          axios.get('/api/Handler/User.ashx?type=Web_RiQDmingxi&Sch_dt='+this.time+'&Sch_bu='+this.groupid+'&cPage=1&pSize=10')
            .then( (response)=> {
              console.log(response.data.data);
              this.tableData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    created(){
      console.log(this.$route.query);
      //时间转换  ele在直接获取时间值得时候格式不合理 且为提供相应转换的方法   自定义转换
      let date = new Date();
      this.time = date.getFullYear() + '-' + (date.getMonth() + 1);
      console.log(this.time);
      //获取所有员工考勤列表
      axios.get('/api/Handler/User.ashx?type=Web_YueQDmingxi&Sch_dt='+this.time+'&Sch_bu=0&cPage='+1+'&pSize=10')
        .then( (response)=> {
          console.log(response.data.data);
          this.tableData = response.data.data;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods:{
      //   当无查询条件时查询所有人
      check:function(){
        axios.get('/api/Handler/User.ashx?type=Web_YueQDmingxi&Sch_dt='+this.time+'&Sch_bu=0&cPage='+1+'&pSize=10')
          .then( (response)=> {
            console.log(response.data);
            this.totals = response.data.totals;
            this.tableData = response.data.data;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //   当有查询条件时查询此人
      checkCondition(){
        this.loading = true;
        axios.get('/api/Handler/User.ashx?type=Web_YueQDmingxi&cPage=1&pSize=10&Sch_dt='+this.time+'&Sch_bu=0&Sch_type='+this.ruleForm.type+'&Sch_value='+this.value+'')
          .then( (response)=> {
            console.log(response.data.data);
            this.totals = response.data.totals;
            this.tableData = response.data.data;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //      this.check();
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      //------------按时间查询
      timeVal(e){
        console.log(e);
        this.time = e;
        this.loading = true;
        // console.log(this.value);
        //日期选择器判断查询   条件1：当无查询条件输入时查询所选当天所有人员   条件2：当有查询条件输入时查询当天当人
        if(this.value===''){
          this.check();
        }else{
          this.checkCondition();
        }
      },
      //------------按查询方式查询
      checkType(e){
        console.log(e);
        //日期选择器判断查询   条件1：当无查询条件输入时查询所选当天所有人员   条件2：当有查询条件输入时查询当天当人
        if(this.value===''){
          this.check();
        }else{
          this.checkCondition();
        }
      },
      // 分页器调用
      handleCurrentChange(e){
        console.log(e);
        this.loading = true;
        axios.get('/api/Handler/User.ashx?type=Web_YueQDmingxi&cPage='+e+'&pSize=10&Sch_dt='+this.time+'&Sch_bu=0&Sch_type='+this.ruleForm.type+'&Sch_value='+this.value+'')
          .then( (response)=> {
            console.log(response.data.data);
            this.tableData = response.data.data;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      downLoad(){
        if(!this.groupid){
          this.groupid = 0;
          console.log(this.groupid);
        }else{
          console.log(this.groupid);
        }
        let excle = '/api/Handler/Report.ashx?type=yuemingxi&Sch_dt='+this.time+'&Sch_type='+this.ruleForm.type+'&Sch_value='+this.value;
        // console.log(excle);
        window.location = excle;
      }
    }
  }
</script>

<style lang="less" scoped>
  .hoverPointer:hover{
    cursor: pointer;
  }
  .box{
    width: 100%;
    /*height: 500px;*/
    /*background: darkgray;*/
    .nav{
      width: 100%;
      height: 50px;
      background: #C9D8F7;
      display: flex;
      align-items: center;
      padding-top: 1px;
      .el-form{
        display: flex;
        margin-top: 20px;
        margin-left: 30px;
      }
    }
  }
</style>
