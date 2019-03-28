<template>
  <div>
    <div class="nav">
      <el-button type="primary" size="medium " plain @click="batchAdd" >批量导入</el-button>
      <el-button type="danger" size="medium" plain  @click="batchDel">批量删除</el-button>
      <el-button type="success" size="medium" plain  @click="batchSetTime">批量设置时段</el-button>
      <el-select v-model="value" placeholder="批量转换部门" style="margin-left: 10px" @change = transpart>
        <el-option
          v-for="item in partLists"
          :key="item.value"
          :label="item.label"
          :GroupID = "item.GroupID"
          :value="item.GroupName">
        </el-option>
      </el-select>
      <!--<el-button type="danger" size="mini"   @click="delParts" style="margin-left: 500px;">删除该部门</el-button>-->
    </div>
    <div style="height: 100%; display: flex;  justify-content: space-between">
      <el-checkbox-group v-model="checkboxGroup5" @change="selectVal" size="medium " style="width: 200px;height: auto; border: 1px solid #ebeef5; margin-top: 20px;margin-right: 10px;">
        <el-checkbox v-for="(item,index) in partLists" :label="item.GroupID"  :key="item.GroupID" border>{{item.GroupName}}</el-checkbox>
      </el-checkbox-group>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        v-loading="loading"
        border
        tooltip-effect="dark"
        style="width: 60%;margin-top: 20px;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="Name"
          label="姓名">
          <template slot-scope="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column
          prop="Phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="GongHao"
          label="工号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ZhiWei"
          label="职位"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="workState"
          label="状态"
          :formatter="formatState"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>

    <!--批量导入-->
    <el-dialog title="批量导入" :visible.sync="dialogFormVisible">
      <div style="display: flex; flex-direction: column; justify-content: flex-start;margin-left: 100px">
        <div class="dowm">
          <span>模板下载：</span>
          <el-button type="primary" size="medium " @click="download">点击按钮下载模板</el-button>
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
      <el-button type="primary"@click="insert('form')" style="margin-top:90px;margin-left: 200px;">确认上传</el-button>
    </el-dialog>

    <!--批量设置时段-->
    <el-dialog title="批量设置时段" :visible.sync="isBatchSetTime">
      <Time-set :sendUserLists="multipleSelection"></Time-set>
      <!--<el-button type="success"  @click="confirmSetTime" style="margin-top:10px;margin-left: 50px;">保存时段设置</el-button>-->
    </el-dialog>
  </div>
</template>

<script>
  import TimeSet from '../PublicLeader/TimeSet'

  export default {
    name: "BatchOperation",
    inject:['reload'],
    props: ['partsData'],
    data(){
      return{
        checkboxGroup5:[],

        groupid: this.$route.query.groupid,
        CompanyId:'',
        GroupID:'',
        loading:false,
        partLists:[],
        value: '',
        tableData3:[],
        multipleSelection: [],
        transpartId:'',
        transpartName:'',

        //批量设置时段
        isBatchSetTime:false,
        //批量导入
        dialogFormVisible:false,
        fileList: [],
        fileName:''

      }
    },
    components:{
      TimeSet,
    },
    created(){

      console.log(this.checkboxGroup5);
      console.log(this.partsData);
      if(this.partsData.length===0){
        let getpartsList= localStorage.getItem('partsData')
        this.partLists= JSON.parse(getpartsList);
        console.log(JSON.parse(getpartsList));
      }else{
        this.partLists= this.partsData;
        //解决页面刷新子组件获取到的部门信息丢失问题
        localStorage.setItem('partsData',JSON.stringify(this.partsData))
      }


      let CompanyId = localStorage.getItem('CompanyId')
      this.CompanyId = CompanyId;

      // console.log(companyName);
      // axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names='+'')
      //   .then( (response)=> {
      //     console.log(response.data.data);
      //     let userLists = response.data.data;
      //     this.tableData3 = userLists;
      //     this.loading = false
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      //单位列表
      // axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+CompanyId)
      //   .then( (response)=> {
      //     console.log(response.data.data);
      //     this.partLists = response.data.data;
      //
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

    },

    watch:{
      // $route(to,from){
      //   this.groupid = to.query.groupid;
      //   axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names'+'')
      //     .then( (response)=> {
      //       console.log(response.data.data);
      //       let userList = response.data.data;
      //       this.tableData3 = userList;
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }
    },
    methods: {
      //批量导入
      batchAdd(){
        // this.$router.push('AddExcle');
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


      selectVal(checkVals){
          console.log(checkVals);
          let gids = '';
          checkVals.forEach((e)=>{
              console.log(e);
            gids+=e+',';
          });
          this.loading =true;
          console.log(this.$refs.multipleTable);
          axios.get('/api/Handler/User.ashx?type=web_getuserbygroup&gids='+gids)
            .then( (response)=> {
              console.log(response.data.data);
              this.tableData3 = response.data.data;
              //批量选中
              this.$refs.multipleTable.toggleAllSelection();
              this.loading =false;
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },
      formatState(row, column, cellValue){
        // console.log(cellValue);
        if(cellValue==='N'){
          return '正常';
        }else if(cellValue==='A'){
          return '旷工';
        }else if(cellValue==='M'){
          return '离职';
        }
      },


      // 批量设置时段
      batchSetTime(){
        if(this.multipleSelection.length===0){
          this.$notify({
            title: '提示',
            message: '请选择至少一个操作项！',
            type: 'warning'
          });
        }else{
          this.isBatchSetTime = true;

          // //父组件向子组件传值
          // this.$emit('sendUserLists',this.multipleSelection,true);
        }

      },
      confirmSetTime(){
        alert(111)
      },
      batchDel(){
        console.log(this.multipleSelection);
        if( this.multipleSelection.length===0){
          this.$notify({
            title: '提示',
            message: '请选择至少一个操作项！',
            type: 'warning'
          });
        }else{
          this.$confirm('此操作将会删除所选中的员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let dataLength = this.multipleSelection.length;
            let uids = '';
            for(let i = 0;i<dataLength;i++){
              let UserID =  this.multipleSelection[i].UserID;
              uids+=UserID+',';
            }
            // 删除员工
            axios.get('/api/Handler/User.ashx?type=web_UserDelMulty&uids='+uids)
              .then( (response)=> {
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
      },
      transpart(e){
        let changeParts = {};
        changeParts = this.partLists.find((item)=>{//这里的companyLists就是上面遍历的数据源
          return item.GroupName === e;
          //筛选出匹配数据，是对应数据的整个对象
        });
        this.transpartId = changeParts.GroupID;
        this.transpartName = changeParts.GroupName;
        console.log(changeParts);
        if(!this.multipleSelection.length){
          this.$notify({
            title: '提示',
            message: '请选择至少一个操作项！',
            type: 'warning'
          });
        }else{
          let dataLength = this.multipleSelection.length;
          let uids = '';
          for(let i = 0;i<dataLength;i++){
            let UserID =  this.multipleSelection[i].UserID;
            uids+=UserID+',';
          }
          this.$confirm('是否确认要将选中人员转换至'+this.transpartName+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get('/api/Handler/User.ashx?type=web_changeGroupMt&uids='+uids+'&newgid='+this.transpartId)
              .then( (response)=> {
                console.log(response);
                this.$message({
                  type: 'success',
                  message: '转换成功!'
                });
                this.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消转换'
            });
          });
        }
      },
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
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered{
    width: 80% !important;
    margin-left: 0px !important;
    margin-top: 20px;
  }
  .el-checkbox.is-bordered{
    border:none;
  }
</style>
