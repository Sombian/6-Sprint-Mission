import { validators, message, validate } from "/pages/login/index.js";

const selectors = {
	"#new_password": document.querySelector("#new-password"),
	"#cofirm_password": document.querySelector("#confirm-password"),
};

selectors["#new_password"].addEventListener("input", (event) =>
{
	if (selectors["#cofirm_password"].value.isNotEmpty)
	{
		validate(selectors["#cofirm_password"]);
	}
});

validators.set(selectors["#cofirm_password"].dataset["id"],
[
	(input) =>
	{
		if (input.value.isEmpty)
		{
			return input.placeholder;
		}
	},
	(input) =>
	{
		if (message(selectors["#new_password"]))
		{
			return "비밀번호를 확인해 주세요.";
		}
	},
	(input) =>
	{
		if (selectors["#new_password"].value !== selectors["#cofirm_password"].value)
		{
			return "비밀번호가 일치하지 않습니다.";
		}
	}
]);
