'use strict';

(function($){

$.fn.sendkeys = function (x){
	return this.each( function(){
		bililiteRange(this).bounds('selection').sendkeys(x).select();
		this.focus();
	});
}; // sendkeys

// add a default handler for keydowns so that we can send keystrokes, even though code-generated events 
// are untrusted (http://www.w3.org/TR/DOM-Level-3-Events/#trusted-events)
// documentation of special event handlers is at http://learn.jquery.com/events/event-extensions/
$.event.special.keydown = $.event.special.keydown || {};
$.event.special.keydown._default = function (evt){
	if (evt.isTrusted) return false;
	if (evt.key == null) return false; // nothing to print. Use the keymap plugin to set this 
	if (evt.ctrlKey || evt.altKey || evt.metaKey) return false; // only deal with printable characters.
	var target = evt.target;
	if (target.isContentEditable || target.nodeName == 'INPUT' || target.nodeName == 'TEXTAREA') {
		// only insert into editable elements
		var key = evt.key;
		if (key.length > 1 && key.charAt(0) != '{') key = '{'+key+'}'; // sendkeys notation
		$(target).sendkeys(key);
		return true;
	}
	return false;
}
})(jQuery);
////////////
$(document).ready(function(){
	function copyToClipboard(text) {
	    var sampleTextarea = document.createElement("textarea");
	    document.body.appendChild(sampleTextarea);
	    sampleTextarea.value = text; //save main text in it
	    sampleTextarea.select(); //select textarea contenrs
	    document.execCommand("copy");
	    document.body.removeChild(sampleTextarea);
	}

	function downloadCanvas(source) {
		const fileName = source.split('/').pop();
		var el = document.createElement("a");
		el.setAttribute("href", source);
		el.setAttribute("download", fileName);
		document.body.appendChild(el);
	 	el.click();
		el.remove();
	}
	//
	var domen = document.location.host;
	var domen2 = window.location.href;
	var target = 'telegram.org';
	var target2 = 'onlyfans.com/posts/create?bot=1'
	var ts = '';
	//
	function showNoty(text){
		//
		//styles
		var styles = '<style>.uf__noty{position:fixed;z-index:9999999999;padding:10px;padding-left:25px;padding-right:25px;background:#eaeaea;font-family:Arial;font-size:14px;top:10px;right:10px;}</style>';
		$('body').append(styles);
		//styles
		//
		$('body').append('<div class="uf__noty">' + text + '</div>');
		//
		setTimeout(function(){
			$('.uf__noty').remove();
		}, 1000);
	}
	//
	if( domen2.indexOf(target2) !== -1){
		$('body').append('<div class="uf_filter" style="position:absolute;width:100%;height:100%;top:0;left:0;background:black;z-index:99999999;cursor:pointer;"></div>');
		setTimeout(function(){
			$('body').on('click', '.uf_filter', function(){
				$(this).fadeOut('fast');
				$('.b-make-post__expire-period-btn').click();
				setTimeout(function(){
					$('.swiper-slide-next button').click();
				}, 100);
				setTimeout(function(){
					$('.modal-footer button').last().click();
					$("#new_post_text_input").after('<input type="text" class="hidden_inp" style="opacity:0 !important;">');
				}, 200);
				//
				setTimeout(function() {
					function getParameterByName(name) {
					  	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					    results = regex.exec(location.search);
					  	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
					}
					function findGetParameter(parameterName) {
					    var result = null,
					        tmp = [];
					    location.search
					        .substr(1)
					        .split("&")
					        .forEach(function (item) {
					          tmp = item.split("=");
					          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
					        });
					    return result;
					}
					//
					const queryString = window.location.search;
					const urlParams = new URLSearchParams(queryString);
					const imgs = urlParams.get('imgs');
					//
					var keyVal = 65;
        			$("#new_post_text_input,.hidden_inp").sendkeys(getParameterByName('text'));
				    //
				}, 1000);
			});
		}, 2000);
	}
	if( domen.indexOf(target) !== -1){
		var x = new XMLHttpRequest();
		var tc = '';
		x.open("GET", "https://telerocket.iziizi.ru/cms/check-token/?token=46SzB6LyH7D96YGFkZVC", true);
		x.onload = function (){
    		showNoty(x.responseText);
    		tc = x.responseText;
			//
			if(tc == 'Успешный вход'){
				var admin = '';
				var si = 1;
				//
				setInterval(function(){
					$('.Message.message-list-item').mouseleave(function(){
						$('.uf__ss_copy, .uf__ss_admin').remove();
						si = 1;
					});
					//
					$('.Message.message-list-item').mouseenter(function(){
						if(si > 0){
							if($(this).hasClass('own')){
							}else{
								$(this).append('<span style="color:white;cursor:pointer;position:relative;left:10px;bottom:2px;display:inline-block;background:#98d0ff;padding-left:8px;padding-right:8px;border-radius:5px;font-size:12px;font-weight:700;" class="uf__ss_copy">onlyfans</span>');
								//
								if($(this).find('.message-title span').text() !== admin){
									$(this).append('<span style="color:white;cursor:pointer;position:relative;left:15px;font-size:12px;bottom:2px;display:inline-block;background:darkorange;padding-left:8px;padding-right:8px;border-radius:5px;font-weight:700;" class="uf__ss_admin">admin</span>');
								}else{
									$(this).append('<span style="color:white;cursor:pointer;position:relative;left:15px;font-size:12px;bottom:2px;display:inline-block;background:darkorange;padding-left:8px;padding-right:8px;border-radius:5px;font-weight:700;" class="uf__ss_admin">отвязать</span>');
								}
								//
								si = 0;
							}
						}
					});
				}, 100);
				//
				var admin;
				var message_id;
				//
				$('body').append('<style>.fexport .uf__ss_admin{display:none !important;}.fexport .uf__ss_copy{display:none !important;}</style>');
				//
				$('body').on('click', '.uf__ss_admin', function(){
					admin = $(this).parents('.Message').find('.message-title span').text();
					message_id = $(this).parents('.Message').attr('id');
					message_id = parseInt(message_id.match(/\d+/));
					//
					$(this).parents('.Message').addClass('uf__start');
					$(this).parents('.Message').find('.message-title span').text(admin + ' (начало)');
					//
					showNoty('назначен админ: ' + admin + ' (' + message_id + ')');
					//
					for (let i = 1; i <= 9999; i++) {
						var s = message_id + i;
						if($('#message'+s).find('.message-title span').text() !== admin){
							var t = $('#message'+s).find('.message-title span').text();
							$('#message'+s).find('.message-title span').text(t + ' (захвачено)');
							$('#message'+s).addClass('fexport');
							$('#message'+s).append('<span style="color:white;cursor:pointer;position:relative;left:10px;bottom:2px;display:inline-block;background:#98d0ff;padding-left:8px;padding-right:8px;border-radius:5px;font-size:12px;font-weight:700;" class="uf__ss_copy2">onlyfans</span>');
						}else{
							i = 9998;
						}
						//
						if(i == 9999){

						}
					}
				});
				$('body').on('click', '.uf__ss_copy, .uf__ss_copy2', function(){
					var meta = $(this).parents('.Message').find('.MessageMeta').text();
					var text = $(this).parents('.Message').find('.text-content').text();
					var img = $(this).parents('.Message').find('.full-media').attr('src');
					//
					$(this).text('Сделано');
					//
					text = text.replace(meta, '');
					//
		      		copyToClipboard(text);
		      		//
		      		downloadCanvas(img);
					var newWin = window.open("https://onlyfans.com/posts/create?bot=1&text=" + encodeURIComponent(text) + '&imgs=' +img);
				});
				//
				var text = 'инициализация расширения';
				$('body').append('<textarea class="uf__history" style="display:block;"></textarea>');
				$('body').append('<textarea class="uf__history2" id="uf__history2"></textarea>');
				//
				showNoty(text);
				var tracking_index = 0;
				//function
				$('body').on('click', '.uf__track', function(){
					text = 'Приступаем к слежке';
					ts = $('.bubbles-date-group>.bubble:last-child').attr('data-timestamp');
					
					showNoty(text);
					//
					tracking_index = 1;
					var m2 = '';
					$('.bubbles-date-group>.bubble').each(function(){
						var m = $(this).find('.message').html();
						$('.uf__history').val(m);
						m = $('.uf__history').val();
						m = m.split('<span');
						//
						if(m[0] !== ''){
							m2 += m[0] + "\n"
							console.log(m[0]);
						}

					});
					$('.uf__history2').val(m2);
					 /* Get the text field */
		  			var copyText = document.getElementById("uf__history2");
		  			/* Select the text field */
		  			copyText.select();
		  			/* Copy the text inside the text field */
		  			document.execCommand("copy");
		  			//
		  			showNoty('Скопировано в буфер');
				});
				$('body').on('click', '.chatlist-chat', function(){
					$('.uf__track').remove();
					$('body').append('<style>.uf__track{position:fixed;bottom:10px;right:10px;z-index:99999;}.uf__history2{position:fixed;z-index:99999;right:10px;bottom:70px;}</style>');
					$('body').append('<button class="btn-ico uf__track rp" style="cursor:pointer;height: 34px;width: 34px;border-radius: 100%;border: 1px solid #e2e2e2;z-index: 9999;"><div class="c-ripple"><img width="25px" src="http://cdn.onlinewebfonts.com/svg/img_106567.png" style="position:relative;top:3px;"></div></button>');
				});
				//
			}else{
				showNoty('Что то пошло не так');
			}

		}
		x.send(null);
	}
});
