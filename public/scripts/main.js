$(document).ready(function() {
    'use strict';
    $('#pagepiling').pagepiling({
        anchors: [
            'page-home',
            'page-custom-element-builder',
            'page-cqrsjs',
            'page-ffos-ownnews',
            'page-memos',
            'page-shopList',
            'page-quanban',
            'page-hoozbuzzing',
            'page-omvedahome'
        ],
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': [
                'Home',
                'custom-element-builder',
                'cqrsjs',
                'OwnNews',
                'Memos',
                'ShopList',
                'Quanban',
                'hoozbuzzing.com',
                'omvedahome.com'
            ],
        },
        sectionSelector: 'section'
    });
});