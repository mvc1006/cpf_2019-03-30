<template>
  <div>
    <div class="header">
        <div class="title">
            <p>找回密码</p>
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
            this.$router.go(-2)
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
