<template>
  <div  style="text-align:left;">
    <h1>功能开关设置：</h1>
    <div class="part">
      <div class="line">
        <h3>自动导入员工</h3>
        <el-switch
          @change = 'auto'
          v-model="autovalue"
          active-color="#13ce66">
        </el-switch>
      </div>
      <p>自动导入员工可以让员工在第一次连接签到wifi并且成功登录员工端后，自动完成单位员工信息的录入工作。【强烈建议开启】</p>
    </div>

    <div class="part">
      <div class="line">
        <h3>内勤抽查</h3>
        <el-switch
          @change = 'neiqin'
          v-model="neiqinvalue"
          active-color="#13ce66">
        </el-switch>
      </div>
      <p>内勤抽查可以通过让内勤员工上传即时拍照相片实现抽查，上传照片只发生在员工每天考勤的首次签到（必须是内勤）时。【强烈建议开启】。 内勤抽查比例为：按照员工数量的一定比例进行抽查。例，单位有10名员工，当设置为50 % 时，即每日随机抽查5名员工；当设置为100 % 时，即每日抽查全部10名员工。</p>
      <transition name="el-fade-in">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  style="text-align:left;" class="demo-ruleForm" v-if="ishowneiqin">
        <el-form-item label="抽查比例 (%)："
                      prop="bili"
                      label-width="120px;">
          <el-input  type="bili" v-model.number="ruleForm.bili"style="width: 400px;margin-left: 40px;"></el-input>
        </el-form-item>
        <el-form-item label="抽查拍照说明：" prop="zipai" label-width="120px;" style="padding-left: 38px;">
          <el-input v-model="ruleForm.zipai"style="width: 400px;margin-left: 40px;" placeholder="自拍勿秀"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 60px;">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </transition>
    </div>


    <div class="part">
      <div class="line">
        <h3>外勤拍照上传</h3>
        <el-switch
          @change = 'waiqin'
          v-model="waiqinvalue"
          active-color="#13ce66">
        </el-switch>
      </div>
      <p>这里是外勤拍照上传。【强烈建议开启】。 外勤抽查为100 % 抽查，不区别抽查比例。</p>
      <transition name="el-fade-in">
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px"  style="text-align:left;" class="demo-ruleForm" v-if="ishowwaiqin">
        <el-form-item label="外勤签到拍照说明："  prop="qiandao" label-width="120px;" style="padding-left: 30px;">
          <el-input v-model="ruleForm2.qiandao"style="width: 400px;margin-left: 8px;"  placeholder="外勤签到拍照说明"></el-input>
        </el-form-item>
        <el-form-item label="外勤签离拍照说明："  prop="qianli" label-width="120px;">
          <el-input v-model="ruleForm2.qianli"style="width: 400px;margin-left: 8px;" placeholder="外勤签离拍照说明"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 50px;">
          <el-button type="primary" @click="submitForm2('ruleForm2')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FunctionSwitch",
        data() {
          return {
            ishowneiqin:false,
            ishowwaiqin:false,
            autovalue: false,
            neiqinvalue:false,
            waiqinvalue: false,
            autoUrl:'',
            neiqinUrl:'',
            waiqinUrl:'',
            ruleForm:{
              bili:'',
              zipai:'',
            },
            ruleForm2:{
              qiandao:'',
              qianli:''

            },
            rules:{
              bili:[
                { required: true, message: '请填写抽查比例', trigger: ['blur', 'change'] },
                {validator:function(rule,value,callback){
                    if (!Number.isInteger(value)) {
                      callback(new Error('请输入数字值'));
                    } else {
                      if (value >100) {
                        callback(new Error('比例设置不正确'));
                      } else {
                        callback();
                      }
                    }
                  }, trigger: 'blur'},
              ],
              qiandao:[
                { required: true, message: '不能为空', trigger: 'blur' },
              ],
              qianli:[
                { required: true, message: '不能为空', trigger: 'blur'},
              ],
              zipai:[
                { required: false }
              ]
            }

          }
        },
      created(){
          //-------------读取后台配置------------
        axios.get('/api/Handler/Cpy.ashx?type=web_CpySignConfig')
          .then( (response)=> {
            console.log(response.data.data);
            let configData = response.data.data;
            //自动导入
            let AutoEnter = response.data.data.AutoEnter;
            if(AutoEnter==="0"){
              this.autovalue = false;
            }else{
              this.autovalue = true;
            }
            //内勤抽查
            let InnerCheck = response.data.data.InnerCheck;
            if(InnerCheck==="0"){
              this.neiqinvalue = false;
            }else{
              this.neiqinvalue = true;
              this.ishowneiqin = true;
              this.ruleForm.bili = response.data.data.OnRemarkN;
              this.ruleForm.zipai = response.data.data.OffRemarkN;
            }

            //外勤抽查
            let OuterCheck = response.data.data.OuterCheck;
            if(OuterCheck==="0"){
              this.waiqinvalue = false;
            }else{
              this.waiqinvalue = true;
              this.ishowwaiqin = true;
              this.ruleForm2.qiandao = response.data.data.OnRemarkW;
              this.ruleForm2.qianli = response.data.data.OffRemarkW;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      methods:{
        auto(e){
          console.log(e);
          if(e){
            this.autoUrl = '/api/Handler/Equ.ashx?type=web_changeAutoEnter&auto=1'
            this.$notify({
              title: '成功',
              message: '自动导入员工已打开！',
              type: 'success'
            });
          }else {
            this.autoUrl = '/api/Handler/Equ.ashx?type=web_changeAutoEnter&auto=0';
            this.$notify.info({
              title: '消息',
              message: '自动导入员工已关闭！',
            });
          }
          axios.get(this.autoUrl)
            .then( (response)=> {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        neiqin(e){
          console.log(e);
          if(e){
            this.ishowneiqin = true;
            this.ruleForm.bili = '';
            this.ruleForm.zipai = '';
          }else {
            this.ishowneiqin = false;
            this.neiqinUrl = '/api/Handler/Cpy.ashx?type=web_signConfigUpdtN&InnerCheck=0&OnRemarkN='+this.ruleForm.bili+'&OffRemarkN='+this.ruleForm.zipai;
            console.log(  this.neiqinUrl);
            axios.get(this.neiqinUrl)
              .then( (response)=> {
                console.log(response);
                this.$notify.info({
                  title: '消息',
                  message: '内勤抽查已关闭！'
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        submitForm(ruleForm) {
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.neiqinUrl = '/api/Handler/Cpy.ashx?type=web_signConfigUpdtN&InnerCheck=1&OnRemarkN='+this.ruleForm.bili+'&OffRemarkN='+this.ruleForm.zipai;
              console.log(this.neiqinUrl );
              axios.get(this.neiqinUrl)
                .then( (response)=> {
                  console.log(response);
                  let errcode = response.data.errcode;
                  if(errcode===0){
                    this.$notify({
                      title: '成功',
                      message: '成功设置抽查比例！',
                      type: 'success'
                    });
                  }
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
        //外勤
        submitForm2(ruleForm2) {
          this.$refs[ruleForm2].validate((valid) => {
            if (valid) {
              this.waiqinUrl = '/api/Handler/Cpy.ashx?type=web_signConfigUpdtW&OuterCheck=1&OnRemarkW='+this.ruleForm2.qiandao+'&OffRemarkW='+this.ruleForm2.qianli;
              console.log(this.waiqinUrl );
              axios.get(this.waiqinUrl)
                .then( (response)=> {
                  console.log(response);
                  let errcode = response.data.errcode;
                  if(errcode===0){
                    this.$notify({
                      title: '成功',
                      message: '外勤拍照已打开！',
                      type: 'success'
                    });
                  }
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //外勤
        waiqin(e){
          console.log(e);
          if(e){
            this.ishowwaiqin = true;
            // this.ruleForm2.qiandao = '';
            // this.ruleForm2.qianli = '';
          }else {
            this.ishowwaiqin = false;
            this.waiqinUrl = '/api/Handler/Cpy.ashx?type=web_signConfigUpdtW&OuterCheck=0&OnRemarkW='+this.ruleForm2.qiandao+'&OffRemarkW='+this.ruleForm2.qianli;
            console.log(this.waiqinUrl );
            axios.get(this.waiqinUrl)
              .then( (response)=> {
                console.log(response);
                this.$notify.info({
                  title: '消息',
                  message: '外勤拍照已关闭！'
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  div{
    width: 100%;
    /*height: 500px;*/
    /*background: darkgray;*/
    h1{
      /*margin-top: 0px;*/

      font-size: 20px;
      height:20px;
    }
    .part{
      /*width: 1100px;*/
      width: 98%;
      height: auto;
      padding: 10px 10px 20px;
      background: rgb(242, 242, 242);
      margin-top: 45px;

      .line{
        width: 500px;
        height: 20px;
        /*background: rosybrown;*/
        display: flex;
        align-items: center;
        justify-content: flex-start;
        h3{
          width: 100px;
          margin-left: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .el-switch{
          width: 300px;
          height: 20px;
          margin-left: 10px;
          /*margin-bottom: 12px;*/
        }
      }
      p{
        margin-left: 20px;
        margin-top: 20px;
        line-height: 30px;
        font-size: 14px;
      }
      .el-form{
        width: 800px;
        /*height: 300px;*/
        margin-top: 20px;
        .el-form-item{
          height: auto;

        }
        .el-input{
          height: 50px;
        }
        .el-form-item{
          padding-left: 30px;
        }
        /*.el-form-item__error{*/
          /*margin-left: 100px !important;*/
        /*}*/
        .el-form-item__label{

        }
      }
    }
  }
</style>
