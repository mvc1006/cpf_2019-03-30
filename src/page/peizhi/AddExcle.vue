<template>
   <div class="box">
      <div class="dowm">
        <p>点击此处下载模板：</p>
        <el-button type="primary" @click="download">下载模板</el-button>
      </div>
     <div class="upload"  style="text-align:left;">
       <p>点击此处文件上传：</p>
       <el-upload
         class="upload-demo"
         ref="upload"
         :action="uploadUrl()"
         :on-preview="handlePreview"
         :on-remove="handleRemove"
         :before-remove="beforeRemove"
         :on-change = "fileChange"
         :auto-upload="false"
         :show-file-list="true"
         :on-success="uploadSuccess"
         :on-error="uploadError"
         multiple
         :limit="1"
         accept=".xls,.xlsx"
         :file-list="fileList">
         <el-input size="small" placeholder="选择文件" style="margin-left: 20px;margin-bottom: 20px;margin-top: 22px;" v-model="fileName"></el-input>
         <!--<div slot="tip" class="el-upload__tip">只能上传xls文件</div>-->
       </el-upload>
       <el-button type="primary"@click="insert('form')" style="margin-top: 200px;margin-left:160px;">确认上传</el-button>
         <!--<el-button size="small" type="primary" @click="insert('form')"   style="margin-top: 200px;margin-left:160px;">确 定</el-button>-->
     </div>

   </div>
</template>

<script>
    export default {
      name: "AddExcle",

      data() {
        return {
          fileList: [],
          fileName:''
        };
      },
      created(){

      },
      methods: {
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
          return this.$confirm(`确定移除 ${ file.name }？`);
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
        }
      },

    }
</script>

<style lang="less" scoped>
    .box{
      width: 1000px;
      /*height: 300px;*/
      /*background: firebrick;*/
      margin: 0 auto;
      margin-top: 100px;
      .dowm{
        width: 100%;
        /*height: 50px;*/
        /*background: sandybrown;*/
        display: flex;
        align-items: center;
        p{
          font-size: 14px;

        }
        .el-button{
          margin-left: 20px;
        }
      }
      .upload{
        width: 100%;
        /*height: 100px;*/
        /*background: forestgreen;*/
        padding-top: 1px;
        /*display: flex;*/
        p{
          font-size: 14px;
          margin-top: 30px;
          float: left;
        }
        .el-upload{
          display: flex;
        }
      }
    }
</style>

