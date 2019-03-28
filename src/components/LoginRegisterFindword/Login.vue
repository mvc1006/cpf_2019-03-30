<template>
  <div>
    <div class="header">
        <div class="title">
            <p>欢迎登陆</p>
        </div>
    </div>
    <div id="content" class="content">
        <div class="center">
            <div class="cle">
                <div class="imgTitlt">
                    <p>叮咚科技，掌握美好未来</p>
                    <div class="img">
                        <img src="../../../static/img/bangong.png" alt="">
                    </div>

                </div>
                <div class="loginBox">
                    <div class="role">
                        <div class="first" value="zg" @click.prevent="putongAdmin">账户管理员</div>
                        <div class="second" value="gg" @click.prevent="comAdmin">部门/公司管理员</div>
                    </div>
                 <el-form :model="account" status-icon ref="account"  label-width="100px" class="demo-ruleForm">
                    <div class="box">
                        <el-form-item label="用户名" prop="username">
                            <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入账号" @keyup.enter.native="loginIn()"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="loginIn()"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="yanzhengma" v-if="isshows">
                            <el-input v-model="account.yanzhengma" placeholder="请输入验证码" style="width:200px;" @keyup.enter.native="loginIn()"></el-input>
                            <div class="yanImg" @click="createCode">
                                <img  :src="yanzhengImg" alt="">
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item class="submit">
                        <el-button type="primary" @click="loginIn" style="background:#8b91db;outline:none;">马上登录</el-button>
                        <el-button @click="goback">取消返回</el-button>
                    </el-form-item>
                 </el-form>
                    <p id="forget" class="forget" @click="Findpass">忘记密码？点击此处</p>
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
      return {
        isshows:true,
        role:'zg',
        yanzhengImg:'',
        setcode:'',
        account: {
            username: "",
            pwd: ""
        },
    //     rules: {
    //         username: [
    //         { required: true, message: '请输入活动名称', trigger: 'blur' },
    //         ],
    //         pass: [
    //         { required: true, message: '请选择活动区域', trigger: 'change' }
    //         ],

    //    }

      }
    },
    created(){

          //---首次加载验证需要显示验证码输入框-------
        axios.get('/api/Handler/Manager.ashx?type=errorLogin')
        .then( (response)=> {
            // console.log(response);
            let showdata = response.data;
            if(showdata===0){
                this.isshows = false;
            }else{
                this.isshows = true;
                this.createCode() ;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    mounted(){


    },
    methods: {
      loginIn(){

        if(this.isshows){
             if(!this.account.username || !this.account.pwd || !this.account.yanzhengma){
                return  this.$message({
                      message: '请输入完整信息！',
                      type:'warning',

                    });
            }else{
                console.log(this.account.yanzhengma);
                console.log(this.setcode);
                if(this.account.yanzhengma!==this.setcode){
                      this.createCode();
                      return  this.$message({
                        message: '验证码有误，请重新输入！',
                        type: 'warning',
                     });
                }else{
                    this.sub();
                }
            }
        }else{

            if(!this.account.username || !this.account.pwd){
                  return  this.$message({

                      message: '请输入完整信息！',
                      type:'warning',

                    });

            }else{
                this.sub();
            }

        }


        },
        goback (){
            this.$router.go(-1);
        },
        Findpass (){
            this.$router.push('Findpass');
        },
        putongAdmin (e){
            console.log(e.currentTarget.getAttribute('value'));
            this.role = e.currentTarget.getAttribute('value');
            e.currentTarget.style.background = '#8b91db';
            e.currentTarget.style.fontSize = '16px';

            e.currentTarget.nextElementSibling.style.background = '#d5d7f3';
            e.currentTarget.nextElementSibling.style.fontSize = '14px';

        },
        comAdmin (e){
            console.log(e.currentTarget.getAttribute('value'));
            this.role = e.currentTarget.getAttribute('value');
            e.currentTarget.style.background = '#8b91db';
            e.currentTarget.style.fontSize = '16px';

            e.currentTarget.previousElementSibling.style.background = '#d5d7f3';
            e.currentTarget.previousElementSibling.style.fontSize = '14px';

        },
        // 验证码
        createCode() {
            var code = "";
            var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,0, 1, 2, 3, 4, 5, 6, 7, 8, 9,0, 1, 2, 3, 4, 5, 6, 7, 8, 9,0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//所有候选组成验证码的字符

            var codeLength = 4;//验证码的长度，可变
            for (var i = 0; i < codeLength; i++) {
                var charIndex = Math.floor(Math.random() * 36);
                code += selectChar[charIndex];
            }
            // console.log(code);
            // let setcode = localStorage.setItem('code',code);
            this.setcode = code;
            //----生成图片-------
            this.yanzhengImg = 'http://ddsignweb.wo-ish.com/web/outpg/yzm2.aspx?Ccode='+code

        },
        //提交函数
        sub() {
            // console.log(this.account.username);
            // console.log(this.account.pwd);
            //  console.log(this.role);
            // console.log( hex_md5(this.account.pwd));

            let data = {
                name:this.account.username,
                pass:hex_md5(this.account.pwd),
                xtype:this.role,
                type:'login'
            }

            console.log(data);
            axios.get('/api/Handler/Manager.ashx',{params:data})
            .then( (response)=> {

                let errcode = response.data.errcode;
                let errmsg = response.data.errmsg;

                if(errcode===0){

                  this.$router.push('EditCompony');
                     return  this.$message({
                      message: '登录成功！',
                      type:'success',
                    });

                }else{
                     this.isshows = true;
                     this.createCode();
                     this.$message.error(errmsg);
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
    background-image: url('../../../static/img/login.png');
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
    margin-top: 50px;
    justify-content: space-between;

}
 .imgTitlt {
    width: 450px;
    height: 300px;
    /*background: darkkhaki;*/
    margin-top: 30px;
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

 .loginBox{
    width: 500px;
    /*height: 455px;*/
        height: auto;
    background: #FFFFFF;
    /*border: 1px solid #fff;*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    justify-content: flex-start;
    /*padding: 20px;*/

}
.role{
    width: 100%;
    height: 55px;
    /*background: #8b91db;*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.role>div{
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 55px;
    /*background: darkgreen;*/
    color: #FFFFFF;
}
 .first{
    background: #8b91db;
    font-size: 16px;
}
.second{
    background: #d5d7f3;
   font-size: 14px;
    color: #666666;
}


.role>div:hover{
    cursor: pointer;

}
.forget{
    float: right;
    margin-top:10px;
    margin-right: 30px;
    font-size: 12px;
    color: #666666
}
.forget:hover{
    cursor: pointer;
    color: #DD691D;
}

.demo-ruleForm{
    width: 450px;
    height: 280px;
    // background: darkcyan;
    margin: 0 auto;
    margin-left: 0px;
    margin-top: 60px;

    .box{
        width: auto;
        height: 170px;
        // background: darkcyan;
    }
   .el-form-item{
        margin-left:-20px;
        margin-top: 30px;

        .el-button{
            width: 120px;
            margin-left: 10px;
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

    .yanImg:hover{
        cursor: pointer;
    }
    .yanImg{
        width: 95px;
        height: 38px;
        // background: #8b91db;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        float: right;
        // margin-top: 30px;
        margin-right: 40px;

        img{
            width: 100%;
            height: 100%;
        }
    }

}
// .el-form-item__content{
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// }





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
