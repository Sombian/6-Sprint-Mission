import "/common/index.js";
import 한글 from "/common/utilities/한글.js";

const [validators, selectors] = [new Map(),
{
	"form": document.querySelector("form"),
	"button": document.querySelector("form button"),
}];

function safe()
{
	for (const UUID of validators.keys())
	{
		const input = document.querySelector(`input[data-id="${UUID}"]`);
		// input is gone... how?
		if (!input) return false;
		// validation pass failed
		if (message(input)) return false;
	}
	return true;
}

function message(input)
{
	const UUID = input.dataset["id"];

	if (!validators.has(UUID))
	{
		return "error";
	}
	for (const validator of validators.get(UUID))
	{
		const msg = validator(input); if (msg) return msg;
	}
}

function validate(input)
{
	const msg = message(input);
	// display error
	input.closest(".wrapper").dataset["error"] = msg ?? "null";
	// toggle button
	selectors["button"].disabled = !safe();
}

selectors["button"].addEventListener("click", (event) =>
{
	if (safe())
	{
		location.href = event.target.dataset.href;
	}
});

for (const input of document.querySelectorAll("input"))
{
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
		input.closest(".wrapper").append(img);
	}
	//
	// set input UUID
	//
	let UUID;

	while (validators.has(UUID = crypto.randomUUID()))
	{
		continue;
	}
	Object.defineProperty(input.dataset, "id", { value: UUID });
	//
	// add input validations
	//
	validators.set(UUID, (() =>
	{
		const tests = [];

		if (input.hasAttribute("placeholder"))
		{
			tests.push(
				(input) =>
				{
					if (input.value.isEmpty)
					{
						return input.placeholder;
					}
				}
			);
		}
		if (input.hasAttribute("pattern"))
		{
			tests.push(
				(input) =>
				{
					if (!new RegExp(input.pattern).test(input.value))
					{
						return `잘못된 ${input.alt} 형식입니다.`;
					}
				}
			);
		}
		if (input.hasAttribute("minlength"))
		{
			tests.push(
				(input) =>
				{
					if (input.value.length < input.minLength)
					{
						return `${한글["을/를"](input.alt)} ${input.minLength}자 이상 입력해주세요.`;
					}
				}
			);
		}
		if (input.hasAttribute("maxlength"))
		{
			tests.push(
				(input) =>
				{
					if (input.maxLength < input.value.length)
					{
						return `${한글["을/를"](input.alt)} ${input.minLength}자 이하 입력해주세요.`;
					}
				}
			);
		}
		return tests;
	})());
	
	input.addEventListener("blur", (event) =>
	{
		validate(event.target);
	});
	input.addEventListener("input", (event) =>
	{
		validate(event.target);
	});
}

export { validators, message, validate }
