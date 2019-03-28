<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="350px">
          <el-row class="tac">
            <el-col :span="24">
              <!--<h5>默认颜色</h5>-->
              <el-menu
                :default-active="defaultActive"
                :default-openeds="openeds"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose" router>
                <el-submenu index="1">
                  <template slot="title">
                    <span style="font-weight: 600">日签到明细表</span>
                  </template>
                  <el-menu-item index="#" @click="riQiandaomingxi">所有员工</el-menu-item>
                  <el-menu-item :index="item.GroupName" v-for="(item,index) in partLists" :groupid = item.GroupID   @click="riQiandaomingxi" :key="item.GroupID" style="font-size: 14px;">{{item.GroupName}}</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title"><span style="font-weight: 600">月签到统计表</span></template>
                  <el-menu-item index="#"  @click="tranasPart1" groupid ="0">所有部门员工</el-menu-item>
                  <el-menu-item :index="item.GroupName" v-for="(item,index) in partLists" :groupid = item.GroupID   @click="tranasPart1" :key="item.GroupID"  style="font-size: 14px;">{{item.GroupName}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="Yqmxb">
                  <span slot="title" style="font-weight: 600">月签到明细表</span>
                </el-menu-item>
                <el-menu-item index="Ygmxb">
                  <span slot="title" style="font-weight: 600">员工明细表</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <!--<el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "KaoQinAside",
    data(){
      return {
        // defaultActive:'',
        openeds: [],
        CompanyID:'',
        partLists:[],
        groupid:'',
        index:'',
        equpmentLists:[],
        equid:''
      }
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    mounted(){
      // console.log(this.$route.path.replace('/', ''));
      if(this.$route.path.replace('/', '')==='BatchOperation'){
        this.openeds =  ['3'];
      }else if(this.$route.path.replace('/', '')==='EuipMents'){
        this.openeds =  ['2'];
      }else if(this.$route.path.replace('/', '')==='CompanyStaff'){
        this.openeds =  ['1'];
      }
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

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      riQiandaomingxi(e){
        // console.log(e.$attrs.groupid);
        let groupid = e.$attrs.groupid;
        // this.$router.push({name: 'BatchOperation', params: {groupid: groupid}})
        // this.$router.push({path: 'Rqmxb', query: {groupid: groupid,groupname:groupname}})
        this.$router.push({path: 'Rqmxb', query: {groupid: groupid}})
      },
      tranasPart1(e){
        console.log(e.$attrs.groupid);
        let groupid = e.$attrs.groupid;
        this.groupid = groupid;
        // this.$router.push({name: 'BatchOperation', params: {groupid: groupid}})
        this.$router.push({path: 'Yqtjb', query: {groupid: groupid}})
      },
    }
  }
</script>

<style lang="less" scoped>
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
