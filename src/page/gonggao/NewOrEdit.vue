<template>
    <div class="box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公告标题：" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容：" prop="content" >
          <el-input type="textarea"
                    v-model="ruleForm.content"
                    :rows="12"
                    placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <!--<el-form-item label="是否推送" prop="delivery">-->
          <!--<el-switch v-model="ruleForm.delivery" disabled="false"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="发送时间：" prop="time">
        <div class="block">
          <el-date-picker
            v-model="time"
            @change="timeVal"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="默认为即时发送">
          </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"  v-if="isSubShow">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')"  v-if="isSubShow">重置</el-button>
          <el-button @click="goback">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "NewOrEdit",
      data() {
        return {
          isSubShow:true,
          ruleForm: {
            title: '',
            content:'',
            time:''
          },
          time:'',
          rules: {
            title: [
              { required: true, message: '请输入公告标题', trigger: 'blur' },
            ],
            content: [
              { required: true, message: '请输入公告内容', trigger: 'blur' }
            ],
            time: [
              { required: false, message: '请输入公告内容', trigger: 'blur' }
            ],
          }
        };
      },
      created(){
        //查看公告详情
        console.log(this.$route.query.noticeid);
        let noticeid = this.$route.query.noticeid;
        if(noticeid){
          this.isSubShow = false;
          axios.get('/api/Handler/Notice.ashx?type=GetNoticeById&noticeid='+noticeid)
            .then( (response)=> {
              console.log(response.data[0]);
              this.ruleForm.title = response.data[0].title;
              this.ruleForm.content = response.data[0].ncontent;
              this.time = response.data[0].sendtime;

            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
          this.isSubShow = true;
        }
      },
      methods: {
        // 时间选择器时间  也可以直接通过v-model读取
        timeVal(e){
          console.log(e);
        },
        goback(){
          this.$router.push({path: 'gonggao'})
        },
        submitForm(formName) {
          console.log(this.time);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.get('/api/Handler/Notice.ashx?type=webAddNotice',{params:{
                  title:this.ruleForm.title,
                  Content:this.ruleForm.content,
                  IsSendNow:this.time===''?1:0,
                  IsPush:0,
                  SendTime:this.time
                }})
                .then( (response)=> {
                  console.log(response.data.errcode);
                  let errcode = response.data.errcode;
                  if(errcode===0){
                    this.$notify({
                      title: '成功',
                      message: '新建成功！',
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
        }
      }
    }
</script>

<style lang="less" scoped>
      .box{
        width: 80%;
        margin: 0 auto;
        margin-top: 50px;
      }
</style>
