<template>
  <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  style="text-align:left;" class="demo-ruleForm">
      <el-form-item label="wifi名称（ssid）：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 600px;" placeholder="请输入wifi名称"  @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="ruleForm.remark" style="width: 600px;" placeholder="用于区分多个wifi" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <!--<div class="el-upload__tip" style="margin-left: 100px;">不能超过8个字符</div>-->
      <el-form-item style="margin-top: 200px;">
        <el-button type="primary" @click="submitForm('ruleForm')">编辑后保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "EditEuips",
    inject:['reload'],
    data() {
      return {
        ruleForm: {
          name: '',
          currentid:'',
          CurEquId:'',
          ssid:'',
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
        }
      };
    },
    created(){
      let currentid = localStorage.getItem('CompanyId');
      // console.log(currentid);
      this.currentid = currentid;
      let CurEquId = this.$route.query.equid;
      this.CurEquId = CurEquId;
      if(CurEquId){
        //当前设备信息
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
      }

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style lang="less" scoped>
  .box{
    width: 1000px;
    /*height: 300px;*/
    /*background: forestgreen;*/
    margin: 0 auto;
    margin-top: 100px;
  }
</style>
