<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'CompanyStaff' }">员工设置</el-breadcrumb-item>
      <el-breadcrumb-item>新增员工</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm"  :rules="rules"  ref="ruleForm" label-width="100px"  style="text-align:left;" class="demo-ruleForm" >
    <el-form-item label="员工姓名：" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="联系电话：" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="选择部门：" prop="part">
      <el-select v-model="ruleForm.part" placeholder="请选择所属行业"  style="width: 60%" @change="selectPart">
        <el-option
          v-for="item in partLists"
          :key="item.GroupName"
          :label="item.GroupName"
          :value="item.GroupID">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择角色：" prop="role" @change.native="selectRole">
      <el-radio-group v-model="ruleForm.role">
        <el-radio label="0">普通管理员</el-radio>
        <el-radio label="1">部门管理员</el-radio>
        <el-radio label="2">公司管理员</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="密码：" prop="pass" v-if="isPassShow">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width: 400px;"></el-input>
      <span style="margin-left: 10px; color: #999999;font-size: 14px;">角色为部门管理员或公司管理员时须添加密码，普通员工不需要（密码长度6-16位）</span>
    </el-form-item>
    <el-form-item label="在职状态：" @change.native="selectStatus">
      <el-radio-group v-model="ruleForm.status">
        <el-radio label="N">正常</el-radio>
        <el-radio label="A">旷工</el-radio>
        <el-radio label="M">离职</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="工号：" prop="gonghao">
      <el-input v-model="ruleForm.gonghao" ></el-input>
    </el-form-item>
    <el-form-item label="职位：" prop="zhiwei">
      <el-input v-model="ruleForm.zhiwei" style="width: 400px" placeholder="填写指定考勤用的WiFi设备名称"></el-input>
      <span style="margin-left: 10px; color: #999999;font-size: 14px;">（如不填写，所有员工都将执行外勤统计）</span>
    </el-form-item>
    <el-form-item label="备注：" prop="remark">
      <el-input v-model="ruleForm.remark" style="width: 400px" placeholder="（用于区分多个WiFi）如：市场部01"></el-input>
      <span style="margin-left: 10px; color: #999999;font-size: 14px;">如果wifi名称（ssid）不填，备注可不填</span>
    </el-form-item>

    <el-form-item label="" style="margin-left: -78px;">
      <i style="color: #f56c6c">*</i>
      <span style="margin-left: 0px; color: #333333;font-size: 14px;">上下班时段（暂不支持跨天设置）：</span>
    </el-form-item>

    <!--<Time-set></Time-set>-->
    <div style="display: flex;align-items: center;justify-content: flex-start">
      <el-form-item label="" prop="pname1" style="">
        <el-input v-model="ruleForm.pname1" placeholder="早" style="width: 120px;" required></el-input>
      </el-form-item>
      <!--时段一-->
      <el-form-item label="" prop="ontime" v-if="isshowDefuled" class="dd">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan1"
          v-model="ruleForm.ontime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
          }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime" v-if="isshowDefuled">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm.offtime"
          @change="shiduan2"
          :picker-options="{
           start: '00:00',
           step: '00:15',
           end: '24:00',
           minTime: ruleForm.ontime
        }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime1" v-if="isshowDefuled">
        <el-time-select
          v-model="ruleForm.stime1"
          @change="shiduan3"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
            maxTime:ruleForm.ontime,
            minTime:this.ruleForm.step
          }"
          placeholder="有效签到时间" style="width: 180px;margin-left: -90px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" @click="xinshe1()">新设</el-button>
        <el-button type="danger" size="mini"disabled>删除</el-button>
      </el-form-item>
    </div>
    <!--时段二-->
    <div style="display: flex;align-items: center;justify-content: flex-start" v-if="isshow">
      <el-form-item label="" prop="pname2">
        <el-input v-model="ruleForm.pname2" placeholder="中" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ontime2">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan4"
          v-model="ruleForm.ontime2"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            minTime: ruleForm.offtime
          }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime2">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm.offtime2"
          @change="shiduan5"
          :picker-options="{
           start: '00:00',
           step: '00:15',
           end: '24:00',
          minTime: ruleForm.ontime2
        }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime2">
        <el-time-select
          v-model="ruleForm.stime2"
          @change="shiduan6"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
             maxTime:ruleForm.ontime2
          }"
          placeholder="有效签到时间" style="width: 180px;margin-left: -90px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" @click="xinshe2">新设</el-button>
        <el-button type="danger" size="mini" @click="shanchu2">删除</el-button>
      </el-form-item>
    </div>

    <!--时段三-->
    <div style="display: flex;align-items: center;justify-content: flex-start" v-if="isshow1">
      <el-form-item label="" prop="pname3">
        <el-input v-model="ruleForm.pname3" placeholder="晚" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ontime3">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan7"
          v-model="ruleForm.ontime3"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
             minTime: ruleForm.offtime2
          }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime3">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm.offtime3"
          @change="shiduan8"
          :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '24:00',
          minTime: ruleForm.ontime3
        }" style="width: 180px;margin-left: -90px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime3">
        <el-time-select
          v-model="ruleForm.stime3"
          @change="shiduan9"
          :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00',
           maxTime:ruleForm.ontime3
          }"
          placeholder="有效签到时间" style="width: 180px;margin-left: -90px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" disabled>新设</el-button>
        <el-button type="danger" size="mini" @click="shanchu3">删除</el-button>
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  // import TimeSet from '../../components/PublicLeader/TimeSet'
  // import bus from '../../store/bus.js'
  export default {
    name: "AddStaffs",
    data() {
      return {
        isshowDefuled:true,
        isshow:false,
        isshow1:false,
        isPassShow:false,
        companysn:'',
        partLists:'',
        ruleForm: {
          name: '',
          phone:'',
          part:'',
          pass:'',
          status:'N',
          role:'0',
          gonghao:'',
          zhiwei:'',
          remark:'',
          pname1:'早',
          pname2:'',
          pname3:'',
          ontime:'08:30',
          ontime2:'',
          ontime3:'',
          offtime:'17:30',
          offtime2:'',
          offtime3:'',
          stime1:'08:00',
          stime2:'',
          stime3:'',
        },
        rules: {
          name: [
            { required: true, message: '员工姓名不能为空', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            {validator:function(rule,value,callback){
                if(/^1[34578]\d{9}$/.test(value) == false){
                  callback(new Error("请输入正确的手机号"));
                }else{
                  callback();
                }
              }, trigger: 'blur'},
            {min: 11,max: 11,message: '请输入11位手机号码！'}
          ],
          part: [
            { required: true, message: '请选择部门'},
          ],
          role: [
            { required: false, message: '请选择角色'},
          ],
          pass: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {min:6,max:16,message:'密码长度为6-16位', trigger: 'blur'}
          ],
          pname1: [
            { required: true, message: '请输入时段名称', trigger: 'blur' },
          ],
          ontime: [
            { required: true, message: '请输入起始时间', trigger: 'blur' },
          ],
          offtime: [
            { required: true, message: '请输入结束时间', trigger: 'blur' },
          ],
          stime1: [
            { required: true, message: '请输入有效签到时间', trigger: 'blur' },
          ],
          pname2: [
            { required: true, message: '请输入时段名称', trigger: 'blur' },
          ],
          ontime2: [
            { required: true, message: '请输入起始时间', trigger: 'blur' },
          ],
          offtime2: [
            { required: true, message: '请输入结束时间', trigger: 'blur' },
          ],
          stime2: [
            { required: true, message: '请输入有效签到时间', trigger: 'blur' },
          ],
          pname3: [
            { required: true, message: '请输入时段名称', trigger: 'blur' },
          ],
          ontime3: [
            { required: true, message: '请输入起始时间', trigger: 'blur' },
          ],
          offtime3: [
            { required: true, message: '请输入结束时间', trigger: 'blur' },
          ],
          stime3: [
            { required: true, message: '请输入有效签到时间', trigger: 'blur' },
          ],

        },
        partLists:[],
      };
    },
    // components:{
    //   TimeSet,
    // },
    created(){
      let companysn = localStorage.getItem('CompanyId');
      this.companysn = companysn;
      console.log(companysn);

      //部门列表
      axios.get('/api/Handler/Cpy.ashx?type=cpyGroup&cpySn='+companysn)
        .then( (response)=> {
          console.log(response.data.data);
          this.partLists = response.data.data;

        })
        .catch(function (error) {
          console.log(error);
        });

    },
    methods: {
      selectRole(e){
        console.log(e.target.value);
        let passVal = e.target.value;
        if(passVal==='0'){
          this.isPassShow =false;
          this.ruleForm.pass = '';
        }else{
          this.isPassShow =true;
        }
      },
      selectStatus(e){
        let statusVal = e.target.value;
        console.log(statusVal);
      },
      selectPart(e){
        console.log(this.ruleForm.part);
        // this.part = this.ruleForm.part
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let companyData = {
              companysn:this.companysn,
              name:this.ruleForm.name,
              telephone:this.ruleForm.phone,
              department: this.ruleForm.part,
              role:this.ruleForm.role,
              Stype:0,
              managepass:this.ruleForm.pass===''? '': hex_md5(this.ruleForm.pass),
              sn:this.ruleForm.gonghao,
              position:this.ruleForm.zhiwei,  //设备名称
              memo:this.ruleForm.remark,  //备注
              pname1:this.ruleForm.pname1,
              ontime:this.ruleForm.ontime,
              offtime:this.ruleForm.offtime,
              stime1:this.ruleForm.stime1,
              pname2:this.ruleForm.pname2,
              ontime2:this.ruleForm.ontime2,
              offtime2:this.ruleForm.offtime2,
              stime2 :this.ruleForm.stime2,
              pname3:this.ruleForm.pname3,
              ontime3:this.ruleForm.ontime3,
              offtime3:this.ruleForm.offtime3,
              stime3:this.ruleForm.stime3,
              chongzhi:0,
              status:this.ruleForm.status,
              userid:''
            };
            console.log(companyData);
            // 编辑或者创建时的接口验证
            axios.get('/api/Handler/User.ashx?type=adduser',{params:companyData})
            // axios.post('/api/Handler/User.ashx?type=adduser',companyData)
              .then( (response)=> {
                console.log(response.data);
                let success = response.data.errcode;
                let errmsg = response.data.errmsg;
                if(success===0){
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
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

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      shiduan1(e){
        this.ontime = e;
        console.log( this.ontime);
      },
      shiduan2(e){
        console.log(e);
      },
      shiduan3(e){
        console.log(e);
      },
      shiduan4(e){
        console.log(e);
      },
      shiduan5(e){
        console.log(e);
      },
      shiduan6(e){
        console.log(e);
      },
      shiduan7(e){
        console.log(e);
      },
      shiduan8(e){
        console.log(e);
      },
      shiduan9(e){
        console.log(e);
      },
      xinshe1(){
        this.isshow = true;
        this.ruleForm.pname2 = '中'
      },
      xinshe2(){
        this.isshow1 = true;
        this.ruleForm.pname3 = '晚'

      },
      shanchu2(){
        this.isshow = false;
        this.ruleForm.pname2 = '';
      },
      shanchu3(){
        this.isshow1 = false;
        this.ruleForm.pname3 = '';
      }

    }
  }
</script>

<style lang="less" scoped>

  .el-form{
    /*margin: 0 auto;*/
    /*width: 60%;*/
    /*margin-left: 30px;*/
    margin-top: 30px;
    .el-input{
      width: 60%;
      .dd>div{
        /*margin-left: 20px !important;*/
      }
    }


  }
  .el-form-item__content{
    /*margin-left: 1000px;*/
  }
  /*.el-form-item__content{*/
  /*margin-left: 0px !important;*/
  /*}*/
</style>
