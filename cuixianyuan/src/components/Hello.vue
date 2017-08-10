<template>
  <div class="hello">
    <el-row class="search">
       <router-link to="/search">
         <el-col :span="24">  
            <el-input
              placeholder="请输入搜索内容"
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>
         </el-col>
      </router-link>
    </el-row>
    
        <!--轮播图-->
    <div class="lun">
       <mt-swipe :auto="4000" class="lu">
          <mt-swipe-item v-for="x in lun" class="ti">
                <img v-bind:src="x.img" alt="" />
          </mt-swipe-item>
      </mt-swipe> 
    </div>
        

    <!-- 快报 -->
     <div class="kuai">
         <img src="./../assets/headlines.png" />
         <a  v-bind:href="lianjie">
              {{value}}
         </a>
     </div>

     <!-- 疯狂抢购 -->
     <div class="feng">
         <div class="feng_title">
             <img src="./../assets/limited-berserk.png" alt="" />
             <span> 限购数量 </span>
             <div style="display:inline;position:relative;">
                 <img src="./../assets/shu_bg.png" alt="" />
                 <span>200件</span>
             </div>
         </div>
        
        <router-link to="/details">
               <div class="xing" @click="Htiao(feng.goods_id)">
                 <img v-bind:src="feng.img"/>
                 <div style="display:relative">
                         <h4>{{feng.goods_name}}</h4>
                         <p>{{feng.goods_jingle}}</p>
                         <span>¥<b>{{feng.activity_price}}</b>/{{feng.unit}}</span>
                         <p><s>原价{{feng.original_price}}/{{feng.unit}}</s></p>
                         <button>立即抢购</button>
                 </div>
              </div>
        </router-link>
     </div>

   <!-- 直播台 -->
    <div class="live">
        <div class="live_title">
            <img src="./../assets/zhibo_title.png" alt="" />
            <a href="http://cuixianyuanzhib.flzhan.com/index.html">更多直播</a>
        </div>
        <div class="juan">
          <ul class="jan">
            <li v-for="value in live_zhubo">
                 <a v-bind:href="value.url">
                    <img v-bind:src="value.image"/>
                    <div class="live_time_logo">
                        <span>直播预告</span>
                    </div>
                    <div class="time">
                        <span>2017-07-31 14:20:00开播</span>
                    </div>
                    <div class="title">
                        [{{value.cxy_member_name}}] {{value.title}}
                    </div>
                 </a>
            </li>
         </ul>
        </div>
    </div>

   <!-- 推荐 -->
    <div class="tui">
         <div class="title">
            <img src="./../assets/recommend.png" height="15" width="75" alt="" />
        </div>
        <router-link to="/details">
          <div class="jian" v-for="value in tui" @click = "Htiao(value.goods_id)">
                  <h4>{{value.area_title}}</h4>
                  <p>{{value.goods_jingle}}</p>
                  <span>¥<b>{{value.original_price}}</b>/{{value.original_unit}}</span>
                  <p><s>{{value.activity_price}}/{{value.activity_unit}}</s></p>
                  <img v-bind:src="value.img"/>
          </div>
      </router-link>
    </div>

 <!-- 本周精选 -->
    <div class="jx">
        <div class="title">
            <img src="./../assets/selected.png" height="15" width="75" alt="" />
        </div>

        <ul>    
        <router-link to="/details" >
            <li v-for="value in jx"  @click = "Htiao(value.goods_id)" >
                <img v-bind:src="value.img"/>
                <p>{{value.goods_name}}</p>
                <span>{{value.original_price}}/{{value.activity_unit}}</span>
                <p><s>{{value.activity_price}}/{{value.activity_unit}}</s></p>      
            </li>
          </router-link>
        </ul>
    </div>

<!-- 专区 -->
<div class="zhuan">
      <ul>
          <li v-for="x in zhuan">
              <img v-bind:src="x.area_img"/>
          </li>
      </ul>
</div>

<!-- 热门水果 -->
<div class="re">
  <div class="title">
            <img src="./../assets/fruits.png" height="15" width="75" alt="" />
  </div>
