<template>
    <el-form :model="ruleForm" v-loading="loading"  :rules="rules"  ref="ruleForm" label-width="100px"  style="text-align:left;" class="demo-ruleForm" >
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址：" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="公司电话：" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="公司邮箱：" prop="#">
        <el-input v-model="ruleForm.email" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="签到WIFI：" prop="wifi">
        <el-input v-model="ruleForm.wifi" style="width: 400px" placeholder="填写指定考勤用的WiFi设备名称"></el-input>
        <span style="margin-left: 10px; color: #999999;font-size: 14px;">（如不填写，所有员工都将执行外勤统计）</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="ruleForm.remark" style="width: 400px" placeholder="（用于区分多个WiFi）如：市场部01"></el-input>
        <span style="margin-left: 10px; color: #999999;font-size: 14px;">如果wifi名称（ssid）不填，备注可不填</span>
      </el-form-item>
      <el-form-item label="所属行业" prop="business">
        <el-select v-model="ruleForm.business" placeholder="请选择所属行业" style="width:400px">
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
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
</template>

<script>
  // import TimeSet from '../../components/PublicLeader/TimeSet'
  // import bus from '../../store/bus.js'
    export default {
        name: "NewSetComp",
        inject:['reload'],
        data() {
           return {
             isshowDefuled:true,
             isshow:false,
             isshow1:false,
             loading:true,
             ruleForm: {
                name: '',
                address:'',
                phone:'',
                email:'',
                wifi:'',
               business:'',
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
                  { required: true, message: '公司名称不能为空', trigger: 'blur' },
                ],
                address: [
                  { required: true, message: '公司地址不能为空', trigger: 'blur' },
                ],
                phone: [
                  { required: true, message: '公司电话不能为空'},
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
              options3: [
                {
                label: '高新科技',
                options: [
                  {value: '互联网', label: '互联网'},
                  {value: '电子商务', label: '电子商务'},
                  {value: '电子游戏', label: '电子游戏'},
                  {value: '计算机软件', label: '计算机软件'},
                  {value: '计算机硬件', label: '计算机硬件'},
                ]
                },
                {
                  label: '机关事业单位',
                  options: [
                    {value: '信息传媒', label: '信息传媒'},
                    {value: '出版业', label: '出版业'},
                    {value: '电影录音', label: '电影录音'},
                    {value: '广播电视', label: '广播电视'},
                    {value: '通信', label: '通信'},
                    {value: '金融', label: '金融'},
                    {value: '银行', label: '银行'},
                    {value: '资本投资', label: '资本投资'},
                    {value: '证券投资', label: '证券投资'},
                    {value: '保险', label: '保险'},
                    {value: '财务', label: '财务'},
                  ]
                },
                {
                  label: '服务业',
                  options: [
                    {value: '法律', label: '法律'},
                    {value: '餐饮', label: '餐饮'},
                    {value: '酒店', label: '酒店'},
                    {value: '旅游', label: '旅游'},
                    {value: '广告', label: '广告'},
                    {value: '公关', label: '公关'},
                    {value: '景观', label: '景观'},
                    {value: '咨询分析', label: '咨询分析'},
                    {value: '市场推广', label: '市场推广'},
                    {value: '人力资源', label: '人力资源'},
                    {value: '社工服务', label: '社工服务'},
                    {value: '养老服务', label: '养老服务'},
                  ]
                },
                {
                  label: '教育',
                  options: [
                    {value: '高等教育', label: '高等教育'},
                    {value: '基础教育', label: '基础教育'},
                    {value: '职业教育', label: '职业教育'},
                    {value: '幼儿教育', label: '幼儿教育'},
                    {value: '特殊教育', label: '特殊教育'},
                    {value: '培训', label: '培训'},
                  ]
                },
                {
                  label: '医疗服务',
                  options: [
                    {value: '临床医疗', label: '临床医疗'},
                    {value: '制药', label: '制药'},
                    {value: '保健', label: '保健'},
                    {value: '美容', label: '美容'},
                    {value: '医疗器材', label: '医疗器材'},
                    {value: '生物工程', label: '生物工程'},
                    {value: '疗养服务', label: '疗养服务'},
                    {value: '护理服务', label: '护理服务'},
                  ]
                },
                {
                  label: '艺术娱乐',
                  options: [
                    {value: '创意艺术', label: '创意艺术'},
                    {value: '体育健身', label: '体育健身'},
                    {value: '娱乐休闲', label: '娱乐休闲'},
                    {value: '图书馆', label: '图书馆'},
                    {value: '博物馆', label: '博物馆'},
                    {value: '策展', label: '策展'},
                    {value: '博彩', label: '博彩'},
                  ]
                },
                {
                  label: '制造加工',
                  options: [
                    {value: '食品饮料业', label: '食品饮料业'},
                    {value: '纺织皮革业', label: '纺织皮革业'},
                    {value: '服装业', label: '服装业'},
                    {value: '烟草业', label: '烟草业'},
                    {value: '造纸业', label: '造纸业'},
                    {value: '化工业', label: '化工业'},
                    {value: '印刷业', label: '印刷业'},
                    {value: '汽车', label: '汽车'},
                    {value: '家具', label: '家具'},
                    {value: '电子电器', label: '电子电器'},
                    {value: '机械设备', label: '机械设备'},
                    {value: '塑料工业', label: '塑料工业'},
                    {value: '金属加工', label: '金属加工'},
                  ]
                },
                {
                  label: '地产建筑',
                  options: [
                    {value: '房地产', label: '房地产'},
                    {value: '装饰装潢', label: '装饰装潢'},
                    {value: '物业服务', label: '物业服务'},
                    {value: '特殊建造', label: '特殊建造'},
                    {value: '建筑设备', label: '建筑设备'},
                  ]
                },
                {
                  label: '贸易零售',
                  options: [
                    {value: '零售', label: '零售'},
                    {value: '大宗交易', label: '大宗交易'},
                    {value: '进出口贸易', label: '进出口贸易'},
                  ]
                },
                {
                  label: '公共服务',
                  options: [
                    {value: '政府', label: '政府'},
                    {value: '国防军事', label: '国防军事'},
                    {value: '航天', label: '航天'},
                    {value: '科研', label: '科研'},
                    {value: '给排水', label: '给排水'},
                    {value: '水利能源', label: '水利能源'},
                    {value: '电力电网', label: '电力电网'},
                    {value: '公共管理', label: '公共管理'},
                    {value: '环境保护', label: '环境保护'},
                    {value: '非盈利组织', label: '非盈利组织'},
                  ]
                },
                {
                  label: '开采冶金',
                  options: [
                    {value: '煤炭工业', label: '煤炭工业'},
                    {value: '石油工业', label: '石油工业'},
                    {value: '黑色金属', label: '黑色金属'},
                    {value: '有色金属', label: '有色金属'},
                    {value: '土砂石开采', label: '土砂石开采'},
                    {value: '地热开采', label: '地热开采'},
                  ]
                },
                {
                  label: '交通仓储',
                  options: [
                    {value: '邮政', label: '邮政'},
                    {value: '物流递送', label: '物流递送'},
                    {value: '地面运输', label: '地面运输'},
                    {value: '铁路运输', label: '铁路运输'},
                    {value: '管线运输', label: '管线运输'},
                    {value: '航运业', label: '航运业'},
                    {value: '民用航空业', label: '民用航空业'},
                  ]
                },
                {
                  label: '农林牧渔',
                  options: [
                    {value: '种植业', label: '种植业'},
                    {value: '畜牧养殖业', label: '畜牧养殖业'},
                    {value: '林业', label: '林业'},
                    {value: '渔业', label: '渔业'},
                  ]
                },
               ],
        };
        },
        // components:{
        //   TimeSet,
        // },
      created(){
        this.loading = false;
      },
        methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let companyData = {
                firmname:this.ruleForm.name,
                address:this.ruleForm.address,
                tel:this.ruleForm.phone,
                email: this.ruleForm.email,
                typeSP:0,
                equipaddress:this.ruleForm.remark,  //备注
                equipname:this.ruleForm.wifi,  //设备名称
                memo:this.ruleForm.business,  //行业
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

              };
              console.log(companyData);
              //----------
              axios.get('/api/Handler/Cpy.ashx?type=add',{params:companyData})
                .then( (response)=> {
                  console.log(response);
                  let success = response.data.errcode;
                  let errmsg = response.data.errmsg;
                  if(success===0){
                    this.$notify({
                      title: '成功',
                      message: '添加成功',
                      type: 'success'
                    });
                    this.loading = true;
                    this.reload();

                    // this.$router.push('EditCompony');
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
  .el-input{
    width: 60%;
    .dd>div{
      margin-left: 20px !important;
    }
  }


}
.el-form-item__content{
  margin-left: 1000px;
}
  /*.el-form-item__content{*/
    /*margin-left: 0px !important;*/
  /*}*/
</style>
