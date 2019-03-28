<template>
    <!--<p>{{$route.query.equid}}</p>-->
    <div class="box">
      <div class="nav">
        <span>本路由器当前关联员工
          <el-tooltip :content="needTips" placement="top">
             <i>{{this.userNum}}</i>
          </el-tooltip>
        </span>
        <el-row>
          <el-button type="success" size="small" @click="dialogFormVisible1=true">增加新路由</el-button>
          <el-button type="primary" size="small" @click="dialogFormVisible = true" style="margin-right: 5px;">编辑该路由</el-button>
          <el-button type="danger" size="small" @click="delEquid">删除该路由</el-button>
          <!--编辑路由设备-->
          <el-dialog title="编辑路由信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  style="text-align:left;" class="demo-ruleForm">
              <el-form-item label="wifi名称（ssid）：" prop="name">
                <el-input v-model="ruleForm.name" style="width: 500px;" placeholder="请输入wifi名称"  @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="ruleForm.remark" style="width: 500px;" placeholder="用于区分多个wifi" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <!--<div class="el-upload__tip" style="margin-left: 100px;">不能超过8个字符</div>-->
              <el-form-item style="margin-top: 100px;">
                <el-button type="primary" @click="submitForm('ruleForm')">编辑后保存</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

            <!--新增路由设备-->
          <el-dialog title="新增路由设备" :visible.sync="dialogFormVisible1">
            <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="150px"  style="text-align:left;" class="demo-ruleForm">
              <el-form-item label="wifi名称（ssid）：" prop="name">
                <el-input v-model="ruleForm1.name" style="width: 500px;" placeholder="请输入wifi名称"  @keyup.enter.native="submitForm1('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="ruleForm1.remark" style="width: 500px;" placeholder="用于区分多个wifi" @keyup.enter.native="submitForm1('ruleForm')"></el-input>
              </el-form-item>
              <!--<div class="el-upload__tip" style="margin-left: 100px;">不能超过8个字符</div>-->
              <el-form-item style="margin-top: 100px;">
                <el-button type="success" @click="submitForm1('formName1')">创建后保存</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>


        </el-row>
      </div>
      <div class="pers" v-loading="loading">
        <div class="each" v-for="(item,index) in UserLists">
          <i class="iconfont icon-character" style="font-size: 50px; color: #ffffff;"></i>
          <el-button type="warning"  size="mini" class="btn" :userId="item.UserID"  v-text="item.userName" @click="delPers" @mouseenter.native="hoverDel" @mouseout.native="removeDel"></el-button>
        </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "EuipMents",
        inject:['reload'],
        data(){
            return{
              CompanyId:'',
              CurEquId:'',
              UserLists:'',
              EquDetail:'',
              curName:'',
              userId:'',
              userNum:'',
              needTips:'',
              loading:false,
              dialogFormVisible:false,
              dialogFormVisible1:false,
              ruleForm: {
                name:'',
                remark:''
              },
              rules: {
                name: [
                  { required: true, message: '请输入wifi名称', trigger: 'blur' },
                  { max: 8, message: '不可超过8个字符', trigger: 'blur' }
                ],
                remark: [
                  { required: false, message: '请输入wifi名称', trigger: 'blur' },
                  // { max: 8, message: '不可超过8个字符', trigger: 'blur' }
                ],
              },
              ruleForm1: {
                name:'',
                remark:''
              },
            }
        },
        created(){
          let CompanyId = localStorage.getItem('CompanyId')
          this.CompanyId = CompanyId;
          let CurEquId = this.$route.query.equid;
          this.CurEquId = CurEquId;
          // 获取设备的连接人数  具体人员  设备名称等
          axios.get('/api/Handler/Equ.ashx?type=web_equDetailUser&companyid='+this.CompanyId+'&equid='+CurEquId)
            .then( (response)=> {
              console.log(response.data.data);
              let equDetail = response.data.data.equ;
              this.EquDetail = equDetail;
              let equUsers = response.data.data.users;
              this.UserLists = equUsers;
              let userNum = response.data.data.equ.userNum;
              this.userNum = userNum;
              this.loading = false;
              // 链接人数提示
              this.needTips = '本设备的链接人数为'+this.userNum+'人';
            })
            .catch(function (error) {
              console.log(error);
            });

          //当前设备信息
          axios.get('/api/Handler/Equ.ashx?type=web_getEqu&equid='+this.CurEquId)
            .then( (response)=> {
              console.log(response.data);
              let ssid = response.data.data.ssid;
              this.ruleForm.name = ssid;
              let remark = response.data.data.remark;
              this.ruleForm.remark = remark;
            })
            .catch(function (error) {
              console.log(error);
            });
        },
         watch: {
            $route(to, from) {
              console.log(to.query.equid);
              this.CurEquId = to.query.equid;
              axios.get('/api/Handler/Equ.ashx?type=web_equDetailUser&companyid='+this.CompanyId+'&equid='+this.CurEquId)
                .then( (response)=> {
                  console.log(response.data.data);
                  let equDetail = response.data.data.equ;
                  this.EquDetail = equDetail;
                  let equUsers = response.data.data.users;
                  this.UserLists = equUsers;
                  let userNum = response.data.data.equ.userNum;
                  this.userNum = userNum;
                  // 链接人数提示
                  this.needTips = '本设备的链接人数为'+this.userNum+'人';

                  let CurEquId = response.data.data.equ.EquID;
                  //切换设备信息
                  axios.get('/api/Handler/Equ.ashx?type=web_getEqu&equid='+CurEquId)
                    .then( (response)=> {
                      console.log(response.data);
                      let ssid = response.data.data.ssid;
                      this.ruleForm.name = ssid;
                      let remark = response.data.data.remark;
                      this.ruleForm.remark = remark;
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch(function (error) {
                  console.log(error);
                });


            },
        },
        methods:{
          submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                axios.get('/api/Handler/Equ.ashx?type=web_editEqu&ssid='+this.ruleForm.name+'&remark='+this.ruleForm.remark+'&equid='+this.CurEquId)
                  .then( (response)=> {
                    console.log(response.data);
                    this.$notify({
                      title: '成功',
                      message: '编辑成功',
                      type: 'success'
                    });
                    this.reload();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          submitForm1() {
            this.$refs['ruleForm1'].validate((valid) => {
              if (valid) {
                axios.get('/api/Handler/Equ.ashx?type=addEqu&companysn='+this.CompanyId+'&ssid='+this.ruleForm1.name+'&remark='+this.ruleForm1.remark)
                  .then( (response)=> {
                    console.log(response.data);
                    this.$notify({
                      title: '成功',
                      message: '添加成功',
                      type: 'success'
                    });
                    this.reload();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          hoverDel(e){
            console.log(e.target.innerText);
            let curName =  e.target.innerText ;
            this.curName = curName;
            e.target.innerText = '移除'
          },
          removeDel(e){
            e.target.innerText = this.curName;
          },
          delPers(e){
            this.$confirm('是否要将'+this.curName+'从该设备上移除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // console.log(e.target.attributes[3].value)
              this.userId = e.target.attributes[3].value;
              axios.get('/api/Handler/Equ.ashx?type=web_delUserEqu&equid='+this.CurEquId+'&companyid='+this.CompanyId+'&userid='+this.userId)
                .then( (response)=> {
                  console.log(response.data.data);
                  this.reload();
                })
                .catch(function (error) {
                  console.log(error);
                });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          delEquid(){
            this.$confirm('是否要移除'+ this.ruleForm.name +'设备，同时该设备所连接人也都将移除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.get('/api/Handler/Equ.ashx?type=web_delEqu&equid='+this.CurEquId)
                .then( (response)=> {
                  console.log(response.data.data);
                  this.reload();
                })
                .catch(function (error) {
                  console.log(error);
                });

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 删除设备之后  默认显示第一个设备上的人员信息
              let firstEquid = localStorage.getItem('firstEquid');
              console.log(firstEquid);
              this.$route.query.equid = firstEquid;
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

          }
        }
    }
</script>

<style lang="less" scoped>
  .box{
    /*width: 1200px;*/
    /*height: 500px;*/
    /*background: cornflowerblue;*/

    .nav{
      width: 100%;
      height: 50px;
      /*background: forestgreen;*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      span{
        font-size: 20px;
        display: flex;
        i{
          display: block;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 10px;
          background: #67c23a;
          color: #fff;
          font-size: 10px;
          margin-top: 1px;
          margin-left: 10px;
        }
        i:hover{
          cursor: pointer;
        }
      }
      .el-row{
        margin-right: 50px;
      }
    }
    .pers{
      width: 98%;
      height:80%;
      background: peachpuff;
      margin:0 auto;
      /*padding:20px;*/


      .each{
        width: 100px;
        height: 100px;
        background: rgb(221, 221, 221);
        border-radius:5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        float: left;
        margin: 18px 0px 0px 18px;
        .el-button{
          width: 50px;
          height: 25px;
          padding: 0px 10px;
          overflow: hidden;
         display: flex;
          align-items: center;
          justify-content: center;
        }

      }
    }
  }
</style>
