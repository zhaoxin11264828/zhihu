var zhihunew = angular.module('zhihu',['ngAnimate','ngRoute']);
zhihunew.controller('indexCtrl',['$scope',function($scope){
	if(localStorage.state){
		$scope.isFirstopen=false;
	}else{
		$scope.isFirstopen=true;

	}

	$scope.enter = function(){
		console.log(1)
		localStorage.state = true;
		$scope.isFirstopen = false;
	}
}]);

// 引导页指向
zhihunew.directive('zhYindao',[function(){
	return{
		restrict:'E',
		replace:true,
		templateUrl:'views/directive/zhyindao.html',
		link:function($scope,el){
			$(function(){
				var mySwiper = new Swiper ('.swiper-container', {

           // 如果需要分页器
            pagination: '.swiper-pagination',
                })
			})
		}
	}
}])

// 底部导航指向
zhihunew.directive('zhNavBar',[function(){
	return{
		restrict:'E',
		replace:true,
		templateUrl:'views/directive/zh-nav-bar.html',
		link:function($scope,el){

		}
	}
}])


// 内容页 ng-view 路由

zhihunew.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		controller:'indexCtrl',
		templateUrl:'views/templates/liebiao.html'
	}).when('/liebiao',{
		controller:'mainCtrl',
		templateUrl:'views/templates/liebiao.html'
	}).when('/liebiao/:id',{
		controller:'main1Ctrl',
		templateUrl:'views/templates/content.html'
	}).when('/faxian',{
		controller:'main2Ctrl',
		templateUrl:'views/templates/faxian.html'
	}).when('/tixing',{
		controller:'main3Ctrl',
		templateUrl:'views/templates/tixing.html'
	}).when('/guanzhu',{
		controller:'main4Ctrl',
		templateUrl:'views/templates/guanzhu.html'
	}).when('/gengduo',{
		controller:'main5Ctrl',
		templateUrl:'views/templates/gengduo.html'
	})
}])




zhihunew.controller('main2Ctrl',['$scope',function($scope){

}])

zhihunew.controller('main3Ctrl',['$scope',function($scope){

}])


zhihunew.controller('main4Ctrl',['$scope',function($scope){

}])

zhihunew.controller('main5Ctrl',['$scope',function($scope){

}])




// 数据

// 首页刘表页数据

zhihunew.factory('$news',[function(){
	var news=[{
		id:'1001',
		type:'法律',
		image:'images/fanhui.jpg',
		title:'什么才是真理?',
		desc:'星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决',
		time:'2016-06-11',
		autor:'一地鸡毛',
		autorid:'1',
		pinglun:'42',
		newstype:'wenzi',
		istupian:false


	},
	{
		id:'1001',
		type:'法律',
		image:'images/fanhui.jpg',
		title:'什么才是真理?',
		desc:'星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决星巴克是否存在问题 如有  怎么解决',
		time:'2016-06-11',
		autor:'一地鸡毛',
		autorid:'1',
		pinglun:'42',
		newstype:'tupian',
		istupian:true

	},{
		id:'1001',
		type:'法律',
		image:'images/fanhui.jpg',
		title:'学习某一种语言会对其他语言的学习产生帮助或干扰吗？',
		desc:'年审前夜给这个问题写回答，真是百感交集；一想到在年审当天要把这个回答发出来，大家看到我的回答的时候我正在经受两位独立考官的追问（虽然我和他俩都很熟），我就更是百感交集了——这跟在知乎上回答问题然后再查看回复有什么本质上的区别嘛……总觉得在写的时候手都有点发抖。为什么呢？因为我去年有半年就在整理这方面的东西呀，我明天年审的时候就要被考官问到这些呀，所以我今天就顺手复习一下了。先回答题主在标题里提出的问题：学习一门语言（包括我们的母语），会不会对其他语言的学习产生（或者是正面或者是负面的）影响？会，虽然这个“会”不意味着“一定会”。这就是第二语言习得里经常提到的transfer（是的，这个现象就叫“迁移”，我之前也没翻译错）；可能之前看过我其他回答的知友会感觉这个词非常眼熟，没错，就是在怎么回应家长的“英语都没学好学什么日语”？ - Chris Xia 的回答里面提到过的那个Eric Kellerman说过的transfer。之前的那篇回答主要讲的是如何权衡两种外语的选择，有关迁移的内容只是偶尔加进去论证用的，而今天这篇会主要讲一下到底什么是迁移，迁移的各种表现——特别是“帮助”和“干扰”，以及延续之前的内容，针对题',
		time:'2016-06-11',
		autor:'一地鸡毛',
		autorid:'1',
		autorqianming:'就是不想然你们说"这不科学',
		pinglun:'42',
		newstype:'tupian',
		istupian:true
	}];

	return {
		getNewsByType:function(type){
			var r = news.filter(function(v,i){
				return v.type === type;
			})
			return r;
		}
	}
}])


// 列表页
zhihunew.controller('mainCtrl',['$scope','$news',function($scope,$news){
		$scope.list = $news.getNewsByType('法律');
		$scope.toggle = false;
		$scope.kaiguan = function(){
		$scope.toggle = !$scope.toggle;
		}

		$scope.delete = function(el){
		$scope.toggle = !$scope.toggle;
         $scope.list = $scope.list.filter(function(v,k){
         		return v !== el;
         })
		}


}])



zhihunew.controller('main1Ctrl',['$scope','$routeParams','$news',function($scope,$routeParams,$news){
		$scope.list = $news.getNewsByType('法律');
		var index = $routeParams.id;
        $scope.autor=$scope.list[index].autor;
        $scope.autorqianming=$scope.list[index].autorqianming;

        $scope.title =$scope.list[index].title;
        $scope.desc = $scope.list[index].desc;

}])
