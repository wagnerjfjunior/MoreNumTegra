const urls = {
  hero: "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp",
  complex: "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp"
};

function read24le(buf, off){ return buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16); }

function webpDimensions(buf){
  if(buf.toString("ascii",0,4)!=="RIFF" || buf.toString("ascii",8,12)!=="WEBP") throw new Error("not WEBP RIFF");
  let off=12;
  while(off+8<=buf.length){
    const type=buf.toString("ascii",off,off+4);
    const size=buf.readUInt32LE(off+4);
    const data=off+8;
    if(type==="VP8X"){
      return {container:type,width:1+read24le(buf,data+4),height:1+read24le(buf,data+7)};
    }
    if(type==="VP8 "){
      if(buf[data+3]===0x9d && buf[data+4]===0x01 && buf[data+5]===0x2a){
        return {container:type.trim(),width:buf.readUInt16LE(data+6)&0x3fff,height:buf.readUInt16LE(data+8)&0x3fff};
      }
    }
    if(type==="VP8L"){
      if(buf[data]!==0x2f) throw new Error("invalid VP8L signature");
      const b1=buf[data+1], b2=buf[data+2], b3=buf[data+3], b4=buf[data+4];
      return {
        container:type,
        width:1+(((b2&0x3f)<<8)|b1),
        height:1+(((b4&0x0f)<<10)|(b3<<2)|((b2&0xc0)>>6))
      };
    }
    off=data+size+(size%2);
  }
  throw new Error("no VP8 dimension chunk found");
}

for(const [name,url] of Object.entries(urls)){
  const res=await fetch(url,{cache:"no-store"});
  if(!res.ok) throw new Error(name+" HTTP "+res.status);
  const buf=Buffer.from(await res.arrayBuffer());
  const dim=webpDimensions(buf);
  console.log(JSON.stringify({
    name,
    status:res.status,
    url,
    bytes:buf.length,
    content_type:res.headers.get("content-type"),
    content_length:res.headers.get("content-length"),
    cache_control:res.headers.get("cache-control"),
    etag:res.headers.get("etag"),
    last_modified:res.headers.get("last-modified"),
    accept_ranges:res.headers.get("accept-ranges"),
    webp:dim
  }));
}
