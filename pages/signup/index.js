import "/common/index.js";
import "/pages/login/index.js";

const [new_password, confirm_password] = [document.querySelector("#new-password"), document.querySelector("#confirm-password")];

function validator()
{
	confirm_password.setCustomValidity(new_password.value === confirm_password.value ? "" : "비밀번호 불일치");
}

for (const element of [new_password, confirm_password])
{
	element.addEventListener("change", (event) => {
		validator();
	});
	element.addEventListener("keyup", (event) => {
		validator();
	});
}
