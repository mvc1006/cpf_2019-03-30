<template>
  <div>
    <Conmon-Leader @sendValueToParent = "getValueFromChild"></Conmon-Leader>
    <el-container>
      <el-container>
        <el-aside width="350px">
          <el-row class="tac">
            <el-col :span="24">
              <!--<h5>默认颜色</h5>-->
              <el-menu
                :default-active="Active"
                :default-openeds = "openeds"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose" router>
                <el-submenu index="1">
                  <template slot="title"><span style="font-weight: 600">wifi设备</span></template>
                  <el-menu-item :index="item.EquName"  v-for="(item,index) in equpmentLists" :class="$route.query.equid==item.EquID? 'is-active':'ddddddd'" :equid = item.EquID   @click="tansEqupment" :key="item.EquID"  style="font-size: 14px;">
                    <el-tooltip class="item" effect="dark" :content="item.MAC1||item.MAC2 !=''? '已绑定':'未绑定'" placement="top">
                      <i class="el-icon-success" :style="item.MAC1||item.MAC2 !=''? 'color: #1989fa':'color:#909399'" :MAC1 =item.MAC1  :MAC2 =item.MAC2  ></i>
                    </el-tooltip>
                    {{item.EquName}}
                  </el-menu-item>
                  <!--<el-menu-item index="AddEuips" style="color:rgb(153, 153, 153)">-->
                    <!--<i class="el-icon-circle-plus-outline" style="font-weight: 600;color: rgb(123, 148, 251)"></i>-->
                    <!--新增设备-->
                  <!--</el-menu-item>-->
                </el-submenu>
                <!--<el-submenu index="2">-->
                  <!--<template slot="title"><span style="font-weight: 600">批量操作</span></template>-->
                  <!--<el-menu-item :index="(item.GroupName)+index" v-for="(item,index) in partLists" :groupid = item.GroupID   @click="tranasPart1" :key="item.GroupID" style="font-size: 14px;">{{item.GroupName}}</el-menu-item>-->
                <!--</el-submenu>-->
                <el-menu-item index="BatchOperation">
                  <span slot="title" style="font-weight: 600">批量操作</span>
                </el-menu-item>
                <el-menu-item index="CompanyStaff">
                  <span slot="title" style="font-weight: 600">员工设置</span>
                </el-menu-item>
                <el-menu-item index="EditCompony">
                  <span slot="title" style="font-weight: 600">公司设置</span>
                </el-menu-item>
                <el-menu-item index="FunctionSwitch">
                  <span slot="title" style="font-weight: 600">功能开关</span>
                </el-menu-item>
                <el-menu-item index="AddCompany">
                  <span slot="title" style="font-weight: 600">新建单位</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :partsData="partsToSons"></router-view>
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
        name: "NewSetCompany",
        inject:['reload'],
        data(){
            return {
              partsToSons:[],
              Active:'',   //刷新激活  default-active方法  按照item的index激活   原数据：this.$route.query.groupname
              openeds: [],
              CompanyID:'',
              partLists:[],
              groupid:'',
              index:'',
              equpmentLists:[],
              equid:'',
            }
        },
      computed: {
        defaultActive: function(){
          return this.$route.path.replace('/', '');
        }
      },
        mounted(){
          console.log(this.$route.path.replace('/', ''));
          if(this.$route.path.replace('/', '')==='BatchOperation'){
            this.Active = 'BatchOperation';
          }else if(this.$route.path.replace('/', '')===('EuipMents')){
             this.openeds = [];
            this.openeds =  ['1'];
          }else if(this.$route.path.replace('/', '')===('CompanyStaff'||'EditStaffs')){
            this.Active = 'CompanyStaff';
          }else if(this.$route.path.replace('/', '')==='EditCompony'||'PartSet'){
           this.Active = 'EditCompony';
          }else if(this.$route.path.replace('/', '')==='FunctionSwitch'){
            this.Active = 'FunctionSwitch';
          }else if(this.$route.path.replace('/', '')==='AddCompany'){
            this.Active = 'AddCompany';
          }
        },
      watch:{
        $route(to,from){
          console.log(to.path.replace('/',''));
          if(to.path.replace('/','')==='EditCompony'){
            this.Active = 'EditCompony';
          }
        }
      },
        created(){
          console.log(this.$route.query.equname);
          //--------参数依赖------------------
          let promise = new Promise((resolve,reject)=>{
            //当前单位公司号
            axios.get('/api/Handler/SessionCheck.ashx?type=getSuser')
              .then( (response)=> {
                let currentCpyID = response.data.data.currentCpyID;
                resolve(currentCpyID);
                // this.ruleForm.comNumber = response.data.data.currentCpyID;
              })
              .catch(function (error) {
                console.log(error);
              });
          });
         //--------参数依赖于promise回参------------------
          promise.then((currentCpyID)=>{
            console.log(currentCpyID);
            // 部门列表
            axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+currentCpyID)
              .then( (response)=> {
                console.log(response.data.data);
                // this.partLists = response.data.data;
                //传递给子组件的部门列表
                this.partsToSons = response.data.data;
              })
              .catch(function (error) {
                console.log(error);
              });
            //设备列表
            axios.get('/api/Handler/Equ.ashx?type=webequlist&companyid='+currentCpyID)
              .then( (response)=> {
                console.log(response.data.data);
                this.equpmentLists = response.data.data;

                // 储存第一设备信息在设备删除后使用
                let firstEquid = response.data.data[0].EquID;
                localStorage.setItem('firstEquid', firstEquid);

              })
              .catch(function (error) {
                console.log(error);
              });
          });

        },
        components: {
          ConmonLeader,
        },

      methods: {
        getValueFromChild(e){
            console.log(e);
            if(e){
              this.reload();
            }
        },
        handleOpen(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          // console.log(key, keyPath);
        },
        tranasPart(e){
            // console.log(e.$el.innerText);
            let groupid = e.$attrs.groupid;
            let groupname = e.$el.innerText;
            this.groupid = groupid;
            // this.$router.push({name: 'BatchOperation', params: {groupid: groupid}})
            this.$router.push({path: 'CompanyStaff', query: {groupid: groupid,groupname:groupname}})
        },
        // tranasPart1(e){
        //   // console.log(e);
        //   let groupid = e.$attrs.groupid;
        //   // 此处传参为解决批量操作的删除之后部门根据url传递的参数对应高亮问题，，ele的index只支持string  读取index拼接
        //   let index = e.index;
        //   this.groupid = groupid;
        //   this.$router.push({path: 'BatchOperation',  query: {groupid: groupid,groupname:index}})
        // },
        tansEqupment(e){
          console.log(e);
          let EquID = e.$attrs.equid;
          let EquName= e.$el.innerText;
          this.EquID = EquID;
          //groupname参数处理高亮
          this.$router.push({path: 'EuipMents', query: {equid: EquID,equname:EquName}})
          // this.$router.push({path: 'EuipMents'})
        },
      }
    }
</script>

<style lang="less" scoped>
  .el-main[data-v-f181f700]{
    text-align: left;
    padding-bottom: 80px;
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
    /*margin-left: 80px;*/
    /*.el-menu-item{*/
      /*text-align: right;*/
    /*}*/
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
