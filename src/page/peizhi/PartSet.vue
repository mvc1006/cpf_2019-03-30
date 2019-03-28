<template>
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'EditCompony' }">公司设置</el-breadcrumb-item>
        <el-breadcrumb-item>部门设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="nav">
        <el-button type="primary" size="medium " @click="addParts" >新增部门</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData3"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="GroupName"
          label="部门名称">
        </el-table-column>
        <el-table-column
          prop=""
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop=""
          label="部门人数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--增加部门-->
      <el-dialog title="新建部门" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  style="text-align:left;" class="demo-ruleForm">
          <el-form-item label="部门名称：" prop="GroupName">
            <el-input v-model="ruleForm.GroupName" style="width: 500px;" placeholder="请输入部门名称（不能超过8个字符）"  @keyup.enter.native="submitForm1('ruleForm')"></el-input>
          </el-form-item>
          <!--<div class="el-upload__tip" style="margin-left: 100px;">不能超过8个字符</div>-->
          <el-form-item style="margin-top: 100px;">
            <el-button type="primary" @click="submitForm('formName1')">创建保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--编辑部门-->
      <el-dialog title="编辑部门信息" :visible.sync="dialogFormVisible1">
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="150px"  style="text-align:left;" class="demo-ruleForm">
          <el-form-item label="部门名称：" prop="name">
            <el-input v-model="ruleForm1.GroupName" style="width: 500px;" placeholder="请输入部门名称（不能超过8个字符）"  @keyup.enter.native="submitForm1('ruleForm')"></el-input>
          </el-form-item>
          <!--<div class="el-upload__tip" style="margin-left: 100px;">不能超过8个字符</div>-->
          <el-form-item style="margin-top: 100px;">
            <el-button type="success" @click="submitForm1('formName1')">编辑后保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        name: "PartSet",
        props: ['partsData'],
        data(){
          return{
            dialogFormVisible1:false,
            dialogFormVisible:false,
            loading:true,
            tableData3:[],
            CompanyId:'',
            rules: {
              GroupName: [
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { max: 8, message: '不可超过8个字符', trigger: 'blur' }
              ],
            },
            ruleForm1: {
              GroupID:'',
              GroupName:'',
            },
            ruleForm: {
              GroupName:'',
            },
          }
        },
        created(){
          // console.log(this.partsData);
          // if(this.partsData.length===0){
          //   let getpartsList= localStorage.getItem('partsData')
          //   this.tableData3= JSON.parse(getpartsList);
          //   console.log(JSON.parse(getpartsList));
          // }else{
          //   this.tableData3= this.partsData;
          //   //解决页面刷新子组件获取到的部门信息丢失问题
          //   localStorage.setItem('partsData',JSON.stringify(this.partsData))
          // }
          let CompanyId = localStorage.getItem('CompanyId')
          this.CompanyId = CompanyId;
          //部门列表
          axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+CompanyId)
            .then( (response)=> {
              console.log(response.data.data);
              // response.data.data.unshift({GroupID:0,GroupName:'所有部门员工'})
              this.tableData3 = response.data.data;
              this.loading = false;
              // let firstGroupId = response.data.data[0].GroupID;
              // this.firstGroupId = firstGroupId;
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        methods:{
          addParts(){
            this.dialogFormVisible = true;
          },

          //创建部门
          submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                axios.get('/api/Handler/Bu.ashx?type=web_addBu&groupname='+this.ruleForm.GroupName)
                  .then( (response)=> {
                    console.log(response.data);
                    let errcode = response.data.errcode;
                    if(errcode===0){
                      this.$message({
                        message: '添加成功！',
                        type: 'success'
                      });
                      this.reload();
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
          handleEdit(index, row) {
            this.dialogFormVisible1= true;
            console.log(index, row);
            this.ruleForm1.GroupID = row.GroupID;
            this.ruleForm1.GroupName = row.GroupName;
            // this.$router.push({path: 'EditStaffs', query: {userid: userid}})
            console.log(this.ruleForm1.GroupID)
            console.log(this.ruleForm1.GroupName)
          },
          submitForm1() {
            this.$refs['ruleForm1'].validate((valid) => {
              if (valid) {
                axios.get('/api/Handler/Bu.ashx?type=web_editBu&groupname='+this.ruleForm1.GroupName+'&groupid='+this.ruleForm1.GroupID)
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
          handleDelete(index, row) {
               console.log(index, row);
                  let GroupID = row.GroupID;
                  let GroupName = row.GroupName;
              this.$confirm('是否要删除'+GroupName+'部门？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                axios.get('/api/Handler/Bu.ashx?type=web_delBu&groupid='+GroupID)
                  .then( (response)=> {
                    console.log(response.data.errcode);
                    let errcode = response.data.errcode;
                    let errmsg = response.data.errmsg;
                    if(errcode===0){
                      this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                      });
                      this.reload();
                    }else{
                      this.$notify.error({
                        title: '错误',
                        message: errmsg
                      });
                    }

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

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

<style scoped lang="less">
  .box{
   .nav{
     height: 80px;
     /*background: red;*/
     display: flex;
     align-items: center;
     justify-content: flex-start;
     margin-top: 10px;
   }
  }
</style>
