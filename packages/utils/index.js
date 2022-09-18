export function validator(value, rule) {
    let msg = "";
    const result = rule.every(item => {
        if(!item.pattern.test(value)) {
            msg = item.msg;
            return false;
        }
        return true;
    });
    if(result) {
        Promise.resolve(msg);
    } 
    return Promise.reject(msg)
}