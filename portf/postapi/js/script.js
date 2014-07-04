// У пользователя не должно быть объявлено глобальной переменной POST
var POST = {
    opt: {
        apikey                    : 'hk7934npkfu6s8vo',
        apiurl                    : 'http://post-api.ru/api/v2/',
        //apiurl                  : 'http://post-api.ru/api/v3dev/',
        MS_BEFORE_CBP             : 300,         //время в мс между вводом и запросом на сервер CBP
        TXT_EMPTY_CITIES_LIST     : 'Город не найден, попробуйте ввести другой запрос',
        TXT_EMPTY_STREETS_LIST    : 'Улица не найдена, попробуйте ввести другой запрос',
        TXT_EMPTY_HOUSES_LIST     : 'Дом не найден',
        TXT_INDEX_DOESNT_EXISTS   : 'Введите, пожалуйста, существующий индекс',
        TXT_INDEX_TOO_LONG        : 'Пожалуйста, сократите индекс до 6 цифр',
        TXT_ADD_ADDRESS           : 'Добавьте адрес',
    },
    cbpTimer: null,
    prevCityVal: '',
    // метод - определение адреса по почтовому индексу
    abi: function(index, inputId) {
        var input     = $('#'+inputId).prop('disabled',true),
            inputWrap = input.parent().addClass('pa_form_input_loading');
        $.jsonp({   
            url: POST.opt.apiurl + 'abi_js.php',
            data: {
                apikey : POST.opt.apikey,
                jqurl  : location.hostname || 'localhost',
                p      : index,        // почтовый индекс
                cf     : 1,            // структура city будет всегда заполнена
                abc    : 0            
            },
            success: function(data, status, jqXHR) {
                console.log(data);
                if (data.source.postalcode == input.val()) {
                    var cityid     = data.content.route.city.aoguid,
                        shortname  = data.content.route.city.shortname,
                        formalname = data.content.route.city.formalname,
                        print_string = data.content.route.print_string;
                    POST.cities.list = [];
                    if (cityid) {
                        POST.cities.list.unshift({
                            id          : cityid,
                            name        : shortname + ' ' + formalname,
                            formalname  : formalname,
                            print_string : print_string,
                            index       : index,
                            mkad        : (data.content.mkad?data.content.mkad.from_mkad:0)
                        });
                        POST.showCities(inputId);
                        POST.COOKIE.setCookie("postapi_zipandcity_input", formalname, POST.COOKIE.getExpDate(10));
                        POST.COOKIE.setCookie("last_method", data.id, POST.COOKIE.getExpDate(10));
                        POST.COOKIE.setCookie("index", data.source.postalcode, POST.COOKIE.getExpDate(10));
                        POST.COOKIE.setCookie("cityd", cityid, POST.COOKIE.getExpDate(10));

                        if (data.content.mkad) {
                            POST.COOKIE.setCookie("mkad", data.content.mkad.mkad_km, POST.COOKIE.getExpDate(10));
                        }
                    }
                    else {
                        $('.pa_cities_list').remove();
                        var city        = $('#pa_zipandcity'),
                            cityNote    = city.next('.pa_form_input_note'),
                            cityNoteTxt = cityNote.text();
                        POST.addError(city);
                        cityNote.data('text',cityNoteTxt).text(POST.opt.TXT_INDEX_DOESNT_EXISTS);
                    }
                }
                else {
                    POST.houses.list = [];
                    var dc = data.content;
                        for (var i = dc.streets.length - 1; i >= 0; i-- ) {
                            if ( dc.streets[i].houses && ($('#pa_street').val() == (dc.streets[i].shortname + ' , ' + dc.streets[i].formalname)) ) {
                                for (var j = dc.streets[i].houses.length - 1; j >= 0; j--) {
                                    POST.houses.list.unshift ({
                                        housenum : dc.streets[i].houses[j].housenum
                                    });
                                }
                            }
                        POST.showHouses(inputId);
                        }
                }
            },
            error: function(jqXHR, status, errorType) {
                console.log(status+': '+errorType);
            },
            // когда заершаем поиск, убирается gif и активируется форма
            complete: function(jqXHR, status) {
                input.prop('disabled',false);
                inputWrap.removeClass('pa_form_input_loading');
            }
        });
    },
    // метод - определение города по фрагменту названия
    cbp: function(city, inputId) {
        var input     = $('#'+inputId).prop('disabled', false),
            inputWrap = input.parent().addClass('pa_form_input_loading');
        $.jsonp({
            url: POST.opt.apiurl + 'cbp_js.php',
            data: {
                apikey : POST.opt.apikey,
                jqurl  : location.hostname || 'localhost',
                city   : city,   // в обязательный параметре будет фрагмент города
                hl     : 1,      // в итоговом результате все вхождения поисковой строки будут обрамлены тегом
                cf     : 1       // структура city будет всегда заполнена
            },
            success: function(data, status, jqXHR) {
                console.log(data);
                if (data.source.city == input.val().toLowerCase()) {
                    POST.cities.list = [];
                    for (var i = data.content.length - 1; i >= 0; i--) {
                        var cityid     = data.content[i].cityid,
                            shortname  = data.content[i].city.shortname,
                            formalname = data.content[i].city.formalname;
                        POST.cities.list.unshift({
                            id          : cityid,
                            name        : shortname + ' ' + formalname,
                            formalname  : formalname,
                            print_string : data.content[i].print_string,
                            mkad        : (data.content[i].mkad?data.content[i].mkad.from_mkad:0)
                        });
                    }
                    POST.showCities(inputId);
                    POST.COOKIE.setCookie("postapi_zipandcity_input", formalname, POST.COOKIE.getExpDate(10));
                    POST.COOKIE.setCookie("last_method", data.id, POST.COOKIE.getExpDate(10));
                    POST.COOKIE.setCookie("cityd", cityid, POST.COOKIE.getExpDate(10));
                    if (data.content.mkad) {
                        POST.COOKIE.setCookie("mkad", data.content.mkad.from_mkad, POST.COOKIE.getExpDate(10));
                    }
                }
            },
            error: function(jqXHR, status, errorType) {
                console.log(status+': '+errorType);
            },
            complete: function(jqXHR, status) {
                inputWrap.removeClass('pa_form_input_loading');
            }
        });
    },
    // метод - определение улицы по фрагменту имени
    sbp: function(cityid, streetVal, inputId) {
        var input     = $('#'+inputId).prop('disabled', true),
            inputWrap = input.parent().addClass('pa_form_input_loading');
        $.jsonp({
            url: POST.opt.apiurl + 'sbp_js.php',
            data: {
                apikey : POST.opt.apikey,
                jqurl  : location.hostname || 'localhost',
                cityid : cityid,
                street : streetVal, // фрагмент названия улицы
                hl     : 1,
                limit  : 100
            },
            success: function(data, status, jqXHR) {
                console.log(data);
                    POST.streets.list = [];
                    for (var i = data.content.length - 1; i >= 0; i--) {
                        POST.streets.list.unshift({
                            formalname: data.content[i].formalname,
                            shortname : data.content[i].shortname
                        });
                    }
                    POST.showStreets('pa_street');
            },
            error: function(jqXHR, status, errorType) {
                console.log(status+': '+errorType);
            },
            complete: function (jqXHR, status, errorType) {
                input.prop('disabled', false);
                inputWrap.removeClass('pa_form_input_loading');
            }
        });
    },
    // метод для определения индекса адресного объекта
    ibc: function (cityid, streetVal, inputId) {
        var input     = $('#'+inputId).prop('disabled', false),
            inputWrap = input.parent().addClass('pa_form_input_loading');
            $.jsonp({
                url: POST.opt.apiurl + 'ibc_js.php',
                data: {
                    apikey : POST.opt.apikey,
                    jqurl  : location.hostname || 'localhost',
                    c      : cityid,    // фрагмент названия города (приходят из параметров метода ibc)
                    s      : streetVal // фрагмент названия улицы
            },
            success: function (data, status, jqXHR) {
                console.log(data);
                POST.indexes.list = [];
                for (var i = data.content.length - 1; i >=0; i--) {
                    for (var j = data.content[i].indexes.length - 1; j >= 0; j--) {
                        POST.indexes.list.unshift({
                        postalcode : data.content[i].indexes[j]// 
                        }           
                    )
                    };
                }
                    POST.showIndexes('pa_index');
            },
            error: function(jqXHR, status, errorType) {
                console.log(status+': '+errorType);
            },
            complete: function (jqXHR, status, errorType) {
                input.prop('disabled', false);
                inputWrap.removeClass('pa_form_input_loading');
            }
        });
    },
    // объект массивов объектов городов
    cities: {
        list: [{
            id          : 'Значение поля cityid',
            name        : 'Значение полей city.shortname + " " + city.formalname',
            formalname  : 'Значение полей city.formalname',
            print_string : 'Значение поля print_string',
            index       : 'почтовый индекс',
            mkad        : 'Значение поля data.content.mkad.from_mkad или 0'
        }],
        onClick: function(e){
            var city = $(e.target).closest('li');
            if ( !city.hasClass('pa_cities_empty')) {
                $('#pa_zipandcity')
                    .val(city.data('name'))
                    .data({
                        id          : city.data('id'),
                        formalname  : city.data('formalname'),
                        index       : city.data('index')?city.data('index'):'',
                        mkad        : city.data('mkad')?city.data('mkad'):0,
                        print_string : city.data('print_string')
                    });
                POST.removeError('#pa_zipandcity');
                var full_address_city_name = $('#pa_zipandcity').data('print_string');
                $('.full_address_city').text( full_address_city_name + ', ');
                $('.pa_cities_list').remove();
            }
        }
    },
    // объект массивов объектов улиц
    streets: {
        list:[{
            formalname  : 'Формальное название улицы',
            shortname   : 'Название улицы и т.д'
        }],
        onClick: function (e) {
            var street = $(e.target).closest('li');
            if ( !street.hasClass('pa_cities_empty') ) {
                $('#pa_street')
                    .val(street.data('formalname') + ' ' + street.data('shortname'))
                    .data({
                        formalname       : street.data('formalname'),
                        shortname        : street.data('shortname')
                    });
                POST.removeError('#pa_street');
                $('.full_address_street').text(',' +$('#pa_street').data('shortname') + ' ' + $('#pa_street').data('formalname'));
                $('.pa_cities_list').remove();
            }
        }
    },
    // объект массивов объектов индексов
    indexes: {
        list:[{
            postalcode    : 'Искомый индекс'
        }],
        onClick: function (e) {
            var index = $(e.target).closest('li');
            if (!index.hasClass('pa_cities_empty')) {
                $('#pa_index')
                .val(index.data("postalcode"))
                .data({postalcode : index.data('postalcode')});
                POST.removeError('#pa_index');
                var full_address_index_name = $('#pa_index').data('postalcode');
                $('.full_address_index').text(full_address_index_name + ',');
                $('.pa_cities_list').remove();
            }
        }
    },
    // объект массивов объектов домов
    houses: {
        list: [{
            housenum    : 'Значение - номер дома'
        }],
        onClick: function (e) {
            var house = $(e.target).closest('li');
            if(!house.hasClass('pa_cities_empty'))  {
                $('#pa_house')
                .val(house.data('housenum'))
                .data({
                    housenum        : house.data('housenum')
                });
                POST.removeError('#pa_house');
                var full_address_house = $('#pa_house').data('housenum');
                $('.full_address_house').text(' д. ' + full_address_house);
                $('.pa_cities_list').remove();
            } 
        }
    },
    showHouses: function (inputId) {
        $('.pa_cities_list').remove();
        var input      = $('#'+inputId),
            housesList = $('<ul class="pa_cities_list"></ul>').on('click', POST.houses.onClick);
        if (POST.houses.list.length) {
            for (var i = POST.houses.list.length - 1; i >= 0; i--) {
                housesList.prepend(
                    '<li'+
                        ' data-housenum="' + POST.houses.list[i].housenum + '"' +
                    '>' 
                        + POST.houses.list[i].housenum +
                    '</li>'
            );
        }
        }
        else{
            housesList.prepend('<li class="pa_cities_empty">' + POST.opt.TXT_EMPTY_HOUSES_LIST + '</li>');
        }
        housesList.insertAfter(input);
    },
    showCities: function(inputId) {
        $('.pa_cities_list').remove();
        var input      = $('#'+inputId);

        var citiesList = $('<ul class="pa_cities_list"></ul>').on('click', POST.cities.onClick);
        if (POST.cities.list.length) {
            for (var i = POST.cities.list.length - 1; i >= 0; i--) {
                citiesList.prepend(
                    '<li'+
                        ' data-id="'+ POST.cities.list[i].id + '"' +
                        ' data-name="' + POST.cities.list[i].name + '"' +
                        ' data-formalname="' + POST.cities.list[i].formalname + '"' +
                        (POST.cities.list[i].index?' data-index="' + POST.cities.list[i].index + '"':'') +
                        (POST.cities.list[i].mkad?' data-mkad="' + POST.cities.list[i].mkad + '"':'') +
                        'data-print_string="'+ POST.cities.list[i].print_string + '"' +'>'
                        +POST.cities.list[i].print_string+
                    '</li>'
                );
            }
        }else{
            citiesList.prepend('<li class="pa_cities_empty">' + POST.opt.TXT_EMPTY_CITIES_LIST + '</li>');
        }
        citiesList.insertAfter(input);
    },
    showStreets: function(inputId) {
        $('.pa_cities_list').remove();
        var input      = $('#'+inputId),
            streetsList = $('<ul class="pa_cities_list"></ul>').on('click', POST.streets.onClick);
        if (POST.streets.list.length) {
            for (var i = POST.streets.list.length - 1; i >= 0; i--) {
                streetsList.prepend(
                    '<li'+
                        ' data-formalname="' + POST.streets.list[i].formalname + '"' +
                        ' data-shortname ="' + POST.streets.list[i].shortname  + '"' +
                        '>' + POST.streets.list[i].shortname + " " + POST.streets.list[i].formalname +
                    '</li>'
                );
            }
        }else{
            streetsList.prepend('<li class="pa_cities_empty">' + POST.opt.TXT_EMPTY_STREETS_LIST + '</li>');
        }
        streetsList.insertAfter(input);
    },
    showIndexes : function (inputId) {
        $('.pa_cities_list').remove();
        var input      = $('#'+inputId),
            indexesList = $('<ul class="pa_cities_list"></ul>').on('click', POST.indexes.onClick);
            if (POST.indexes.list.length) {
            for (var i = POST.indexes.list.length - 1; i >= 0; i--) {
                indexesList.prepend(
                    '<li' + ' data-postalcode="'+ POST.indexes.list[i].postalcode + '" ' + '>'
                        + POST.indexes.list[i].postalcode +
                    '</li>'
                );
            }
        }
        else {
            indexesList.prepend('<li class="pa_cities_empty">' + POST.opt.TXT_INDEX_DOESNT_EXISTS + '</li>');
        }
        indexesList.insertAfter(input);
    },
    // Отобразить сообщение об ошибке (добавить input красный цвет и bg)
    addError: function(input) {
        $(input).parent().addClass('pa_error');
    },
    // Скрыть сообщение об ошибке
    removeError: function(input) {
        var input = $(input),
            note  = input.next('.pa_form_input_note');
        input.parent().removeClass('pa_error');
        note.text(note.data('text'));
    },
    COOKIE: {
        // получение даты (срок хранения куки)
        getExpDate: function(days, hours, minutes, seconds) {
            var expDate = new Date();
            if (days) expDate.setDate(expDate.getDate() + parseInt(days,10));
            if (hours) expDate.setHours(expDate.getHours() + parseInt(hours,10));
            if (minutes) expDate.setMinutes(expDate.getMinutes() + parseInt(minutes,10));
            if (seconds) expDate.setSeconds(expDate.getSeconds() + parseInt(seconds,10));
            return expDate.toUTCString();
        },
        // получить куки
        getCookie: function(name) {
            var arrCookie = document.cookie.split("; ");
            for (var i=0; i<arrCookie.length; i++) {
                var oneCookie = arrCookie[i].split("=");
                if (name == oneCookie[0]) return unescape(oneCookie[1]);
            }
        },
        // установить куки
        setCookie: function(name, value, expires, path, domain, secure) {
            document.cookie = name + "=" + escape(value) +
                (expires ? ";expires=" + expires : "") + 
                (path ? ";path=" + path : "") +
                (domain ? ";domain=" + domain : "") +
                (secure ? ";secure" : "");
        }
    }
};

