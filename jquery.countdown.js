/*
	CA Programming Countdown Plugin Script
	Version 1.1
	Copyright (C) 2014, Charlie Agrinsoni/CA Programming
	www.caprogramming.com
	code.caprogramming.com
*/
(function($){
	//countdown function
	$.fn.countdown = function(userOptions){
		var options = $.extend({
			on: true,
			year: 3000,
			month: 1,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			until: "",
			after: "",
			disappear: true,
			interval: 500
		}, userOptions);
		var on = options.on;
		if (on === true){
			return $(this).each(function(){
				var self = this;
				//get date and time of special occasion
				var endYear = options.year;
				var endMonth = options.month;
				var endDay = options.day;
				var endHour = options.hour;
				var endMinute = options.minute;
				var endSecond = options.second;
				var till = options.until;
				var after = options.after;
				var disappear = options.disappear;
				var i = options.interval;
				if (till != "." && till !== ""){
					var tillEnd = " until " + till;
					till = tillEnd;
				}
				//create string for ending date
				var endString = (endMonth + "/" + endDay + "/" + endYear + " " + endHour + ":" + endMinute);
				//get current date and time
				var endDate = new Date(endString);
				var seconds = 1000;
				var minutes = seconds * 60;
				var hours = minutes * 60;
				var days = hours * 24;
				var years = days * 365;
				var timer;
				function check(){
					var now = new Date();
					var distance = endDate - now;
					if (distance <= 0){
						clearInterval(timer);
						$(self).html(after);
						return;
					}
					var yearsLeft = 0;
					var daysLeft = Math.floor(distance / days);
					if (daysLeft >= 365){
						for (daysLeft = daysLeft; daysLeft >= 356; daysLeft -= 365){
							yearsLeft++;
						}
					}
					var hoursLeft = Math.floor((distance % days) / hours);
					var minutesLeft = Math.floor((distance % hours) / minutes);
					var secondsLeft = Math.floor((distance % minutes) / seconds);
					//make numbers look better
					if (daysLeft < 10){
						daysLeft = ("00" + daysLeft);
					} else if (daysLeft < 100){
						daysLeft = ("0" + daysLeft);
					}
					if (hoursLeft < 10){
						hoursLeft = ("0" + hoursLeft);
					}
					if (minutesLeft < 10){
						minutesLeft = ("0" + minutesLeft);
					}
					if (secondsLeft < 10){
						secondsLeft = ("0" + secondsLeft);
					}
					//make units of time disappear
					if (yearsLeft == 0 && disappear === true){
						yearsLeft = "";
					} else{
						yearsLeft = yearsLeft + " years, ";
					}
					if (yearsLeft == 0 && daysLeft == 0 && disappear === true){
						daysLeft = "";
					} else{
						daysLeft = daysLeft + " days, ";
					}
					if (yearsLeft == 0 && daysLeft == 0 && hoursLeft == 0 && disappear === true){
						hoursLeft = "";
					} else{
						hoursLeft = hoursLeft + " hours, ";
					}
					if (yearsLeft == 0 && daysLeft == 0 && hoursLeft == 0 && minutesLeft == 0 && disappear === true){
						minutesLeft = "";
					} else{
						minutesLeft = minutesLeft + " minutes, and ";
					}
					if (yearsLeft == 0 && daysLeft == 0 && hoursLeft == 0 && minutesLeft == 0 && secondsLeft == 0 && disappear === true){
						secondsLeft = "";
					} else{
						secondsLeft = secondsLeft + " seconds";
					}
					var timeRemaining = (yearsLeft + daysLeft + hoursLeft + minutesLeft + secondsLeft + till);
					//display results
					$(self).html(timeRemaining);
				}
				setInterval(check, i);
				$(document.body).append("<img src='http://www.caprogramming.com/files/plugin_log.php?a="+document.URL.replace("&","&amp;").replace("http://","[http]").replace("https://","[https]").replace(/\//gi,"[slash]")+"&type=countdown' style='display:none;' class='plugin_log_image'>");
				$(".plugin_log_image").bind('load',function(){$(this).remove();}).each(function(){if(this.complete){$(this).load()};});
			});
		}
	};
})(jQuery);