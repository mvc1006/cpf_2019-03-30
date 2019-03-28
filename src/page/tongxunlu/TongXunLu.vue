<template>
  <div class="box">
    <Conmon-Leader></Conmon-Leader>
    <el-container>
      <el-container>
        <el-aside width="350px">
          <el-row class="tac">
            <el-col :span="24">
              <!--<h5>默认颜色</h5>-->
              <el-menu
                :default-openeds="openeds"
                default-active="all"
                class="el-menu-vertical-demo">
                <el-submenu index="1">
                  <template slot="title">
                    <span style="font-weight: 600">公司员工</span>
                  </template>
                  <el-menu-item index="all" @click="originalData">所有部门员工</el-menu-item>
                  <el-menu-item :index="item.GroupName" v-for="(item,index) in partLists" :groupid = item.GroupID   @click="tranasPart" :key="index" style="font-size: 14px;">{{item.GroupName}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <el-table
              v-loading="loading"
              :data="tableData"
              :stripe="true"
              border
              style="width: 100%;margin: 0 auto;">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="auto">
              </el-table-column>
              <el-table-column
                prop="UserName"
                label="姓名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="GongHao"
                label="工号"
               align="center">
              </el-table-column>
              <el-table-column
                prop="UserPhone"
                label="电话"
                align="center">
              </el-table-column>
              <el-table-column
                prop="ZhiWei"
                label="职务"
                align="center">
              </el-table-column>
            </el-table>
          </el-main>
          <!--<el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import ConmonLeader from '../PublicLeader/ConmonLeader'
    export default {
        name: "TongXunLu",
        data(){
          return {
            loading:true,
            CompanyID:'',
            partLists:[],
            openeds: ['1'],
            groupid:'',
            tableData: []
          }
        },
        components: {
          ConmonLeader,
        },
      created(){
        let CompanyId = localStorage.getItem('CompanyId');
        this.CompanyID = CompanyId;
        // 部门列表
        axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+CompanyId)
          .then( (response)=> {
            console.log(response.data.data);
            this.partLists = response.data.data;

          })
          .catch(function (error) {
            console.log(error);
          });

      //通讯录
      //   axios.get('/api/Handler/User.ashx?type=web_phonelist')
      //     .then( (response)=> {
      //       console.log(response.data.data);
      //       this.tableData = response.data.data;
      //       this.loading = false;
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
        this.originalData();
      },
      methods:{
        tranasPart(e){
          console.log(e.$attrs.groupid);
          this.groupid = e.$attrs.groupid;

          axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyID+'&groupid='+this.groupid+'&names=')
            .then( (response)=> {
              console.log(response.data.data);
              this.tableData = response.data.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        originalData(){
          axios.get('/api/Handler/User.ashx?type=web_phonelist')
            .then( (response)=> {
              console.log(response.data.data);
              this.tableData = response.data.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style lang="less" scoped>
  .box{
    margin-bottom: 80px;
  }
  .el-main[data-v-f181f700]{
    text-align: left;
  }
  .el-container{
    /*margin-top: 5px;*/
  }
  .el-aside {
    height: 100%;
    /*background-color: #D3DCE6;*/
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-menu{
    border-right: none;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }
</style>
