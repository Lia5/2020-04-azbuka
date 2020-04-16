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

    //animatio-text
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
        
        var IntroLinks = $(".promo-home__links").find('.animated');

        IntroLinks.each(function(i,t) {
            var $this = $(t);				
            setTimeout(function(){ $this.addClass('fadeInUp'); },i*200);
        });
        
    },500);

    //quiz
    if(jQuery('.quiz').length) {
        $('.qa-next').click(function(e){
            e.preventDefault();
            if($(this).parent().prev().find('input:checked').length) {
                $(this).parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
            } else {
                $(this).parent().find('.quiz__error').text('Выберите вариант ответа!');
            }

            
        });
        // for radiobuttons
        $('input[type="radio"]+.pick-item__label').click(function(e){
            // $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');           
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
            if ( window.innerWidth < 750 || window.screen.width < 750) {
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
            }
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

    $('form').submit(function() { 
        var form = $(this);
        console.log(form);
        console.log(form.find('.btn-finish').attr('data-modal'));
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: form.serialize()
		}).done(function() {
            var numModal = form.find('.btn-finish').attr('data-modal');
            var modal =  $(numModal);
            var modalWrap = $('.modal__wrap');
            modalWrap.removeClass('fadeOutUp');
            modalWrap.addClass('fadeInDown');
            $('.modal').addClass('disabled');
            modal.removeClass('disabled');
            modal.addClass('flex');
            $('body').addClass('body-modal-open');
			setTimeout(function() {
				// Done Functions
				form.trigger("reset");
            }, 1000);
		});
		return false;
    });

    //click on form submit button - AMO
    $('.quiz__btn').on('click', function(){
        var btn = $(this);
        $($(this).closest('form')).each(function () {
            console.log($(this));
            var form = $(this);
            form.find('.rfield').addClass('empty_field');

                // Функция проверки полей формы

                form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');

                if (!form.find('.empty_field').length) {
                console.log('form');
                form2 = $('.quizForm');
                jQuery.ajax({
                    method: "POST",
                    data: form2.serialize(),
                    // url: quizAjax.url,
                    url: '../mail.php',
                    dataType: "json",
                    success: function (json) {
                        // if (json.success) {
                            // jQuery(".wizard-section").fadeOut(100);
                            // window.location.href = "/quiz-thanks/";
                        // }
                    }
                });
                /*window thank*/
                var numModal = btn.attr('href');
                var modal =  $(numModal);
                var modalWrap = $('.modal__wrap');
                modalWrap.removeClass('fadeOutUp');
                modalWrap.addClass('fadeInDown');
                $('.modal').addClass('disabled');
                modal.removeClass('disabled');
                modal.addClass('flex');
                $('body').addClass('body-modal-open');
                /*end window thank*/
                // fbq('track', 'Lead');
                }

                } else {}
                });
        })
    });
    if(jQuery('.time_of_day_hello').length) {
            var night = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">о</span><span class="animated">й</span> <span class="animated">н</span><span class="animated">о</span><span class="animated">ч</span><span class="animated">и,</span>';
            var morning = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">о</span><span class="animated">е</span> <span class="animated">у</span><span class="animated">т</span><span class="animated">р</span><span class="animated">о,</span>';
            var day = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">ы</span><span class="animated">й</span> <span class="animated">д</span><span class="animated">е</span><span class="animated">н</span><span class="animated">ь,</span>';
            var evening = '<span class="animated">Д</span><span class="animated">о</span><span class="animated">б</span><span class="animated">р</span><span class="animated">ы</span><span class="animated">й</span> <span class="animated">в</span><span class="animated">е</span><span class="animated">ч</span><span class="animated">е</span><span class="animated">р,</span>';
            
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

