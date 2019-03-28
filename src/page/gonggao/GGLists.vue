<template>
  <div class="box">
    <div class="nav">
      <el-button type="primary" size="medium " @click="newGg">新建公告</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData3"
      stripe
      border
      style="width: 90%;min-height:578px;margin: 0 auto">
      <el-table-column
        label="公告标题">
        <template slot-scope="scope">
          {{scope.row.title|substring}}
        </template>
      </el-table-column>
      <el-table-column
        label="公告内容">
        <template slot-scope="scope">
          {{scope.row.ncontent|substring}}
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="sendtime"
        label="发布时间">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div  style="width: 80%;margin: 0 auto;margin-top: 40px;margin-bottom: 60px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next"
        :total= "totals"
        style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GGLists",
    inject:['reload'],
    data(){
      return {
        tableData3:[],
        loading:true,
        totals:null,

      }
    },

    created(){
      //公告列表
      axios.get('/api/Handler/Notice.ashx?type=noticeList&cPage=1&pSize=10')
        .then( (response)=> {
          console.log(response.data);
          this.totals = response.data.totals;
          let ggLists = response.data.data;
          this.tableData3 =ggLists;
          this.loading=false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods:{
      newGg(){
        // this.$router.push({path: 'NewOrEdit', query: {userid: userid}})
        this.$router.push({path: 'NewOrEdit'})
      },
      handleEdit(index, row) {
        console.log(index, row);
        let noticeid = row.noticeid;
        this.$router.push({path: 'NewOrEdit', query: {noticeid: noticeid}})
        // console.log(userid)
      },
      handleDelete(index, row) {
        console.log(index, row);
        let noticeid = row.noticeid;
        console.log(noticeid);
        this.$confirm('是否要删除此条公告？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/api/Handler/Notice.ashx?type=delnotice&noticeid='+noticeid)
            .then( (response)=> {
              console.log(response.data.data);
              this.reload();
              this.loading=false;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

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
      //分页器
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        axios.get('/api/Handler/Notice.ashx?type=noticeList&cPage='+val+'&pSize=10')
          .then( (response)=> {
            console.log(response.data);
            // this.totals = response.data.totals;

            let ggLists = response.data.data;
            this.tableData3 =ggLists;
            this.loading=false;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style lang="less" scoped>
  .box{
    width: 89%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 50px;
    .nav{
      width: 100%;
      height: 50px;
      /*background: red;*/
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 15px;
      .el-button{
        margin-right: 100px;
      }
    }
    /*.el-table{*/
    /*min-height: 659px;*/
    /*}*/
    .el-pagination{
      margin-left: 100px;
    }
  }
</style>
