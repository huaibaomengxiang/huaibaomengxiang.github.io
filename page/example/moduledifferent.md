### export | export default | exports | module.exports的区别
1.exports跟module.exports 跟 require对应(common.js)   
  export 跟export default 跟 import 对应(es6)    
2.export跟export default 后面都不用跟 =，   
exports跟module.exports后面要跟 =。
```
//a,js
var aa = 10;
export bb = 20;
export default aa;
------------------------
//b.js
const AA = 'abc'; 
const BB = 'def';
module.exports = AA;
exports = BB;  
```
####exports跟module.exports的联系
exports其实是mnodule.exports的引用     
exports = module.exports ={};

####export跟 export defaultde的区别和用法
 
 
 
```
//a.js
export aa=10;
export const bb = () => {
    console.log('bb')
}

//b.js
const cc = 100;
export default cc;

//c.js
export default 'aa';
----------------------------
//d.js 
import { aa, bb } from 'a.js';
import dd from 'b.js';
import ee from 'c.js'

console.log(aa)--->10;
console.log(bb)--->'bb'  
console.log(dd)--->100;
```
上面这是export 跟  export default的用法，从这里可以看出一些异同。     
1.一个文件中可以有多个 export 但最多只能有一个 export default 

2.引入export导出的变量时不能改变变量名字但可以其别名，引入export default导出的变量时可以改变名字
```
//e.js
import {aa as AA,bb as BB} from 'a.js';
或者
import * as A from 'a.js'；
```

3.export导出的变量必须要有名字，export 
default导出的可以没有名字

4.export对应的import要加上{},export default对应的不用。 