// ==UserScript==
// @name         Evil LÖVE2D be like
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  Help them to try to take over the world!
// @author       You
// @match        https://love2d.org/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=love2d.org
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	let currentlyEvil = false
	let snippetsFetched = false

	// Snippets are a bit too large (on purpose), they are seperate files
	async function populateSnippets(arr) {
		for(let i in arr) {
			const response = await fetch(`https://raw.githubusercontent.com/val-int1/hate2d/main/snippets/${arr[i]}.txt`)
			arr[i] = await response.text()
		}
		snippetsFetched = true
	}

	function nofun(e) {
		if(currentlyEvil) {
			e.preventDefault();
			alert("\"I hate fun.\" - HÄTEWhale")
		}
	}

	const TEXT_NORMAL = {
		"TITLE": "LÖVE - Free 2D Game Engine",

		"INTRO": "Hi there! LÖVE is an *awesome* framework you can use to make 2D games in Lua. It's free, open-source, and works on Windows, macOS, Linux, Android and iOS.",
		"DOWNLOAD": document.getElementById("download").children[0].innerText,

		// Downloads
		"WINDOWS": [
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win64.exe\">64-bit installer</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win64.zip\">64-bit zipped</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win32.exe\">32-bit installer</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win32.zip\">32-bit zipped</a>"
		],
		"MACOS": "<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-macos.zip\">64-bit zipped</a>",
		"LINUX": [
			"<a href=\"https://launchpad.net/~bartbes/+archive/ubuntu/love-stable\">Ubuntu PPA</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-x86_64.AppImage\">AppImage x86_64</a>"
		],
		"OTHER": [
			"<a href=\"https://play.google.com/store/apps/details?id=org.love2d.android\">Play Store</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-android.apk\">Android APK</a>",
			"iOS <a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-ios-source.zip\">source</a> / " + // < These are the
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-apple-libraries.zip\">libraries</a>"  // < same line
		],

		// Features
		"COMMUNITY": [
			"If you get stuck, many friendly people are ready to help you at <a href=\"/forums/\">the forums</a>. Be warned, however, that it sometimes gets too friendly.",
			"People also post their games and projects on the forums, so it's a nice way of exploring what LÖVE can do. Or at least what people choose to use it for.",
			"There is also a <a href=\"https://discord.gg/rhUets9\">Discord server</a> and a <a href=\"https://www.reddit.com/r/love2d\">subreddit</a>.",
			"Get in touch with us on twitter <a href=\"https://twitter.com/obey_love\">@obey_love</a>."
		],
		"OPENSRC": [
			"Open Source",
			"LÖVE is licensed under the liberal zlib/libpng license. This means that:",
			[ "It costs nothing.", "You can use it freely for commercial purposes with no limitations." ],
			"The source can be found on <a href=\"https://github.com/love2d/love\">GitHub</a>."
		],

		// Examples
		"EASY_TO_USE": "It’s pretty easy to get started with LÖVE, just check out these code snippets.",
		"SNIPPETS": [
			"function love.draw()\n\tlove.graphics.print(\"Hello World!\", 400, 300)\nend",
			"function love.load()\n\twhale = love.graphics.newImage(\"whale.png\")\nend\nfunction love.draw()\n\tlove.graphics.draw(whale, 300, 200)\nend",
			"function love.load()\n\tsound = love.audio.newSource(\"music.ogg\", \"stream\")\n\tlove.audio.play(sound)\nend"
		],
		"TUTORIALS": "Check out some more tutorials on <a href=\"./wiki\">the wiki.</a>",
		"GAMES": "LÖVE has been used for commercial projects, game jams, prototyping, and everything in between. Here are a few examples.",

		// Stuff
		"TWITTER": "<a href=\"https://twitter.com/obey_love\">@obey_love on Twitter</a>",
		"RELEASES": "<a href=\"releases.xml\">Release announcements feed</a>",
		"CONTACT": "You can <a href=\"https://github.com/love2d/love/issues\">file a bug</a>, ask a question in <a href=\"/forums/\">the forums</a>, or <a href=\"mailto:andruud@gmail.com\">contact rude</a> for other stuff."
	}

	const TEXT_HATE = {
		"TITLE": "HÄTE - Paid 2D Game Engine",

		"INTRO": "Bye there! HÄTE is an *awful* framework you can't use to make 2D games in Lua. It's paid, closed-source, and barely works on Windows, macOS, Linux, Android and iOS.",
		"DOWNLOAD": TEXT_NORMAL.DOWNLOAD.replace("Download LÖVE", "Upload HÄTE"),

		// Downloads
		"WINDOWS": [
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win64.exe\">Windows Store</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win64.zip\">winget</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win32.exe\">Chocolatey</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-win32.zip\">AME Playbook</a>"
		],
		"MACOS": "<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-macos.zip\">NOWTHATSALOTOF.dmg</a>",
		"LINUX": [
			"<a href=\"https://launchpad.net/~bartbes/+archive/ubuntu/love-stable\">curl | bash</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-x86_64.AppImage\">Snap Store</a>"
		],
		"OTHER": [
			"<a href=\"https://play.google.com/store/apps/details?id=org.love2d.android\">Play Station</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-android.apk\">Source (tar.xz)</a>",
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-ios-source.zip\">ISAWTHISBOATIN.hlf</a> "+
			"<a href=\"https://github.com/love2d/love/releases/download/11.5/love-11.5-apple-libraries.zip\">(the other half)</a>"
		],

		// Features
		"COMMUNITY": [
			"If you get stuck, many unfriendly people are ready to not help you at <a href=\"/forums/\">the forums</a>. Be warned, however, that it never gets too unfriendly.",
			"People also don't post their games and projects on the forums, so it's a evil way of exploring what LÖVE can't do. Or at least what people choose to not use it for.",
			"There is also neither a <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">Discord server</a> nor a <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">subreddit</a>.",
			"Don't get in touch with us on twitter <a href=\"https://twitter.com/disobey_hate\">@disobey_hate</a>."
		],
		"OPENSRC": [
			"Closed Source",
			"LÖVE is licensed under a restrictive proprietary license. This means that:",
			[ "It costs everything.", "You can't use it for non-commercial purposes, with a lot of limitations." ],
			"The source can't be found on <span style=\"text-decoration: underline;\" title=\"This is not a link\">GitHub</span>."
		],

		// Examples
		"EASY_TO_USE": "It’s extremely hard to get over with HÄTE, just check out these code snippets.",
		"SNIPPETS": [
			"draw_text",
			"draw_image",
			"play_sound"
		],
		"TUTORIALS": "There are no other tutorials on <a href=\"./wiki\">the wiki</a>, don't even bother looking.",
		"GAMES": "HÄTE hasn't been used for commercial projects, game jams, prototyping, or anything in between. So we can't show you any examples.",

		// Stuff
		"TWITTER": "<a href=\"https://twitter.com/disobey_hate\">@disobey_hate still not on Twitter</a>",
		"RELEASES": "<a href=\"https://raw.githubusercontent.com/val-int1/hate2d/main/releases.txt\">Release announcements feed</a>",
		"CONTACT": "You can't file bugs, ask questions in the forums, or contact anyone for other stuff."
	}

	populateSnippets(TEXT_HATE.SNIPPETS)

	// Cleanup stray links
	for(let a of document.getElementById("other").querySelectorAll("a:not([href])")) {
		a.parentElement.removeChild(a)
	}

	const DOWNLOAD_TITLES = document.getElementById("download").querySelectorAll("dt")

	const BASE_STYLE = document.createElement("style")
	BASE_STYLE.innerHTML = "main, footer > section { max-width: 1100px; }"
	document.head.appendChild(BASE_STYLE)

	const HATE_STYLE = document.createElement("style")
	HATE_STYLE.innerHTML = "body { background-color: #FCE0E9; }" +
						   "main { background-image: url(https://raw.githubusercontent.com/val-int1/hate2d/main/logo.png); }" +
						   "section#download, section#examples dd { filter: hue-rotate(142.5deg); }" +
						   "code { font-size: 0.7em; }" +
						   "#games ul { display: none; }"

	const INTRO_ELEM = document.getElementById("intro")
	const DOWNLOAD_ELEM = document.getElementById("download")

	const WINDOWS_ELEM = document.getElementById("windows")
	const OSX_ELEM = document.getElementById("osx")
	const LINUX_ELEM = document.getElementById("ubuntu") // Not only Ubuntu but whatever
	const OTHER_ELEM = document.getElementById("other")

	const COMMUNITY_ELEM = document.getElementById("community")
	const OPENSRC_ELEM = document.getElementById("opensource")

	const EXAMPLES_ELEM = document.getElementById("examples")
	const CODE_ELEMS = document.getElementsByTagName("code")

	const GAMES_ELEM = document.getElementById("games")

	const STUFF_ELEM = document.getElementById("stuff")
	STUFF_ELEM.children[1].children[1].addEventListener("click", nofun)

	const CONTACT_ELEM = document.getElementById("contact")

	const DOCS_ELEM = document.getElementById("documentation").children[1]

	setInterval(function() {
		let evil = window.location.hash === "#evil"
		if(evil == currentlyEvil || !snippetsFetched) {
			return
		}
		currentlyEvil = evil
		let text = evil ? TEXT_HATE : TEXT_NORMAL

		document.title = text.TITLE

		INTRO_ELEM.children[0].innerText = text.INTRO

		DOWNLOAD_ELEM.children[0].innerText = text.DOWNLOAD
		for(let i = 0; i < text.WINDOWS.length; i++) {
			WINDOWS_ELEM.children[i + 1].innerHTML = text.WINDOWS[i]
		}
		OSX_ELEM.children[1].innerHTML = text.MACOS
		for(let i = 0; i < text.LINUX.length; i++) {
			LINUX_ELEM.children[i + 1].innerHTML = text.LINUX[i]
		}
		for(let i = 0; i < text.OTHER.length; i++) {
			OTHER_ELEM.children[i + 1].innerHTML = text.OTHER[i]
		}

		for(let i = 0; i < text.COMMUNITY.length; i++) {
			COMMUNITY_ELEM.children[i + 1].innerHTML = text.COMMUNITY[i]
		}
		for(let i = 0; i < text.OPENSRC.length; i++) {
			if(typeof(text.OPENSRC[i]) === "string") {
				OPENSRC_ELEM.children[i].innerHTML = text.OPENSRC[i]
			} else {
				for(let j = 0; j < text.OPENSRC[i].length; j++) {
					OPENSRC_ELEM.children[i].children[j].innerHTML = text.OPENSRC[i][j]
				}
			}
		}

		EXAMPLES_ELEM.children[1].innerText = text.EASY_TO_USE
		for(let i = 0; i < text.SNIPPETS.length; i++) {
			CODE_ELEMS[i].innerHTML = "";
			CODE_ELEMS[i].innerText = text.SNIPPETS[i]
			hljs.highlightBlock(CODE_ELEMS[i])
		}
		EXAMPLES_ELEM.children[3].innerHTML = text.TUTORIALS

		GAMES_ELEM.children[1].innerText = text.GAMES

		STUFF_ELEM.children[1].children[0].innerHTML = text.TWITTER
		STUFF_ELEM.children[1].children[2].innerHTML = text.RELEASES

		CONTACT_ELEM.children[1].innerHTML = text.CONTACT

		for(let i = 0; i < DOCS_ELEM.childElementCount; i++) {
			let elem = DOCS_ELEM.children[i].children[0]
			if(elem.innerText === "love") {
				elem.innerText = "hate"
			}
			elem.href = ""
		}

		if(currentlyEvil) {
			document.head.appendChild(HATE_STYLE)
			for(let title of DOWNLOAD_TITLES) {
				title.innerText = title.innerText.replace("+", "-")
			}
		} else {
			document.head.removeChild(HATE_STYLE)
			for(let title of DOWNLOAD_TITLES) {
				title.innerText = title.innerText.replace("-", "+")
			}
		}
	}, 100)
})();
