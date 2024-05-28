import Link from "next/link";
import Image from "next/image";

export default function Page()
{
	return (
		<>
			{/* form */}
			<form class="flex flex-col">
				<div class="flex flex-col mobile:gap-[16px] tablet:gap-[16px] desktop:gap-[24px]">
				{[
					{
						id: "이메일", type: "email", pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/, placeholder: "이메일을 입력해주세요", autocomplete: "email",
					},
					{
						id: "닉네임", type: "text", minlength: 2, maxlength: 8, pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, placeholder: "닉네임을 입력해주세요",
					},
					{
						id: "비밀번호", type: "password", minlength: 8, maxlength: 16, placeholder: "비밀번호를 입력해주세요", autocomplete: "new-password",
					},
					{
						id: "비밀번호 확인", type: "password", minlength: 8, maxlength: 16, placeholder: "비밀번호를 다시 한번 입력해주세요", autocomplete: "new-password",
					},
				]
				.map((args, index) =>
				(
					<div key={index} class="flex flex-col mobile:gap-[8px] tablet:gap-[8px] desktop:gap-[16px]">
						<label htmlFor={args.id} class="text-[#1F2937] font-[700] mobile:text-[14px] tablet:text-[18px] desktop:text-[18px]">
						{
							args.id
						}
						</label>
						<div class="flex h-[56px] px-[24px] bg-[#F3F4F6] rounded-[12px]">
							<input id={args.id} type={args.type} pattern={args.pattern?.toString()} minLength={args.minlength} maxLength={args.maxlength} placeholder={args.placeholder} autoComplete={args.autocomplete} class="grow text-[#1F2937] text-[16px] font-[400] outline-none bg-transparent placeholder:text-[#9CA3AF]"/>
							{
								args.type === "password" && <Image src="/icons/invisible.svg" alt="visibility" width={24} height={24}/>
							}
						</div>
					</div>
				))}
				</div>
				<button class="button h-[56px] rounded-[40px] text-[16px] font-[600] mobile:mt-[16px] tablet:mt-[24px] desktop:mt-[24px]">
					회원가입
				</button>
			</form>
			{/* 3rd-party */}
			<div class="flex items-center justify-between h-[74px] px-[24px] mt-[24px] rounded-[8px] text-[#1F2937] text-[16px] font-[500] bg-[#E6F2FF]">
				간편 로그인 하기
				<div class="flex gap-[16px]">
					<Image src="/icons/google.svg" alt="google" width={42} height={42}/>
					<Image src="/icons/kakaotalk.svg" alt="kakaotalk" width={42} height={42}/>
				</div>
			</div>
			{/* assistance */}
			<div class="mt-[24px] text-center text-[#1F2937] text-[15px] font-[500]">
				이미 회원이신가요? <Link href="/signin" class="text-[#3182F6] underline">로그인</Link>
			</div>
		</>
	);
}