$(function(){
    $('#pa_zipandcity').on('keyup', function(e){
            var cityVal = $(this).val();
            if (cityVal != POST.prevCityVal) {
                POST.prevCityVal = cityVal;
                var index   = parseInt(cityVal, 10),
                    inputId = this.id;
                $(this).removeData('id','name');
                POST.removeError(this);
                clearTimeout(POST.cbpTimer);
                if (cityVal.length == 6 && index > 99999) 
                    POST.abi(index, inputId);
                else 
                    if (cityVal.length > 1 && !index) {
                        POST.cbpTimer = setTimeout(function(){POST.cbp(cityVal, inputId);}, POST.opt.MS_BEFORE_CBP);
                    }
                    else 
                        if (cityVal.length > 6 && index) {
                        var city        = $('#pa_zipandcity'),
                            cityNote    = city.next('.pa_form_input_note'),
                            cityNoteTxt = cityNote.text();
                        POST.addError(city);
                        cityNote.data('text',cityNoteTxt).text(POST.opt.TXT_INDEX_TOO_LONG);
                    }
            else $('.pa_cities_list').remove();
            }
        })
        .on('click', function(e){
            var next = $(this).next();
            if ( next.hasClass('pa_cities_list') ) next.show();
        });
    $('#pa_street').on('keyup', function (e) {
            var streetVal = $(this).val(),
            saveCityId = $('#pa_zipandcity').data('id');
            if (streetVal != POST.prevCityVal) {
                POST.prevCityVal = streetVal;
                var inputId = this.id;
                $(this).removeData('id','name');
                POST.removeError(this);
                clearTimeout(POST.cbpTimer);
                if (streetVal.length > 0) POST.cbpTimer = setTimeout(function(){POST.sbp(saveCityId ,streetVal, inputId);}, POST.opt.MS_BEFORE_CBP);
                else $('.pa_cities_list').remove();
            }
        })
        .on('click', function(e){
            var next = $(this).next();
            if ( next.hasClass('pa_cities_list') ) next.show();
        });
    
    $('#pa_index').on('keyup', function (e) {
        var indexVal = $(this).val(),
        saveCityId = $('#pa_zipandcity').data('formalname'),// !!
        streetVal = $('#pa_street').data('formalname');// !!
            if (indexVal != POST.prevCityVal) {
                POST.prevCityVal = indexVal;
                var inputId = this.id;
                $(this).removeData('id','name');
                POST.removeError(this);
                clearTimeout(POST.cbpTimer);
                if (indexVal.length > 0) POST.cbpTimer = setTimeout(function(){POST.ibc(saveCityId ,streetVal, inputId);}, POST.opt.MS_BEFORE_CBP);
                else $('.pa_cities_list').remove();
            }
    })
    .on('click', function(e){
            var next = $(this).next();
            if ( next.hasClass('pa_cities_list') ) next.show();
    });

    $('#pa_house').on('keyup', function (e) {
        var houseVal = $(this).val(),
        saveIndexCity = $('#pa_zipandcity').data('index'),
        saveStreetVal = $('#pa_street').data('formalname'),
        indexSecondWindow = $('#pa_index').val();
            if (houseVal != POST.prevCityVal) {
                POST.prevCityVal = houseVal;
                var inputId = this.id;
                $(this).removeData('id', 'name');
                POST.removeError(this);
                clearTimeout(POST.cbpTimer);
                if (houseVal.length > 0 && saveStreetVal) {
                    POST.cbpTimer = setTimeout(function(){POST.abi(saveIndexCity || indexSecondWindow, inputId);}, POST.opt.MS_BEFORE_CBP);
                }
                }
                else $('.pa_cities_list').remove(); 
            })
            .on('click', function(e){
                var next = $(this).next();
                if ( next.hasClass('pa_cities_list') ) next.show();
            });
    $('#pa_suite').blur(function (e) {
        if ($('#pa_suite').val()) {
            $('.full_address_suite').text('строение ' + $('#pa_suite').val() + ',');    
        }
        else $('.full_address_suite').text(''); 
    });
    $('#pa_building').blur(function (e) {
        if($('#pa_building').val()) {
            $('.full_address_building').text('корпус ' + $('#pa_building').val() + ', ');      
        }
        else $('.full_address_building').text('');
    });
    $('#pa_common').blur(function (e) {
        if ($('#pa_common').val()) {
            $('.full_address_common').text('Квартира (офис) ' + $('#pa_common').val() +', ');
        }
        else $('.full_address_common').text('');
    });
    $('#pa_domofon').blur(function (e) {
        if($('#pa_domofon').val()) {
            $('.full_address_domofon').text('Домофон: ' + $('#pa_domofon').val() + ','); 
        }
        else $('.full_address_domofon').text('');
    });
    $('#pa_metro').blur( function (e) {
        if ($('#pa_metro').val()) {
         $('.full_address_metro').text(', ближайшее метро: ' + $('#pa_metro').val());   
        }
        else  $('.full_address_metro').text('');
    }); 

    $('#pa_district, #pa_region, #pa_index, #pa_street, #pa_house, #pa_suite, #pa_building, #pa_common, #pa_domofon, #pa_metro').blur(function (e) {
        $('.full_address_district').text($('#pa_district').val() + ' ')
        $('.full_address_region').text($('#pa_region').val() + ' ')
        $('.full_address_index').text($('#pa_index').val() + ', ')
        $(".full_address_street").text($('#pa_street').val() + ', ');
        $('.full_address_house').text('д.' + $('#pa_house').val() + ',');
    });

    $('#pa_form').on('submit', function(e){
        e.preventDefault();
    });

    // Скрытие выпадающего списка по клику вне его
    $(document).on('click', function(e){
        var el   = $(e.target),
            test = el.parent().add(el.next()).add(el.parent().parent());
        if( !test.hasClass('pa_cities_list') ) $('.pa_cities_list').hide();
    });

    // Нажатие кнопки «Продолжить»
    $('#pa_btn_next').on('click', function(e){
        var city       = $('#pa_zipandcity'),
            name       = city.val(),
            cityID     = city.data('id'),
            index      = city.data('index'),
            formalname = city.data('formalname'),
            mkad       = city.data('mkad'),
            print_string = city.data('print_string');
        $('.pa_form_step1').hide();

        if ( cityID ) {
            $('#pa_city_name').text( name );
            if ( index>99999 && index<1000000 ) {
                $('#pa_index').val( index ).prop('disabled', true);
                $('.full_address_index').text($('#pa_index').val() + ',');
                if (formalname == 'Москва') {
                    $('.pa_form_step2, .pa_page2').show();
                }else if(mkad) {
                    $('#pa_mkad_km').val(mkad);
                    $('.pa_form_step2, .pa_page3').show();
                    $('.full_address_mkad').text(' от МКАД - ' + city.data('mkad') + 'км. ');
                }else{
                    $('.pa_form_step2, .pa_page4').show();
                }
            }else{
                $('#pa_index').val('').prop('disabled', false);
                $('.full_address_city').text(formalname);
                if (formalname == 'Москва') {
                    $('.pa_form_step2, .pa_page5').show();
                }else if(mkad) {
                    $('#pa_mkad_km').val(mkad);
                    $('.pa_form_step2, .pa_page6').show();
                }else{
                    $('.pa_form_step2, .pa_page7').show();
                }
            }
        }else{
            $('#pa_city_name').text( POST.opt.TXT_ADD_ADDRESS );
            $('.pa_form_step2, .pa_page8').show();
            //POST.addError(city);
        }
    });
    // Нажатие ссылки «Сменить город» или «Сменить индекс»
    $('.pa_to_start').on('click', function(e){
        e.preventDefault();
        $('#pa_zipandcity, #pa_index, #pa_street, #pa_house, #pa_suite, #pa_building, #pa_common, #pa_domofon').val('');
        $('#pa_form_fulladdress').find('em').text('');
        $('.pa_form_step2, .pa_page2, .pa_page3, .pa_page4, .pa_page5, .pa_page6, .pa_page7, .pa_page8').hide();
        $('.pa_form_step1').show();
    });

    // Нажатие крестика «Закрыть»
    $('.pa_form_close').on('click', function(e){
        e.preventDefault();
        $('#pa_form, .pa_form_step2, .pa_page2, .pa_page3, .pa_page4, .pa_page5, .pa_page6, .pa_page7, .pa_page8').hide();
        $('.pa_form_step1').show();
    });
});