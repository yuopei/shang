<template>
 <div class="fukuan">
   
   <div class="d1">
      <router-link to="/cart">
       <span><</span>
      </router-link>
       <span>确认订单</span>
       <span></span>
   </div>  
   
   <div class="border" style="margin-top: 70px;"></div>
   <div class="shou">
        <span>收货门店 : 鲜果园</span>
        <p><span>收货人:王涛</span><span>18835904856</span></p>
        <span>收货地址 : 北京 北京市 昌平区 博雅cc</span>
   </div>
   <div class="border"></div>
   
   <div class="wu">
       <p style="margin-left:20px;">物流方式</p>
       <p style="color:#7f7f7f;width:60%">满足起送金额,我们将在08月04日(周五)为您送达,请保持电话畅通</p>
   </div>

   <div>
       <el-checkbox v-model="checked1" disabled class="put">普通物流</el-checkbox>
   </div>
   

   <ul>
        <li class="di" v-for="(value,index) in newArr">
            <p class="title">{{value.store_name}}</p>
             
            <div class="yi">
           <img :src="value.goods_image" alt="" />
             

              <div class="js">
               <p class="to">{{value.goods_name}}</p>
               <p><span>{{value.goods_number}}</span></p>
                <span class="jia">¥{{value.zong*value.book_buyers | currency('¥', 0)}}</span>
                 

                <span class="jia" style="margin-left:50px">数量是:{{value.book_buyers}}</span>
              </div>
            </div>
        </li>
     </ul>
     <div class="ji">合计:￥<b>{{rmb | currency('¥', 0)}}</b></div>


    <el-row class="dan">
       <el-col :span="10">
          <p>合计:<b>{{rmb | currency('¥', 0)}}</b></p>
       </el-col>
       <el-col :span="14">
          <router-link to="/dingdan">
           <button class="que" @click="ti()">
               提交订单
           </button>
          </router-link>
       </el-col>k>
    </el-row>
 </div>
</template>

<script>
  export default {
  name: 'kuan',
  data () {
    return {
       checked1:true,
       arr:window.bus.arr,
       rmb:window.bus.rmb,
       newArr:[]
    }   
 },
 methods:{
    ti(){
       for (var i = 0; i < window.bus.arr.length; i++) {
            window.bus.arr[i].pay_type = "待付款"
        }; 
    }
 },
created(){
  var newarr = []
  for(var i = 0;i<window.bus.arr.length;i++){
        if(window.bus.arr[i].bol){
           newarr.push(window.bus.arr[i])
        }
  }
  this.newArr = newarr
}
}
</script>

<style lang="scss">
  .fukuan{
    width:100%;height: 100%;position:absolute;top: 0;
    background:white;
    .wu{
        width:100%;height:100px;
    }
    .d1{
        background:white;position:fixed;top:0;
        width:100%;height:40px;
       display:flex;justify-content:space-between;   
       span{font-size:25px;}
       padding:15px;
    }
    .put{
        color:black;
    }
   .shou{
     width:100%;
     box-sizing:border-box;
     padding:15px 0 15px 15px;
     font-size:16px;
     p{
        margin: 10px auto;
     }
   }
   .wu{
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    p{width:40%;}
    font-size:16px;
   }
   .border{
     width:100%;height:2px;background:url(../assets/color_line.png);
   }
   
   .di{
     background:white;margin:10px auto;
     box-sizing: border-box;
     width:100%;height:160px;
     .title{font-size:15px;color:#777;padding: 15px;
      display:block;
     border-bottom:1px solid #e8e8e8;box-sizing: border-box;
     }
     .yi{
      height:160px;
      margin-top: 10px;
      .xuan{margin:20px 10px;float:left;}
      img{width:25%;float:left;margin-left:20px;}
      .js{float:left;
        padding:10px;
        width:200px;margin:5px auto 10px 10px;
          .to{font-size:15px;
              color: #1c1b1a;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
         }
         p{span{color:#7f7f7f;padding-bottom:20px;display:block;}}
         input{width:50px;border:1px solid #f18e00;background:white;padding:5px;}
         .jia{color: #f18e00;font-size:16px;}
         button{border:1px solid #f18e00;background:white;padding:5px;width:25px;}
      }
    }
   }

   .ji{
     height:40px;
     background:white;line-height:40px;
     right:5%;margin-bottom: 100px;
     text-align: center;widows: 4px;font-size: 16px;
     b{color:#f18e00;font-size: 20px;}
   }

     .dan{
    height: 55px;background:white;position:fixed;z-index: 9999;
    width:100%;bottom:0px;
    p{font-size:15px;margin-top:10px;}
    button{
      width:100%;height:55px;background:#f18e00;
      color:white;outline: none;border: none;
      font-size:17px;
     }
    }
  }
    
</style>