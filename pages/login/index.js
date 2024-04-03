import {} from "/common/index.js";

const status = new Map();

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

const button = document.querySelector("form button");

button.addEventListener("click", (event) =>
{
	if (!button.disabled)
	{
		location.href = button.dataset.href;
	}
	return false;
});

for (const field of document.querySelectorAll("form .field"))
{
	const input = field.querySelector("input");
	//
	// add password visibility toggle button to input
	//
	if (input.type === "password")
	{
		const [img, srcs] = [document.createElement("img"),
		{
			text: "/assets/icons/visible.svg",
			password: "/assets/icons/invisible.svg",
		}];

		img.addEventListener("click", (event) =>
		{
			switch (input.type)
			{
				case "password":
				{
					input.type = "text";
					break;
				}
				case "text":
				{
					input.type = "password";
					break;
				}
			}
			// apply src
			img.src = srcs[input.type];
		});
		// apply src
		img.src = srcs[input.type];
		// insert toggle button
		field.querySelector(".wrapper").append(img);
	}
	//
	// TODO: UUID collision check
	//
	Object.defineProperty(input.dataset, "uuid",
	{
		value: crypto.randomUUID()
	});
	//
	// add input validation
	//
	input.validators = [
		(event) =>
		{
			if (event.target.value.isEmpty)
			{
				return `${한글.을를(event.target.alt)} 입력해주세요.`;
			}
		},
		(event) =>
		{
			if (!new RegExp(input.pattern).test(input.value))
			{
				return `잘못된 ${event.target.alt} 형식입니다.`;
			}
		},
		(event) =>
		{
			if (event.target.hasAttribute("minlength") && event.target.value.length < event.target.minLength)
			{
				return `${한글.을를(event.target.alt)} ${event.target.minLength}자 이상 입력해주세요.`;
			}
		},
		(event) =>
		{
			if (event.target.hasAttribute("maxlength") && event.target.maxLength < event.target.value.length)
			{
				return `${한글.을를(event.target.alt)} ${event.target.minLength}자 이하 입력해주세요.`;
			}
		}
	];
	// default status
	status.set(input.dataset.uuid, null);
	
	function handler(event)
	{
		// disable
		button.disabled = true;

		for (const validator of input.validators)
		{
			status.set(input.dataset.uuid, validator(event));

			if (status.get(input.dataset.uuid) !== undefined)
			{
				// update error message
				field.dataset.error = status.get(input.dataset.uuid);
				return;
			}
		}
		// clear error message
		field.dataset.error = "";

		for (const error of status.values())
		{
			if (error !== undefined)
			{
				return;
			}
		}
		// enable
		button.disabled = false;
	}

	input.addEventListener("blur", handler);
	input.addEventListener("keyup", handler);
	input.addEventListener("change", handler);
}
//
// [!] SECURITY BREACH
//
(new MutationObserver((records, observer) =>
{
	for (const record of records)
	{
		// for (const removedNode of record.removedNodes)
		// {
		// 	if (removedNode.nodeType === 1 && (removedNode.nodeName === "INPUT" || removedNode.querySelector("input") !== undefined))
		// 	{
		// 		window.location.reload();
		// 	}
		// }
		if (0 < record.removedNodes.length && document.querySelectorAll("form .field input").length < status.size)
		{
			window.location.reload();
		}
	}
})).observe(document.querySelector("form"), { subtree: true, childList: true });

function santuary()
{
	for (const input of document.querySelectorAll("form .field input"))
	{
		Object.defineProperty(input, "validators",
		{
			value: Object.freeze(input.validators), writable: false, configurable: false,
		});
		console.log(input);
	}
}

export { santuary };
