function wrapper(string, { isEmpty, isNotEmpty })
{
	const 초중종 = 한글.초중종(string[string.length - 1]);

	return (!초중종) ? string : string + (초중종.종.isEmpty ? isEmpty : isNotEmpty);
}

// @see https://github.com/toss/slash/tree/main/packages/common/hangul
//
// TODO: "이/가" | "을/를" | "은/는" | "으로/로" | "와/과" | "이나/나" | "이에/에" | "이란/란" | "아/야" | "이랑/랑" | "이에요/예요" | "으로서/로서" | "으로써/로써" | "으로부터/로부터"
//
export default class 한글
{
	static get 초()
	{
		return ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
	}
	
	static get 중()
	{
		return ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
	}
	
	static get 종()
	{
		return ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
	}

	static ["이/가"](string)
	{
		return wrapper(string, { isEmpty: "이", isNotEmpty: "가" });
	}

	static ["은/는"](string)
	{
		return wrapper(string, { isEmpty: "는", isNotEmpty: "은" });
	}
	
	static ["을/를"](string)
	{
		return wrapper(string, { isEmpty: "를", isNotEmpty: "을" });
	}

	static ["와/과"](string)
	{
		return wrapper(string, { isEmpty: "와", isNotEmpty: "과" });
	}

	static 초중종(char) // TODO: set accessibility to private
	{
		if ("가".charCodeAt(0) <= char.charCodeAt(0) && char.charCodeAt(0) <= "힣".charCodeAt(0))
		{
			const unicode = char.charCodeAt(0) - "가".charCodeAt(0);
	
			return { 초: 한글.초[Math.floor((unicode / (28 * 21)))], 중: 한글.중[Math.floor((unicode % (28 * 21)) / 28)], 종: 한글.종[Math.floor((unicode % 28))]};
		}
	}
}
