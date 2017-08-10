<template>
  <div class="user push">

    <div class="deng">
        <el-row class="deng_top">
            <el-col :span="6">
                <img src="../assets/fan.png" style="width:25px;height:25px;margin-top:9px;" alt=""  @click="hui(0)"/>
            </el-col>
            <el-col :span="12">
                <h2>登陆</h2>
            </el-col>
            <el-col :span="6">
                <span class="ce" @click="jin(1)">注册</span>
            </el-col>
        </el-row>
         
         <div class="tu">
             <img src="../assets/logo_2.png" height="80" width="239" alt="" />
         </div>
         

        <el-row :gutter='20'>
            <el-col :span="18">
                <input type="text" name="username" @blur="yan_tel()" v-model="username" placeholder="您的手机号"/>
                <br />
                <span style="margin-left:30px;font-size:14px;color:red;">{{name_word}}</span>
            </el-col>
        </el-row>
        

        <el-row :gutter='20'>
            <el-col :span="18">
                <input type="password" name="password" v-model="password" placeholder="您的密码"/>
            </el-col>
        </el-row>

        <p>
          <br />
          <span style="margin-left:30px;font-size:14px;color:red;">{{err}}</span>
        </p>
        <p style="text-align:right; width:90%;margin-top:10px">
           <span style="font-size:14px;color:#f18e00">?忘记密码</span>
        </p>
         
        <button @click="deng()">登陆</button>

    </div>

    <div  class="zhu">
          <el-row class="deng_top">
            <el-col :span="6">
                <img src="../assets/fan.png" style="width:25px;height:25px;margin-top:9px;" alt="" @click="hui(1)"/>
            </el-col>
            <el-col :span="12">
                <h2>注册</h2>
            </el-col>
            <el-col :span="6">
                <span class="ce" @click="jin(0)">登录</span>
            </el-col>
        </el-row>
        
        <h1 style="margin:40px 20px;">
          个人信息填写注册
        </h1>

        <el-row :gutter='20'>
            <el-col :span="18">
                <input type="text" name="username" @blur="yan_tel()" v-model="username" placeholder="您的手机号"/>
                <br />
                <span style="margin-left:30px;font-size:14px;color:red;">{{name_word}}</span>
            </el-col>
        </el-row>
        

        <el-row :gutter='20'>
            <el-col :span="18">
                <input type="password" name="password" v-model="password" placeholder="您的密码"/>
            </el-col>
        </el-row>
         
         <el-row :gutter='20'>
            <el-col :span="18">
                <input type="password"  v-model="next_password" @blur="mima_y"  placeholder="再次输入密码"/>
            </el-col>
        </el-row>
        
        <p>
           <span style="margin-left:30px;font-size:14px;">{{mi_yan}}</span>  
        </p>

         <el-row :gutter='20'>
            <el-col :span="18" style="margin-top:10px;font-size:20px">
               <span style="display:inline-block;margin-left:20px;width:100px;border:1px solid #ccc;height:30px;text-align:center;line-height:30px;">{{sui}}</span>
                <a href="javascript:;" @click="ma()" style="background:#f8f8f8">刷新获取验证码</a>
            </el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span="18">
                <input type="text"  v-model="sui_zai" @blur="ym" placeholder="输入验证码"/>
                <span style="margin-left:30px;font-size:14px;">{{jieguo}}</span>
            </el-col>
        </el-row>

        <p>
          <br />
          <span style="margin-left:30px;font-size:14px;color:red;">{{err}}</span>
        </p>
          <button @click="zhuce()">注册</button>
    </div>


    <el-row >
       <el-col :span="24">
          <div class="top">
             <img src="../assets/profile_icon.png" height="80" width="80" alt=""  class="tou" />
             <br />
           
           <div class="dengzhu" v-show="!show">
               <span @click="jin(0)">登录</span> 

               <span @click="jin(1)">注册</span>
           </div> 

           <div class="dengzhu" v-show="show"> 
               <span>{{zh}}</span>
           </div>

             <div class="vip" v-show="show">
                  <img src="../assets/vip0.png" height="20" width="75" alt="" />
             </div>
          </div>
       </el-col>
    </el-row>

    <el-row class="ding">
        <el-col :span="16">
             <img src="../assets/order_all.png" alt="" />
             <span>我的订单</span>
        </el-col>
        <el-col :span="8">
             <p>查看全部订单></p>
        </el-col> 
    </el-row>


    <el-row class="biao">
           <el-col :span="8" class="xiaotu">
                <img src="../assets/user_all.png" height="40" width="40"/>
                <p>今日订单</p>
                <span>您的今日订单</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
                 <img src="../assets/pre_sale.png" height="40" width="40"/>
                <p>预售订单</p>
                <span>您的预售订单</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
                 <img src="../assets/kangkou.png" height="40" width="40"/>
                <p>现场交易</p>
                <span>您的现场订单</span>
           </el-col>
    </el-row>
    
     <el-row class="biao">
           <el-col :span="8" class="xiaotu">
                <img src="../assets/balance.png" height="40" width="40"/>
                <p>账户余额</p>
                <span>￥ 0.00</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
                 <img src="../assets/luckPack.png" height="40" width="40"/>
                <p>我的红包</p>
                <span>1个</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
                 <img src="../assets/integral_d.png" height="40" width="40"/>
                <p>会员积分</p>
                <span>0</span>
           </el-col>
    </el-row>
    
    <el-row class="biao">
           <el-col :span="8" class="xiaotu">
                <img src="../assets/user_collect.png" height="40" width="40"/>
                <p>我的收藏</p>
                <span>收藏的店铺和商品</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
                 <img src="../assets/user_adress.png" height="40" width="40"/>
                <p>收获地址</p>
                <span>编辑收货地址</span>
           </el-col>
           <el-col :span="8" class="xiaotu">
              <a href="javascript:;" @click="tdd">
                 <img src="../assets/user_setting.png" height="40" width="40"/>
                <p>用户操作</p>
                <span>基本操作设置</span>
              </a>
           </el-col>
    </el-row>

    <mt-popup v-model="show_popup"  popup-transition="bottom" style="width:100%;">
      <div class="car">
           <button @click="td">退出登陆</button> 
      </div>         
   </mt-popup>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'user',
  data () {
    return {
      show_popup:false,
      show:true,
      username:null,
      password:null,
      show:false,
      name_word:'',
      pass_word:'',
      err:"",
      bol:false,
      next_password:'',
      sui:null,
      sui_zai:null,
      bol2:false,
      mi_yan:null,
      bol3:false,
      jieguo:'',
      zh:'',
    }
  },
  methods:{
    tdd(){
       this.show_popup = !this.show_popup      
    },
    //  退出登陆
    td(){
        // console.log(1)
        this.show_popup = !this.show_popup 
        this.show = false
        localStorage.self_zh = ''
        localStorage.self_show = this.show
    },
    // 验证码的方法
    ym(){
      if (this.sui_zai == this.sui) {
          this.bol3 = true
      }else{
        this.bol3 = false
        this.jieguo = '验证码不正确'
      }
    },
    //验证两次密码
    mima_y(){
       if(this.next_password == this.password){
          this.bol2 = true
          this.mi_yan = '两次输入密码一致'
       }else{
          this.bol2 = false
          this.mi_yan = '两次输入密码不一致'
       }
    },
    //随机码
    ma(){
      this.sui = Math.floor( Math.random()*(999999-100000+1)+100000)
    },
    // 手机号
    yan_tel(){
       var reg = /^1[34578]\d{9}$/;
       if(this.username==null){
           this.name_word = '输入内容不可为空'  
           this.bol = false 
       }else if(!reg.test(this.username)){
           this.name_word = '请输入正确格式的手机号'   
           this.bol = false
       }else{
           this.bol = true
           this.name_word = ''   
       }
    },
    //登陆
    deng(){      
          var  self = this
            if(this.bol){
                 var username = this.username;
                 var password = this.password;
                   $.getJSON('login',{username,password},function(data){
                    console.log(data) 
                    if(data.msg == '登陆失败'){
                       self.err = '账号或密码错误' 
                    }else{
                       $('.deng').addClass('xiao deng');
                       setTimeout(function(){
                          $('.deng').css('left','100%')
                          $('.zhu').css('left','100%')  
                          $('.deng').removeClass('xiao')
                       },2000)
                       self.show = !self.show
                       self.zh = data.msg.username
                       localStorage.self_show = self.show
                       localStorage.self_zh = self.zh
                       self.username = ''
                       self.password =''
                    } 
                 }) 
            }else{
               self.err = '账号密码不可为空' 
            }
    },
    //注册
    zhuce(){
          var self = this
          if(this.bol&&this.bol2&&this.bol3){
                 var username = this.username
                 var password = this.password
                 $.getJSON('select',{username,password},function(data){
                       if (data.data == "用户已注册") {
                           self.err = "该账号以注册"
                       }else{
                         $('.zhu').addClass('xiao zhu');
                       setTimeout(function(){
                          $('.deng').css('left','100%')
                          $('.zhu').css('left','100%')
                          $('.zhu').removeClass('xiao')
                       },2000)
                        self.show = !self.show
                        self.zh = username
                       localStorage.self_show = self.show
                       localStorage.self_zh = self.zh
                        self.username = ''
                        self.password =''
                        self.next_password = ''
                        self.sui_zai = null
                       }
          })
        }
    },
    //返回
    hui(type){
        if(type){
          $('.zhu').css('left','100%')
        }else{
          $('.deng').css('left','100%')
        }
    },
    // 进入登陆,注册的页面
    jin(type){
      if(type){
        $('.zhu').css('left',0)
        $('.zhu').attr('class','zhu z9')
        $('.deng').attr('class',"deng z8") 
      }else{
        $('.deng').css('left',0)
        $('.zhu').attr('class','zhu z8')
        $('.deng').attr('class',"deng z9") 
      }
    }
  },
  created:function(){
    // console.log(localStorage.self_show)
    // 判断 用户是否登陆
    if (localStorage.self_show=="false") {
      this.show = false
    }else{
      this.show = true
    }
       this.zh = localStorage.self_zh 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import url('../../static/animate.min.css');
</style>

<style lang="scss">
@import './user.scss';
@import './user_zhu.scss';

.car{
  width:100%;height:80px;
  position:fixed;bottom:0;
  display:flex;justify-content: center;
   button{
     width:200px;height: 40px;background:#f18e00;border: none;
     outline:none;color:white;font-size:16px;
   }
}


@keyframes bounceInRight {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0px, 0, 0);
  }

  to {
    transform: none;
  }
}

