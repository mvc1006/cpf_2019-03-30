<template>
     <div class="wrap">
        <div class="banner">
            <div style=" background-image: url(static/img/index/index_new.png);">
                <div class="cen">
                    <p>一款免费的，</p>
                    <p>基于 <span>WIFI+手机</span> 的签到应用</p>
                    <div v-if="this.checksesion ===''?false:true" class="buttonBox">
                        <button  @click="register">立即注册</button>
                        <button  @click="login">登录叮咚</button>
                    </div>
                    <div v-else class="buttonBox">
                      <div  class="admin"  style="font-size: 18px;line-height: 120px;" @click="joinadmin">点击进入管理 >></div>
                    </div>

                </div>
            </div>
        </div>

        <div class="zhuanzhu">
            <div class="cen">
                <p>专注利用手机</p>
                <p>实现快捷可靠的签到管理！</p>
                <p>跟传统打卡机Say Goooooooodbye！</p>
                <div class="box">
                    <div>
                        <img src="static/img/index/qiandao-1.png" alt="">
                        <p>精准显示员工定位</p>
                    </div>
                    <div>
                        <img src="static/img/index/qiandao-2.png" alt="">
                        <p>随走随拍，防止作弊</p>
                    </div>
                    <div>
                        <img src="static/img/index/qiandao-3.png" alt="">
                        <p>不记录轨迹，更放心！</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="shinei">
            <div class="box">
                <div>
                    <p>有WiFi就能签到</p>
                    <p>室内签到更精准</p>
                    <p>WiFi覆盖，精准签到</p>
                </div>
                <div>
                    <img src="static/img/index/wifiqiandoa.png" alt="">
                </div>
            </div>
        </div>

        <div class="shuju">
            <div class="box">
                <p>数据导出好轻松</p>
                <p>电脑报表文件一键下载,手机端文件邮件一键发送</p>
                 <div class="con">
                     <div>
                         <img src="static/img/index/shuju-1.png" alt="">
                         <p>随时随地支持手机管理端</p>
                     </div>
                     <div>
                         <img src="static/img/index/shuju-2.png" alt="">
                         <p>随时随地支持手机管理端</p>
                     </div>
                     <div>
                         <img src="static/img/index/shuju-3.png" alt="">
                         <p>随时随地支持手机管理端</p>
                     </div>
                     <div>
                         <img src="static/img/index/shuju-4.png" alt="">
                         <p>随时随地支持手机管理端</p>
                     </div>
                 </div>
            </div>
        </div>

        <div class="bushu">
            <p>注册部署如此轻松</p>
            <p>电脑端可批量导入员工，也可以让员工自己添加进来</p>
            <p>未登录员工首次登录成功，便会自动录入！不用手动录入也可以！</p>
            <div class="box">
                <div>
                    <img src="static/img/index/bushu-1.png" alt="">
                    <p>电脑进入官网</p>
                </div>
                <div>
                    <img src="static/img/index/bushu-2.png" alt="">
                    <p>注册会员</p>
                </div>
                <div>
                    <img src="static/img/index/bushu-3.png" alt="">
                    <p>配置中新建单位并添加考勤路由</p>
                </div>
                <div>
                    <img src="static/img/index/bushu-4.png" alt="">
                    <p>通知员工</p>
                </div>
                <div>
                    <img src="static/img/index/bushu-5.png" alt="">
                    <p>下载客户端并登录考勤</p>
                </div>
            </div>
        </div>

        <div class="zhanshi">
            <div class="box">
                <div>
                    <p>管理端展示</p>
                    <img src="static/img/index/guanli.png" alt="">
                </div>
                <div>
                    <p>员工端展示</p>
                    <img src="static/img/index/yuangong.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

  data () {
    return {
        checksesion:'',
    }
  },
  created (){
    axios.get('/api/Handler/SessionCheck.ashx')
    .then( (response)=> {
        let Sessiondata = response.data;
        this.checksesion = Sessiondata;
        console.log(this.checksesion);

    })
    .catch(function (error) {
        console.log(error);
    });
  },
  mounted (){

  },
  methods:{
     login(){
        //  this.$message.success('登录成功')
        this.$router.push('Login');
     },
     register(){
         this.$router.push('Register');
     },
    joinadmin(){
      this.$router.push('EditCompony');
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.wrap{
    width: 100%;
    height: auto;
    font-family: "微软雅黑" !important;
}
.banner{
    width: 100%;
    height: 500px;
    // background: firebrick;

}
.banner>div{
    /*width: 100%;*/
    min-width: 1200px;
    height: 500px;
    background-repeat:no-repeat;
    background-position: center 0;
    background-size:1950px 500px;
    /*margin: 0 auto;*/
    padding-top: 1px;

}
.banner>div>.cen{
    width: 1200px;
    height: 350px;
    /*background: #dddddd;*/
    margin: 0 auto;
    margin-top: 85px;
    padding-top: 1px;
}
.banner>div>.cen>p{
    font-size: 40px;
    color: #ffffff;
    margin-top: 20px;
    margin-left:100px;
}
/*.banner>div>.cen>p:first-child{*/
    /*margin-top: 50px;*/
/*}*/
.banner>div>.cen>p>span{
    font-size: 50px;
}
.banner>div>.cen>.buttonBox{
    width: 200px;
    height: 150px;
    /*background: darkcyan;*/
    margin-top: 30px;
    margin-left:150px;

}
.banner>div>.cen>.buttonBox>button{
    width: 165px;
    height: 54px;
    background: #7b94fb;
    color: white;
    text-align: center;
    font-size: 16px;
    line-height: 54px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-top: 10px;
    border: none;
    outline: none;
}
.banner>div>.cen>.buttonBox>button:hover{
    cursor: pointer;
    opacity: .8;
}
.banner>div>.cen>.buttonBox>button:last-child{
    background: transparent;
    border: 1px solid #7b94fb;
}
.admin:hover{
    cursor: pointer;
}
.admin{
    color: #ffffff;
    font-size: 0.22rem;
}

.zhuanzhu{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    background: #e8e8f6;
}
.zhuanzhu>.cen{
    width: 1200px;
    height: 410px;
    // background: #dddddd;
    margin: 0 auto;
    padding-top: 1px;
}
.zhuanzhu>.cen>p{
    font-size: 24px;
    text-align: center;
    margin-top: 15px;
    font-weight: 600;
}
.zhuanzhu>.cen>p:nth-child(1){
    margin-top: 20px;

}
.zhuanzhu>.cen>p:nth-child(3){
    font-size: 20px;
    font-weight: 400;
    color: #606060;

}
.zhuanzhu>.cen>.box{
    width: 1200px;
    height: 240px;
    // background: darkgoldenrod;
    margin-top:10px;

}
.zhuanzhu>.cen>.box>div{
    width: 300px;
    // height:200px;
    margin-top: 20px;
    float: left;
    margin-left: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.zhuanzhu>.cen>.box>div>img{
    width: 250px;
}
.zhuanzhu>.cen>.box>div:nth-child(1)>img{
    width: 230px;
    margin-top: 30px;
    /*height: 200px;*/
}
.zhuanzhu>.cen>.box>div:nth-child(2)>img{
    width: 180px;
    height: 185px;
}
.zhuanzhu>.cen>.box>div:nth-child(3)>img{
    width: 300px;
    margin-top: 30px;
}
.zhuanzhu>.cen>.box>div:nth-child(1)>p{
    margin-top: 55px;
}
.zhuanzhu>.cen>.box>div:nth-child(2)>p{
    margin-top: 35px;
}
.zhuanzhu>.cen>.box>div:nth-child(3)>p{
    margin-top: 35px;
}
.zhuanzhu>.cen>.box>div>p{
    margin-top: 20px;
}




.shinei{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    background-image: url("../../static/img/index/bg-2.png");
    /*background-size: 1950px 380px;*/
    background-position: center 0;
    background-repeat: no-repeat;
}
.shinei>.box{
    width: 1200px;
    // height: 410px;
    // background: darkcyan;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.shinei>.box>div>p{
    font-size: 24px;
    color: #ffffff;
    margin-top: 20px;
    font-weight: 600;
    letter-spacing: 2px;
}
.shinei>.box>div>p:last-child{
    font-size: 18px;
    margin-top:40px;
    color: #c7c7d2;
    font-weight: 400;
}
.shinei>.box>div>img{
    width: 230px;
    margin-top: 80px;
}




.shuju{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    // background: #dddddd;
}
.shuju>.box{
    width: 1100px;
    // height: 410px;
    // background: darkgoldenrod;
    margin: 0 auto;
    padding-top: 1px;

}
.shuju>.box>p{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-top: 30px;
}
.shuju>.box>p:nth-child(2){
    font-size: 20px;
    font-weight: 400;
    color: #c7c7d2;
    margin-top: 25px;
}
.shuju>.box>.con{
    // width: 1200px;
    height: 300px;
    // background: darkcyan;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.shuju>.box>.con>div{
    text-align: center;
    line-height: 30px;
}
.shuju>.box>.con>div>img{
    width: 200px;
}




.bushu{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    background-image: url("../../static/img/index/bg-1.png");
    /*background-size: 1950px 380px;*/
    /*background-size: cover;*/
    background-position: center 0;
    background-repeat: no-repeat;
    padding-top: 1px;
}
.bushu>p{
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
}
.bushu>p:first-child{
    margin-top: 30px;
}
.bushu>p:nth-child(2){
    font-weight: 400;
    letter-spacing: 2px;
    font-size: 20px;
    color: #666666;
}
.bushu>p:nth-child(3){
    font-weight: 400;
    font-size: 16px;
    color: #666666;
}
.bushu>.box{
    width: 1000px;
    height: 230px;
    // background: floralwhite;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.bushu>.box>div{
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.bushu>.box>div>img{
    width: 120px;
}
.bushu>.box>div>p{
    text-align: center;
}



.zhanshi{
    width: 100%;
    min-width: 1200px;
    height: 610px;
    /*background: darkgoldenrod;*/
    padding-top: 1px;
}
.zhanshi>.box{
    width: 950px;
    height: 600px;
    // background: darkcyan;
    margin: 0 auto;
    // margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.zhanshi>.box>div{
    width: 300px;
    /*height: 500px;*/
    /*background: saddlebrown;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.zhanshi>.box>div>p{
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
}
.zhanshi>.box>div>img{
    width: 230px;
}

</style>
