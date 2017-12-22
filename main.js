$(function () {

    /**
     * Расстояние между делениями на линейке
     */
    var scale = 39;



    /**
     * Получаем случайное целое число в промежутке от min до max (включительно)
     */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Анимация для стрелки
     */
    function animateArrow(arrow, widthArrow, inputVariable_width, inputVariable) {
        arrow.animate({
            width: widthArrow
        }, 'slow', function () {
            inputVariable.css('left', widthArrow / 2 - inputVariable_width / 2);
            inputVariable.show(400);
            inputVariable.focus();
        });
    }



    function init() {
        var variableA = getRandom(6, 9),
            sum = getRandom(11, 14),
            variableB = sum - variableA,
            termA = $('#termA'),
            termB = $('#termB'),
            result = $('#result'),
            arrow1 = $('#arrow1'),
            arrow2 = $('#arrow2');

        termA.text(variableA);
        termB.text(variableB);

        /**
         * Центрируем поле для ввода числа
         */
        var inputVariable = $('#variable1');
        var inputVariable_width = parseInt(inputVariable.css('width'));
        var inputVariable2 = $('#variable2');
        var inputVariable_width2 = parseInt(inputVariable2.css('width'));

        var widthArrow = variableA * scale;
        animateArrow(arrow1, widthArrow, inputVariable_width, inputVariable);
        
        $('.is_numeric').on('input', function(){
            this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
        });
            

        $('#form1').bind('focusout submit', function (e) {
            e.preventDefault();
            if ($(inputVariable).val() != variableA) {
                $(inputVariable).addClass('error');
                termA.addClass('error');
                $(inputVariable).focus();
                $(inputVariable).select();
            } else {
                termA.removeClass('error');
                $(inputVariable).removeClass('error');
                $(inputVariable).addClass('correctly');
                $(inputVariable).prop('disabled', true);

                var arrow2_wrapper = $('.arrow2');
                arrow2_wrapper.css('margin-left', widthArrow);
                arrow2_wrapper.css('display', 'inline');
                widthArrow2 = variableB * scale;
                animateArrow(arrow2, widthArrow2, inputVariable_width2, inputVariable2);

                $('#form2').bind('focusout submit', function (e) {
                    e.preventDefault();
                    if ($(inputVariable2).val() != variableB) {
                        $(inputVariable2).addClass('error');
                        termB.addClass('error');
                        $(inputVariable2).focus();
                        $(inputVariable2).select();
                    } else {
                        termB.removeClass('error');
                        $(inputVariable2).removeClass('error');
                        $(inputVariable2).addClass('correctly');
                        $(inputVariable2).prop('disabled', true);

                        result.val('');
                        result.prop('disabled', false);
                        result.focus();

                        $('#formResult').bind('focusout submit', function (e) {
                            e.preventDefault();
                            if ($(result).val() != sum) {
                                $(result).addClass('error');
                                $(result).focus();
                                $(result).select();
                            } else {
                                $(result).removeClass('error');
                                $(result).addClass('correctly');
                                $(result).prop('disabled', true);
                            }
                        });
                    }
                });
            }
        });
    }
    init();
});