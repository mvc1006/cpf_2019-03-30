<template>
  <div class="wrap">
      <div class="header">
          <div class="con">
            <div>
              <img src="static/img/logo.png" alt="" @click="gosetcompany" class="hoverPointer">
              <p v-if="titleShow" v-text="companyValue" @click="gosetcompany" v-loading="loading" class="hoverPointer"></p>
              <el-select v-else="titleShow" v-model="companyValue" placeholder="请选择"  @change = "transCom" style="margin-left: 20px;width: 400px;">
                <el-option
                  v-for="(item,index) in companyLists"
                  :key="index"
                  :label="item.label"
                  :CompanySN = "item.CompanySN"
                  :value="item.CompanyName">
                </el-option>
              </el-select>
            </div>
            <div style="display: flex;align-items: center;justify-content: space-between">
              <div style="margin-right: 30px; color: #666">
                <i class="iconfont icon-character" style="margin-right: 8px;font-size: 18px;margin-top: -3px;"></i>
                <span style="font-size: 14px;" v-text="username"></span>
              </div>

              <el-button type="text" @click="quit">退出登录</el-button>
            </div>

          </div>
      </div>
      <div class="nav">
        <div class="cen">
          <router-link to="kaoqin" tag="div" :class="{'fontcolor':kaoqinLight}"><span>考勤</span> <span>统计</span></router-link>
          <router-link to="tongxunlu" tag="div" :class='$route.path.replace("/", "")==="tongxunlu"? "fontcolor":""'><span>通讯</span><span>录</span></router-link>
          <router-link to="gonggao" tag="div" :class="{'fontcolor':gonggaoLight}"><span>公告 </span><span>栏</span></router-link>
          <router-link to="EditCompony" tag="div" :class="{'fontcolor':peizhiLight}">配置</router-link>
        </div>
      </div>
    <!--<div class="footer">-->
      <!--<p>比威网络叮咚签到,企业微办公及智能考勤专家,帮助您的企业快速建立智能考勤系统，真正变革传统考勤！</p>-->
      <!--<p>比威网络叮咚签到2013—2018版权所有 山东紫光比威网络有限公司提供技术支持</p>-->
      <!--<p>400-6706709</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Bus from '../../store/bus.js';
  export default {
        name: "ConmonLeader",
        inject:['reload'],
        data() {
        return {
          username:'',
          companyLists:[],
          companyValue: '',
          currentCpyID:'',
          CompanySN:'',
          TempCompanyName:'',
          titleShow:true,
          loading:true,
          kaoqinLight:false,
          gonggaoLight:false,
          peizhiLight:false,
          partLists:[]
        }
      },
        created(){
          // console.log(this.$route.path.replace('/', ''));
          //检测超时登录
          axios.get('/api/Handler/SessionCheck.ashx')
            .then( (response)=> {
              console.log(response.data);
              if(response.data !==''){
                this.$router.replace('/');
              }
            })
            .catch(function (error) {
              console.log(error);
            });

          //公司列表
          axios.get('/api/Handler/Cpy.ashx?type=cpyList')
            .then( (response)=> {
              this.companyLists = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });


          //单位信息
          axios.get('/api/Handler/Cpy.ashx?type=web_GetEditCpyInfo')
            .then( (response)=> {
              console.log(response.data.data);
              let data = response.data.data;
              this.companyValue = data.Name;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error);
            });

          //当前管理员信息 账号、联系电环、 获取公司号等信息  本地储存单位号
          axios.get('/api/Handler/SessionCheck.ashx?type=getSuser')
            .then( (response)=> {
              console.log(response.data.data);
              this.currentCpyID = response.data.data.currentCpyID;
              this.username = response.data.data.Name;
              // Bus.$emit('login-on', this.currentCpyID );
              localStorage.setItem('CompanyId', this.currentCpyID);
              // let CompanyId = localStorage.getItem('CompanyId');
              // this.CompanyID = CompanyId;
              // 部门列表
              axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+this.currentCpyID)
                .then( (response)=> {
                  console.log(response.data.data);
                  this.partLists = response.data.data;
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });

          //检测配置路由显示切换公司信页面
          // console.log(this.$route.path.replace('/', ''));
          let titleShow = this.$route.path.replace('/', '');
          if(titleShow ==='EditCompony'){
            this.titleShow = false;
          }else{
            this.titleShow = true;
          }
          //考勤导航高亮 gonggaoLight
          const kaoqin = ['kaoqin','Rqmxb','Yqmxb','Yqtjb','Ygmxb'];
          let kaoqinLight =  kaoqin.some(function (i,index,l) {
            return titleShow ===i;
          });
          if(kaoqinLight){
            this.kaoqinLight =true;
          }

          //公告导航高亮 gonggaoLight
          const gonggao = ['NewOrEdit','gonggao'];
          let gonggaoLight =  gonggao.some(function (i,index,l) {
            return titleShow ===i;
          });
          if(gonggaoLight){
            this.gonggaoLight =true;
          }

          //配置导航高亮
          const peizhi = ['EditCompony','PartSet','CompanyStaff','AddStaffs','EditStaffs','EuipMents','EditEuips','BatchOperation','AddExcle','EditCompony','FunctionSwitch','AddCompany'];
          let peizhiLight =  peizhi.some(function (i,index,l) {
            return titleShow ===i;
          });
          if(peizhiLight){
            this.peizhiLight =true;
          }
        },
      watch:{
        $route(e){
          //检测配置路由显示切换公司信页面
          // console.log(e.path.replace('/', ''));
          let titleShow = e.path.replace('/', '');
          if(titleShow ==='EditCompony'){
            this.titleShow = false;
          }else{
            this.titleShow = true;
          };
        }
      },
      methods:{
        gosetcompany(){
          this.$router.push({path: 'EditCompony'});
          this.reload();
        },
        transCom:function(e){
          this.$emit('sendValueToParent',{partLists:this.partLists});
          console.log(e);
          let selectedWorkName = {};
          selectedWorkName = this.companyLists.find((item)=>{//这里的companyLists就是上面遍历的数据源
            return item.CompanyName === e;
            //筛选出匹配数据，是对应数据的整个对象
          });
          // console.log(selectedWorkName);
          this.CompanyID = selectedWorkName.CompanyID;
          this.CompanySN = selectedWorkName.CompanySN;

          axios.get('/api/Handler/SessionCheck.ashx?type=upcpyid&userid='+this.CompanyID+'&cpysn='+this.CompanySN)
            .then( (response)=> {
              console.log(response);
              this.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        quit(){
          this.$confirm('是否要继续退出？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get('/api/Handler/Manager.ashx?type=logout')
              .then( (response)=> {
                console.log(response);
                let errcode = response.data.errcode;
                if(errcode===40011){
                  this.$message({
                    type: 'success',
                    message: '已退出!'
                  });
                  this.$router.push({path: '/'})
                }

              })
              .catch(function (error) {
                console.log(error);
              });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消退出'
            });
          });

        }
      }
    }
