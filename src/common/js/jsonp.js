import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url+= (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject)=>{
    originJSONP(url,option,(err,data)=>{
      if (!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

function param (data) { // 把参数封装到url的后面去
  let url = '';
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : '';
    url += `&${key}=${encodeURIComponent(value)}`;
  }
  return url ?url.substring(1) :''
}
