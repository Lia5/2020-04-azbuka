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
            $(".phone-mask").mask("+38(999) 999-9999");
        });
    }
    //time
    // if (window.innerHeight < 821 || window.screen.height < 821) {

    // }


    //kviz
    if(jQuery('.kviz').length) {
        $('.qa-next').click(function(e){
            e.preventDefault();
            if($(this).parent().prev().find('input:checked').length) {
                $(this).parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
            } else {
                $(this).parent().find('.kviz__error').text('Выберите вариант ответа!');
            }

            
        });
        // for radiobuttons
        $('input[type="radio"]+.pick-item__label').click(function(e){
            $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');           
        });

        $(".qa-prev").click(function(e) {
            e.preventDefault();
            $(this).parent().parent('.step-slide').removeClass('step-slide--active').prev().addClass('step-slide--active');
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
          var modal =  $(numModal);
          modalWrap.removeClass('fadeOutUp');
          modalWrap.addClass('fadeInDown');
          modal.removeClass('disabled');
          modal.addClass('flex');
          $('body').addClass('body-modal-open');
          // body.addClass('body-modal');
          
            
          
        });
      
        $('.modal-close').click(function (){
            $('.main-menu').removeClass('active');
            $('.menu-toggle').removeClass('active');
            modalWrap.removeClass('fadeInDown');
            modalWrap.addClass('fadeOutUp');
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
                modalWrap.removeClass('fadeInDown');
                modalWrap.addClass('fadeOutUp');
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


    //click on form submit button - AMO
    $('.kviz__btn').on('click', function(){
        $($(this).parent().parent()).each(function () {
            var form = $(this);
            form.find('.rfield').addClass('empty_field');

                // Функция проверки полей формы

                form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');

                if (!form.find('.empty_field').length) {
                console.log('form');
                form = $('.quizForm');
                jQuery.ajax({
                    method: "POST",
                    data: form.serialize(),
                    // url: quizAjax.url,
                    url: '../sendamo.php',
                    dataType: "json",
                    success: function (json) {
                        // if (json.success) {
                            // jQuery(".wizard-section").fadeOut(100);
                            window.location.href = "/quiz-thanks/";
                        // }
                    }
                });
                fbq('track', 'Lead');
                }

                } else {}
                });
        })
    });


});

