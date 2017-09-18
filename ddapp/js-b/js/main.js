$(window).resize(function() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });
    });
    initSameHeight();
    // Вызов кастомного скролла
    $('.scroll-pane').jScrollPane();

    setTimeout(function() {
        initMicroColumnWidth();
    }, 500);

    brandlineButtonWidth();


});
$(document).ready(function() {

    // Раскрытие левого меню
    $(".js__arrow").click(function() {
        $(".sidebar").toggleClass("active");
        $(this).toggleClass("active");
    });

    var a = $('.js-detail').attr('aria-expanded');
    if (a == 'true') {
        $('.js-detail').html('Скрыть');
    }

    // Tooltips
    $(function() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });
    })

    $('.tools__delete').click(function() {
        $(this).closest('.tools__editing_item').remove();
    });

    // Вызов карусели на странице редактирования маршрутов
    $(".owl-carousel").owlCarousel({
        items: 1,
        mouseDrag: false,
        nav: true,
        navText: ['<svg class="icon icon-ico35"><use xlink:href="#icon-ico35"></use></svg> <span>предыдущая неделя</a>', '<span>следующая неделя</span> <svg class="icon icon-ico36"><use xlink:href="#icon-ico36"></use></svg>']
    });


    // Вызов кастомного скролла
    $('.scroll-pane').jScrollPane();

    // Обрезка текста многоточием
    $('.route__info').dotdotdot();

    // tools panel
    $('#tools_map').on('show.bs.tab', function(e) {
        $('.form-horizontal--inline').show();
        $('.tools-pagination').hide();
        $('.tools__panel--right').hide();

    });
    $('#tools_table').on('show.bs.tab', function(e) {
        $('.form-horizontal--inline').hide();
        $('.tools-pagination').show();
        $('.tools__panel--right').show();
    });




    // Same height

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        initSameHeight();
    });

    $('#collapseExample').on('hidden.bs.collapse', function() {
        initSameHeight();
    });

    $('#collapseExample').on('shown.bs.collapse', function() {
        initSameHeight();
    });



    // Bootstrap select
    $('.selectpicker').selectpicker({
        dropupAuto: false
    });

    $('#select-default').selectpicker();


    $('.add__product:eq(0)').find('.color__list').append('<li class="color__item js-color"></li>');
    $('.color-input').each(function(i, elem) {

        var hueb = new Huebee(elem, {
            // options
            staticOpen: true,
            setBGColor: '.js-color',
            setText: '.asdasdasd'
        }).on('change', function(color, hue, sat, lum) {
            /*$('.js-color').css('background', color);*/
            $('.add__product').find('.color__list').find('.js-color:eq(0)').css('background', color);
            colorGlobal = color;
        });
    });


    colorGlobal = '';

    // Добавление брендлайна
    initAddBrandline();

    // Добавление строки с ценой
    initAddRow();

    //Добавление размера к брендлайну
    initAddSize();

    // Удаление строки с ценой
    initDeleteTr();

    // Удаление размера брендлайна
    initDeleteSize();

    // Переключение цен
    togglePrice();

    // Пересчет маршрутов в колонке
    initCheckedPortlets();

    //Выделение маршрутов
    initSelectable();

    // Перетаскивание маршрутов
    initSortable();

    // переключение форм в модальном окне
    initModalForm();

    // Вызов модального окна в маршруте
    initModalOnPortlets();

    // выбор цвета
    initColor();


    // Удаление брендлайна
    initRemoveBrandline();


    // загрузка изображения для предпросмотра
    initImagesUpload();


    // ввод размера
    keyUpSize();


    // ввод первой ценовой категории
    keyUpF1();

    // ввод второй ценовой категории
    keyUpF2();

    brandlineButtonWidth();






    // установка начальных значений в предпросмотре
    var val_first = $('.add__size_block input').val();
    $('.add__table_td_size').text(val_first);




    var val_price_first = $('.add__price_td_f1 input').val();
    var val_price_second = $('.add__price_td_f2 input').val();
    var val_size = $('.add__size_block input').val();
    $('.add__price_view--f1').text(val_price_first);
    $('.add__price_view--f2').text(val_price_second);
    $('.add__table_td_size').text(val_size);

    initMicroColumnWidth();


});





function initMicroColumnWidth() {
    var micro__wr = $('.micro__wr').outerWidth();
    var diagramm = $('.diagramm').outerWidth();
    var width = $('.nav-micro').find('li:eq(0)').outerWidth() + $('.nav-micro').find('li:eq(1)').outerWidth() + $('.nav-micro').find('li:eq(2)').outerWidth() + $('.nav-micro').find('li:eq(3)').outerWidth();


    var micro__right = micro__wr - width;

    var grafik = diagramm - width;
    $('.micro__left').css('width', width);
    $('.diagramm__left').css('width', micro__right);

    $('.micro__right').css('width', micro__right);
    $('.grafik').css('width', grafik);
}







