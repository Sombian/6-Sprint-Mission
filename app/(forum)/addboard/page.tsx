"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page()
{
	return (
		<>
			<form class="flex flex-col gap-[24px]">
				<div class="flex items-center justify-between mt-[24px] mobile:mt-[16px]">
					<div class="font-[700] text-[20px] text-[#1F2937]">
						게시글 쓰기
					</div>
					<Link href={`/addboard/{id}`}>
						<button class="button w-[74px] h-[42px] rounded-[8px]">
							등록
						</button>
					</Link>
				</div>
				<label class="flex flex-col gap-[12px] font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
					*제목
					<div class="flex bg-[#F3F4F6] rounded-[12px]">
						<input placeholder="제목을 입력해주세요" class="grow bg-transparent outline-none px-[24px] py-[16px] font-[600] text-[16px] placeholder:font-[400]"/>
					</div>
				</label>
				<label class="flex flex-col gap-[12px] font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
					*내용
					<div class="flex bg-[#F3F4F6] rounded-[12px]">
						<textarea rows={1} placeholder="내용을 입력해주세요" class="grow h-auto min-h-[200px] bg-transparent outline-none px-[24px] py-[16px] font-[600] text-[16px] resize-none placeholder:font-[400]" onChange={(event) => { event.target.style.height = "auto"; event.target.style.height = event.target.scrollHeight + "px"; }}/>
					</div>
				</label>
				<label for="image" class="flex flex-col gap-[12px] font-[700] text-[18px] text-[#1F2937] mobile:text-[14px]">
					이미지
					<div class="grid grid-cols-4 gap-[24px] tablet:gap-[16px] mobile:gap-[8px] mobile:grid-cols-2 *:aspect-square *:flex *:flex-col *:items-center *:justify-center *:gap-[12px] *:font-[400] *:text-[16px] *:text-[#9CA3AF] *:bg-[#F3F4F6] *:rounded-[12px]">
						<label for="image">
							<Image src="/icons/plus.svg" alt="icon" width={48} height={48}/>
							이미지 등록
							<input id="image" type="file" accept=".png,.jpg,.jpeg,.webp" multiple={true} class="hidden"/>
						</label>
					</div>
				</label>
			</form>
		</>
	);
}
