<template>
  <div class="wrap">
      
        <div class="banner">
            <div style=" background-image: url(static/img/yingyonganli/yingyonganli/banner1.png);">
                <div class="cen">
                    <p>固定办公区域</p>
                    <p>有WiFi就能签到</p>
                    <p>室内签到更精准</p>
                </div>
            </div>
        </div>


        <div class="guding">
            <p>固定办公区签到</p>
            <p>在本公司固定办公区域内</p>
            <p>借助单位路由器WiFi信号实现单位员工签到管理</p>
            <div class="box">
                <img src="static/img/yingyonganli/yingyonganli/anli-1.png" alt="">
                <img src="static/img/yingyonganli/yingyonganli/anli-2.png" alt="">
                <img src="static/img/yingyonganli/yingyonganli/anli-3.png" alt="">
            </div>
            <p>部署过程无需添加任何新硬件设备，使用现有路由器即可进行完美部署</p>
        </div>


        <div class="yidi">
            <div class="box">
                <img src="static/img/yingyonganli/yingyonganli/anli-4.png" alt="">
                <div>
                    <p>异地办事处、分公司</p>
                    <p>连锁店考勤管理</p>
                    <p class="tip1">拥有异地办事处、分公司或者连锁店的单位</p>
                    <p class="tip1">通过叮咚签到云服务平台</p>
                    <p class="tip1">实现考勤信息的统一化管理</p>
                    <p class="tip1">在同一账号下可以建立多个单位</p>
                </div>
            </div>
        </div>

        <div class="biaozhun"  style=" background-image: url(static/img/yingyonganli/yingyonganli/bg2.png);">
            <div class="box">
                <div>
                    <p>标准外勤签到</p>
                    <p>应用叮咚签到对本单位需要执行外勤工作的员工</p>
                    <p>进行必要的考勤管理</p>
                </div>
                <img src="static/img/yingyonganli/yingyonganli/anli-5.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'example',
  data () {
    return {
     
    }
  },
  created(){
    console.log(222);
      //  this.$http.get('/api/Handler/SessionCheck.ashx')
      //   .then((response)=>{
      //       console.log(response);
      //   }).catch((response)=>{
      //       console.log(response);
      //   })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
    width: 100%;
    height: auto;
    font-family: "微软雅黑" !important;
}





.banner{
    width: 100%;
    height: 500px;
    /* background: firebrick; */

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
    width: 960px;
    height: 350px;
    /*background: #dddddd;*/
    margin: 0 auto;
    margin-top: 85px;
    padding-top: 1px;
}
.banner>div>.cen>p{
    font-size: 30px;
    color: #ffffff;
    margin-top: 20px;
    margin-left:100px;
}
.banner>div>.cen>p:nth-child(2){
    font-size: 24px;
    margin-top:50px;
    margin-left: 150px;

}
.banner>div>.cen>p:last-child{
    font-size: 24px;
    margin-left: 150px;
}



.guding{
    width: 100%;
    min-width: 1200px;
    height: 420px;
    background: #e8e8f6;
    padding-top: 1px;
}
.guding>p{
    text-align: center;
    margin-top: 15px;
    font-size: 28px;
    font-weight: 600;
}
.guding>p:nth-child(2){
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    color: #525250;
}
.guding>p:nth-child(3){
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    color: #525250;
}
.guding>.box{
    width: 1200px;
    height: 250px;
    /*background: darkgoldenrod;*/
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.guding>p:nth-child(5){
    font-size: 16px;
    font-weight: 400;
    margin-top: 15px;
    color: #525250;
}
.guding>.box>img{
   width: 230px;
    /*height: 230px;*/
}


.yidi{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    background: #899bb9;
}
.yidi>.box{
    width: 1000px;
    height: 410px;
    /*background: darkcyan;*/
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.yidi>.box>img{
    width: 400px;
}
.yidi>.box>div>p{
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin-top: 10px;
}
.yidi>.box>div>.tip1:nth-child(3){
    margin-top: 20px;
}
.yidi>.box>div>.tip1{
    font-size: 14px;
    font-weight: 400;
    color: #e6e6e6;
}



.biaozhun{
    width: 100%;
    min-width: 1200px;
    height: 410px;
    /*background: #dddddd;*/
    background-repeat:no-repeat;
    background-position: center 0;
    background-size:1950px 410px;
}
.biaozhun>.box{
    width: 960px;
    height: 410px;
    /*background: firebrick;*/
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;

}
.biaozhun>.box>img{
    width: 250px;
}
.biaozhun>.box>div>p{
    font-size: 24px;
    font-weight: 600;
}
.biaozhun>.box>div>p:nth-child(2){
    font-size: 16px;
    font-weight: 400;
    color: #525050;
    margin-top: 40px;
}
.biaozhun>.box>div>p:nth-child(3){
    font-size: 16px;
    font-weight: 400;
    color: #525050;
    margin-top: 15px;
}
</style>