<div class="bian">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="x in lun">
                   <ul>
                    <router-link to="/details">
                        <li v-for="value in re" @click = "Htiao(value.goods_id)">
                                  <img v-bind:src="value.img"/>
                                  <p>{{value.title}}</p>
                        </li>
                      </router-link>
                  </ul> 
            </div>
        </div>
        <div class="swiper-pagination"></div>
   </div> 
</div>


<!-- 底部 -->
<div class="di">
   <a v-bind:href="value.value" v-for="value in tu">
       <img v-bind:src="value.img"/>
   </a>
</div>
  </div>
</template>

<script>

import $ from 'jquery'
import Swiper from '../../static/swiper.min.js'
import touch from '../../static/touch.js'

export default {
  name: 'hello',
  data () {
    return {
      msg:null,
      input2: '',
      x:'',
      lun:null,kuai:null,lianjie:null,value:null,
      live_zhubo:null,
      feng:{
        goods_name:null,img:null,goods_id:null,
        goods_jingle:null,original_price:null,unit:null
      },
      tui:null,jx:null,zhuan:null,re:null,tu:null
    }
  },
  methods:{
    fn:function(){
      var that = this
      $.getJSON('../../static/data/hello1.json', {}, function(data, textStatus) {
         // console.log(data.data.data)
          that.msg = data.data.data
          that.lun = data.data.data[0].module_data;
          that.kuai = data.data.data[1].module_data[0]
          that.lianjie = that.kuai.value;that.value = that.kuai.title;
          that.live_zhubo = data.data.data[3].module_data
          that.feng = data.data.data[2].module_data
          that.tui = data.data.data[4].module_data;
          that.jx = data.data.data[5].module_data;
          that.zhuan = data.data.data[6].module_data;
          that.re = data.data.data[7].module_data;
          that.tu = data.data.data[8].module_data;
      })
    },
    //轮播图
    lunbo () {
    	var swiper = new Swiper('.swiper-container', {
			pagination : '.swiper-pagination',
            loop : true,
            autoplay : 3000,
            autoplayDisableOnInteraction : false
       })
        var swi = new Swiper('.bian', {
            pagination : '.swiper-pagination',
            loop : true,
       })
    },
     handleIconClick(ev) {
      console.log(ev)
    },
    //跳详情页
    Htiao(type){
     window.bus.id = type
     window.bus.isshow = false
     console.log(document.body.scrollTop)
     localStorage.scroll = document.body.scrollTop
     localStorage.type = 1
     localStorage.id = window.bus.id 
    }  
  },
   mounted:function(){
       this.lunbo()
       //拖拽
       touch.on($(".jan")[0],"dragstart",function(e){
            var x = e.position.x - $(".jan").offset().left
            touch.on($(".jan")[0],"drag",function(ev){
                var X = ev.position.x - x 
                if(X>0){
                    X = 0
                }else if(X < -810){
                    X = -810
                }
                $(".jan").css("left",X)
            })
        })
     
    },
    created:function(){
        this.fn()
        //返回 回到位置
         if (localStorage.scroll) {
         $('html,body').animate({scrollTop:localStorage.scroll},'slow'); 
      }else{
        document.body.scrollTop = 0
      }

      localStorage.removeItem('scroll')  

    }
}

</script>


<style lang="scss">
 @import url("../../static/swiper.min.css"); 