// Функция ввода размера
function keyUpSize() {
    $(document).on('keyup', '.add__size_block input', function() {
        var number_size = $(this).closest('.add__info').index();
        var value = $(this).val();

        $(this).closest('.add__product').find('.add__info--view').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(0)').find('.add__table_td_size').text(value);
    });
}


// Функция ввода ценовой категории
function keyUpF1() {
    $(document).on('keyup', '.add__price_td_f1 input', function() {
        var number_size = $(this).closest('.add__info').index();
        var number_tr = $(this).closest('.add__product').closest('.add__tr--dynamic').index();
        var value = $(this).val();

        $(this).closest('.add__product').find('.add__info--view').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(' + number_tr + ')').find('.add__price_view--f1').text(value);
    });
}

// Функция ввода ценовой категории
function keyUpF2() {
    $(document).on('keyup', '.add__price_td_f2 input', function() {
        var number_size = $(this).closest('.add__info').index();
        var number_tr = $(this).closest('.add__product').closest('.add__tr--dynamic').index();
        var value = $(this).val();

        $(this).closest('.add__product').find('.add__info--view').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(' + number_tr + ')').find('.add__price_view--f2').text(value);
    });
}


$('.js_delete_tr').hide();


// Добавление строки с ценой
function initAddRow() {
    $(document).on('click', '.js__add_row', function() {
        var number_tr = $(this).closest('.add__tr--dynamic').index();

        var number_size = $(this).closest('.add__info').index();

        var row = $(this).parents(".row").find('.js__add_row').closest('.add__tr--dynamic').clone().wrap('<div></div>').parent().html();
        var row1 = '<div class="add__tr add__tr--dynamic"><div class="add__td add__size_block add__size_block--td"><input type="text" class="form-control form-control--size" value="21-23"></div><div class="add__td add__price_category add__price_category--td"><select name="" id="" class="selectpicker"><option value="">минимаркет</option><option value="">HoReca</option></select></div><div class="add__td add__price add__price--td add__price_td_f1"><input type="text" class="form-control--table form-control" value="6 112, 45"></div><div class="add__td add__price add__price--td add__price_td_f2"><input type="text" class="form-control--table form-control" value="6 500, 45"></div><div class="add__plus add__td"><div class="add__holder add__holder--big js__add_row"><svg class="icon icon-plus"><use xlink:href="#icon-plus"></use></svg></div></div><div class="add__td"><div class="add__delete js_delete_tr"><svg class="icon icon-ico33 icon__gray"><use xlink:href="#icon-ico33"></use></svg></div></div></div></div>';

        $(this).closest('.add__tr').after(row1);

        $(this).closest('.add__tr').next('.add__tr').find('.add__size_block input').remove();

        /*$(this).closest('.add__product').find('.preview__table:eq(' + number_size + ')').append('<div class="preview__table_tr"><div class="add__table_td_size preview__table_td"></div><div class="preview__table_td"></div><div class="preview__table_td add__price_view add__price_view--f1"></div><div class="preview__table_td add__price_view add__price_view--f2"></div></div>');*/

        $(this).closest('.add__tr--dynamic').next('.add__tr--dynamic').find('.selectpicker').selectpicker();


        $(this).closest('.add__tr--dynamic').next('.add__tr--dynamic').find('.js_delete_tr').show();




        /*var f1 = $(this).closest('.add__tr').find('.add__price_td_f1 input').val();

        var f2 = $(this).closest('.add__tr').find('.add__price_td_f2 input').val();

        $(this).closest('.add__product').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(' + number_tr + ')').find('.add__price_view--f1').text(f1);

        $(this).closest('.add__product').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(' + number_tr + ')').find('.add__price_view--f2').text(f2);*/
    });




}

