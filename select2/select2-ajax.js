(function ($) {
    $.fn.select2ajax = function (options) {
        var data_url = $(this).data('url');
        
        this.select2({
            'language': {
                'noResults': function () {
                    return 'Няма намерени резултати';
                },
                'searching': function () {
                    return 'Търсене...'
                },
                'loadingMore': function () {
                    return 'Зареждане на още резултати…';
                },
                'errorLoading': function () {
                    return 'Грешка. Резултатите не можаха да се заредят';
                },
                'inputTooShort': function (args) {
                    var remainingChars = args.minimum - args.input.length;

                    var message = 'Моля въведете ' + remainingChars + ' или повече символа';

                    return message;
                },
            },
            'placeholder': '-- Изберете --',
            'width': '100%',
            'allowClear': true,
            minimumInputLength: (options && options.minLength) || 2,
            ajax: {
                url: app.baseUrl + (options && options.url || data_url),
                dataType: 'json',
                delay: options && options.delay || 250,
                data: function (params) {
                    return {
                        query: params.term,
                        page: params.page
                    }
                },
                processingResutls: function (data, params) {
                    params.page = params.page || 1;

                    return {
                        results: data,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                escapeMarkup: function (markup) { return markup; }, // let our custom formatter work                
                templateResult: function (item) {
                    return '<div>' + item.text + '</div>';
                },
                templateSelection: function (item) {
                    return "<div>" + item.text + "</div>";
                }
            }
        });

        var id = $(this).data('id');
        var text = $(this).data('text');

        if (id && text) {
            $(this).append('<option value="' + id + '">' + text + '</option>');
            $(this).trigger('change');
        }
    }
})(jQuery);