var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'BookListModule', 'BookDetailModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});


routerApp.config(function($stateProvider, $urlRouterProvider) {

//  $urlRouterProvider.otherwise('/index');
    $urlRouterProvider.otherwise('/index/main'); // 直接设置浏览器的url
    $urlRouterProvider.otherwise('/main'); // 对应路由配置中的url配置值
    // 以上两种都行

/*
    YCSB note: 
    ui-router的路由配置中有name和url两个参数(的目的?)
    .state({
            name:"nav",
            url:"/nav",
            templateUrl:"navTpl",
        })
    这样就可以有两种方式来触发某个路由：1是通过name来触发，即name值对应的ui-sref属性的a标签来触发
                                        2是通过url来触发，即浏览器地址栏或者 $urlRouterProvider.otherwise('/index/main') 来触发某个路由
*/ 

    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'tpls/home.html',
            abstract:true, 
            // YCSB note:
            // abstract 抽象模板不能被激活, 但是它的子模板可以被激活
            // 如果不设置这个 /index 为抽象模板 那么浏览器地址栏的地址是..../index的话就会触发这个路由，而显示它设置的模板home.html啥也没有
            // 能触发这个.../index路由就会导致 .otherwise('/index/main') 设置的用意是都不配时跳到/index/main 而/index应该跳到/index/main
            // 因此设置它为抽象路由，不能被激活，/index直接跳转到/index/main

            // 这也是嵌套子路由的写法?
            // views: {
            //     '': {
            //         templateUrl: 'tpls/home.html'
            //     },
            //     'main@index': {
            //         templateUrl: 'tpls/loginForm.html'
            //     }
            // }
        })
        // 把上面的写成看得懂的嵌套子路由的写法
        .state('index.main', {
            url: '/main',
            templateUrl: 'tpls/loginForm.html'
        })


        .state('booklist', {
            url: '/{bookType:[0-9]{1,4}}',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: 'tpls/bookList.html'
                },
                'booktype@booklist': {
                    templateUrl: 'tpls/bookType.html'
                },
                'bookgrid@booklist': {
                    templateUrl: 'tpls/bookGrid.html'
                }
            }
        })
        .state('addbook', {
            url: '/addbook',
            templateUrl: 'tpls/addBookForm.html'
        })
        .state('bookdetail', {
            url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
            templateUrl: 'tpls/bookDetail.html'
        })
});
