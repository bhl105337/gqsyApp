angular.module('starter.routes', []).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'views/tabs.html'
        })

        // .state('zixun_info', {
        //     url: '/zixun_info/{id}',
        //     controller: 'ZixunInfoCtrl',
        //     templateUrl: 'views/zixun/zixun_info.html'
        // })
        // .state('tz_info', {
        //     url: '/tz_info/{id}',
        //     controller: 'TzInfoCtrl',
        //     templateUrl: 'views/zixun/tongzhi_info.html'
        // })
        // .state('shoping', {
        //     url: '/shoping/{uid}',
        //     controller: 'shop_indexCtrl',
        //     templateUrl: 'views/shoping/shop_index.html'
        // })
        // .state('product', {
        //     url: '/product/{uid}',
        //     controller: 'productCtrl',
        //     templateUrl: 'views/product/catelists.html'
        // })
        // .state('catlist', {
        //     url: '/catlist/{uid}/{cid}',
        //     controller: 'cateListCtrl',
        //     templateUrl: 'views/product/catlists.html'
        // })
        // .state('prolist', {
        //     url: '/prolist/{uid}/{cid}',
        //     controller: 'proListsCtrl',
        //     templateUrl: 'views/product/prolists.html'
        // })
        .state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'views/user/login.html'
        })
        //
        .state('tab.zixun', {
            url: '/zixun',
            views: {
                'tab-zixun': {
                    templateUrl: 'views/zixun/zixun.html',
                    controller: 'ZixunCtrl'
                }
            }
        })
        // .state('tab.tongzhi', {
        //     url: '/tongzhi',
        //     views: {
        //         'tab-zixun': {
        //             templateUrl: 'views/zixun/tongzhi.html',
        //             controller: 'GonggaoCtrl'
        //         }
        //     }
        // })
        //
        .state('tab.dangjian', {
            url: '/dangjian',
            views: {
                'tab-dangjian': {
                    templateUrl: 'views/dangjian/d_index_1.html',
                    controller: 'Dangjian_aCtrl'
                }
            }
        })
        // .state('tab.dangke', {
        //     url: '/dangke',
        //     views: {
        //         'tab-dangjian': {
        //             templateUrl: 'views/dangjian/d_index_2.html',
        //             controller: 'Dangjian_bCtrl'
        //         }
        //     }
        // })
        // .state('tab.kaoshi', {
        //     url: '/kaoshi',
        //     views: {
        //         'tab-dangjian': {
        //             templateUrl: 'views/dangjian/d_index_3.html',
        //             controller: 'Dangjian_cCtrl'
        //         }
        //     }
        // })
        // .state('tab.zhichuang', {
        //     url: '/zhichuang',
        //     views: {
        //         'tab-dangjian': {
        //             templateUrl: 'views/dangjian/d_index_4.html',
        //             controller: 'Dangjian_dCtrl'
        //         }
        //     }
        // })
        .state('tab.djnav', {
            url: '/djnav/{id}/{nav}',
            views: {
                'tab-dangjian': {
                    templateUrl: 'views/dangjian/djnav.html',
                    controller: 'Dangjian_navCtrl'
                }
            }
        })
        //
        .state('djinfo', {
            url: '/djinfo/{id}/{nav}/{cid}',
            controller: 'DjInfoCtrl',
            templateUrl: 'views/dangjian/dangjian_info.html'
        })
        //
        //
        .state('tab.books', {
            url: '/books',
            views: {
                'tab-books': {
                    templateUrl: 'views/books/books.html',
                    controller: 'BooksCtrl'
                }
            }
        })
        // .state('tab.books_b', {
        //     url: '/books_b',
        //     views: {
        //         'tab-books': {
        //             templateUrl: 'views/books/books_b.html',
        //             controller: 'Books_bCtrl'
        //         }
        //     }
        // })
        // .state('tab.books_c', {
        //     url: '/books_c',
        //     views: {
        //         'tab-books': {
        //             templateUrl: 'views/books/books_c.html',
        //             controller: 'Books_cCtrl'
        //         }
        //     }
        // })
        //
        // .state('tab.booksnav', {
        //     url: '/booksnav/{id}/{nav}',
        //     views: {
        //         'tab-books': {
        //             templateUrl: 'views/books/booksnav.html',
        //             controller: 'BooksNavCtrl'
        //         }
        //     }
        // })
        //
        // .state('booksinfo', {
        //     url: '/booksinfo/{id}/{cid}/{nav}',
        //     controller: 'BookInfoCtrl',
        //     templateUrl: 'views/books/books_info.html'
        // })
        //
        .state('tab.wenhua', {
            url: '/wenhua',
            views: {
                'tab-wenhua': {
                    templateUrl: 'views/wenhua/wenhua_a.html',
                    controller: 'Wenhua_aCtrl'
                }
            }
        })
        // .state('tab.wenhua_b', {
        //     url: '/wenhua_b',
        //     views: {
        //         'tab-wenhua': {
        //             templateUrl: 'views/wenhua/wenhua_b.html',
        //             controller: 'Wenhua_bCtrl'
        //         }
        //     }
        // })
        // .state('tab.wenhua_c', {
        //     url: '/wenhua_c',
        //     views: {
        //         'tab-wenhua': {
        //             templateUrl: 'views/wenhua/wenhua_c.html',
        //             controller: 'Wenhua_cCtrl'
        //         }
        //     }
        // })
        // .state('tab.wenhua_nav', {
        //     url: '/wenhua_nav/{id}/{nav}',
        //     views: {
        //         'tab-wenhua': {
        //             templateUrl: 'views/wenhua/wenhua_nav.html',
        //             controller: 'WenhuaNavCtrl'
        //         }
        //     }
        // })
        //
        // .state('wenhuainfo', {
        //     url: '/wenhuainfo/{id}/{cid}/{nav}',
        //     controller: 'WenhuaInfoCtrl',
        //     templateUrl: 'views/wenhua/wenhua_info.html'
        // })
        // .state('tab.user', {
        //     url: '/user',
        //     views: {
        //         'tab-user': {
        //             templateUrl: 'views/user/user_center.html',
        //             controller: 'userCtrl'
        //         }
        //     }
        // })
        // .state('tab.read_log', {
        //     url: '/read_log/{uid}',
        //     views: {
        //         'tab-user': {
        //             templateUrl: 'views/user/read_log.html',
        //             controller: 'Read_logCtrl'
        //         }
        //     }
        // })
        // .state('tab.user_setting', {
        //     url: '/user_setting/{uid}',
        //     views: {
        //         'tab-user': {
        //             templateUrl: 'views/user/setting.html',
        //             controller: 'user_settingCtrl'
        //         }
        //     }
        // })
        //
        // .state('read_info', {
        //     url: '/read_info/{uid}/{id}',
        //     controller: 'Read_infoCtrl',
        //     templateUrl: 'views/user/read_info.html'
        // })
        // .state('read_idea', {
        //     url: '/read_idea/{uid}',
        //     controller: 'Read_ideaCtrl',
        //     templateUrl: 'views/user/read_idea_list.html'
        // })
        // .state('read_idea_info', {
        //     url: '/read_idea_info/{uid}/{id}',
        //     controller: 'Read_idea_infoCtrl',
        //     templateUrl: 'views/user/read_idea_info.html'
        // })
        // .state('read_idea_add', {
        //     url: '/read_idea_add/{uid}',
        //     controller: 'Read_idea_addCtrl',
        //     templateUrl: 'views/user/read_idea_add.html',
        //     cache: 'false'
        // })
        // .state('user_coin', {
        //     url: '/user_coin/{uid}',
        //     controller: 'user_coinCtrl',
        //     templateUrl: 'views/user/user_coin.html'
        // })
        .state('search', {
            url: '/search',
            controller: 'SearchCtrl',
            templateUrl: 'views/search/search.html',
            cache: 'false'
        })
        .state('search_info', {
            url: '/search_info/{id}',
            controller: 'Search_infoCtrl',
            templateUrl: 'views/search/search_info.html'
        })
    // .state('search_nav', {
    //     url: '/search_nav/{id}',
    //     controller: 'Search_navCtrl',
    //     templateUrl: 'views/search/search_nav.html'
    // })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dangjian');
});