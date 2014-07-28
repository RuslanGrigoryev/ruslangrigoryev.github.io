$(function(){
  
  if ($('.skill_header').length) {
	  var h = $('.skill_header');

		var scrollTop     = $(window).scrollTop(),
		    elementOffset = h.offset().top,
		    distance      = (elementOffset - scrollTop);
			if (distance ) {
				htmlSkill.init();
				cssSkill.init();
				preProcessorSkill.init();
				CssGrid.init();
				jsSkill.init();
				gitSkill.init();
				cmsSkill.init();
				emailSkill.init();
				adobeSkill.init();
			}
  }


});

function loadHTML(sURL)
 
{
  var request=null;
  // пытаемся создать объект для MSXML 2 и старше
  if(!request) try {
    request=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  // не вышло... попробуем для MSXML 1
  if(!request) try {
    request=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  // не вышло... попробуем для Mozilla
  if(!request) try {
    request=new XMLHttpRequest();
  } catch (e){}
  if(!request)
    // ничего не получилось...
    return "";
  // делаем запрос
  request.open('GET', sURL, false);
  request.send(null);
  // возвращаем текст
  return request.responseText;
}
 
function openPage (sURL) {
	mypagecontent = document.getElementById('page')
	mypagecontent.innerHTML = loadHTML(sURL);
}