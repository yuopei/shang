<template>
<div class="details">

    <mt-popup v-model="top_popup_visible" position="top" class="top_tan">
          <el-row>
          <router-link to="/home" >
                <el-col :span="6">
                   <img src="../assets/homepage_2.png" height="32" width="32" alt="" />
                </el-col>
           </router-link>
            <router-link to="/list">
                <el-col :span="6">
                    <img src="../assets/createtask.png" height="32" width="32" alt="" />
                </el-col>
            </router-link>
            <router-link to="/cart">
                <el-col :span="6">
                    <img src="../assets/publish goods_fill.png" height="32" width="32" alt="" />
                </el-col>
            </router-link>
             <router-link to="/user">
                <el-col :span="6">
                    <img src="../assets/people.png" height="32" width="32" alt="" />
                </el-col>
            </router-link>
        </el-row>

    </mt-popup>

    <div class="fan">
      <router-link :to="{name:tiao}">
          <div  class="bg" style="margin:10px 30px" @click="fan()">
              <img src="../assets/fan.png" height="22" width="22" alt="" />
          </div>
     </router-link>

      <div  class="bg" style="margin:10px 30px" @click="tanchu()">
          <img src="../assets/createtask (1).png" height="25" width="25" alt="" />
      </div>

    </div>
    <div class="lun">
         <mt-swipe :auto="4000">
              <mt-swipe-item v-for="value in lun">
                 <img :src="value.goods_image" />
              </mt-swipe-item>
        </mt-swipe>
    </div>
    
    <div class="xin">
        <h4>{{title.goods_name}}</h4>
        <p>{{title.goods_jingle}}</p>
        <p class="jin">¥{{title.goods_type_price | lvprice }}/斤</p>
        <span>约¥{{title.zong}}元</span>
    </div>

    <div class="xi">
        <p>送至      &nbsp;&nbsp; 北京<b> &nbsp;{{huo}}</b></p>
        <p>规格      &nbsp;&nbsp; {{title.goods_number}}</p>
        <p>果径      &nbsp;&nbsp; {{title.goods_sizing}}mm</p>
        <p>产地      &nbsp;&nbsp; {{title.goods_producingname}}</p>
    </div>
    
    
    <div v-html="html" style="margin-bottom:55px"></div>
    
    <div class="dd" @click="dian()">
       立即购买
    </div>

      <mt-popup class="tanchu" v-model="popupVisible"  position="bottom">
              <div class="div">
                  <img :src="title.goods_image"/>
                  <p class="ti">{{title.goods_name}}</p>
                  <p class="t2">{{title.goods_weight}}斤</p>
                  <p class="t3">{{title.zong}}元/件</p>
              </div>

              <div class="shu" style="margin-top:20px">
              <span style="font-size:15px;margin-left:20px">
                 数量
              </span>
                
                  <el-input-number v-model="title.book_buyers" :min="0" @change="bshu(title)" style="margin-left:130px">
                  </el-input-number>
              </div>
               
              <router-link to="/cart">
                    <button class="pay">支付</button>   
              </router-link>
                
      </mt-popup>

</div>   
</template>

<script >
import $ from "jquery"

