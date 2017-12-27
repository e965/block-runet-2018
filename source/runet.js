;(() => {
	'use strict'

	let scriptData = document.currentScript && document.currentScript.dataset
		? document.currentScript.dataset
		: {}

	let localStorageItemName = '__brWasShown'

	if (localStorage && localStorage.getItem(localStorageItemName) == 'true' || !scriptData.disabled && scriptData.disabled == '') { return }

	let _ce = e => document.createElement(e)

	let _link = (href, text) => {
		let link = _ce('a')

		link.setAttribute('href', href)
		link.setAttribute('target', '_blank')
		link.setAttribute('rel', 'nofollow noopener')

		link.textContent = text

		return link.outerHTML
	}

	let _listItem = text => '<li>' + text + '</li>'

	let cdnURL = scriptData.cdn
		? scriptData.cdn
		: 'https://cdn.jsdelivr.net/npm/runet/dist/'

	if (!scriptData.isSelfHosted && scriptData.isSelfHosted == '') { cdnURL = './' }

	let
		triggerClassName = '__br-trigger',
		triggerClassNameForRoot = '__br-root-trigger'

	document.body.classList.add(triggerClassName)
	document.documentElement.classList.add(triggerClassNameForRoot)

	/* подгрузка стилей */

	let css = _ce('link')
	css.setAttribute('rel', 'stylesheet')
	css.setAttribute('href', cdnURL + 'runet.min.css')

	document.head.appendChild(css)

	let elem = _ce('div')
	elem.classList.add('__br-elem')

	let content = _ce('div')

	/* лого РКН */

	let rknLogo = _ce('div')

	rknLogo.classList.add('rkn-logo')
	rknLogo.textContent = 'Роскомнадзор'

	rknLogo.onclick = e => {
		document.body.classList.remove(triggerClassName)
		document.documentElement.classList.remove(triggerClassNameForRoot)
		localStorage.setItem(localStorageItemName, 'true')
	}

	content.appendChild(rknLogo)

	/* шапка */

	let contentHeader = _ce('header')

	let hostName = location.hostname && location.hostname != ''
		? location.hostname
		: 'test'

	if (scriptData.siteTitle && scriptData.siteTitle != '') {
		hostName = '<q>' + scriptData.siteTitle + '</q>'
	}

	contentHeader.innerHTML = '<h1>Уважа&shy;емый пользо&shy;ватель!</h1><h2>Мы приносим свои извинения, но доступ к ресурсу ' + hostName + ' был ограничен.</h2>'

	content.appendChild(contentHeader)

	/* главная часть контента */

	let contentMain = _ce('main')

	let reasonsListHTML
		= '<p><b>Возможные причины ограничения доступа:</b></p><ol class="reasons-list">'
			+ _listItem('Сетевой адрес, позволяющий идентифицировать сайт в сети <q>Интернет</q>, включён в Единый Реестр доменных имён, указателей страниц сайтов сети <q>Интернет</q> и сетевых адресов, позволяющих идентифицировать сайты в сети <q>Интернет</q>, содержащие информацию, распространение которой в Российской Федерации запрещено.<br><br>Проверить наличие сетевого адреса в Едином реестре можно в разделе <q>Просмотр реестра</q> на сайте ' + _link('https://eais.rkn.gov.ru', 'eais.rkn.gov.ru') + '.')
			+ _listItem('Доступ ограничен по решению суда по иным основаниям, установленным законодательством Российской Федерации.')
		+ '</ol>'

	let userIP_HTML = scriptData.userIp && scriptData.userIp != ''
		? ' <q><b>' + scriptData.userIp + '</b></q>'
		: ''

	contentMain.innerHTML += reasonsListHTML

	contentMain.innerHTML += '<p>Ваш IP-адрес' + userIP_HTML + ' был записан, скоро с Вами свяжутся, чтобы выяснить причину посещения ресурса c ограниченным доступом.</p><p>Хорошего дня!</p>'

	/* футер */

	let contentFooter = _ce('footer')

	let sitesListHTML
		= '<p>Подробнее с этим Вы можете ознакомиться на следующих ресурсах:</p><ul>'
			+ _listItem('Общество Защиты Интернета &ndash; ' + _link('https://ozi-ru.org', 'ozi-ru.org'))
			+ _listItem('Инфографика <q>История регулирования Рунета</q> &ndash; ' + _link('https://reestr.rublacklist.net/history/', 'reestr.rublacklist.net'))
			+ _listItem('Пост <q>Объявляем забастовку избирателей</q> &ndash; ' + _link('https://2018.navalny.com/post/496/', '2018.navalny.com'))
			+ _listItem('Видео <q>Бойкот выборов: за и против</q> &ndash; ' + _link('https://www.youtube.com/watch?v=9wg13Sp9N6U', 'youtube.com'))
		+ '</ul>'

	contentFooter.innerHTML = '<hr><p>Вы ведь не хотите, чтобы вот так Вас встречал каждый сайт, верно?</p><p>Тогда советуем <b>18 марта 2018 года</b> бойкотировать выборы президента РФ &ndash; поход на них означает, что Вы поддерживаете политику уничтожения свободы в Российском сегменте Интернета, которая ведётся нашим государтвом.</p>'

	contentFooter.innerHTML += sitesListHTML

	contentFooter.innerHTML += '<p>Пожалуйста, извините, если эта заглушка Вас напугала. Скрыть её можно, кликнув на логотип Роскомнадзора вверху.</p><p>P.S. Посмотреть этот скрипт ' + _link('https://github.com/tehcojam/block-runet-2018', 'можно на GitHub') + '.</p>'

	content.appendChild(contentMain)
	content.appendChild(contentFooter)

	let timerTime = scriptData.timer && scriptData.timer != '' && Number(scriptData.timer)
		? Number(scriptData.timer)
		: 7999

	setTimeout(() => {
		content.classList.add('__br-show-footer')
	}, timerTime)

	elem.appendChild(content)

	document.body.insertBefore(elem, document.body.firstChild)
})()
