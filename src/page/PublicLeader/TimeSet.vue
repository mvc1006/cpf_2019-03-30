<template>
  <el-form :model="ruleForm1"  :rules="rules"  ref="ruleForm1" label-width="48px" style="margin-left: -10px;" class="demo-ruleForm" >
      <!--时段一-->
     <div style="display: flex;align-items: center;justify-content: flex-start" v-if="isshowDefuled">
      <el-form-item label="" prop="pname1" style="">
        <el-input v-model="ruleForm1.pname1" placeholder="早" style="width: 130px;" required></el-input>
      </el-form-item>
      <el-form-item label="" prop="ontime"  class="dd">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan1"
          v-model="ruleForm1.ontime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
          }" style="width: 130px;margin-left:-40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm1.offtime"
          @change="shiduan2"
          :picker-options="{
           start: '00:00',
           step: '00:15',
           end: '24:00',
           minTime: ruleForm1.ontime
        }" style="width: 130px;margin-left:-40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime1">
        <el-time-select
          v-model="ruleForm1.stime1"
          @change="shiduan3"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            maxTime:ruleForm1.ontime
          }"
          placeholder="有效签到时间" style="width: 150px;margin-left:-40px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" @click="xinshe1()">新设</el-button>
        <el-button type="danger" size="mini"disabled>删除</el-button>
      </el-form-item>
    </div>
    <!--时段二-->
    <div style="display: flex;align-items: center;justify-content: flex-start" v-if="isshow">
      <el-form-item label="" prop="pname2">
        <el-input v-model="ruleForm1.pname2" placeholder="中" style="width: 130px;"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ontime2">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan4"
          v-model="ruleForm1.ontime2"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
          }" style="width: 130px;margin-left: -40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime2">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm1.offtime2"
          @change="shiduan5"
          :picker-options="{
           start: '00:00',
           step: '00:15',
           end: '24:00',
          minTime: ruleForm1.ontime2
        }" style="width: 130px;margin-left: -40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime2">
        <el-time-select
          v-model="ruleForm1.stime2"
          @change="shiduan6"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
             maxTime:ruleForm1.ontime2
          }"
          placeholder="有效签到时间" style="width: 150px;margin-left: -40px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" @click="xinshe2">新设</el-button>
        <el-button type="danger" size="mini" @click="shanchu2">删除</el-button>
      </el-form-item>
    </div>
    <!--时段三-->
    <div style="display: flex;align-items: center;justify-content: flex-start" v-if="isshow1">
      <el-form-item label="" prop="pname3">
        <el-input v-model="ruleForm1.pname3" placeholder="晚" style="width: 130px;"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ontime3">
        <el-time-select
          placeholder="起始时间"
          @change="shiduan7"
          v-model="ruleForm1.ontime3"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
          }" style="width: 130px;margin-left: -40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="offtime3">
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm1.offtime3"
          @change="shiduan8"
          :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '24:00',
          minTime: ruleForm1.ontime3
        }" style="width: 130px;margin-left: -40px">
        </el-time-select>
      </el-form-item>
      <el-form-item label="" prop="stime3">
        <el-time-select
          v-model="ruleForm1.stime3"
          @change="shiduan9"
          :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '24:00',
           maxTime:ruleForm1.ontime3
          }"
          placeholder="有效签到时间" style="width: 150px;margin-left: -40px">
        </el-time-select>
        <el-button type="primary" size="mini" style="margin-left: 10px;" disabled>新设</el-button>
        <el-button type="danger" size="mini" @click="shanchu3">删除</el-button>
      </el-form-item>
    </div>

    <el-form-item style="margin-top: 30px;">
      <el-button type="success" @click="submitForm('ruleForm1')">保存时段设置</el-button>
      <el-button  @click="resetForm('ruleForm1')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "TimeSet",
        props:['sendUserLists'],
        data(){
          return {
            isshowDefuled:true,
            isshow:false,
            isshow1:false,
            ruleForm1: {
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
              pname1: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              ontime: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              offtime: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              stime1: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              pname2: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              ontime2: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              offtime2: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              stime2: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              pname3: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              ontime3: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              offtime3: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],
              stime3: [
                { required: true, message: '请输入完整信息', trigger: 'blur' },
              ],

            },
            uidLists:''
          }
        },
      created(){
          //从父组件传来的值  UserID
         console.log(this.sendUserLists);
         let uids = '';
         this.sendUserLists.forEach((item)=>{
           uids+=item.UserID+','
         });
         console.log(uids);
         this.uidLists = uids;
      },
      methods: {
        submitForm() {
          this.$refs.ruleForm1.validate((valid) => {
            if (valid) {
              let companyData = {
                pname1:this.ruleForm1.pname1,
                ontime:this.ruleForm1.ontime,
                offtime:this.ruleForm1.offtime,
                stime1:this.ruleForm1.stime1,
                pname2:this.ruleForm1.pname2,
                ontime2:this.ruleForm1.ontime2,
                offtime2:this.ruleForm1.offtime2,
                stime2 :this.ruleForm1.stime2,
                pname3:this.ruleForm1.pname3,
                ontime3:this.ruleForm1.ontime3,
                offtime3:this.ruleForm1.offtime3,
                stime3:this.ruleForm1.stime3,
                type: 'web_changeTimeMt',
                uids:this.uidLists
              };
              console.log(companyData);
              axios.get('/api/Handler/User.ashx',{params:companyData})
                .then( (response)=> {
                  console.log(response);
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
        resetForm() {
          this.$refs.ruleForm1.resetFields();
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
          this.ruleForm1.pname2 = '中'
        },
        xinshe2(){
          this.isshow1 = true;
          this.ruleForm1.pname3 = '晚'

        },
        shanchu2(){
          this.isshow = false;
          this.ruleForm1.pname2 = '';
        },
        shanchu3(){
          this.isshow1 = false;
          this.ruleForm1.pname3 = '';
        }


      },
    }
</script>

<style scoped>

</style>