//Добавление блока размера
function initAddSize() {
    $(document).on('click', '.js_add_size', function() {
        var parent_size = $(this).closest(".add__product_wrapper").find('.add__product--pattern').find('.add__info:first-child').clone().wrap('<div></div>').parent().html();

        $(parent_size).insertBefore(this);

        $(this).closest('.add__product').find('.add__info--view').append('<div class="preview__table"><div class="preview__table_tr"><div class="add__table_td_size preview__table_td"></div><div class="preview__table_td"></div><div class="preview__table_td add__price_view add__price_view--f1"></div><div class="preview__table_td add__price_view add__price_view--f2"></div></div></div>');

        $(this).closest('.add__info--wr').find('select').selectpicker();

        var number_tr = $(this).closest('.add__tr--dynamic').index();
        /*$(this).closest('.add__product').find('.preview__table').find('.preview__table_tr:eq(' + number_tr + ')');*/

        var f1 = $(this).closest('.add__info--wr').find('.add__tr').find('.add__price_td_f1 input').val();

        var f2 = $(this).closest('.add__info--wr').find('.add__tr').find('.add__price_td_f2 input').val();

        var sz = $(this).closest('.add__info--wr').find('.add__info').find('.add__size_block input').val();

        $(this).closest('.add__product').find('.preview__table:eq(' + number_tr + ')').find('.add__price_view--f1').text(f1);

        $(this).closest('.add__product').find('.preview__table:eq(' + number_tr + ')').find('.add__price_view--f2').text(f2);

        $(this).closest('.add__product').find('.preview__table:eq(' + number_tr + ')').find('.add__table_td_size').text(sz);

        $(this).closest('.add__product').find('.js_delete_size').css('visibility', 'visible');

    });

}

// ширина кнопки добавления брендлайна
function brandlineButtonWidth() {
    var width = $('.add__product .add__item').outerWidth();
    $('.js_add_block').outerWidth(width);

}

// добавление брендлайна
function initAddBrandline() {
    var pattern = $('.add__product_wrapper').find('.add__product--pattern').clone();
    $('.js-product-delete').hide();
    $(document).on('click', '.js_add_block', function() {

        if ($('.add__product_wrapper').find('.add__product').length > 0) {
            $('.add__product_wrapper').find('.add__product').find('.js-product-delete').show();
        }

        var number_br = $(this).closest('.add__product').index();

        // Шаблон брендлайна
        var parent = $('.js_add_block').closest('.add__product_wrapper');

        $(pattern).addClass('add__product').removeClass('add__product--pattern');

        $(parent).append(pattern.clone().show());
        initImagesUpload();


        // проставляем айди для input file

        var i = 0;
        $(this).closest('.add__product_wrapper').find('.input-file').each(function() {
            i++;
            $(this).attr("id", "file-image-" + i);
            $(this).siblings('label').attr('for', "file-image-" + i);
        });

        // Вызываем плагин для селекта по айди
        y = 0;
        $(this).closest('.add__product_wrapper').find('.add__brand select').each(function() {
            y++;
            $(this).attr("id", "select-" + y);
            var id = "select-" + y;

            $("#select-" + y).selectpicker();
        });

        // скролл к верху нового брендлайна

        $('html, body').animate({
            scrollTop: $(this).closest('.add__product').next('.add__product').offset().top
        }, 700);

        // Вызываем плагин для селекта
        //
        $(this).closest('.add__product').next('.add__product').find('.add__info--wr').find('.add__info:first-child').find('select').selectpicker();

        var colorInput = $(this).closest('.add__product').next('.add__product').find('.color-input').get(0);



        // Имя брендлайна

        $('.add__brand select').on('changed.bs.select', function(e) {
            var prod_name = $(this).closest('.add__product').find('.add__brand .filter-option').text();

            $(this).closest('.add__product').find('.add__name').text(prod_name);
        });

        $(this).closest('.add__product').next('.add__product').find('.add__brand .selectpicker').selectpicker();


        $(this).closest('.add__product').next('.add__product').find('.add__brand > .bootstrap-select > button').remove();







        // Добавление цВета






        var li_prev = $(this).closest('.add__product').find('.color__list').html();






        $(this).closest('.add__product').next('.add__product').find('.color__list').append(li_prev);

        $('.add__product').find('.color__list').append('<li class="color__item js-color"></li>');

        $('.add__product').find('.color__list').find('.js-color:eq(' + number_br + ')').each(function(i, elem) {


            var colorOutput = elem;
            var color = '#f00';
            $(colorOutput).css('background', colorGlobal);

            // Вызов цветовой гаммы

            var hueb = new Huebee(colorInput, {
                // options
                staticOpen: true,
                setBGColor: colorOutput,
                setText: '.asdasdasd'
            }).on('change', function(color, hue, sat, lum) {
                $(colorOutput).css('background', color);
                $('.add__product').find('.color__list').find('.js-color:eq(' + number_br + ')').css('background', color);
                colorGlobal = color;
            });
        });








        $(this).closest('.add__product').find('.color__list').slick({
            infinite: false,
            vertical: true,
            verticalSwiping: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>'
        });







        $(this).closest('.add__product').prevAll('.add__product').find('.color__list').slick('unslick');


        if (!($('.add__product').find('.color__list').hasClass('.slick-slider'))) {
            $(this).closest('.add__product').prevAll('.add__product').find('.color__list').slick({
                infinite: false,
                vertical: true,
                verticalSwiping: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>'
            });
        }






        /*$('.color__list').slick('slickAdd', '<li class="color__item js-color"></li>');*/








        $('.add__product').each(function(i) {

            if ($('.add__product:eq(' + i + ')').find('.add__info').length <= 1) {
                $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'hidden');
            } else {
                $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'visible');
            }
        });
        initSameHeight();
    });
}

