

import Vue from 'vue'

var StaticToast = new Vue({
  methods: {
    default(type,content,duration,closable){
      this.$Message.config({
        top: 180
      });
      this.$Message[type||"info"]({
          content: content||"提示",
          duration: (duration||3),
          closable: (closable||false)
      });
    },
    info (content,duration,closable) {
      StaticToast.default("info",content,duration,closable);
    },
    success:(content,duration,closable)=>{
      StaticToast.default("success",content,duration,closable);
    },
    warning:(content,duration,closable)=>{
      StaticToast.default("warning",content,duration,closable);
    },
    error:(content,duration,closable)=>{
      StaticToast.default("error",content,duration,closable);
    },
    destroy(){
      this.$Message.destroy();
    }
  }
})
/*const StaticToast=  {
  
}*/
export default StaticToast;

