<template>
  <div id="app">
      <div class="header">
        <ul class="nav">
                <img src="static/img/logo.png" alt="">

                <router-link  to="/" tag="li"  id="index" :class=" $route.path==='/'? 'bg':''">
                  首页
                </router-link>
                <router-link  to="/example" tag="li"  id="example"  :class=" $route.path==='/example'? 'bg':''">
                  应用案例
                </router-link>
                <router-link to="/help" tag="li" id="help" :class=" $route.path==='/help'? 'bg':''">
                   使用帮助
                </router-link>
                <router-link  to="/about" tag="li" id="about" :class=" $route.path==='/about'? 'bg':''">
                   关于我们
                </router-link>
            </ul>
      </div>

    <!-- <h1> {{$route.path}}</h1> -->
     <router-view/>
    <div class="footer">

        <div class="fooerCen">
            <p>叮咚签到，智能签到，快乐签到！</p>
            <ul class="contact">
                <li>
                    <span>
                        <img src="static/img/dizhi.png" alt="">
                    </span>
                    <span>山东省济南市市中区阳光新路欧亚大观商都C座</span>
                </li>
                <li>
                    <span>
                        <img src="static/img/dianhua.png" alt="">
                    </span>
                    <span>(0531)86116897</span>
                </li>
                <li>
                    <span>
                        <img src="static/img/youxiang.png" alt="">
                    </span>
                    <span>dingdong@ddqiandao.com</span>
                </li>
                <li>
                    <span>
                        <img src="static/img/qq.png" alt="">
                    </span>
                    <span>860799988</span>
                </li>
                </ul>
            <div class="download">
                <img src="static/img/erweima.png" alt="">
                <p class="dd">下载APP</p>
            </div>
            <p class="beian">© 1998 - 2017 山东比威信息技术有限公司 版权所有 | 鲁ICP备12345678</p>
        </div>

    </div>
  </div>
</template>

<style lang="less" scoped>

.bg{
       background: #7b94fb;
       color: #ffffff;
}

.header{
    width: 100%;
    min-width: 1200px;
    height: 70px;
    // background: #dddddd;
     display: flex;
    align-items: center;
    justify-content: center;
    .nav{
        width: 1200px;
        height: 70px;
        // background: cyan;
        margin: 0 auto;
        display: flex;
        align-items:center;
        justify-content: space-around;
        li:hover{
            cursor: pointer;
            //  background: #faf5f5;
            //    color: #ffffff;
        }
        li{
            width: 150px;
            height: 100%;
            font-size: 16px;
            // background: #7b94fb;
            text-decoration: none;
            text-align: center;
            line-height: 70px;
        }
    }
}

.footer{
    width: 100%;
    min-width: 1200px;
    height: 360px;
    background: #313131;
    display: flex;
    align-items: center;
    justify-content: center;
    .fooerCen{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        padding-top: 1px;
        p{
            text-align: center;
            color: #ffffff;
            font-size: 14px;
            margin-top: 15px
        }
        .contact{
            margin-top: 80px;
            float: left;
            li{
                display: flex;
                align-items: center;
                margin-top: 10px;
                span{
                    font-size: 14px;
                    color: #ffffff;
                    margin-left: 10px
                }
            }
        }
        .download{
            float: right;
            margin-top: 80px
        }
        .beian{
            margin-top: 300px;
            // float: right;
        }
    }
}

</style>

