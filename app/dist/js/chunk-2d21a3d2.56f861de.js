(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(e,t,c){"use strict";c.r(t);var a=c("7a23"),l=c("c657"),n=c("ef71");const u="processed",o="processed",b=async()=>{const{program:e}=Object(n["b"])(),t=e.value.account.tweet.all();return t},i=async(e,t)=>{const{wallet:c,program:a}=Object(n["b"])(),b=l["c"].Keypair.generate();await a.value.methods.sendTweet(e,t).accounts({author:c.value.publicKey,tweet:b.publicKey,systemProgram:l["c"].SystemProgram.programId}).signers([b]).rpc({preflightCommitment:u,commitment:o});const i=await a.value.account.tweet.fetch(b.publicKey,"recent");return{account:i,publicKey:b.publicKey}},s=Object(a["h"])("h1",null,"Home",-1),r={key:0},j={key:1},O={class:"flex flex-col"},p=Object(a["i"])(" Tweets loaded! ");var d={__name:"Home",setup(e){const t=Object(a["B"])([]),c=Object(a["B"])(!0),l=Object(a["B"])(""),n=Object(a["B"])("");b().then(e=>t.value=e).finally(()=>c.value=!1);const u=async()=>{const e=await i(l.value,n.value);l.value="",n.value="",t.value.push(e)};return(e,o)=>(Object(a["y"])(),Object(a["g"])(a["a"],null,[s,c.value?(Object(a["y"])(),Object(a["g"])("div",r," Tweets loading ")):(Object(a["y"])(),Object(a["g"])("div",j,[Object(a["h"])("div",O,[Object(a["N"])(Object(a["h"])("input",{id:"topic",placeholder:"topic","onUpdate:modelValue":o[0]||(o[0]=e=>l.value=e)},null,512),[[a["J"],l.value]]),Object(a["N"])(Object(a["h"])("textarea",{id:"content",placeholder:"content","onUpdate:modelValue":o[1]||(o[1]=e=>n.value=e)},null,512),[[a["J"],n.value]]),Object(a["h"])("button",{onClick:u},"Submit")]),p,(Object(a["y"])(!0),Object(a["g"])(a["a"],null,Object(a["C"])(t.value,e=>(Object(a["y"])(),Object(a["g"])("div",{key:e.publicKey,class:"m-10"},[Object(a["h"])("div",null,"Author: "+Object(a["G"])(e.account.author.toBase58()),1),Object(a["h"])("div",null,"Topic: "+Object(a["G"])(e.account.topic),1),Object(a["h"])("div",null,"Content: "+Object(a["G"])(e.account.content),1)]))),128))]))],64))}};const v=d;t["default"]=v}}]);
//# sourceMappingURL=chunk-2d21a3d2.56f861de.js.map