/*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/

'use strict';

;
(function($, window, document, undefined) {
    $('.inputfile').each(function() {
        var $input = $(this),
            input = $input,
            $label = $input.next('label'),
            labelVal = $label.html();

        $input.on('change', function(e) {
            var fileName = '';

            if (this.files && this.files.length > 1) {
               
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                
            } else if (e.target.value) {
                fileName = e.target.value.split('\\').pop();
            }
            if (fileName) {
                
                $label.find('.count-img').html(fileName);
            } else
                $label.html(labelVal);
        });

        function removeImg() {
            $(document).on('click', '.img-delete', function() {

                $(this).closest('ul li').remove();

                /*$(this).closest('#list li').remove();*/
                var length = $('ul').find('li').length;

                // Сохраняем значения полей форм

                var name = $('#name').val();
                var description = $('#description').val();
                var DateFrom = $('#DateFrom').val();
                var DateTill = $('#DateTill').val();
                var route = $('#route').val();

                // Очищаем значения input file для возможности повторного выбора файла, который был удален
                $('#form')[0].reset();

                // Перезаписываем значения полей
                
                $('#name').val(name);
                $('#description').val(description);
                $('#DateFrom').val(DateFrom);
                $('#DateTill').val(DateTill);
                $('#route').val(route);

                $('.count-img').html('Прикреплено ' + length + ' фото');
            });
        }

        removeImg();


        // Firefox bug fix
        $input
            .on('focus', function() { $input.addClass('has-focus'); })
            .on('blur', function() { $input.removeClass('has-focus'); });
    });
})(jQuery, window, document);
