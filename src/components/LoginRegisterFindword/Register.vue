<template>
  <div>
    <div class="header">
        <div class="title">
            <p>欢迎注册</p>
        </div>
    </div>
    <div id="content" class="content">
        <div class="center">
            <div class="cle">
                <div class="imgTitlt">
                    <p>叮咚科技，掌握美好未来</p>
                    <div class="img">
                        <img src="../../../static/img/zhuce.png" alt="">
                    </div>
                </div>
                <div class="registerBox">
                 <el-form :model="account" status-icon ref="account" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <div class="box">
                        <el-form-item label="手机号" prop="phone" >
                            <el-input v-model="account.phone"  placeholder="请输入手机号" autofocus="true" minlength=11  maxlength=11 style="width:200px;"></el-input>
                            <el-button type="primary" style="background:#8b91db;margin-left:20px;" @click="getcode">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item label="验证码" prop="yanzhengma">
                            <el-input type="text" v-model="account.yanzhengma" auto-complete="off" placeholder="请输入验证码"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="account.pass" auto-complete="off" placeholder="请输入密码"></el-input>
                        </el-form-item>
                         <el-form-item label="确认密码" prop="repass">
                            <el-input type="password" v-model="account.repass" auto-complete="off" placeholder="请确认密码"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="xieyi" class="xieyi">
                            <el-checkbox  label="" v-model="checked" class="check"></el-checkbox >
                            <p  @click="dialogTableVisible = true">我已阅读，并同意叮咚签到平台服务协议</p>
                            <el-dialog title="用户协议" width="1000px"  :visible.sync="dialogTableVisible">
                                <pre class="xieyitext">
