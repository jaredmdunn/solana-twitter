(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(e,t,c){"use strict";c.r(t);var a=c("7a23"),l=c("c657"),n=c("ef71");const u="processed",o="processed",b=async()=>{const{program:e}=Object(n["b"])(),t=e.value.account.tweet.all();return t},i=async(e,t)=>{const{wallet:c,program:a}=Object(n["b"])(),b=l["c"].Keypair.generate();await a.value.methods.sendTweet(e,t).accounts({author:c.value.publicKey,tweet:b.publicKey,systemProgram:l["c"].SystemProgram.programId}).signers([b]).rpc({preflightCommitment:u,commitment:o});const i=await a.value.account.tweet.fetch(b.publicKey,"recent");return{account:i,publicKey:b.publicKey}},j=Object(a["h"])("h1",null,"Home",-1),s={key:0},O={key:1},r={key:0,class:"flex flex-col"},p=Object(a["i"])(" Tweets loaded! ");var d={__name:"Home",setup(e){const{wallet:t}=Object(n["b"])(),c=Object(a["B"])([]),l=Object(a["B"])(!0),u=Object(a["B"])(""),o=Object(a["B"])("");b().then(e=>c.value=e).finally(()=>l.value=!1);const d=Object(a["c"])(()=>t&&t.value&&"5bobMwjqaaydwBa3xSKLqLJjpZhJk11H3c8GtTcnsFca"===t.value.publicKey.toString()),v=async()=>{const e=await i(u.value,o.value);u.value="",o.value="",c.value.push(e)};return(e,t)=>(Object(a["y"])(),Object(a["g"])(a["a"],null,[j,l.value?(Object(a["y"])(),Object(a["g"])("div",s," Tweets loading ")):(Object(a["y"])(),Object(a["g"])("div",O,[Object(a["I"])(d)?(Object(a["y"])(),Object(a["g"])("div",r,[Object(a["N"])(Object(a["h"])("input",{id:"topic",placeholder:"topic","onUpdate:modelValue":t[0]||(t[0]=e=>u.value=e)},null,512),[[a["J"],u.value]]),Object(a["N"])(Object(a["h"])("textarea",{id:"content",placeholder:"content","onUpdate:modelValue":t[1]||(t[1]=e=>o.value=e)},null,512),[[a["J"],o.value]]),Object(a["h"])("button",{onClick:v},"Submit")])):Object(a["f"])("",!0),p,(Object(a["y"])(!0),Object(a["g"])(a["a"],null,Object(a["C"])(c.value,e=>(Object(a["y"])(),Object(a["g"])("div",{key:e.publicKey,class:"m-10"},[Object(a["h"])("div",null,"Author: "+Object(a["G"])(e.account.author.toBase58()),1),Object(a["h"])("div",null,"Topic: "+Object(a["G"])(e.account.topic),1),Object(a["h"])("div",null,"Content: "+Object(a["G"])(e.account.content),1)]))),128))]))],64))}};const v=d;t["default"]=v}}]);
//# sourceMappingURL=chunk-2d21a3d2.0b899651.js.map