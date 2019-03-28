<template>
    <div>
      <div class="nav">
          <el-button type="primary" size="medium " @click="batchAdd" >批量导入</el-button>
          <el-button type="danger" size="medium" plain  @click="batchDel">批量删除</el-button>
          <el-select v-model="value" placeholder="请选择" style="margin-left: 10px" @change = transpart>
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
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-top: 20px;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="UserName"
          label="姓名">
          <template slot-scope="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column
          prop="UserPhone"
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
</template>

<script>
    export default {
        name: "BatchOperation",
        inject:['reload'],
        data(){
          return{
            groupid: this.$route.query.groupid,
            CompanyId:'',
            GroupID:'',
            loading:true,
            partLists:[],
            value: '',
            tableData3:[],
            multipleSelection: [],
            transpartId:'',
            transpartName:''

          }
        },
        created(){
          let CompanyId = localStorage.getItem('CompanyId')
          this.CompanyId = CompanyId;

          // console.log(companyName);
          axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names='+'')
            .then( (response)=> {
              console.log(response.data.data);
              let userLists = response.data.data;
              this.tableData3 = userLists;
              this.loading = false
            })
            .catch(function (error) {
              console.log(error);
            });

          //单位列表
          axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+CompanyId)
            .then( (response)=> {
              console.log(response.data.data);
              this.partLists = response.data.data;

            })
            .catch(function (error) {
              console.log(error);
            });
        },

      watch:{
        $route(to,from){
          this.groupid = to.query.groupid;
          axios.get('/api/Handler/User.ashx?type=web_UserList&companysn='+this.CompanyId+'&groupid='+this.groupid+'&names'+'')
            .then( (response)=> {
              console.log(response.data.data);
              let userList = response.data.data;
              this.tableData3 = userList;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val);
        },
        formatState(row, column, cellValue){
            console.log(cellValue);
          if(cellValue==='N'){
            return '正常';
          }else if(cellValue==='A'){
            return '旷工';
          }else if(cellValue==='M'){
            return '离职';
          }
        },
        batchAdd(){
          this.$router.push('AddExcle');
        },
        batchDel(){
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
</style>