// удаление строки с ценой
function initDeleteTr() {
    $(document).on('click', '.js_delete_tr', function() {

        var parent = $(this).closest('.add__info');

        var parent_view = $(this).closest('.add__product').find('.add__info--view');

        var number_size = $(this).closest('.add__info').index();

        var number_tr = $(this).closest('.add__info').find('.add__tr--dynamic').index();



        if (parent_view.find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr').length > 1) {
            $(this).closest('.add__product').find('.preview__table:eq(' + number_size + ')').find('.preview__table_tr:eq(' + number_tr + ')').remove();
        }


        if (parent.find('.add__tr--dynamic').length > 1) {
            $(this).closest('.add__tr--dynamic').remove();
        }

    });
}

$('.add__product').each(function(i) {

    if ($('.add__product:eq(' + i + ')').find('.add__info').length <= 1) {
        $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'hidden');
    } else {
        $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'visible');
    }
});

// удаление размера
function initDeleteSize() {
    $(document).on('click', '.js_delete_size', function() {
        var parent = $(this).closest('.add__product');
        var number_size = $(this).closest('.add__info').index();

        console.log(number_size);
        if (parent.find('.preview__table').length > 1) {
            $(this).closest('.add__product').find('.preview__table:eq(' + number_size + ')').remove();
        }
        if (parent.find('.add__info').length > 1) {
            $(this).css('visibility', 'visible');
            $(this).closest('.add__info').remove();
        } else {
            $(this).css('visibility', 'hidden');
        }

        $('.add__product').each(function(i) {

            if ($('.add__product:eq(' + i + ')').find('.add__info').length <= 1) {
                $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'hidden');
            } else {
                $('.add__product:eq(' + i + ')').find('.js_delete_size').css('visibility', 'visible');
            }
        });
    });
}

// удаление продукта
function initRemoveBrandline() {
    $(document).on('click', '.js-product-delete', function() {
        /*$(this).closest('.add__product').prev('.add__product').find('.js_add_block').show();*/

        var number_br = $('.add__product').index();


        var lg = $(this).closest('.add__product_wrapper').find('.add__product').length;

        if (lg > 1) {
            $(this).closest('.add__product').remove();
            console.log('yo');
            $(this).closest('.add__product').find('.color__list').slick({
                infinite: false,
                vertical: true,
                verticalSwiping: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>'
            });
            $('.add__product').find('.color__list').slick('unslick');
            $('.add__product').find('.color__list').find('.color__item:eq(' + number_br + ')').remove();
        }








    });
}

// переключение между ценами
function togglePrice() {
    $(document).on('click', '.f__item', function() {
        // remove classes from all
        $(this).closest('ul').find('.f__item').removeClass("active");
        // add class to the one we clicked
        $(this).addClass("active");
        var parent = $(this).closest('.add__product');
        if ($(this).closest('ul').find('.f__item:eq(1)').is('.active')) {
            parent.find('.add__price_view--f1').hide();
            parent.find('.add__price_view--f2').css('display', 'inline-block');
        } else {
            parent.find('.add__price_view--f1').css('display', 'inline-block');
            parent.find('.add__price_view--f2').hide();
        }
    });
}







$('.add__brand select').on('changed.bs.select', function(e) {
    var prod_name = $(this).closest('.add__product').find('.add__brand .filter-option').text();

    $('.add__name').text(prod_name);
});





var countClick = 0;
$('.portlet').on('mouseover', function() {
    if (!(window.event.ctrlKey) && !(window.event.shiftKey)) {
        $('.handle').css('z-index', '2').focus();
        $('.handle').trigger('mousedown');
    } else {
        $('.handle').css('z-index', '0');
        $('.portlet').focus();
    }
});


