import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/components/Index'
import Example from '@/components/Example'
import Help from '@/components/Help'
import About from '@/components/About'
import CommentHeaderFooter from '@/components/CommentHeaderFooter'
import Login from '@/components/LoginRegisterFindword/Login'
import Register from '@/components/LoginRegisterFindword/Register'
import Findpass from '@/components/LoginRegisterFindword/Findpass'
const PeizhiAside = r => require.ensure([], () => r(require('@/page/peizhi/PeizhiAside')), 'PeizhiAside');
const AddCompany = r => require.ensure([], () => r(require('@/page/peizhi/AddCompany')), 'AddCompany');
const EditCompony = r => require.ensure([], () => r(require('@/page/peizhi/EditCompony')), 'EditCompony');

const FunctionSwitch = r => require.ensure([], () => r(require('@/page/peizhi/FunctionSwitch')), 'FunctionSwitch');
//表格组件需要如此引入   若按需引入则会闪现
import BatchOperation from '@/page/peizhi/BatchOperation'
// const BatchOperation = r => require.ensure([], () => r(require('@/page/peizhi/BatchOperation')), 'BatchOperation');
//批量添加员工
const AddExcle = r => require.ensure([], () => r(require('@/page/peizhi/AddExcle')), 'AddExcle');
//部门设置
const PartSet = r => require.ensure([], () => r(require('@/page/peizhi/PartSet')), 'PartSet');
//设备
const EuipMents = r => require.ensure([], () => r(require('@/page/peizhi/EuipMents')), 'EuipMents');
const AddEuips = r => require.ensure([], () => r(require('@/page/peizhi/AddEuips')), 'AddEuips');
const EditEuips = r => require.ensure([], () => r(require('@/page/peizhi/EditEuips')), 'EditEuips');
//公司员工
// const CompanyStaff = r => require.ensure([], () => r(require('@/page/peizhi/CompanyStaff')), 'CompanyStaff');
import CompanyStaff from '@/page/peizhi/CompanyStaff'
//新增员工
const AddStaffs = r => require.ensure([], () => r(require('@/page/peizhi/AddStaffs')), 'AddStaffs');
const EditStaffs = r => require.ensure([], () => r(require('@/page/peizhi/EditStaffs')), 'EditStaffs');
//公告
const GongGao = r => require.ensure([], () => r(require('@/page/gonggao/GongGao')), 'GongGao');
const NewOrEdit = r => require.ensure([], () => r(require('@/page/gonggao/NewOrEdit')), 'NewOrEdit');
const GGLists = r => require.ensure([], () => r(require('@/page/gonggao/GGLists')), 'GGLists');
//通讯录
const TongXunLu = r => require.ensure([], () => r(require('@/page/tongxunlu/TongXunLu')), 'TongXunLu');
//考勤
const KaoQin = r => require.ensure([], () => r(require('@/page/kaoqin/KaoQin')), 'KaoQin');
const KaoQinAside = r => require.ensure([], () => r(require('@/page/kaoqin/KaoQinAside')), 'KaoQinAside');
const Rqmxb = r => require.ensure([], () => r(require('@/page/kaoqin/Rqmxb')), 'Rqmxb');
const Yqmxb = r => require.ensure([], () => r(require('@/page/kaoqin/Yqmxb')), 'Yqmxb');
const Yqtjb = r => require.ensure([], () => r(require('@/page/kaoqin/Yqtjb')), 'Yqtjb');
const Ygmxb = r => require.ensure([], () => r(require('@/page/kaoqin/Ygmxb')), 'Ygmxb');





export default new Router({
  routes: [
    {
      path: '/',
      component: CommentHeaderFooter,
      children:[
        {path: '/',component: Index},
        { path: '/example',component: Example},
        { path: '/help',component: Help},
        {path: '/about',component: About},

      ]
    },
    {path: '/Login',component: Login},
    {path: '/Register',component: Register},
    {path: '/Findpass',component: Findpass},


    //Admin
    {
      path: '/peizhi',
      component:PeizhiAside ,
      children:[
        {path: '/',component: AddCompany},
        {path: '/AddCompany',component: AddCompany},
        {path: '/EditCompony',component: EditCompony},
        { path: '/FunctionSwitch',component: FunctionSwitch},
        { path: '/BatchOperation',component: BatchOperation},
        { path: '/AddExcle',component: AddExcle},
        { path: '/EuipMents',component: EuipMents},
        { path: '/AddEuips',component: AddEuips},
        { path: '/EditEuips',component: EditEuips},
        { path: '/CompanyStaff',component: CompanyStaff},
        {path: '/AddStaffs',component: AddStaffs},
        {path: '/EditStaffs',component: EditStaffs},
        {path: '/PartSet',component: PartSet},

      ]
    },
    {
      path:'/gonggao',
      component:GongGao,
      children:[
        {path:'/',component:GGLists},
        {path:'/NewOrEdit',component:NewOrEdit},
      ]
    },
    {
      path: '/tongxunlu',
      component: TongXunLu
    },
    {
      path: '/kaoqin',
      component: KaoQin,
      children:[
        {path:'/',component:KaoQinAside,children:[ {path:'/',component:Rqmxb},]},
        {path:'/KaoQinAside',component:KaoQinAside,children:[ {path:'/',component:Rqmxb},]},
        {path:'/Rqmxb',component:KaoQinAside,children:[ {path:'/',component:Rqmxb},]},
        {path:'/Yqmxb',component:KaoQinAside,children:[ {path:'/',component:Yqmxb},]},
        {path:'/Yqtjb',component:KaoQinAside,children:[ {path:'/',component:Yqtjb},]},
        {path:'/Ygmxb',component:KaoQinAside,children:[ {path:'/',component:Ygmxb},]},
      ]
    }
  ]
})
