import jsonp from "../common/js/jsonp";

export function getSingerDetail() {
    let url = "https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg"
    let data = {
        cid:205360581,
        g_tk_new_20200303:5381,
        g_tk:5381,
        loginUin:0,
        hostUin:0,
        format:"json",
        inCharset:"utf8",
        outCharset:"utf8",
        notice:0,
        platform:"yqq.json",
        needNewCode:0,
        singermid:"0025NhlN2yWrP4",
        order:"time",
        begin:0,
        num:30,
        cmd:1
    }
    const options = {
        param: 'jsonpCallback'
    }
    return jsonp(url,data,options)
}
