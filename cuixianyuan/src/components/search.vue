<template>
  
  <div class="search">

        <input type="text"  v-model="inp" class="input" placeholder="输入内容"/>

   

   <div v-for="value in  filterBy(ds, inp)" class="li">    
        <el-row class="dd">
              <el-col :span="10">
                  <router-link to="/details">
                        <div class="grid-content bg-purple" @click="tiao(value.goods_id)">
                           <img class="top" v-bind:src="value.goods_flag_image"/>
                           <img class="datu" v-bind:src="value.goods_image"/>
                        </div>
                  </router-link>
              </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-light">
                      <p class="chu p1">{{value.goods_name}}</p>
                      <p class="chu p2">{{value.goods_jingle}}</p>
                      <p class="gui">规格:{{value.goods_number}}</p>
                      <p class="jia">¥3/斤</p>
                      <p class="gui">约¥{{value.goods_price}}</p>

                      <div class="cart">
                        <img src="../assets/cart.png"/>
                     </div>
                </div>
            </el-col>
     </el-row>
   


   </div>

  </div>
   

</template>


<script>
import $ from 'jquery'
  export default {
  name: 'search',
  data () {
    return {
      inp:'',
      ds:null
    }
},
    created(){
        var self = this

       $.getJSON('../../static/data/search/dianshang.json',function(data) {
        // console.log(data.data.list)
            self.ds = data.data.list
      })
    
     
    },
    methods:{
          tiao(id){
             window.bus.id = id
             localStorage.type = 3
             localStorage.id = window.bus.id
          }
    }
} 



</script>

<style lang="scss">
    .search{
        margin:60px 0;
          .search_li{
         width:95%;margin:auto;z-index: 1000;
         position:fixed;top:15px;left:2.5%;
         input{
            background:white;
         }
       }

.input{
    width:90%;margin:auto;display:block;height: 40px;border:none;margin-top: 5px;
    position:fixed;top: 0;left: 15px;background:white;z-index: 888;
}

.li{
    .dd{
      height:140px;position:relative;
      .bg-purple{
        margin-top: 10px;
        padding: 5%;
        position:relative;
        text-align: center;
        .datu{
          width: 70%;
          height: auto;
          vertical-align: middle;
        }
        .top{
            position: absolute;
            left:32px;
            top: 15px;
            width:15%;
            z-index: 10;
        }
      }
      .bg-purple-light{
        position:relative;
        margin-top: 15px;
        p{width:100%;margin:2px 0;};
        .p1{font-size:16px;margin-top:10px;}
        .p2{color: #f18e00;font-size:13px;}
        .gui{color: #7f7f7f;}
        .jia{color: #f18e00;font-size:16px;margin-top:10px;}
         .cart{
          position:absolute;right:5px;bottom:0px;
          img{width:50%;}
         } 
      }
    }
  }
    }
</style>