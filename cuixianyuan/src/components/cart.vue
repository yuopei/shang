<template>
  <div class="cart">
    <el-row>
       <el-col :span="24">
           <div class="tou">
                <p>购物车</p>
                <a href="javascript:;" @click="bian()" class="bj">{{bj}}</a>  
           </div>
       </el-col>
    </el-row>

    
    <el-row class="kong"  v-show="show">
       <el-col :span="24">
           <div>
                <img src="../assets/cart_none.png" alt="" />
                <p>购物车还是空的哦</p>
                <router-link to="/list" class="a">
                    我要采购 
                </router-link>
           </div>
       </el-col>
    </el-row>
     
     <ul>
        <li class="di" v-for="(value,index) in arr">
            <p class="title">{{value.store_name}}</p>
             
            <div class="yi">
           <input type="checkbox" class="xuan" checked @click="danji(value)"/>
           <img :src="value.goods_image" alt="" />
             

              <div class="js">
               <p class="to">{{value.goods_name}}</p>
               <p><span>{{value.goods_number}}</span></p>
                <span class="jia">¥{{value.zong*value.book_buyers | currency('¥', 0)}}</span>
                 

                 <button class="btn" @click="fn(1,arr,index)">-</button>
                <input type="text" v-model="value.book_buyers" class="inp" />
                <button @click="fn(2,arr,index)" class="btn">+</button>
              </div>
            </div>
        </li>
     </ul>
    

    <el-row class="dan">
       <el-col :span="8">
          <input type="checkbox" v-model="fa" class="x" @click="x()"/>
          <span class="quan">全选</span>
       </el-col>
       <el-col :span="7">
          <p>合计:<b>{{heji | currency('¥', 0)}}</b></p>
          <span>(不含运费)</span>
       </el-col>
       <el-col :span="9">
           <button class="que" @click="ti()">
               {{que}}
           </button>
       </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
// console.log($)
export default {
  name: 'cart',
  data () {
    return {
      msg: 'cart',
      fa:false,
      show:false,
      arr:window.bus.arr,
      bj:'编辑',
      que:"确认订单",
      heji:window.bus.rmb
    }
  },
  methods:{
    // 控制按钮状态
     bian () {
       this.que=="确认订单"?this.que="删除":this.que="确认订单"
       this.bj == "编辑"?this.bj = '完成':this.bj = "编辑"
      if(this.bj=="完成"){
         for (var i = 0; i < window.bus.arr.length; i++) {
             window.bus.arr[i].bol = false
           }; 
            this.fang()
            this.fa = false
             var that = this
           $('.xuan').each(function(a,b){
             $(this).prop("checked",that.fa)
           })
      }
     },
     // 计算总价 方法
     fang(){
        window.bus.rmb = 0;
        
        for (let i = 0; i < window.bus.arr.length; i++) {
            if(window.bus.arr[i].bol){
                 window.bus.rmb += window.bus.arr[i].zong*window.bus.arr[i].book_buyers  
            }
        }
      this.heji = window.bus.rmb;
      // console.log(this.heji);
     },
     // 单击 的方法
     danji(value){
        value.bol = !value.bol;
        this.fang()    
     },
     //  下方提交按钮的状态 
     ti(){
      console.log(this.que)
       if(this.que == '删除'){
           for(let i = 0;i<this.arr.length;i++){
              if(this.arr[i].bol){
                 this.arr.splice(i,1)
                 i-- 
                 this.fang()
              } 
           }

           if(!window.bus.arr.length){
                this.show = true
            }
            
       }else{
          var bol = false
        for (let i = 0; i < window.bus.arr.length; i++) {
            if(window.bus.arr[i].bol){
                bol = true  
                this.$router.push({path:'/kuan'})
                return
            }
          }  
       }
     },
     //商品数量的操作
     fn(type,arr,index){
        if(type == 1){
          arr[index].book_buyers =  arr[index].book_buyers - 1

          if(arr[index].book_buyers <= 0){
            alert("最小数量为1")
            arr[index].book_buyers = 1
          }
          this.fang()
        }else{
          arr[index].book_buyers += 1
          this.fang()
        } 

        // console.log(window.bus.arr)    
     },
     //  全选的操作
    x(){
      this.fa = !this.fa
      for (var x = 0; x < window.bus.arr.length; x++) {
       window.bus.arr[x].bol = this.fa
     }
     var that = this
     $('.xuan').each(function(a,b){
        // console.log($(this))
        // console.log(that.fa)
       $(this).prop("checked",that.fa)
     })
     // console.log($('.x'))
     this.fang()
    }
  },
  created:function(){
    // console.log(window.bus.arr.length)
    
    this.fa = true

    //遍历bus arr 数组给数组中添加 判断商品是否被选中的属性
    for (var x = 0; x < window.bus.arr.length; x++) {
       window.bus.arr[x].bol = true
     }; 
    
    this.fang()
    // console.log(window.bus.rmb)
    // this.heji = window.bus.rmb

// console.log(window.bus.rmb)
    if(!window.bus.arr.length){
        this.show = true
    }
  }
}
</script>

<style>
  @import url('../../static/animate.min.css');
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.x{width:20px;height:20px;}
.quan{font-size:18px;}

.ji{
  animation:zoomIn 1s ease;
}

.cart{
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
      img{width:25%;float:left;}
      .js{float:left;
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
  .tou{
    width:100%;height: 50px;
    position:relative;
    p{
     text-align: center;font-size:20px;line-height:50px;
     background:white;
    }
    a{
      position: absolute;
      right:20px;top: 15px;font-size: 15px;
      color:#f18e00;border:none;
    }
  }
 
 .kong{
  height: 150px;text-align: center;margin-top:150px;
  img{width: 56px;}
  p{font-size:14px;text-align: center;margin:10px auto 30px auto;
    color:#999;
  }
  .a{
    color:#f18e00;
    border:1px solid #f18e00;
    padding:10px 20px;font-size: 15px;
    border-radius:5px;
  }
 }

  .dan{
    height: 55px;background:white;position:fixed;
    width:100%;bottom:50px;
    p{font-size:15px;margin-top:10px;}
    button{
      width:100%;height:55px;background:#f18e00;
      color:white;outline: none;border: none;
      font-size:17px;
    }
  }
}

</style>