.push {
  animation: bounceInRight 1.2s ease;
}

.xiao{
  animation:bounceInRight 2s ease;
}

.jingru{
  animation:bounceInRight 1s ease;
}

.l100{
  left:100%;
}

.z9{
  z-index:9999;
}
.z8{
  z-index: 9998;
}

.user{
  .dengzhu{
    width:50%;margin:auto;margin-top:10px;
    display:flex;justify-content:space-around;
    span{font-size:14px;padding:8px;background:rgba(255,255,255,0.3);
      border-radius:6px;
    }
  }
  .top{
    height: 200px;background:url(../assets/header_bg.png);
    text-align: center;
    .tou{border-radius:50%;margin-top:20px;}
    .vip{
        background:white;
        width:75px;height: 20px;
        border-radius:5px;margin:10px auto;
    }
   }

   .ding{
     img{width:7%;float: left;margin:5px 10px auto 20px;}
     span{vertical-align: center;display:inline-block;margin-top:11px;font-size:15px;}
     p{font-size: 15px;margin:11px 11px auto 0px;color:#999;}
     border-bottom:1px solid #F3F3F3;padding:20px 0;
     background:white;
   }

  .biao{
    .xiaotu{
        text-align: center;
        img{margin: 15px 0;}
        p{font-size:14px;margin-bottom: 5px;}
        span{color:#999;}
    }
  }
}


</style>