export  default {
 name:'details',
 props:['data_id'],
 data(){
    return {
       top_popup_visible:false,
       msg :null,
       lun:null,
       huo:null,
       title:{
        goods_name:null,
        goods_jingle:null,
        goods_type_price:null,
        goods_grossweight:null,
        goods_zong:null,
        cart:1,
        book_buyers:0
       },
       price:null,
       html:null,
       popupVisible:false,
       num:1
    }
 },
  methods:{
    tanchu(){
      this.top_popup_visible = !this.top_popup_visible  
    },
    fan(){

      if(localStorage.type == 1){
          this.tiao = "Hello"
      }else if(localStorage.type == 2){
          this.tiao = "list"
      }else{
         this.tiao = "search"
      }
       window.bus.isshow = true
    },
        //  单个点击
    dian(){
      this.popupVisible = !this.popupVisible
    },
    bshu(obj){
      console.log(window.bus.arr)
      console.log(obj)
      var index = -1
      for(var x =0;x<window.bus.arr.length ;x++){
         if(obj.goods_id == window.bus.arr[x].goods_id){
              index = x
         }
      }


      if(index!=-1){
         window.bus.arr[index].book_buyers+=1
      }else{
        window.bus.arr.push(obj)
      }
   },
   shuju(){
    var id = window.bus.id || localStorage.id
    // console.log(id)
    var url = ""
    var url2 = ""
    if(id == "8884"){
      url = "../../static/data/tao/taoxiangqing.json"
      url2 = "../../static/data/tao/taotu.json"
    }else if(id == "9023"){
      url = "../../static/data/tao/taoxiangqing2.json"
      url2 = "../../static/data/tao/taotu2.json" 
    }else if(id == "9024"){
      url = "../../static/data/tao/taoxiangqing3.json"
      url2 = "../../static/data/tao/taotu3.json" 
    }else if(id == "9087"){
      url="../../static/data/index/feng.json"
      url2 = "../../static/data/index/fengtu.json"
    }else if(id == "9114"){
      url = "../../static/data/index/xiguan.json"
      url2 = "../../static/data/index/xiguantu.json"
    }else if(id == "9116"){
      url = "../../static/data/index/hongti.json"
      url2 = "../../static/data/index/hongtitu.json"
    }else if(id == "2786"){
      url = "../../static/data/index/huolongguo.json"
      url2 = "../../static/data/index/huolongguotu.json"
    }else{
      url = "../../static/data/tao/tapxiangqing4.json"
      url2 = "../../static/data/tao/taotu4.json"   
    }
   $.getJSON(url, (data) => {
         // console.log(data.data)
   });
   $.getJSON(url, (data) => {
         this.msg = data.data
         this.lun = data.data.goods_image
         this.title = data.data.goods_info
         this.huo = data.data.goods_hair_info.if_store_sn
          var arr = this.title.goods_type_price
          var newArr = arr.split(",")
          // console.log(newArr[1])
          // console.log(this.title.goods_unit_num)
         this.title.zong = newArr[1]/1 * (this.title.goods_unit_num*1)
         // console.log(this.title.zong)
        
           ///判断此商品是否在购物车中 若在则 操作数据为购物车中该商品的数据
         // console.log(window.bus.arr)
         // console.log(this.title)
         var index = -1
         
            for(var x =0;x<window.bus.arr.length ;x++){
             if(this.title.goods_id == window.bus.arr[x].goods_id){
                  index = x
             }
           }
            if(index!=-1){
              this.title = window.bus.arr[index]
            }
   });
    $.getJSON(url2, (data) => {
         // console.log(data)
         this.html = data.data
   });
     
   
    
   }
  }
 ,
filters:{
     lvprice (value){
       try{
         var arr = value
         var newArr = arr.split(",")
         return newArr[1]  
       }catch(err){
       }  
     }
}
}
console.log(this.default.methods.shuju())
</script>

<style lang="scss">
 .details{
    height:100%;  z-index: 9999;
     
    .top_tan{
      width:100%;height:50px;text-align: center;
      padding-top:8px;box-sizing: border-box;
    }

    .tanchu{
      width:100%;height:280px;background:white;
     .div{
      width:100%;height: 40%;border-bottom: 1px solid #EDEDED;padding:5%;
       img{
         float: left;width:30%;margin-right: 10px;
       }
       .ti{
          font-size:16px;
       }
       .t2{
        margin: 5px 0 50px auto;
       }
       .t3{
        font-size:17px;color:#f18e00;
       }
     }
     .pay{
        border: none;
        background-color: #f18e00;
        color: #fff;
        width:100%;
        bottom: 0;
        left: 0;
        position: absolute;
        height:50px;
    }
  }
    .xin{
        text-align: center;
        padding:30px 0;
        background:white;
        h4{
            text-align: center;font-size: 18px;
            margin-bottom: 15px;
        }
        p{
          width:80%;
          text-align: center;
          font-size: 16px;
          margin-top: 4px;
          color:#999;
          margin:auto;
        }
        .jin{
            color:#f18e00;font-size:22px;
            margin:16px auto;
        }
    }

    .xi{
        border-top:1px solid #ccc;
        background:white;
        padding:15px 0;
       p{padding-left:5%;font-size:16px;
        color:#999;margin:10px 0;
        b{color:#f18e00;}
      } 
    }
    .fan{
        width:100%;
        height:60px;position:fixed;top: 0;
        z-index: 22;
        display:flex;justify-content:space-between;
       .bg-purple{
            height: 100%;
        }
        .bg{
            width:35px;height: 35px;
            text-align: center;
            border-radius:50%;
            background:white;
            img{margin-top:7px;}
        }
    }
   .lun{
      width:100%;height:375px;
      img{width:100%;}
   }

   .dd{
      background:#f18e00;width:100%;
      right:0;
      height:60px;text-align: center;
      line-height:60px;font-size:18px;color:white;
      font-weight: 600;
      position:fixed;bottom:0;
   }
}


</style> 