【导言】
欢迎使用叮咚签到服务平台！
为使用叮咚签到平台服务（以下简称“本服务”），你应当阅读并遵守《叮咚签到服务协议》（以下简称“本协议”）。请你务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。
除非你已阅读并接受本协议所有条款，否则你无权使用叮咚签到平台服务。你对本服务的登录、查看、发布信息等行为即视为你已阅读并同意本协议的约束。
一、【协议范围】
1.1 本协议是你与比威网络之间关于你使用叮咚签到平台服务所订立的协议。“比威网络”是指山东紫光比威网络技术有限公司及其相关服务可能存在的运营关联单位。“用户”是指注册、登录、使用叮咚签到帐号的个人或组织，在本协议中更多地称为“你”。“其他用户”是指包括其他叮咚签到帐号用户等除用户本人的用户。
1.2 本服务是比威网络向用户提供的企业考勤管理以及与此相关的互联网技术服务。包括叮咚签到服务平台、手机管理版、手机员工版。 上述内容一经正式发布，即为本协议不可分割的组成部分，你同样应当遵守。
二、【帐号注册与认证】
2.1 你在使用本服务前需要注册一个叮咚签到帐号。叮咚签到帐号通过电子邮箱帐号进行绑定注册，请你使用未与叮咚签到服务平台绑定的电子邮箱帐号注册叮咚签到帐号。比威网络有权根据用户需求和产品需要对帐号注册和绑定的方式进行变更，关于你使用帐号的具体规则，请遵守相关帐号使用协议以及比威网络为此发布的专项规则。
2.2 用户应当如实填写和提交帐号注册与企业信息资料，并对资料的真实性、合法性、准确性和有效性承担责任。如用户提供服务或内容需要取得相关法律法规规定的许可或进行备案的，用户应当在帐号注册时进行明确说明并提交相应的许可或备案证明。否则，比威网络有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给比威网络或第三方造成损害的，你应当依法予以赔偿。
三、【企业信息保护条款】
3.1 本条被视为叮咚签到企业用户的保护条款。本条对企业用户的约定与本协议其他内容存在冲突的，以本条为准
。 3.2 比威网络非常重视对企业信息安全的保护。采用关键信息加密存储、信息通讯全程加密等多种技术手段和分级权限管理、保密消息等业务实现方案以保护信息安全，你应当正确使用前述技术手段和方案，以共同保护企业信息的机密性、完整性和可用性。
3.3 比威网络会采取合理的措施保护企业用户发送或待发送的所有信息，防止未经授权的用户访问、查看、阅读或披露；比威网络不会搜集、复制、传播或以其他方式使用前述信息。
3.4 企业用户应当建立信息安全保护制度，包括但不限于：构建完备的企业管理员体系，合理设定管理员权限；合理选择考勤、公告信息发送的范围及方式；提醒或要求信息接收方保护企业信息安全，不对企业用户发送的保密信息进行传播或分享；防止帐号被他人使用而导致的信息泄露。
四、【用户行为规范】
4.1 本条所述信息内容是指用户使用本服务过程中所制作、复制、发布、传播的任何内容，包括但不限于叮咚签到帐号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用叮咚签到平台服务所产生的内容。
4.2 你理解并同意，叮咚签到服务平台一直致力于为用户提供文明健康、规范有序的网络环境，你不得利用叮咚签到平台服务制作、复制、发布、传播如下干扰叮咚签到平台正常运营，以及侵犯其他用户或第三方合法权益的内容：
（1）违反宪法确定的基本原则的；
（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
（3）损害国家荣誉和利益的；
（4）煽动民族仇恨、民族歧视，破坏民族团结的；
（5）破坏国家宗教政策，宣扬邪教和封建迷信的；
（6）散布谣言，扰乱社会秩序，破坏社会稳定的；
（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
（8）侮辱或者诽谤他人，侵害他人合法权益的；
（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；
（10）以非法民间组织名义活动的；
（11）不符合《即时通信工具公众信息服务发展管理暂行规定》及遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；
（12）含有法律、行政法规禁止的其他内容的。
4.3 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
4.4 涉及他人隐私、个人信息或资料的内容；
4.5 发表、传送、传播骚扰信息、广告信息及垃圾信息或含有任何性或性暗示的内容；
4.6 其他违反法律法规、政策及公序良俗、社会公德或干扰叮咚签到平台正常运营和侵犯其他用户或第三方合法权益内容的信息。
五、【平台使用规范】
5.1 本条所述平台使用是指用户使用本服务所进行的任何行为，包括但不限于注册登录、申请认证、帐号运营推广以及其他使用叮咚签到平台服务所进行的行为。
5.2 你不得利用叮咚签到账号或叮咚签到平台服务进行如下行为：
（1）提交、发布虚假信息，或冒充、利用他人名义的；
（2）虚构事实、隐瞒真相以误导、欺骗他人的；
（3）侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；
（4）未能按照叮咚签到服务平台业务流程注册和使用本服务，违反本服务功能限制或运营策略，或采取任何措施规避前述流程、限制或策略，干扰叮咚签到服务平台正常运营的；
（5）未经比威网络书面许可使用插件、外挂或通过其他第三方工具、运营平台或任何服务接入本服务和相关系统的；
（6）利用叮咚签到帐号或叮咚签到平台服务从事任何违法犯罪活动的；
（7）制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；
（8）其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或比威网络未明示授权的行为。
六、【对自己行为负责】
你理解并同意，叮咚签到平台仅为用户提供企业签到、办公信息传播及获取的平台，你必须为自己注册帐号下的一切行为负责，包括你所发表的任何内容以及由此产生的任何后果。你应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。比威网络无法且不会对因前述风险而导致的任何损失或损害承担责任。
七、【帐号管理】
7.1 叮咚签到帐号的所有权归比威网络公司所有，用户完成申请注册手续后，获得叮咚签到帐号的使用权，该使用权仅属于初始申请注册人。帐号使用权禁止赠与、借用、租用、转让或售卖。
7.2 叮咚签到帐号密码由你自行设定。比威网络特别提醒你应妥善保管你的帐号和密码。比威网络与你共同负有维护帐号安全的责任。比威网络会采取并不断更新技术措施，努力保护你的帐号在服务器端的安全。你需要采取特定措施保护你的帐号安全，包括但不限于妥善保管叮咚签到帐号与密码、安装防病毒木马软件、定期更改密码等措施。当你使用完毕后，应安全退出。你同意在任何情况下不向他人透露帐号或密码信息。因你保管不善可能导致帐号被他人使用（包括但不限于遭受盗号、密码失窃）或信息数据泄漏，责任由你自行承担。你理解并同意，在你未进行举报或提出帐号申诉等方式明确告知叮咚签到帐号被他人使用或信息数据泄漏等情况并提供相关证明材料前，比威网络有理由相信该帐号行为是你使用帐号的行为。
7.3 在你怀疑他人在使用你的帐号或密码时，你同意立即通知比威网络公司。如果你当前使用的叮咚签到帐号并不是你初始申请注册的或者通过比威网络提供的其他途径获得的，但你却知悉该帐号当前的密码，你不得用该帐号登录或进行任何操作，并请你在第一时间通知比威网络或者该帐号的初始申请注册人。如果比威网络发现你并非该帐号初始申请注册人，比威网络有权在未经通知的情况下终止你使用该帐号。
7.4 如你违反相关法律法规、本协议以及专项规则的规定，比威网络有权进行独立判断并随时限制、冻结或终止你对叮咚签到帐号的使用，且根据实际情况决定是否恢复使用。由此给你带来的损失（包括但不限于通信中断，用户资料及相关数据清空等），由你自行承担。
7.5 如果你的叮咚签到帐号被盗、密码遗忘或因其他原因导致无法正常登录，你可以按照比威网络的申诉途径进行申诉。比威网络并不承诺你一定能通过申诉找回帐号。
7.6 为了充分利用帐号资源，如果你存在注册叮咚签到帐号后未及时进行初次登录使用，或长期未登陆使用叮咚签到帐号等情形，比威网络有权终止该帐号的使用。
八、【数据的储存】
8.1 比威网络不对你在本服务中相关数据的删除或储存失败负责。
8.2 比威网络有权根据实际情况自行决定单个用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。你可根据自己的需要自行备份本服务中的相关数据。
8.3 如果你停止使用本服务或服务被终止或取消，比威网络可以从服务器上永久地删除你的数据。在服务停止、终止或取消后，比威没有义务向你返还任何数据。
九、【风险及免责】
9.1 你理解并同意：为了向你提供有效的服务，本服务会利用你终端设备的处理器和带宽等资源。本服务使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。
9.2 用户在使用本服务时，须自行承担如下比威网络不可掌控的风险内容，包括但不限于：
（1）由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等风险；
（2）用户或比威网络的电脑软件、系统、硬件和通信线路出现故障；
（3）用户操作不当或通过非比威网络授权的方式使用本服务；
（4）用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；
（5）由于网络信号不稳定等原因，所引起的比威网络平台登录失败、资料同步不完整、页面打开速度慢等风险；
（6）其他比威网络无法控制或合理预见的情形。
9.3 你理解并同意，用户通过叮咚签到群发的内容可能会被其他用户或第三方复制、转载、修改或做其他用途，脱离你的预期和控制，用户应充分意识到此类风险的存在，任何你不愿被他人获知的信息都不应在叮咚签到平台发布。如果相关行为侵犯了你的合法权益，你可以向叮咚签到平台投诉，我们将依法进行处理。
9.4 比威网络依据本协议约定获得处理违法违规内容或行为的权利，该权利不构成比威网络的义务或承诺，比威网络不能保证及时发现违法违规情形或进行相应处理。
9.5 你理解并同意，因业务发展需要，比威网络保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，用户需承担此风险。
十、【知识产权声明】
10.1 比威网络在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归比威网络所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有。
10.2 叮咚签到平台向所有用户提供更优质的服务，比威网络可能会对叮咚签到帐号的昵称、头像、资料信息、公开群发信息等公开非保密内容在法律允许的范围内进行使用，包括但不限于提供搜索、链接等服务。
10.3 除另有特别声明外，比威网络提供本服务时所依托软件的著作权、专利权及其他知识产权均归比威网络所有。
10.4 上述及其他任何本服务包含的内容的知识产权均受到法律保护，其他未经比威网络、用户或相关权利人许可的第三人，不得以任何形式进行使用或创造相关衍生作品。
十一、【法律责任】
11.1 如果比威网络发现或收到他人举报或投诉用户违反本协议约定的，比威网络有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、删除部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。叮咚签到平台认证帐号除上述处罚措施外，比威网络有权取消其帐号信息，并视情节决定临时或永久封禁相关帐号认证资质。如果你发现任何人违反本协议规定或以其他不当的方式使用叮咚签到平台服务，请立即向叮咚签到平台举报或投诉，我们将依法进行处理。
11.2 你理解并同意，比威网络有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何人士采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应独自承担由此而产生的一切法律责任。
11.3 你理解并同意，因你违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，你应当独立承担责任；比威网络因此遭受损失的，你也应当一并赔偿。
十二、【其它】
12.1 你使用本服务即视为你已阅读并同意受本协议的约束。比威网络有权在必要时修改本协议条款。你可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果你继续使用叮咚签到平台服务，即视为你已接受修改后的协议。如果你不接受修改后的协议，应当停止使用叮咚签到平台服务。
12.2 本协议签订地为中华人民共和国山东省济南市市中区。
12.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
12.4 若你和比威网络之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，你同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。
12.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
12.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
山东紫光比威网络技术有限公司


                                </pre>
                            </el-dialog>
                        </el-form-item>
                    </div>

                    <el-form-item class="submit">
                        <el-button type="primary"  @keyup.enter="register('account')"  @click="register('account')" style="background:#8b91db;outline:none;">马上注册</el-button>
                        <el-button @click="goback">取消返回</el-button>
                    </el-form-item>
                 </el-form>

                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div>
            <p>——© 1998 - 2017 山东比威信息技术有限公司 版权所有 | 鲁ICP备12345678——</p>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入手机号'));
            } else {
              callback();
            }
        };
         var validateYanzhengma = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
          }else if(6>value.length||value.length>12){
            callback(new Error('密码长度为6-12位'));
          } else{
            if (this.account.repass !== '') {
                this.$refs.account.validateField('repass');
            }
            callback();
        }
      };
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.account.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        checked: true,
        dialogTableVisible: false,
        account: {
            phone: "",
            yanzhengma:'',
            pass:'',
            repass: "",
            xieyi:[]
        },

        rules:{
             phone:[
                    { validator: validatePhone, trigger: 'blur' } ,
                    {validator:function(rule,value,callback){
                    if(/^1[34578]\d{9}$/.test(value) == false){
                        callback(new Error("请输入正确的手机号"));
                    }else{
                        callback();
                    }
                    }, trigger: 'blur'},
                    {min: 11,max: 11,message: '请输入11位手机号码！'}

                ],
                yanzhengma:[
                    { validator: validateYanzhengma, trigger: 'blur' },

                ],
                pass:[
                    { validator: validatePass, trigger: 'blur' },

                ],
                repass:[
                    { validator: validatePass2, trigger: 'blur' }
                ],

        }
      }
    },
    created(){
          //---首次加载验证需要显示验证码输入框-------
        // axios.get('/api/Handler/Manager.ashx?type=errorLogin')
        // .then( (response)=> {
        //     // console.log(response);
        //     let showdata = response.data;
        //     if(showdata===0){
        //         this.isshows = false;
        //     }else{
        //         this.isshows = true;
        //         this.createCode() ;
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    },
    mounted(){


    },
    methods: {
      getcode(e){
          //部分表单验证
          this.$refs.account.validateField('phone', (phoneError) => {
                if(!phoneError){
                    //当校验通过时，这里面写逻辑代码
                    console.log(e.currentTarget);
                    let codeButton =  e.currentTarget;
                    axios.get('/api/Handler/Captcha.ashx?type=pageyzm',{params:{
                        phone:this.account.phone
                        }})
                        .then((response)=> {
                            console.log(response.data);
                            let errcode = response.data.errcode;
                            let errmsg = response.data.errmsg;

                            if(errcode===0){
                                return  this.$message({
                                    message: '验证码已发送至手机，请注意查收！',
                                    type:'success',
                                });
                            }else{

                                //当提示错误时 恢复提交按钮
                                // this.$nextTick(function(){
                                //     codeButton.setAttribute('disabled',false);
                                //     codeButton.style.opacity = 1;
                                // })


                                return  this.$message.error(errmsg);
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                }
            })

      },

      register(formName){

         if(!this.account.phone || !this.account.yanzhengma || !this.account.pass || !this.account.repass){
                return  this.$message({
                      message: '请输入完整信息！',
                      type:'warning',
                    });


            }else{
                this.$refs[formName].validate((valid) => {
                if (valid) {
                     console.log(this.checked);
                     if(this.checked){
                        this.sub();
                     }else{
                        return  this.$message({
                            message: '同意协议后方可提交！',
                            type: 'warning',
                        });
                     }

                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                // console.log(this.account.yanzhengma);
                // console.log(this.setcode);
                // if(this.account.yanzhengma!==this.setcode){

                //       return  this.$message({
                //         dangerouslyUseHTMLString: true,
                //         message: '<strong style="color:#909399;">验证码有误，请重新输入！</strong>',

                //         type: '',
                //         center: true
                //      });
                // }else{
                //     this.sub();
                // }
            }


        },
        goback (){
            this.$router.go(-1)
        },


        //提交函数
        sub() {
            // console.log(this.account.username);
            // console.log(this.account.pwd);
            //  console.log(this.role);
            // console.log( hex_md5(this.account.pwd));



            let data = {
                username:'_dftname_',
                email:this.account.phone,
                password:hex_md5(this.account.pass),
                verify:this.account.yanzhengma,

            }

            console.log(data);
            axios.get('/api/Handler/Manager.ashx?type=reg',{params:data})
            .then( (response)=> {
                console.log(response.data);
                let errcode = response.data.errcode;
                let errmsg = response.data.errmsg;

                if(errcode===0){
                      this.$router.go(-1);
                     return  this.$message({
                      message: '注册成功！',
                      type:'success',
                    });
                }else{

                      return  this.$message.error(errmsg);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.header{
    width: 100%;
    height: 60px;
    /*background: #dddddd;*/
    border-bottom: 1px solid #E3E3E3;
}
.title{
    width: 1200px;

    height: 60px;
    /*background: #dddddd;*/
    margin: 0 auto;


}
.title>p{
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
    margin-left: 50px;
}

/* 中心区域 */
 .content{
    width: 100%;
    min-width: 1200px;
    height: auto;
    min-height: 600px;
    /*background: darkgray;*/
    background-image: url('../../../static/img/register.png');
    background-size: cover;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .center{
    width: 1200px;
    /*height: 100%;*/
    min-height: 600px;
    margin: 30px auto;
    /*background: saddlebrown;*/
    display: flex;
    /*align-items: center;*/
    justify-content: center;
}

  .cle{
    width: 1200px;
    height: 450px;

    padding-left: 40px;
    display: flex;
    /*align-items: center;*/
    margin-top: 20px;
    justify-content: space-between;

}
 .imgTitlt {
    width: 450px;
    height: 300px;
    // background: darkkhaki;
    margin-top: 0px;
    /*margin-left: -50px;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.imgTitlt>p{
    font-size: 40px;
    color: #FFFFFF;
    margin-left: 0px;
}
.imgTitlt>.img{
    width: 350px;
    height: 200px;

}
.imgTitlt>.img>img{
    width: 100%;

}

.registerBox{
    width: 500px;
    height: 500px;
    // height: auto;
    background: #ffffff;
    /*border: 1px solid #fff;*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    justify-content: flex-start;


    .demo-ruleForm{
    width: 450px;

    // background: darkcyan;
    margin: 0 auto;
    margin-left: 10px;
    margin-top: 60px;


        .box{
        width: 100%;
        height: 300px;
        // background: darkkhaki;
        margin-top: 50px;

        .el-form-item{
        margin-left:-10px;
        margin-top: 30px;


        }

        .xieyi{
            width: 100%;
            height: 30px;
            // background: darkcyan;

            .check{
                float: left;
                margin-right: 10px;
            }
            p:hover{
                // float: right;
                cursor: pointer;
                color: #787878;
                text-decoration:underline ;
            }
            .xieyitext{
            white-space: pre-wrap;
            word-wrap: break-word;

            line-height: 30px;
            font-size: 14px;
            color: #333333;
            font-family: "微软雅黑";
            }
        }
    }

}
    .submit{
        margin-left: -10px;
        margin-top: 30px;
        .el-button{
            width: 120px;

            margin-top:15px;
        }
        .el-button:first-child{

            margin-left: 20px;
            // float: left;
        }

        .el-button:last-child{

            margin-left: 50px;
        }
    }




    }





/* 底部导航 */
 .footer{
    width: 100%;
    min-width: 1200px;
    height: 60px;

    background: #FFFFFF;
}
.footer>div{

    height: 60px;

    margin: 0 auto;

}
.footer>div>p{
    text-align: center;
    line-height: 60px;
    font-size: 12px;
    color: #666666;
}
</style>
