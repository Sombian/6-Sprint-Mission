import { santuary } from "/pages/login/index.js";

const [new_password, confirm_password] = [document.querySelector("#new-password"), document.querySelector("#confirm-password")];

confirm_password["validators"] = [
	(event) =>
	{
		if (new_password.value !== confirm_password.value)
		{
			return "비밀번호가 일치하지 않습니다.";
		}
	}
];

export { santuary };
