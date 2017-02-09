/**
 * Created by yuxuan on 2016/12/16.
 */
//准备数据
var model=[
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"哥的man你学不来","userComt":"评论评论评论"},
        time:"2016-12-16 09:13:24",
        zan:0,
        gray:false   //点击‘顶’变色

    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"侠51899","userComt":"好，大快人心！"},
        time:"2016-12-16 08:09:24",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"一不小心","userComt":"支持中央反腐决心，反腐永远在路上！"},
        time:"2016-12-16 09:13:24",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"一头悲伤的野驴","userComt":"一查到底，支持反腐。"},
        time:"2016-12-16 09:09:31",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"小编傻滗","userComt":"好 支持！"},
        time:"2016-12-16 09:05:46",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"大内密探lll","userComt":"好，支持国家反腐"},
        time:"2016-12-16 09:00:52",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"世间仅此牧之君","userComt":"支持党中央，支持反腐！"},
        time:"2016-12-16 08:52:30",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"深入敌后的王二小 ","userComt":"支持反腐！"},
        time:"2016-12-16 08:52:30",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"亦庄亦谐 ","userComt":"支持党中央，支持反腐！"},
        time:"2016-12-16 08:52:30",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"有态度网友","userComt":"支持党中央，支持反腐！"},
        time:"2016-12-16 08:52:30",
        zan:0,
        gray:false   //点击‘顶’变色
    },
    {
        userInfo:{ "userImg":"images/noface80_80.png","nickName":"凋零的树叶","userComt":"支持党中央，支持反腐！"},
        time:"2016-12-16 08:52:30",
        zan:0,
        gray:false   //点击‘顶’变色
    }
];
//创建主模块
angular.module("myapp",[])
    .controller("myCtrl",function($scope,$filter,$timeout){           //注册主控制器
        $scope.flag=false;
        $scope.toggle=function(){     //点击“快速发帖”
            $scope.flag=!$scope.flag
        };
//---------------------------------------------------------------------------
        $scope.data=model;    //获取模型数据

        $scope.userText="";  //绑定输入内容
        $scope.userName="";  //绑定用户名

        $scope.count=false;
        $scope.yonhum=false;

        $scope.add=function(){  //点击登陆的时候向数组添加内容
            //获取时间
            var oData=new Date();
            var year=oData.getFullYear();
            var month=oData.getMonth();
            var date=oData.getDate();
            var hour=oData.getHours();
            var minu=oData.getMinutes();
            var second=oData.getSeconds();
            //过滤个位数的数字
            function num(n){
                return n<10?'0'+n:n;
            }
            if($scope.userText!=""&&$scope.userName!=""){   //非空验证
                //获取的用户信息传入数组里
                $scope.data.unshift({
                    userInfo:{ "userImg":"images/noface80_80.png","nickName":$scope.userName,"userComt":$scope.userText},
                    time:year+'-'+num((month+1))+'-'+num(date)+' '+num(hour)+':'+num(minu)+':'+num(second)+'',
                    //time:"2016-12-16 08:06:24",
                    zan:0,  //点赞数
                    gray:false   //点击‘顶’变色
                });
                $scope.userText="";  //清空输入内容
                $scope.userName="";  //清空用户名

                //console.log($scope.data.length)
                $scope.totleNum=Math.ceil($scope.data.length/ $scope.pageSize);//获取共几页
            }else{
                if($scope.userText==""){
                    $scope.count=true;
                    $timeout(function(){
                        $scope.count=false;
                    },1000)
                }
                if($scope.userName==""){
                    $scope.yonhum=true;
                    $timeout(function(){
                        $scope.yonhum=false;
                    },1000)
                }
            }

            $scope.pageNum=1;    //请求的页码
        };
//----------------------------------------------------------------分页
        $scope.pageNum=1;    //请求的页码
        $scope.pageSize=5;   //页面大小
        $scope.page=function(p){   //第几页
            $scope.pageNum=p;
        };

//        var newarr=$filter('pagenumFilter')( $scope.data,$scope.pageSize);
//        $scope.length=newarr.length;   c
//console.log($scope.length)



        $scope.hide=function(pageNum){  //禁用
            if(pageNum<=1){
                $scope.pageNum=1;
            }
            else if(pageNum>=$scope.totleNum){
                $scope.pageNum=$scope.totleNum;
            }
        };


//-----------------------------------------------
        $scope.ding=function(name){     //点击”顶“  接收到用户名
            for(var i=0;i<$scope.data.length;i++){    //遍历数组找到相同name的，zan加1
                if($scope.data[i].userInfo.nickName==name){  //有 ,数量加1
                    $scope.data[i].zan++;
                    $scope.data[i].gray=true;
                    return;
                }
            }
        };

            //-------------------------------------算出有多少人参与  不对的
        //$scope.joinCount=function(){
        //    var arr=[];  //放参与的人
        //    for(var i=0;i<$scope.data.length;i++){    //遍历数组  找出zan大于0的，说明点过
        //        if($scope.data[i].zan>0){
        //            arr.push($scope.data[i].zan)
        //        }
        //    }
        //}





});
