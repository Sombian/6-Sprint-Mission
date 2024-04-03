import "./plugins/index.js";

if (/\b(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d{1,5})?)\b/.test(window.location))
{
	const viewport = Object.freeze({
		["Mobile@Min"]: 375, ["Mobile@Max"]: 768 - 1, ["Tablet@Min"]: 768, ["Tablet@Max"]: 1200 - 1, ["PC@Min"]: 1200, ["PC@FHD"]: 1920,
	});

	let index = Object.keys(viewport).length - 1;

	switch (window.opener)
	{
		case null:
		{
			window.open(window.location, "simulation", ["popup", `width=${viewport[Object.keys(viewport)[index]]}`].join(","));
			break;
		}
		default:
		{
			function simulate()
			{
				window.resizeTo(viewport[Object.keys(viewport)[index]] + (window.outerWidth - window.innerWidth), window.outerHeight);
			}

			window.addEventListener("keydown", (event) =>
			{
				switch (event.key)
				{
					case "ArrowRight":
					{
						index = (index + 1).clamp(0, Object.keys(viewport).length - 1);
						simulate();
						break;
					}
					case "ArrowLeft":
					{
						index = (index - 1).clamp(0, Object.keys(viewport).length - 1);
						simulate();
						break;
					}
				}
			});
			break;
		}
	}
}

class 한글
{
	static get 초()
	{
		return ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	}
	
	static get 중()
	{
		return ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
	}
	
	static get 종()
	{
		return ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	}

	static 은는(string)
	{
		const 초중종 = 한글.분리(string[string.length - 1]);
	
		if (초중종 === undefined) return string;
	
		return string + (초중종.종.isNotEmpty ? '은' : '는')
	}
	
	static 이가(string)
	{
		const 초중종 = 한글.분리(string[string.length - 1]);
	
		if (초중종 === undefined) return string;
	
		return string + (초중종.종.isNotEmpty ? '이' : '가')
	}
	
	static 을를(string)
	{
		const 초중종 = 한글.분리(string[string.length - 1]);
	
		if (초중종 === undefined) return string;
	
		return string + (초중종.종.isNotEmpty ? '을' : '를')
	}
	
	static 분리(char)
	{
		if ('가'.charCodeAt(0) <= char.charCodeAt(0) && char.charCodeAt(0) <= '힣'.charCodeAt(0))
		{
			const unicode = char.charCodeAt(0) - '가'.charCodeAt(0);
	
			return { 초: 한글.초[Math.floor((unicode / (28 * 21)))], 중: 한글.중[Math.floor((unicode % (28 * 21)) / 28)], 종: 한글.종[Math.floor((unicode % 28))]};
		}
	}
}

Object.defineProperty(window, 한글.name, { value: 한글 })