.hello{
   .search{
     width:95%;margin:auto;z-index: 1000;
     position:fixed;top:15px;left:2.5%;
     input{
        background:white;
     }
   }
   .lun{
         .lu{
         width: 100%;height: 200px;
         .ti{
             width:100%;height:100%;
            img{
                width:100%;height:100%;
            }
         }
       }
   }
  

   .kuai{
    width:100%;padding:1.2rem 1.4rem;
    font-size: 1.2rem;background:white;
    box-sizing:border-box;
    img{
        width:26%;vertical-align: center;
    }
    a{
      vertical-align: center; color:black;
      margin-left:30px;
    }
   }

  .live{
    width:100%;height: 200px;background:white;
    margin-top:10px;
    .live_title{
      width:100%;padding:1.2rem 1.4rem;height:40px;
      box-sizing:border-box;
     font-size: 1.2rem;
     display: flex;justify-content:space-between;
     img{width:29%;}
     a{
        vertical-align: center; color:#999;
      }
    }
    div{ 
        overflow:hidden;
        height:180px;
        width:100%;
        position:relative;
        left:0px;
     ul{
        width:500%;
        position:absolute;
        left:0px;
        overflow: hidden;
        li{
            float: left;
            width: 15%;
            position:relative;
            text-align: center;
            margin-left:10px;
            img{
                border-radius: 10px;
                width: 100%;
            }
            .live_time_logo{
              width:4.5rem;height:1.2rem;
              position:absolute;
              padding:2px;border-radius:8px;
              top: 10px;
              left:10px;
              background:rgba(0, 0, 0, 0.4);
              color: white;font-size: 1rem;
            }
            .time{
               position:absolute;bottom:30px;right:-20px;color: white;
               z-index: 10;height:20px;width:200px;
            }
            .title{
                font-size:1.3rem;color:#333;height:20px;
            }
        }
     }  
    }
  } 

  .feng{
    width:100%;margin-top:10px;background: white;
    .feng_title{
        margin-left:20px;
        display:flex;align-items: center;
        padding:10px 0;
        font-size: 14px;
           img{
             width:20%;
          }
          div{
            img{width:60%;}
            span{position:absolute;top:2px;left:8px;color:white;}
          } 
    }
   
    .xing{
         width: 100%;height:124px;padding:10px;box-sizing:border-box;
         img{float: left;width:32%;}
         div{
          position: relative;
         h4{color:black;font-size:1.4rem;}
         p{color:#999;margin:5px 0 10px 0;font-size:1.1rem;}
         span{color:#999;font-size:1rem;b{color:rgb(241, 142, 0);font-size:1.6rem;}}
         button{position:absolute;right:13px;bottom:2px;background:#f5483a;
          color:white;padding:8px;outline:none;border:none;border-radius:5px;}  
         }
    } 
  }

  .tui{
    width:100%;background:white;margin-top: 10px;
     .title{
        width:100%;
        img{margin-left:10px;padding:10px;}
        border-bottom:1px solid #ccc;
       }
     .jian{
        width:50%;display:inline-block;padding-left:2%;position:relative;
        margin-top: 10px;border:1px solid #ccc;box-sizing: border-box;
        border-top: none;
        h4{font-size:1.4rem;}
        p{color:#999;margin:5px 0 5px 0;font-size:1.2rem;}
        span{color:#999;font-size:1rem;margin-top:20px;display:block;
            b{color:rgb(241, 142, 0);font-size:2.2rem;}}
        img{position:absolute;width:40%;bottom:0px;right:10px;}
     }
  }


  .jx{
    margin-top: 10px;background:white;
    .title{
        width:100%;
        img{margin-left:10px;padding:10px;}
        border-bottom:1px solid #ccc;
       }
    ul{
      width:100%;
      a{
         width:100%;display:flex;
          justify-content: center;
          flex-flow: wrap;
      li{
        width:33%;text-align: center;
        img{width:90%;}
        p{ color: #1c1b1a;font-size: 16px;
          text-align: center;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          s{
            color:#999;font-size:13px;
          }
      }
        span{
            font-size: 15.5px;
             color: #f18e00;display:block;margin:2px 0px
         }
      }
    }
    }
  };
  
  .zhuan{
        margin:10px auto;background:white;
      
      ul{
        overflow:hidden;width:100%;height:80px;
        li{width:50%;float:left;
           img{width:80%;padding:10%}
         }
      }
  };

  .re{
      overflow:hidden;
     .title{
        width:100%; 
        img{margin-left:10px;padding:10px;}
        border-bottom:1px solid #ccc;
       }
     ul{
        width: 100%;overflow:hidden;float:left;
        li{
           width: 25%;
           float:left;
           text-align: center;
           font-size:14px;
           img{width:100%}
        }
     }
  }
 
  .di{
    margin-top:20px;
    margin-bottom:60px;
    img{width:100%}
  }
}

</style>


