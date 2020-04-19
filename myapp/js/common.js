$(function() {
    //menu
    if(jQuery('.menu-toggle').length) {
        var menu = $('.menu-toggle');
        menu.on('click', function(){
            $('.main-menu').toggleClass('active');
            $('.menu-toggle').toggleClass('active');
            $('body').toggleClass('body-modal-open');
        });
        $('.main-menu').mouseup(function (e){ // событие клика по веб-документу
            var div = $(".main-menu ul"); // тут указываем ID элемента
            var close = $('.menu-toggle');
            if (close.is(e.target)) {
        
            } else if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.main-menu').toggleClass('active');
                $('.menu-toggle').toggleClass('active');
                $('body').toggleClass('body-modal-open');
              
            }
        });
    }
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            if ( window.innerWidth < 992 || window.screen.width < 992) {
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
            }
            return false;
        });
    }

    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+7(999) 999-9999");
        });
    }

    if (jQuery('.tooltip').length) {
        if (window.innerWidth < 1350 || window.screen.width < 1350) {
            $('.tooltip__title').on('click', function () {
                $(this).parent().toggleClass('active');
                var tooltipQa = $(this);
                $('body').mouseup(function (e) { // событие клика по веб-документу
                    var div = $(".tooltip"); // тут указываем ID элемента
                    // var close = $('.modal-close');
                    if (!div.is(e.target) // если клик был не по нашему блоку
                        && div.has(e.target).length === 0) { // и не по его дочерним элементам
                        tooltipQa.parent().removeClass('active');
                    }
                });
            });
        }
    }

    //animation-text
    if(jQuery('.letters').length) {
        $.fn.animate_Text = function() {
            this.addClass('active');
            var string = this.text();
            return this.each(function(){
                var $this = $(this);
                $this.html(string.replace(/./g, '<span class="animated">$&</span>'));
                // $this.find('span.new').each(function(i, el){
                // setTimeout(function(){ $(el).addClass('fadeIn'); }, 40 * i);
                // });
            });
        };
        var letters = $('.letters');
        for (var j=0; j<=letters.length; j++) {
            $(letters[j]).animate_Text();
        }
    }

    //animation
    setTimeout(function(){  
            
        var introLetter = $(".promo-home__title").find('.animated');
        introLetter.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeIn'); },i*20);
        });
        
        var introLetter = $(".animated-parent").find('.animated');
        introLetter.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeIn'); },i*20);
        });

        var IntroLinks = $(".promo-home__links").find('.animated');
        IntroLinks.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeInUp'); },i*200);
        });

        var IntroLinks = $(".home__text.animated");
        IntroLinks.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeInUp'); },i*200);
        });
        
    },500);

    //quiz
    if(jQuery('.quiz').length) {
        
        $('.qa-next').click(function(e){
            // console.log($(this).closest('.step-slide').find('input:checked').length);
            if($(this).hasClass('qa-del-discount')) {
                $('.quiz__discount').css('display', 'none');
            } 
            e.preventDefault();
            if($(this).closest('.step-slide').hasClass('step-slide--first') && $(this).closest('.step-slide').find('input:checked').length <2 ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите 2 варианта ответа!');
            } else if ($(this).closest('.step-slide').hasClass('step-slide--first') && $(this).closest('.step-slide').find('input:checked').length >2 ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите только 2 варианта ответа!');
            } else if ($(this).closest('.step-slide').hasClass('step-slide--text') && $(this).closest('.step-slide').find('input').val() == '' ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Введите ответ');
            } else if ($(this).closest('.step-slide').hasClass('step-slide--text') && $(this).closest('.step-slide').find('input').val() != '' ) {
                $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');

                // bubble +500
                if(jQuery('.quiz__discount-plus').length) {
                    $('.quiz__discount-plus').addClass('bubble');
                    setTimeout(function() {
                        $('.quiz__discount-plus').removeClass('bubble');
                    }, 1510);
                }
                
                // итоговая скидка
                if(jQuery('#total').length) {
                    var sum = +($('#total').html());
                    var total = sum + 500;
                    $('#total').html(total);
                    console.log(total);
                    
                }
            } else {
                if($(this).closest('.step-slide').find('input:checked').length) {
                    $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                    
                    // bubble +500
                    if(jQuery('.quiz__discount-plus').length) {
                        $('.quiz__discount-plus').addClass('bubble');
                        setTimeout(function() {
                            $('.quiz__discount-plus').removeClass('bubble');
                        }, 1510);
                    }
                    // итоговая скидка
                    if(jQuery('#total').length) {
                        var sum = +($('#total').html());
                        var total = sum + 500;
                        $('#total').html(total);
                        console.log(total);
                        
                    }
                } else {
                    $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите вариант ответа!');
                }
            }


            
        });
        // for radiobuttons
        $('input[type="radio"]+.pick-item__label').click(function(e){
            // $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');           
        });

        $(".qa-prev").click(function(e) {
            e.preventDefault();
                $(this).closest('.step-slide').removeClass('step-slide--active').prev().addClass('step-slide--active');
            
                // итоговая скидка
                if(jQuery('#total').length) {
                    var sum = +($('#total').html());
                    var total = sum - 500;
                    $('#total').html(total);
                }
        });
    }

    //popup
    if(jQuery('.modal__wrap').length) {
        let modalWrap = $('.modal__wrap');
        //popup
        $(".modal-open").click(function (e){
          e.preventDefault();
          var btn = $(this);
          var numModal = btn.attr('href');
          if(numModal == '#modalQuiz'){

            $('.qa-del-discount').css('display', 'block');
          }
          var modal =  $(numModal);
        //   modalWrap.removeClass('fadeOutUp');
        //   modalWrap.addClass('fadeInDown');
          modalWrap.removeClass('animated zoomOut');
          modalWrap.addClass('animated zoomIn');
          modal.removeClass('disabled');
          modal.addClass('flex');
          $('body').addClass('body-modal-open');
          // body.addClass('body-modal');

        });
        $('.modal-close').click(function (){
            if ( window.innerWidth < 750 || window.screen.width < 750) {
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
            }
            // modalWrap.removeClass('fadeInDown');
            // modalWrap.addClass('fadeOutUp');
            modalWrap.removeClass('animated zoomIn');
            modalWrap.addClass('animated zoomOut');
            setTimeout(function() {
                $('.modal').addClass('disabled');
                }, 700);
            setTimeout(function() {
                $('.modal').removeClass('flex');
                $('body').removeClass('body-modal-open');
                }, 800);  
        });
        $('.modal').mouseup(function (e){ // событие клика по веб-документу
          var div = $(".modal__body"); // тут указываем ID элемента
          var close = $('.modal-close');
          if (close.is(e.target)) {
          } else if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
                var modalWrap = $('.modal__wrap');
                // modalWrap.removeClass('fadeInDown');
                // modalWrap.addClass('fadeOutUp');
                modalWrap.removeClass('animated zoomIn');
                modalWrap.addClass('animated zoomOut');
                setTimeout(function() {
                    $('.modal').addClass('disabled');
                }, 700);
                setTimeout(function() {
                    $('.modal').removeClass('flex');
                    $('body').removeClass('body-modal-open');
                }, 800);
          }
        });
    }
   // UTM
   function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    $('form').find('input.utm_source').each(function() {
        var a = getQueryVariable('utm_source');
        if(a){
            $(this).val(a);
        }
    }); 
    $('form').find('input.utm_medium').each(function() {
        var a = getQueryVariable('utm_medium');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_campaign').each(function() {
        var a = getQueryVariable('utm_campaign');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_term').each(function() {
        var a = getQueryVariable('utm_term');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_content').each(function() {
        var a = getQueryVariable('utm_content');
        if(a){
            $(this).val(a);
        }
    });

    // form
    $('form').submit(function() { 
        var form = $(this);
        console.log(form);
        console.log(form.find('.btn-finish').attr('data-modal'));
        form.find('.rfield').addClass('empty_field');

        // Функция проверки полей формы

        form.find('.rfield').each(function(){
            
        console.log($(this));
            if($(this).val() != ''){
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');
                if (!form.find('.empty_field').length) {
                    console.log($(this));
                    $.ajax({
                        type: "POST",
                        url: "../mail.php", //Change
                        data: form.serialize()
                    }).done(function() {
                        var numModal = form.find('.btn-finish').attr('data-modal');
                        var modal =  $(numModal);
                        var modalWrap = $('.modal__wrap');
                        // modalWrap.removeClass('fadeOutUp');
                        // modalWrap.addClass('fadeInDown');
                        modalWrap.removeClass('animated zoomOut');
                        modalWrap.addClass('animated zoomIn');
                        $('.modal').addClass('disabled');
                        modal.removeClass('disabled');
                        modal.addClass('flex');
                        $('body').addClass('body-modal-open');
                        setTimeout(function() {
                            // Done Functions
                            form.trigger("reset");
                        }, 1000);
                    });
                }
            } else {}
        });
		return false;
    });

    if(jQuery('.time_of_day_hello').length) {
        var night = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">о</span><span class="animated">й</span> <span class="animated">н</span><span class="animated">о</span><span class="animated">ч</span><span class="animated">и, </span>';
        var morning = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">о</span><span class="animated">е</span> <span class="animated">у</span><span class="animated">т</span><span class="animated">р</span><span class="animated">о, </span>';
        var day = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">ы</span><span class="animated">й</span> <span class="animated">д</span><span class="animated">е</span><span class="animated">н</span><span class="animated">ь, </span>';
        var evening = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">ы</span><span class="animated">й</span> <span class="animated">в</span><span class="animated">е</span><span class="animated">ч</span><span class="animated">е</span><span class="animated">р, </span>';
            
        var d = new Date()
        var time = d.getHours()
        if (time >= 5 && time < 12){
            $('.time_of_day_hello').html(morning);
        } else if (time >= 12 && time < 18) {
            $('.time_of_day_hello').html(day);
        } else if (time >= 18 && time < 23) {
            $('.time_of_day_hello').html(evening);
        } else {
            $('.time_of_day_hello').html(night);
        }
    }


});

