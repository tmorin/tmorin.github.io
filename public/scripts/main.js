$(document).ready(function () {
    'use strict';
    $('#pagepiling').pagepiling({
        anchors: [
            'page-home',
            'page-custom-element-builder',
            'page-ffos-ownnews',
            'page-omvedahome',
            'page-cqrsjs',
            'page-memos',
            'page-shopList',
            'page-quanban',
            'page-hoozbuzzing'
        ],
        navigation: {
            'position': 'right',
            'tooltips': [
                'Home',
                'custom-element-builder',
                'OwnNews',
                'omvedahome.com',
                'cqrsjs',
                'Memos',
                'ShopList',
                'Quanban',
                'hoozbuzzing.com'
            ],
        },
        sectionSelector: 'section'
    });
});
