/*!
 * jQuery lockable Plugin.
 * A jQuery plugin that locks / unlocks any Textbox.
 *
 * Rubens Mariuzzo.
 */
jQuery(function ($) {

    $.fn.lockable = function (lock) {

        return $(this).each(function (counter, elem) {

            var $elem = $(elem),
                width = $elem.data('lockable.width');

            if (!width) {
                width = $elem.width();
                $elem.data('lockable.width', width);
            }

            function _lock($elem) {
                if (!$elem.data('lockable.locked')) {

                    $elem.on('mousemove', function (event) {
                        var $this = $(this),
                            zone = $this.outerWidth() - 20,
                            x = event.clientX - $this.offset().left;
                        $this[x >= zone ? 'addClass' : 'removeClass']('clickable');
                    }).on('click', function (event) {
                        var $this = $(this),
                            zone = $this.outerWidth() - 20,
                            x = event.clientX - $this.offset().left;
                        if (x >= zone) { _unlock($this); }
                    });

                    $elem.attr('readonly', true)
                        .addClass('locked')
                        .width($elem.width() - 20)
                        .data('lockable.locked', true);
                }
            }

            function _unlock($elem) {
                if ($elem.data('lockable.locked')) {
                    $elem.unbind('mousemove').unbind('click');
                    $elem.val('')
                        .removeAttr('readonly')
                        .removeClass('locked')
                        .width(width)
                        .data('lockable.locked', false);
                }
            }

            if (!$elem.data('lockable')) {

                width = $elem.width();
                _lock($elem);
                $elem.data('lockable', true);
            }

            if (typeof lock === 'boolean') {
                if (lock) {
                    _lock($elem);
                } else {
                    _unlock($elem);
                }
            }
        });
    };
});