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

        inputVariable.bind('focusout', function () {
            if ($(this).val() != variableA) {
                $(this).addClass('error');
                termA.addClass('error');
                $(this).focus();
                $(this).select();
            } else {
                termA.removeClass('error');
                $(this).removeClass('error');
                $(this).addClass('correctly');
                $(this).prop('disabled', true);

                var arrow2_wrapper = $('.arrow2');
                arrow2_wrapper.css('margin-left', widthArrow);
                arrow2_wrapper.css('display', 'inline');
                widthArrow2 = variableB * scale;
                animateArrow(arrow2, widthArrow2, inputVariable_width2, inputVariable2);

                inputVariable2.bind('focusout', function () {
                    if ($(this).val() != variableB) {
                        $(this).addClass('error');
                        termB.addClass('error');
                        $(this).focus();
                        $(this).select();
                    } else {
                        termB.removeClass('error');
                        $(this).removeClass('error');
                        $(this).addClass('correctly');
                        $(this).prop('disabled', true);

                        result.val('');
                        result.prop('disabled', false);
                        result.focus();

                        result.bind('focusout', function () {
                            if ($(this).val() != sum) {
                                $(this).addClass('error');
                                $(this).focus();
                                $(this).select();
                            } else {
                                var restart = confirm("Поздравляем! Хотите сыграть еще раз?");
                                if (restart) {
                                    location.reload();
                                } else {
                                    $('.game').hide(600, function () {
                                        $('.the-end').show(900);
                                    })
                                }
                            }
                        });
                    }
                });
            }
        });
    }
    init();
});