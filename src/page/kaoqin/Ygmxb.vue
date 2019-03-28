<template>
  <div class="box">
    <div class="nav">
      <el-form :inline="true" :model="ruleForm"  ref="ruleForm"  style="margin-top: 26px;" class="demo-form-inline">
        <el-form-item label="查询方式">
          <el-select v-model="ruleForm.type" placeholder="查询方式"   size="medium"  @change="checkType">
            <el-option label="按姓名查找" value="UserName"></el-option>
            <el-option label="按工号查找" value="GongHao"></el-option>
            <el-option label="按职务查找" value="ZhiWei"></el-option>
            <el-option label="按手机号查找" value="UserPhone"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询条件">
          <el-input
            v-model="value"
            placeholder="查询条件"
            size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="" style="margin-left: 40px;" class="hoverPointer" >
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
        prop="UserName"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="GongHao"
        align="center"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="ZhiWei"
        align="center"
        label="职务">
      </el-table-column>
      <el-table-column
        prop="UserPhone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="wstate"
        align="center"
        label="状态">
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
    name: "Ygmxb",
    data() {
      return {
        ruleForm: {
          type:'UserName',
        },
        tableData:[],
        loading:true,
        value:'',
        totals:null,
        groupid:'',
      };
    },
    watch:{
      //  监听条件变化是查询
      value(val){
        this.checkCondition();
      },

    },
    created(){
      console.log(this.$route.query);
      //时间转换  ele在直接获取时间值得时候格式不合理 且为提供相应转换的方法   自定义转换
      let date = new Date();
      this.time = date.getFullYear() + '-' + (date.getMonth() + 1);
      console.log(this.time);
      //获取所有员工考勤列表
      axios.get('/api/Handler/User.ashx?type=web_ygmx&cPage=1&pSize=10')
        .then( (response)=> {
          console.log(response.data);
          this.tableData = response.data.data;
          this.totals = response.data.totals;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods:{

      //   当有查询条件时查询此人
      checkCondition(){
        this.loading = true;
        axios.get('/api/Handler/User.ashx?type=web_ygmx&Sch_type='+this.ruleForm.type+'&Sch_value='+this.value+'&cPage=1&pSize=10')
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
      //------------按查询方式查询
      checkType(e){
        this.checkCondition();
      },
      // 分页器调用
      handleCurrentChange(e){
        console.log(e);
        this.loading = true;
        axios.get('/api/Handler/User.ashx?type=web_ygmx&cPage='+e+'&pSize=10')
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
        let excle = '/api/Handler/Report.ashx?type=yuangongmingxi&Sch_type='+this.ruleForm.type+'&Sch_value='+this.value+'';

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
