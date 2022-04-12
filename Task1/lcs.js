a=process.argv,o=''
if(a.length>2){a=a.slice(2)
for(i=a[0].length;i>0;--i)for(j=0;j<i;++j){k=a[0].substring(j,i)
a.forEach(e=>{if(e.indexOf(k)<0)k=''})
if(k.length>o.length)o=k}}
console.log(o)