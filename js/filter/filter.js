/**
 * Created by yuxuan on 2016/12/17.
 */
//过滤器，管理分页
angular.module("myapp")
    .filter("pageFilter",function(){   //自定义过滤器 使pageSize=5
        return function(datas,pageNum,pageSize){  //返回一个函数  数组
            //判断传入的数据是否正确products:为数组,pageNum,pageSize 为数字
            if(angular.isArray(datas)&&angular.isNumber(pageNum)&&angular.isNumber(pageSize)){
                //计算请求的数据的起始索引
                var startIndex=(pageNum-1)*pageSize;

                //判断起始索引是否在数组范围内
                if(startIndex>=datas.length){
                    startIndex= datas.length%pageSize==0?(datas.length-pageSize):(datas.length-datas.length%pageSize)
                }
                //提取一页的新数据到数组中
                var newArr=datas.slice(startIndex,startIndex+pageSize);
                return newArr;
            }else{
                return datas;
            }
        }
    })
    .filter("pagenumFilter",function(){  //过滤页数
        return function(item,pageSize){
            var num=Math.ceil(item.length/pageSize); //得到一共几页
            var arr=[];
            for(var i=0;i<num;i++){
                arr.push(i+1)
            }
            return arr;
        }
    });