// Функция выделения маршрута
function initSelectable() {

    $('.column').selectable({
        cancel: '.handle, .route-footer, .portlet-remove, .copy',
        filter: ".portlet",
        selected: function(event, ui) {
            countClick++;
            if (!(window.event.ctrlKey) && !(window.event.shiftKey)) {
                $('.portlet').removeClass('ui-selected');
            }
        },
        stop: function(event, ui) {
            $('#check-2').prop('checked', false);
            var lg_checked = $('.column__left').find('.portlet.ui-selected').length;
            $('.js_checked_portlets').text(lg_checked);
        }
    });
}



// Функция перетаскивания маршрутов
function initSortable() {

    $('.column').sortable({

        connectWith: ".column",
        handle: ".handle",
        items: ".portlet",
        stop: function(e, ui) {
            var selected = ui.item.data('multidrag');
            ui.item.after(selected);
            ui.item.remove();

            initModalOnPortlets();

            $('.column__right .column').each(function() {
                if (($(this).find('.portlet').length) == 0) {
                    $(this).find('.portlet__number_item').text('0');
                } else {
                    var lg = $(this).find('.portlet').length;
                    $(this).find('.portlet').closest('.column').find('.portlet__number_item').text(lg);
                }
            });


            $('.portlet-remove').on("click", function() {
                var lg_del = $(this).closest('.column__right .column').find('.portlet').length;
                if (lg_del == 0) {
                    $(this).closest('.column').find('.portlet__number_item').text('0');
                }
                $(this).closest('.column').find('.portlet__number_item').text(lg_del - 1);
                var start = $(this).closest('.column .portlet').remove();
                $('.start-column').append(start);
                initCheckedPortlets();


            });


            $('#check-2').prop('checked', false);
            initCheckedPortlets();

            var countClick = 0;
            $('.portlet').on('mouseover', function() {
                if (!(window.event.ctrlKey) && !(window.event.shiftKey)) {
                    $('.handle').css('z-index', '2').focus();
                    $('.handle').trigger('mousedown');
                } else {
                    $('.handle').css('z-index', '0');
                    $('.portlet').focus();
                }
            });


        },


        helper: function(e, item) {
            if (!item.hasClass('ui-selected')) {
                $('.column').find('.ui-selected').removeClass('ui-selected');
                item.addClass('ui-selected');
            }

            var selected = $('.ui-selected').clone();
            item.data('multidrag', selected);
            $('.ui-selected').not(item).remove();
            return $('<div class="transporter"></div>').append(selected);
        },
        change: function(e, ui) {
            $('.portlet').removeClass('ui-selected');
        },
        start: function(e, ui) {
            $('.portlet').removeClass('ui-selected');

        }
    }).disableSelection();

}

// Функция подсчета маршрутов
function initCheckedPortlets() {

    var lg = $('.column__left .portlet').length;
    $('.js_all_portlets').text(lg);
    var lg_checked = $('.column__left').find('.portlet.ui-selected').length;
    $('.js_checked_portlets').text(lg_checked);

    $('#check-2').on('change', function() {
        if ($(this).is(':checked')) {
            $('.column__left .portlet').each(function() {
                $(this).addClass('ui-selected');
                var lg_checked = $('.column__left').find('.portlet.ui-selected').length;
                $('.js_checked_portlets').text(lg_checked);
            });
        } else {
            $('.column__left .portlet').each(function() {
                $(this).removeClass('ui-selected');
                $('.js_checked_portlets').text('0');
            });
        }
    });
}

// Функция вызова модального окна в маршруте
function initModalOnPortlets() {
    $('.copy').click(function() {

        $('#editModal').modal('show');
    });
}

// Функция для форм в модальных окнах
function initModalForm() {
    $('#form__unchecked').hide();
    $('#modal-checked').change(function() {
        var bool = $(this).prop('checked');

        if (!bool) {
            $('#form__checked').show();
            $('#form__unchecked').hide();
        } else {
            $('#form__checked').hide();
            $('#form__unchecked').show();
        }
    });
}


// Функция вывода цветовой гаммы
function initColor() {
    $(document).on('click', '.load__small', function() {
        $(this).toggleClass("active");
        $(this).closest('.color-holder').find('.color-box').toggleClass('active');
    });
}




// Функция загрузки изображений
function initImagesUpload() {
    var i = 0;
    $('.inputfile').each(function() {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
        $input.on('change', function(element) {
            var tmppath = URL.createObjectURL(event.target.files[0]);
            $(this).closest('.add__product').find('.add__view').find('img').fadeIn("fast").attr('src', URL.createObjectURL(event.target.files[0]));

        });

        i++;
        $(this).attr("id", "file-" + i);
        $(this).closest('.js-labelFile').attr("for", "file-" + i);
    });

}
