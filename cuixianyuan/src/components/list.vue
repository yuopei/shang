<template>
  <div class="list">
   

<mt-search
  v-model="value"
  cancel-text="取消"
  placeholder="搜索" style="height:auto">
</mt-search>


<div class="gund">
       <mt-navbar v-model="selected" style="width:300%">
          <mt-tab-item class="d1"  v-for="value in msg" >
              <div @click="fn(value.gc_name)" class="dd" :class="{ff:activeName == value.gc_name}">
                {{value.gc_name}}
              </div>
          </mt-tab-item>
       </mt-navbar>
</div>




<div class="li">
     <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
  <li v-for="value in  filterBy(arr,value)">
        <el-row>
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
   
      </li>
</ul>
</div>

<div class="huiding" @click="ding">
    回到顶部
</div>


  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'list',
  data () {
    return {
      msg: null,
      selected:null,
      value:'',
      arr:null,
      arr2:null,
      activeName:"核果类",
      popupVisible:"点"
    }
},
methods:{
  // 返回顶部
  ding(){
     $('html,body').animate({scrollTop:0},'slow'); 
  },
  // 判断id 调取不同数据
  fn:function(type){
    this.activeName = type
    var url = ""
    if (type == "核果类") {
       url = "../../static/data/tao1.json"
    }else if(type == "瓜类"){
       url = '../../static/data/gua1.json'
    }else if(type == '浆果类'){
      console.log(1)
      url = "../../static/data/jiangguo.json"
    }else if(type == "热带类"){
      url = "../../static/data/reguo.json"
    }else{
      url = "../../static/data/tao1.json"
    }
    var that = this
    /*$.get(url,function(data){
      // console.log(data.data.list)
    })*/
    $.get(url,function(data){
      that.arr = data.data.list
    })
  },
  // 跳转 页面
  tiao(id){
     window.bus.id = id    


     localStorage.ttop = document.body.scrollTop
     console.log(localStorage.ttop)
     localStorage.type = 2
     localStorage.id = window.bus.id
  },
  //  上拉加载 触发事件
    loadMore() {
      this.loading = true;
      setTimeout(() => {
       this.arr = this.arr.concat(this.arr2);
        // console.log(this.arr)
        this.loading = false;
      }, 300);
    }
},
created:function(){
    // 设置 默认展示
     var that = this
       
       $.getJSON('../../static/data/tao1.json',function(data){
             that.arr = data.data.list    
       })

       $.getJSON('../../static/data/tao2.json',function(data){
             that.arr2 = data.data.list 
             // console.log(that.arr2)   
       })

       $.getJSON("./../../static/data/list.json", function(data) {
          that.msg = data.data
       })
  },
mounted:function(){
  var  that = this

  //返回顶部按钮的显示
   window.onscroll = function(){
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(top)
        if(top >= 500){
          $('.huiding').css('display','block')
        }else{
          $('.huiding').css('display','none')
        }
   }

  // 其他页面返回时,该页面的位置
  if (localStorage.ttop) {
        $('html,body').animate({scrollTop:localStorage.ttop},10); 
      }else{
        document.body.scrollTop = 0
      }

      localStorage.removeItem('ttop')

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.huiding{
  width:50px;height:40px;background:rgba(0,0,0,0.5);color:white;font-size:12px;
  position:fixed; bottom:50px;right:20px;z-index:8888;line-height:40px;
  border-radius:5px;display:none;
}
.chu{
  overflow:hidden;text-overflow:ellipsis; white-space:nowrap;
}

.dd{
  color:#999;
}
.ff{
  color:#f18e00;
}
.list{
  /*overflow: hidden;*/
  .bg{
    background: yellow;
    height:50px;
   }
    .mint-searchbar{
          background:white;
        }
   .mint-searchbar-inner{
      background:#f3f3f3;
      input{background:#f3f3f3;}
    }
    .mint-search-list{
      height:0px;
    }
  .mint-search{
      width:100%;background:white;
  }

  .gund{
    width:100%;overflow-x: auto;
        .mint-navbar{
          width:300%;
         .d1{
          color:#999;
          .mint-tab-item-label{
            font-size:16px;
          }
         }
       }
      }
   .gund::-webkit-scrollbar{
     display: none;
   }

  .li{
      margin-bottom: 60px;
    li{
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
