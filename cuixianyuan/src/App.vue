<template>
  <div id="app">
    <router-view></router-view>

    <div class="foot">
        <el-row>
          <router-link to="/home" class="zhuang" active-class="zhuang_active">
                <el-col :span="6">
                    <div class="grid-content bg-purple b1 b">
                    </div>
                </el-col>
           </router-link>
            <router-link to="/list" class="zhuang" active-class="zhuang_active">
                <el-col :span="6">
                    <div class="grid-content bg-purple b2 b">
                    </div>
                </el-col>
            </router-link>
            <router-link to="/cart" class="zhuang" active-class="zhuang_active">
                <el-col :span="6">
                    <div class="grid-content bg-purple b3 b">
                    </div>
                </el-col>
            </router-link>
             <router-link to="/user" class="zhuang" active-class="zhuang_active">
                <el-col :span="6">
                    <div class="grid-content bg-purple b4 b">
                    </div>
                </el-col>
            </router-link>
        </el-row>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'


// console.log($('.b'))



export default {
  name: 'app',
  data(){
    return {
      isshow:window.bus.isshow
    }
  },
  mounted:function(){
        // $('.b1').css('background-position','20px -80px')
        // $(".b").each(function() {
        //     $(this).on("click",function(){
        //         $('.b').css('background-position','20px 5px')
        //         $(this).css('background-position','20px -80px')
        //     })
        // })
  },
  // created:function(){
  //   var self = this;
  //   window.bus.$on('jumpDetail',function(a){
  //       self.isshow = a;
  //   })
  // }
}
</script>

<style lang="scss">
*{margin: 0;padding: 0;}
a{text-decoration: none;color:black}
li{list-style:none;}
html,body{
  width: 100%;background:#F7F7F7;
}
#app {
  width:100%;
  .foot{
     width:100%;
     box-shadow:0 0 1px 0 #999;
     position: fixed;
     bottom:0;left: 0;
     background:white;
     z-index: 1000;
     div{
        height:4rem;
        text-align:center;
        line-height: 5rem;
        font-size: 1.1rem;
        background-size:50%;
        background-position:25px 5px;
        background-repeat: no-repeat;
     }
     .b1{
        background-image:url(assets/nav_index.png);
     }
     .b2{
        background-image:url(assets/nav_class.png);
     }
     .b3{
        background-image:url(assets/nav_cart.png);
     }
     .b4{
        background-image:url(assets/nav_my.png);
     }

     .zhuang{
       .b{
        background-position:20px 5px;
       }
     }
     .zhuang_active{
      .b{
       background-position:20px -80px 
      }
     }

  }
}
</style>
