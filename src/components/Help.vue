<template>
<div class="wrap">
        <div class="first">
            <div class="box">
                <div>
                    <p>01</p>
                    <p>电脑进入官网</p>
                    <p>请使用高版本浏览器,</p>
                    <p>谷歌、火狐、或360极速模式</p>
                </div>
                <img src="static/img/shiyongbangzhu/step1.png" alt="">
            </div>
        </div>

        <div class="second">
            <div class="box">
                <img src="static/img/shiyongbangzhu/step2.png" alt="">
                <div>
                    <p>02</p>
                    <p>完成注册并登陆</p>
                    <p>成为叮咚用户就是一键的事儿,</p>
                </div>
            </div>
        </div>

        <div class="first">
            <div class="box">
                <div>
                    <p>03</p>
                    <p>在设置页面新建单位</p>
                    <p>填写单位信息,</p>
                </div>
                <img src="static/img/shiyongbangzhu/step3.png" alt="">
            </div>
        </div>

        <div class="second">
            <div class="box">
                <img src="static/img/shiyongbangzhu/step4.png" alt="">
                <div>
                    <p>04</p>
                    <p>在配置页面中添加或删除部门</p>
                    <p>并可在该部门下添加员工</p>
                    <p>也可以查看编辑该员工</p>
                </div>
            </div>
        </div>

        <div class="first">
            <div class="box">
                <div>
                    <p>05</p>
                    <p>批量操作更省心</p>
                    <p>请使用高版本浏览器,</p>
                    <p>一键批量导入、转换、删除</p>
                </div>
                <img src="static/img/shiyongbangzhu/step5.png" alt="">
            </div>
        </div>

        <div class="second">
            <div class="box">
                <img src="static/img/shiyongbangzhu/step6.png" alt="">
                <div>
                    <p>06</p>
                    <p>在设置设备中添加路由器</p>
                    <p>编辑路由器信息及操作该设备下人员</p>
                </div>
            </div>
        </div>

        <div class="first">
            <div class="box">
                <div>
                    <p>07</p>
                    <p>按步骤完成各项配置</p>
                    <p>将单位号通知员工、并下载APP</p>
                    <p>快乐签到开始啦~~</p>
                </div>
                <img src="static/img/shiyongbangzhu/step7.png" alt="">
            </div>
        </div>



    </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
     
    }
  },
  created(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.first,.second{
    width: 100%;
    min-width: 1200px;
    height: 380px;
    background: #d2d2ee;
}
.first>.box{
    width: 1200px;
    height: 380px;
    /*background: darkkhaki;*/
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.first>.box>div>p,.second>.box>div>p{
    font-size: 16px;
    margin-top: 20px;
}
.first>.box>div>p:first-child,.second>.box>div>p:first-child{
    font-size: 50px;
}

.second{
    background: #ffffff;
}
.second>.box{
    width: 1200px;
    height: 380px;
    /*background: darkgray;*/
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
}




</style>
