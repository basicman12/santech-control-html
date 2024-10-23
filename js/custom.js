$(function(){
    var owlItemsOptions = {
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,2],
        itemsTablet: [768,1],
        itemsMobile: [479,1],
        navigation : true,
        pagination : false,
        navigationText : ["",""],
        rewindNav: false,
        scrollPerPage : true,
        beforeInit : function(){
            $("#owl-items").html($("#owl-items-data").html());
        },
        afterInit : function(){
            setTimeout(filtering_catalog,1000);
        }
    };
    function filtering_catalog(){
        var $filterig_links = $('.filterig_links');
        if($filterig_links.find('li.active').length > 0){
            var id = $filterig_links.find('li.active a').data('section-id');
            var hide = false;
            $("#owl-items").data('owlCarousel').destroy();
            $("#owl-items").owlCarousel(owlItemsOptions);
            do{
                hide = false;
                $("#owl-items .owl-item > div").each(function(i){
                    var $this = $(this);
                    if($this.data('section-id') !== id){
                        hide = true;
                        $("#owl-items").data('owlCarousel').removeItem(i);
                        return false;
                    }
                });
            }while(hide);
        }
    }
    $("#owl-items").owlCarousel(owlItemsOptions);
    owlItemsOptions.afterInit = function(){};
    $("#owl-items").on('click','.owl-item a', function(){
        var $this = $(this);
        var $catalogItemWrap = $this.closest('.catalog-item-wrap');
        $("#owl-items .catalog-item-wrap").removeClass('open');
        $this.closest('.catalog-item-wrap').addClass('open');
        $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
        var $clone = $catalogItemWrap.clone();
        var $overlayItem = $('<div/>').addClass('overlayItem');
        $clone.find('.catalog_item').append('<a href="#" class="close_item">×</a>');
        $clone.appendTo($overlayItem);
        $overlayItem.appendTo(document.body);
        $('body > .overlayItem').css('width',$catalogItemWrap.css('width'));
        $('body > .overlayItem').css('left',$catalogItemWrap.offset().left + 'px');
        $('body > .overlayItem').css('top',$catalogItemWrap.offset().top +'px');
        $('body > .modal-backdrop, body > .overlayItem a.close_item').on('click', function(){
            $('body > .overlayItem').remove();
            $('body > .modal-backdrop').remove();
            $catalogItemWrap.removeClass('open');
            return false;
        });
        return false;
    });
    $('.filterig_links a').on('click', function(){
        var $this = $(this);
        var $li = $this.closest('li');
        $this.closest('ul').find('li').removeClass('active');
        $li.addClass('active');
        filtering_catalog();
        return false;
    });
    $("#owl-reviews").owlCarousel({
        items : 6,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet: [768,3],
        itemsMobile: [479,2],
        navigation : true,
        pagination : false,
        navigationText : ["",""],
        rewindNav: false,
        scrollPerPage : true
    });
    $('#feedBack input[name="phone"]').mask('+7 (999) 999 9999', {placeholder:'_'});
    $('#buyOneClick input[name="phone"]').mask('+7 (999) 999 9999', {placeholder:'_'});
    $('#PHONE').mask('+7 (999) 999 9999', {placeholder:'_'});
//    $('#choiceCity').modal({show : true});
    var SEARCH_TIMEOUT;
    $('#head_search').on('keyup', function(){
        var $this = $(this);
        var val = $this.val();
        var $form = $this.closest('form');
        var $header_search_result = $('#header_search_result');
        $header_search_result.html('');
        if(val.length > 2){
            var data = $form.serializeArray();
            clearTimeout(SEARCH_TIMEOUT);
            SEARCH_TIMEOUT = setTimeout(function(){
                ajaxSearch(data);
            }, 500);
        }
    });
    if($("#price-range").length > 0){
        $("#price-range").slider({
            range: true,
            min: 0,
            max: 250000,
            values: [ 0, 150000 ],
            slide: function( event, ui ) {
                $('#price_from').val(ui.values[0]);
                $('#price_to').val(ui.values[1]);
            }
        });
        $('#price_from').val($( "#price-range" ).slider( "values", 0 ));
        $('#price_to').val($( "#price-range" ).slider( "values", 1 ));
    }
    if($("#width-range").length > 0){
        $( "#width-range" ).slider({
            range: "min",
            min: 100,
            max: 200,
            value: 180,
            slide: function( event, ui ) {
                $('#width').val(ui.value);
            }
        });
        $('#width').val($( "#width-range" ).slider( "value"));
    }
    if($("#height-range").length > 0){
        $( "#height-range" ).slider({
            range: "min",
            min: 70,
            max: 90,
            value: 70,
            slide: function( event, ui ) {
                $('#height').val(ui.value);
            }
        });
        $('#height').val($( "#height-range" ).slider( "value"));
    }
    if($( "#depth-range" ).length > 0){
        $( "#depth-range" ).slider({
            range: "min",
            min: 36,
            max: 53,
            value: 45,
            slide: function( event, ui ) {
                $('#depth').val(ui.value);
            }
        });
        $('#depth').val($( "#depth-range" ).slider( "value"));
    }
    if($("#height_pallet-range").length > 0){
        $( "#height_pallet-range" ).slider({
            range: "min",
            min: 10,
            max: 40,
            value: 30,
            slide: function( event, ui ) {
                $('#height_pallet').val(ui.value);
            }
        });
        $('#height_pallet').val($( "#height_pallet-range" ).slider( "value"));
    }
    if($('section.catalog-filter .property .checkbox-group').length > 0 ){
        $('section.catalog-filter .property .checkbox-group').enscroll({
            verticalTrackClass: 'vertical-track2',
            verticalHandleClass: 'vertical-handle2',
            minScrollbarLength: 36,
            drawCorner : false

        });
    }
    $("#owl-big-image").owlCarousel({
        singleItem: true,
        pagination : false
    });
    $("#owl-big-image-sm").owlCarousel({
        pagination : false,
        navigation : true,
        items : 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        itemsTablet: [768,3],
        itemsMobile: [479,3],
        navigationText : ["",""],
        scrollPerPage : true
    });
    $("#owl-big-image-sm .item").on('click', function(){
        var $this = $(this);
        var index = $("#owl-big-image-sm .item").index($this);
        $("#owl-big-image").trigger('owl.goTo', index);
        return false;
    });
    if($('#countdown').length > 0){
        var date = $('#countdown').data('value').split(',');
        var austDay = new Date(date[0],date[1],date[2],date[3],date[4],date[5]);
        $('#countdown').countdown({
            until: austDay,
            padZeroes: true
        });
    }
    $('a[rel=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'right',
        content: function(){return '<img src="'+$(this).data('img') + '" />';}
    });
    $('.spiner-minus').on('click', function(){
        var $this = $(this);
        var $input = $this.closest('.spiner-group').find('input.form-control');
        var val = parseInt($input.val());
        if(val > 1){
            $input.val(--val);
        }
        return false;
    });
    $('.spiner-plus').on('click', function(){
        var $this = $(this);
        var $input = $this.closest('.spiner-group').find('input.form-control');
        var val = parseInt($input.val());
        $input.val(++val);
        return false;
    });
    $('.fancybox').fancybox();
});
function ajaxSearch(data){
    var $header_search_result = $('#header_search_result');
    var $header = $('<div/>').addClass('search_result');
    var json = {
        items : [
            {link : 'catalog_detail.html#1', name : 'Pool Spa Klio Ванна 160х70 PWP6610ZN000000', img : 'images/search-01.png'},
            {link : 'catalog_detail.html#2', name : 'Pool Spa Klio Ванна 160х70 PWP6610ZN000001', img : 'images/search-01.png'},
            {link : 'catalog_detail.html#3', name : 'Pool Spa Klio Ванна 160х70 PWP6610ZN000002', img : 'images/search-01.png'},
            {link : 'catalog_detail.html#4', name : 'Pool Spa Klio Ванна 160х70 PWP6610ZN000003', img : 'images/search-01.png'},
        ]
    };
    if(json.items !== undefined && json.items.length > 0){
        $.each(json.items, function(i, val){
            $header.append($('<div/>').addClass('item').html('<div class="img-wrap"><a href="'+val.link+'"><img src="'+val.img+'" alt="" /></a></div><div class="product-name"><a href="'+val.link+'">'+val.name+'</a></div>'));
        });
    }
    $header_search_result.append($header);
}