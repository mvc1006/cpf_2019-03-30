<template>
  <div>
    <div class="nav">
      <el-button type="primary" size="medium " @click="addYuangong" >新增员工</el-button>
      <el-button type="danger" size="medium"   @click="delParts" style="margin-left: 10px;margin-right: 20px;display: none;">删除该部门</el-button>
      <el-button type="success" size="medium " @click="piLiang" >批量新增员工</el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.region" size="medium"  @change="transpart" placeholder="所有部门员工">
            <el-option
              v-for="(item,index) in partLists"
              :label="item.GroupName"
              :groupId="item.GroupID"
              :key="index"
              :value="item.GroupName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="checkName" size="medium" prefix-icon="el-icon-search" placeholder="按员工姓名查找"  @change="check"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData3"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="UserName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="GongHao"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="UserPhone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="ZhiWei"
        label="职位">
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

    <!--批量导入-->
    <el-dialog title="批量导入" :visible.sync="dialogFormVisible">
      <div style="display: flex; flex-direction: column; justify-content: flex-start;margin-left: 100px">
        <div class="dowm">
          <span>模板下载：</span>
          <el-button type="success" size="medium "  @click="download">点击按钮下载模板</el-button>
        </div>
        <div style="display: flex;align-items: center;margin-top: 15px;">
          <span style="margin-top: 30px;">模板下载：</span>
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change = "fileChange"
            :auto-upload="false"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            multiple
            :limit="1"
            accept=".xls,.xlsx"
            :file-list="fileList">
            <el-input size="" placeholder="上传模板文件" style="width: 450px; margin-top: 30px;" v-model="fileName"></el-input>
            <!--<div slot="tip" class="el-upload__tip">只能上传xls文件</div>-->
          </el-upload>
        </div>

      </div>

      <el-button type="success"@click="insert('form')" style="margin-top:90px;margin-left: 200px;">确认上传</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "CompanyStaff",
    inject:['reload'],
    data(){
      return{
        groupid: '',
        CompanyId:'',
        partLists:[],
        tableData3:[],
        groupname:'',
        firstGroupId:'',
        loading:true,
        formInline: {
          region: ''
        },
        checkName:'',


        dialogFormVisible:false,
        fileList: [],
        fileName:''
      }
    },
    created(){
      let CompanyId = localStorage.getItem('CompanyId')
      this.CompanyId = CompanyId;
      //部门列表
      axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+CompanyId)
        .then( (response)=> {
          console.log(response.data.data);
          response.data.data.unshift({GroupID:0,GroupName:'所有部门员工'})
          this.partLists = response.data.data;
          let firstGroupId = response.data.data[0].GroupID;
          this.firstGroupId = firstGroupId;
        })
        .catch(function (error) {
          console.log(error);
        });


      //执行单个人员删除操作后的显示   此外还有删除部门后显示该是什么？
      this.groupid = this.$route.query.groupid;
      console.log( this.groupid );
      if(this.groupid===undefined){
        this.groupid = 0;
      }else{
        console.log( this.groupid );
      }
      axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names='+'')
        .then( (response)=> {
          console.log(response.data.data);
          let userList = response.data.data;
          this.tableData3 = userList;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+0+'&names='+'')
          .then( (response)=> {
            console.log(response.data.data);
            let userList = response.data.data;
            this.tableData3 = userList;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });

    },

    watch:{
      // $route(to,from){
      //   this.groupid = to.query.groupid;
      //   console.log(this.groupid);
      //   this.groupname = to.query.groupname;
      //   axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names='+'')
      //     .then( (response)=> {
      //       console.log(response.data.data);
      //       let userList = response.data.data;
      //       this.tableData3 = userList;
      //       this.loading = false;
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }
      checkName(e){
        console.log(e);
        axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid=0&names='+e)
          .then( (response)=> {
            console.log(response.data.data);
            let userList = response.data.data;
            this.tableData3 = userList;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    },
    methods: {
      // 批量导入
      piLiang(){
        // this.$router.push({path: 'AddExcle'});
        this.dialogFormVisible = true;
      },
      uploadUrl:function(){
        return "/api/Handler/Upload.ashx?Type=uploadexcel";
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        console.log('上传文件', response);
        let successCode = response.code;
        if(successCode===0){
          this.$notify({
            title: '成功',
            message: '上传成功！',
            type: 'success'
          });
          this.dialogFormVisible = false;
        }

      },
      //上传失败
      uploadError(response,file,fileList){
        // console.log(response);
        // console.log(file);
        // console.log(fileList);
        this.$notify.error({
          title: '失败',
          message: '可能是文件类型不正确，请参照先前下载的文件格式！'
        });
      },
      //文件上传至选框
      fileChange(file,fileList){
        console.log(file);
        this.fileName = file.name;
        this.fileList = fileList
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${ file.name }？`);
      },

      insert() {
        this.$refs.upload.submit();

      },

      download(){
        this.$alert('<p>' +
          '<span>1、批量添加员工前，请先添加部门。</span>' +
          '<br/>' +
          '<span>2、请勿改动表中原有的信息，以免数据上传失败。\</span>' +
          '<br/>' +
          '<span>3、请按示例进行填写，注有“必填”字样的项不可为空。\</span>' +
          '<br/>' +
          '<span>4、当您选填角色为管理员时，密码项不可为空。\</span>' +
          '<br/>' +
          '<span>5、请勿添加重复的员工以及员工手机号码。\</span>' +
          '<br/>' +
          '<span>6、时段表示务必使用二十四小时制，且注意时段不可交叉\</span>' +
          '</p>', '注意事项：', {
          dangerouslyUseHTMLString: true,
          confirmButtonText:'我知道啦',
          showCancelButton:true,
          cancelButtonText:'取消下载',
          callback:function (e) {
            console.log(e);
            if(e==='confirm'){
              // alert(111)
              let excle = 'http://ddsignweb.wo-ish.com/web/file/ddqiandao_employee_model.xls';
              window.location = excle;
            }
          }
        });
      },



      check(e){
          console.log(e);
      },
      transpart(e){
        console.log(e);

        let selectedWorkName = {};
        selectedWorkName = this.partLists.find((item)=>{//这里的companyLists就是上面遍历的数据源
          return item.GroupName === e;
          //筛选出匹配数据，是对应数据的整个对象
        });
        console.log(selectedWorkName);
        this.groupid = selectedWorkName.GroupID;
        axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names='+'')
          .then( (response)=> {
            console.log(response.data.data);
            let userList = response.data.data;
            this.tableData3 = userList;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      addYuangong(){
        // this.$router.push({path: 'CompanyStaff', query: {groupid: groupid,groupname:groupname}})
        this.$router.push({path: 'AddStaffs'})
      },

      delParts(){
        this.$confirm('是否要删除'+this.groupname+'部门？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/api/Handler/Bu.ashx?type=web_delBu&groupid='+this.groupid)
            .then( (response)=> {
              console.log(response.data.errcode);
              let errcode = response.data.errcode;
              let errmsg = response.data.errmsg;
              if(errcode===0){
                //执行删除部门后默认显示第一个部门的信息

                axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.firstGroupId+'&names='+'')
                  .then( (response)=> {
                    console.log(response.data.data);
                    let userList = response.data.data;
                    this.tableData3 = userList;
                    this.$notify({
                      title: '成功',
                      message: '删除成功',
                      type: 'success'
                    });
                    this.reload();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
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

      },
      handleEdit(index, row) {
        console.log(index, row);
        let userid = row.UserID;
        this.$router.push({path: 'EditStaffs', query: {userid: userid}})
        // console.log(userid)
      },
      handleDelete(index, row) {
        console.log(index, row);
        let userid = row.UserID;
        let usename = row.UserName;
        this.$confirm('是否要删除'+usename+'？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/api/Handler/User.ashx?type=web_UserDelMulty&uids='+userid)
            .then( (response)=> {
              console.log(response.data.data);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.reload();
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

<style lang="less" scoped>
  .nav{
    width: 100%;
    height: 50px;
    /*background: firebrick;*/
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;

    .el-form{
      margin-top: 22px;
      margin-left: 10px;
    }
  }
</style>
