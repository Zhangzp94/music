
//判断是否含有这个className
export function hasClass(el,className) {
    let reg =  new RegExp('(^|\\s)'+className+'(\\s|$)')
    return reg.test(el.className)
}
export function addClass(el,className) {
    if (hasClass(el,className)){
        return;
    }else{
        let newClass = el.className.split(' ');
        newClass.push(className)
        el.className=newClass.join(' ')
    }
}
export function getData(el,name,val) {//获取以data-开头 属性的值
    const prefix = 'data-';
    if (val){
        return el.setAttribute(prefix+name,val)
    }else{
        return el.getAttribute(prefix+name)
    }
}