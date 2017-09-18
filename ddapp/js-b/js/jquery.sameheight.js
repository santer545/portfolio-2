// Same height blocks

jQuery(function() {
    initSameHeight();
});



function initSameHeight() {
    jQuery('.column__row').sameHeight({
        elements: '.column__left, .column__right, .owl__wr',
        flexible: true,
        multiLine: true,
        biggestHeight: true
    });
    jQuery('.add__product').sameHeight({
        elements: '.add__item, .add__view',
        flexible: true,
        multiLine: true,
        biggestHeight: true
    });
};
(function($) {
    $.fn.sameHeight = function(opt) {
        var options = $.extend({
            skipClass: 'same-height-ignore',
            leftEdgeClass: 'same-height-left',
            rightEdgeClass: 'same-height-right',
            elements: '>*',
            flexible: false,
            multiLine: false,
            useMinHeight: false,
            biggestHeight: false
        }, opt);
        return this.each(function() {
            var holder = $(this),
                postResizeTimer, ignoreResize;
            var elements = holder.find(options.elements).not('.' + options.skipClass);
            if (!elements.length) return;

            function doResize() {
                elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
                if (options.multiLine) {
                    resizeElementsByRows(elements, options);
                } else {
                    resizeElements(elements, holder, options);
                }
            }
            doResize();
            var delayedResizeHandler = function() {
                if (!ignoreResize) {
                    ignoreResize = true;
                    doResize();
                    clearTimeout(postResizeTimer);
                    postResizeTimer = setTimeout(function() {
                        doResize();
                        setTimeout(function() {
                            ignoreResize = false;
                        }, 10);
                    }, 100);
                }
            };
            if (options.flexible) {
                $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
            }
            $(window).bind('load', delayedResizeHandler);
        });
    };
    var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

    function resizeElementsByRows(boxes, options) {
        var currentRow = $(),
            maxHeight, maxCalcHeight = 0,
            firstOffset = boxes.eq(0).offset().top;
        boxes.each(function(ind) {
            var curItem = $(this);
            if (curItem.offset().top === firstOffset) {
                currentRow = currentRow.add(this);
            } else {
                maxHeight = getMaxHeight(currentRow);
                maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
                currentRow = curItem;
                firstOffset = curItem.offset().top;
            }
        });
        if (currentRow.length) {
            maxHeight = getMaxHeight(currentRow);
            maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        }
        if (options.biggestHeight) {
            boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
        }
    }

    function getMaxHeight(boxes) {
        var maxHeight = 0;
        boxes.each(function() {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        return maxHeight;
    }

    function resizeElements(boxes, parent, options) {
        var calcHeight;
        var parentHeight = typeof parent === 'number' ? parent : parent.height();
        boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i) {
            var element = $(this);
            var depthDiffHeight = 0;
            var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || '-webkit-box-sizing' === 'border-box';
            if (typeof parent !== 'number') {
                element.parents().each(function() {
                    var tmpParent = $(this);
                    if (parent.is(this)) {
                        return false;
                    } else {
                        depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
                    }
                });
            }
            calcHeight = parentHeight - depthDiffHeight;
            calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();
            if (calcHeight > 0) {
                element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
            }
        });
        boxes.filter(':first').addClass(options.leftEdgeClass);
        boxes.filter(':last').addClass(options.rightEdgeClass);
        return calcHeight;
    }
}(jQuery));
jQuery.onFontResize = (function($) {
    $(function() {
        var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
        var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');
        resizeFrame.css({
            width: '100em',
            height: '10px',
            position: 'absolute',
            borderWidth: 0,
            top: '-9999px',
            left: '-9999px'
        }).appendTo('body');
        if (window.attachEvent && !window.addEventListener) {
            resizeFrame.bind('resize', function() {
                $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
            });
        } else {
            var doc = resizeFrame[0].contentWindow.document;
            doc.open();
            doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
            doc.close();
        }
        jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
    });
    return {
        trigger: function(em) {
            $(window).trigger("fontresize", [em]);
        }
    };
}(jQuery));














