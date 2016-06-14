var bdnews = angular.module('bdnews',['ngAnimate','ngRoute']);

bdnews.controller('indexCtrl',['$scope',function($scope){
  if(localStorage.bdx){
    $scope.isFirstOpen = false;
  }else{
    $scope.isFirstOpen = true;
  }
  $scope.enter = function(){
    localStorage.bdx = true;
    $scope.isFirstOpen = false;
  }
  $scope.allcate = [
    {name:'国内',href:'#/guonei',checked:true},
    {name:'国外',href:'#/guowai',checked:true},
    {name:'资料',href:'#/ziliao',checked:false},
    {name:'娱乐',href:'#/yule',checked:false},
    {name:'科技',href:'#/keji',checked:false}
  ]
}])

bdnews.directive('bdYindao',[function(){
  return {
    restrict:'E',
    replace:true,
    templateUrl:'views/directive/yindao.html',
    link:function($scope,el){
      $(function(){
        var mySwiper = new Swiper ('.swiper-container', {
          pagination: '.swiper-pagination',
        })
      })
    }
  }
}])
bdnews.directive('bdTopTab',[function(){
  return {
      replace:true,
      restrict:'E',
      templateUrl:'views/directive/top-tab.html',
      link:function($scope,el){
        el.on('click','.tab',function(){
          $('.zhishitiao').css('left',$(this).index()*25+'%');
          $('#top-tab .active').removeClass('active');
          $(this).find('a').addClass('active');
        })
      }
  }
}])

bdnews.factory('$news',[function(){
    var news = [
        {
          id:1001,
          type:'guonei',
          image:'images/a1.jpg',
          title:'嘻嘻嘻',
          desc:'啊打发发发打发',
          xinwentype:'tupian'
        },
        {
          id:1002,
          type:'guonei',
          title:'....',
          desc:'aaaaaaaaaaaaaaaaaaa',
          xinwentype:'wenzi'
        },
        {
          id:1001,
          type:'guowai',
          image:'images/a9.jpg',
          title:'卫星上天',
          desc:'..............'
        },
    ];
    return {
      getNewsByType:function(type){
          var r = news.filter(function(v,i){
            return  v.type === type;
          })
          return r;
      }
    }
}]);

bdnews.controller('guoneiCtrl',['$scope','$news',function($scope,$news){
  var list = $news.getNewsByType('guonei');
  $scope.tupianList = list.filter(function(v,i){
    return v.xinwentype === 'tupian';
  })
  $scope.wenziList = list.filter(function(v,i){
    return v.xinwentype === 'wenzi';
  })
}]);
bdnews.controller('guowaiCtrl',['$scope','$news',function($scope,$news){
  $scope.list = $news.getNewsByType('guowai');
}]);

bdnews.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
      controller:'guoneiCtrl',
      templateUrl:'views/templates/guonei.html',
    }).when('/guonei',{
      controller:'guoneiCtrl',
      templateUrl:'views/templates/guonei.html',
    }).when('/guowai',{
      controller:'guowaiCtrl',
      templateUrl:'views/templates/guowai.html',
    }).otherwise({
      redirectTo:'/'
    })
}])
