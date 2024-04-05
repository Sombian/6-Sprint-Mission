import {} from "/common/index.js";

const inputs = new Set(
	document.querySelectorAll("input")
);

const selector = new Map([
	["form", document.querySelector("form")],
	["button", document.querySelector("form button")],
]);

function validate(input)
{
	const message = input["message"]();
	// display error
	input.closest(".wrapper").dataset["error"] = message ?? "null";
	// toggle button
	selector.get("button").disabled = !(!message && ![...inputs.values()].find((element, index, array) => element === input ? message : element["message"]()));
}

selector.get("button").addEventListener("click", (event) =>
{
	for (const input of inputs)
	{
		if (input["message"]())
		{
			return;
		}
	}
	location.href = event.target.dataset.href;
});

for (const input of inputs)
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
	// add input validations
	//
	input["message"] = () =>
	{
		for (const validator of input["validators"]())
		{
			const message = validator(input);

			if (message)
			{
				return message;
			}
		}
	};
	input["validators"] = () =>
	{
		return [
			(input) =>
			{
				if (input.value.isEmpty)
				{
					return input.placeholder;
				}
			},
			(input) =>
			{
				if (!new RegExp(input.pattern).test(input.value))
				{
					return `잘못된 ${input.alt} 형식입니다.`;
				}
			},
			(input) =>
			{
				if (input.hasAttribute("minlength") && input.value.length < input.minLength)
				{
					return `${한글.을를(input.alt)} ${input.minLength}자 이상 입력해주세요.`;
				}
			},
			(input) =>
			{
				if (input.hasAttribute("maxlength") && input.maxLength < input.value.length)
				{
					return `${한글.을를(input.alt)} ${input.minLength}자 이하 입력해주세요.`;
				}
			}
		];
	};
	
	input.addEventListener("blur", (event) =>
	{
		validate(event.target);
	});
	input.addEventListener("input", (event) =>
	{
		validate(event.target);
	});
}
//
// SECURITY BREACH
//
(new MutationObserver((records, observer) =>
{
	for (const record of records)
	{
		if (0 < record.removedNodes.length)
		{
			for (const input of inputs)
			{
				if (!selector.get("form").contains(input))
				{
					return window.location.reload();
				}
			}
		}
	}
})).observe(selector.get("form"), { subtree: true, childList: true });
//
// SECURITY BREACH
//
function sanctuary()
{
	for (const input of inputs)
	{
		for (const key of ["message", "validators"])
		{
			Object.defineProperty(input, key,
			{
				value: Object.freeze(input[key]), writable: false, configurable: false,
			});
		}
	}
}

export { validate, sanctuary };