</script>

<style lang="less" scoped>
  .hoverPointer:hover{
    cursor: pointer;
  }
  .wrap{
    background: #ffffff;
    /*position: relative;*/
    /*min-height: 800px;*/
  }

  .header{
    width: 100%;
    height:80px;
    /*box-shadow:0px 0px 1px 0px rgba(115,116,116,0.79);*/

    .con{
      /*width: 1380px;*/
      width: 89%;
      height:80px;
      background: #ffffff;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/
        p{
          margin-left: 15px;
          font-size: 20px;
          font-weight: 600;
        }

        .el-input{
          .el-input__inner{
            margin-left: 20px !important;
          }

        }
      }

      .el-button--text{
        color: #666666;
      }

    }
  }

  .nav{
    width: 100%;
    height: 80px;
    /*background: #dddd;*/
    padding-bottom: 5px;
    /*margin-top: -12px;*/
    background:rgba(255,255,255,1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /*box-shadow:0px 0px 2px 0px rgba(0, 0, 0, 0.3);*/

    .cen{
      /*width: 1400px;*/
      width: 90%;
      height: 80px;
      /*background: firebrick;*/
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div{
        width: 55px;
        height: 55px;
        background: #C9D8F7;
        margin-left: 12px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        /*font-weight: 600;*/
        color: #333333;
        span{
          margin-top: 2px;
        }
      }
      div:hover{
        cursor: pointer;
        transition: all .2s ease;
        color: #ffffff;
        opacity: .98;
      }
      .fontcolor{
        color: #fff;
      }
    }

  }

  .footer{
    position: absolute;
    bottom: 10px;
    width: 100%;
    margin-top: 100px;
    p{
      letter-spacing: 1px;
      font-size: 14px;
      color: #333333;
      font-family: "微软雅黑";
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
