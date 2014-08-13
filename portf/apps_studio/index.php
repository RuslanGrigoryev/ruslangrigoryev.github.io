<?php
//Если форма отправлена
if(isset($_POST['submit'])) {

	//Проверка Поля ИМЯ
	if(trim($_POST['contactname']) == '') {
		$hasError = true;
	} else {
		$name = trim($_POST['contactname']);
	}

	//Проверка поля ТЕМА
	if(trim($_POST['email']) == '') {
		$hasError = true;
	} else {
		$email = trim($_POST['email']);
	}

	if(trim($_POST['hiddenPos']) == '') {
		$hasError = true;
	} else {
		$formPos = trim($_POST['hiddenPos']);
	}

	//Если ошибок нет, отправить email
	if(!isset($hasError)) {
		$emailTo = 'support@appsstudio.ru';
		$body = "Имя: $name \n\nТелефон/почта: $email \n\nОткуда форма: $formPos";
		$headers = 'From: My Site <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

		mail($emailTo, $email, $body, $headers);
		$emailSent = true;
	}
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta name="description" content="">
    <meta name="author" content="">
    <meta name="keywords" content="Разработка приложений, создание приложений, разработка под андроид, разработка приложений на iphone, стоимость разработки приложений, заказать разработку приложений, сколько стоит приложение, программирование под ios">	
	<title>AppsStudio</title>
	<link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="i/markup/favicon.ico" type="image/x-ico"/>
</head>
<body>
	
	<header>

		<div class="wrapper top-header">
			
			<div class="wrap-logo" itemscope itemtype="http://schema.org/Organization">
			    <a class="logo-link" itemprop="url" href="index.php">
			        <img class="logo-img" itemprop="logo" src="i/markup/logo.png" />
			    </a>
			</div>

			<div class="main-info">
				<h2>Студия разработки полезных мобильных приложений</h2>
				<ul class="main-info__os-list">
					<li class="main-info__os-list__item main-info__os-list__list--border">
						<a href="#" class="main-info__os-list__link hover">iPhone</a>
					</li>
					<li class="main-info__os-list__item main-info__os-list__list--border">
						<a href="#" class="main-info__os-list__link hover">iPad</a>
					</li>
					<li class="main-info__os-list__item main-info__os-list__list--border">
						<a href="#" class="main-info__os-list__link hover">Android</a>
					</li>
					<li class="main-info__os-list__item">
						<a href="#" class="main-info__os-list__link hover">Windows Phone</a>
					</li>
				</ul>
			</div>

		</div>

		<nav class="wrapper main-menu">

			<div class="menu-wrapper">	
			
				<ul class="main-menu__list clearfix">
					<li class="main-menu__item">
						<a href="index.html" class="main-menu__link main-menu__link--active">главная</a>
					</li>
					<li class="main-menu__item">
						<a href="solutions2.html" class="main-menu__link">решения</a>
					</li>
					<li class="main-menu__item">
						<a href="how_it_work_2.html" class="main-menu__link">сотрудничество</a>
					</li>
					<li class="main-menu__item">
						<a href="portfolio.html" class="main-menu__link">проекты</a>
					</li>
					<li class="main-menu__item">
						<a href="we_are.html" class="main-menu__link">о нас</a>
					</li>
					<li class="main-menu__item">
						<a href="contacts.html" class="main-menu__link">контакты</a>
					</li>
				</ul>
			
			</div>

		</nav>
		
	</header>
	
	<section class="main-slider">
		
		<div class="slideshow anim" id="slider">
					<a href="portfolio-work.html" class="item">
				  		<img src="i/night2day.png" alt="night2day" class="item__img cube">
					</a>
					<a href="portfolio-work-roll.html" class="item">
				 		<img src="i/roll.png" alt="roll" class="item__img cube">
					</a>
					<a href="portfolio-work-akvabalt.html" class="item">
				  		<img src="i/akvabalt-slide.png" alt="akvabalt" class="item__img cube">
					</a>
					<a href="portfolio-work-knopka.html" class="item">
				 		<img src="i/taxi_knopka.png" alt="taxi-knopka" class="item__img cube">
					</a>
					<a href="portfolio-work-tap-taxi.html" class="item">
				 		<img src="i/taxioma.png" alt="taxioma" class="item__img cube">
					</a>
					<a href="portfolio-work-zanimator.html" class="item">
				 		<img src="i/zanimator.png" alt="zanimator" class="item__img cube">
					</a>
					<a href="portfolio-work-autospa.html" class="item">
				 		<img src="i/autospa.png" alt="zanimator" class="item__img cube">
					</a>
					<a href="portfolio-work-forum.html" class="item">
				 		<img src="i/forum3.png" alt="zanimator" class="item__img cube">
					</a>
					<a href="portfolio-work-key.html" class="item">
				  		<img src="i/key.png" alt="key" class="item__img cube">
					</a>
		</div>

	</section>

	<section class="about-us">
		
		<div class="wrapper">

			<h1><span>Мы студия полного цикла по разработке и продвижению полезных мобильных приложений</span></h1>
			<p>Целевая аудитория нашей студии -</p>
			<p>это лидеры рынка, амбициозные стартапы,</p>
			<p>ну и конечно же, инвесторы, которые желают заработать на IT рынке :)</p>
			
		</div>

	</section>
	
	<section class="goals">
		
		<div class="wrapper anim">
		    <div class="left">
				
				<a href="how_it_work_analitic.html" class="goals-image goals-image__analitic"><span></span></a>

				<div class="wrap-h3">
					<h3>Аналитика и стратегия</h3>
				</div>

				<h4>(+ Идеи приложения)</h4>

				<div class="wrap-goal-text">
					<p>
						Эта уникальная услуга нашей студии, которая позволяет создать бизнес-план по разработке мобильного приложения, исходя из идеи заказчика. Четко расписанный и просчитанный проект.
					</p>
				</div>

		    </div>
		    <div class="left">
				
				<a href="how_it_work_ux.html" class="goals-image goals-image__project"><span></span></a>

				<div class="wrap-h3">
					<h3>UX/UI, Разработка</h3>
				</div>

				<h4>(+ Тестирование)</h4>

				<div class="wrap-goal-text">
					<p>
						К разработке мобильного приложения мы также подходим очень серьезно: следуем идеологии user-friendly, стандартам и рекомендациям Apple, Google и Windows а также тому, чего хочет пользователь и заказчик.
					</p>
				</div>

		    </div>
		    <div class="left">
				
				<a href="how_it_work_support.html" class="goals-image goals-image__develop"><span></span></a>

				<div class="wrap-h3">
					<h3>Техническая поддержка</h3>
				</div>

				<h4>(+ Доработки)</h4>

				<div class="wrap-goal-text">
					<p>
						У нас полная техническая поддержка. Наши разработчики используют только нативные языки программирования - это позволяет в любое время улучшить/доработать приложение без каких-либо ограничений.
					</p>
				</div>

		    </div>	        
		    <div class="right">
				
				<a href="how_it_work_seo.html" class="goals-image goals-image__techno"><span></span></a>

				<div class="wrap-h3">
					<h3>Продвижение</h3>
				</div>

				<h4>(+ Развитие)</h4>

				<div class="wrap-goal-text">
					<p>
						Продвижение мобильного приложения, по нашему мнению, - это неотъемлемый инструмент успеха проекта. Даже когда приложение полезное, его нужно обязательно показать конечному пользователю.
					</p>
				</div>

		    </div>
		</div>

	</section>
	
	<section class="call">
		
		<div class="wrapper anim">

			<div class="call__text">
				<strong>
					ЕСЛИ У ВАС ЕСТЬ ИДЕЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ, НО ВЫ НЕ ЗНАЕТЕ КАК ЛУЧШЕЕ ВСЕГО ЕЕ РЕАЛИЗОВАТЬ, И НЕ ПРЕДСТАВЛЯЕТЕ ВО СКОЛЬКО ЭТО ВАМ МОЖЕТ ОБОЙТИСЬ, И КАКИЕ ПОДВОДНЫЕ КАМНИ МОГУТ ВСТРЕТИТСЯ НА ПУТИ? ИЛИ ВЫ ЧЕТКО ПОНИМАЕТЕ ПЕРСПЕКТИВУ НИШИ МОБИЛЬНЫХ ПРИЛОЖЕНИЙ И У ВАС ЕСТЬ СРЕДСТВА ДЛЯ ИНВЕСТИЦИЙ, НО НЕТ ИДЕИ? В ЛЮБОМ СЛУЧАЕ, ВЫ НАШЛИ СТУДИЮ ВАШЕЙ МЕЧТЫ!
				</strong>
				<p>
					Есть одно "НО": мы не беремся за неперспективные проекты, которые, так или иначе, наносят вред ее пользователю, а также проекты, разработанные не нами, но требующие доработки.
				</p>
			</div>

			<div class="call__btn">
				<button id="popup_btn"><span class="empty"></span><span class="call__btn__text">заказать звонок</span></button>
			</div>

		</div>

	</section>

	<footer>
		
		<div class="wrapper">
			
			<div class="footer-logo">
				
				<a class="footer-logo__link" href="index.php"><span></span></a>
				<p class="footer-text">AppsStudio 2011 - 2014 ©</p>

			</div>
			
			<nav class="footer-menu">
				<ul class="footer-menu__list">
					<li class="footer-menu__item">
						<a href="index.html" class="footer-menu__link footer-menu__link--active">Главная</a>
					</li>
					<li class="footer-menu__item">
						<a href="solutions2.html" class="footer-menu__link hover">Решения</a>
					</li>
					<li class="footer-menu__item">
						<a href="how_it_work_2.html" class="footer-menu__link hover">Сотрудничество</a>
					</li>
				</ul>
				<ul class="footer-menu__list">
					<li class="footer-menu__item">
						<a href="portfolio.html" class="footer-menu__link hover">Проекты</a>
					</li>
					<li class="footer-menu__item">
						<a href="we_are.html" class="footer-menu__link hover">О Нас</a>
					</li>
					<li class="footer-menu__item">
						<a href="contacts.html" class="footer-menu__link hover">Контакты</a>
					</li>
				</ul>
			</nav>
			

			<div class="wrap-contact vcard">
			  <a href="#" class="footer-phone footer-phone__bottom"><span></span></a>
			  <span class="contact__item phone"></span>
			  <span class="contact__item phone"></span>
			  <a class="contact__item email hover" href="mailto:support@appsstudio.ru">
			    support@appsstudio.ru
			  </a>
			</div>

			<ul class="social-list">
				<li class="social-list__item">
					<a target="_blank" href="https://plus.google.com/103300383147559210788/" class="social-list__link social-list__link--gplus"><span></span></a>
				</li>
				<li class="social-list__item">
					<a href="#" class="social-list__link social-list__link--twitter"><span></span></a>
				</li>
				<li class="social-list__item">
					<a target="_blank" href="https://vk.com/appsstudio" class="social-list__link social-list__link--vk"><span></span></a>
				</li>
				<li class="social-list__item">
					<a href="#" class="social-list__link social-list__link--facebook"><span></span></a>
				</li>
			</ul>
			
		</div>

	</footer>
	
	<div class="popup">
		<?php if(isset($hasError)) { //Если найдены ошибки ?>
			<p class="error">Проверьте, пожалуйста, правильность заполения всех полей.</p>
		<?php } ?>
		<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="callback callback__main">
				
				<div class="wrap__input"><input name="contactname" type="text" placeholder="имя" id="name"></div>
				<div class="wrap__input"><input name="email" type="text" placeholder="телефон/почта" id="mail"></div>
				<input class="hiddenInput" type="hidden" value="" name="hiddenPos">
			<button name="submit" type="submit" id="submitBtn"><span class="empty"></span><span class="call__btn__text">заказать звонок</span></button>
			
		</form>

		<div id="mask"></div>

	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/libs/jquery.easing.1.3.js"></script>
	<script src="js/script.js"></script>
</body>
</html>