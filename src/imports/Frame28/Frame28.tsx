import svgPaths from "./svg-n7egkoc8x1";
import imgGeminiGeneratedImageU7Unq1U7Unq1U7Un2 from "./8ad1c0e3f1c2721f34205a430fbe5541520f6ffe.png";

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[39.345px] items-start relative shrink-0 w-[152.304px]">
      <p className="font-['Mulish:Bold',sans-serif] font-bold h-[81.229px] leading-[25.127px] min-w-full relative shrink-0 text-[#222b37] text-[21.107px] w-[min-content]">Stikere</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <div className="content-stretch flex items-center overflow-clip px-[7.731px] py-[5.798px] relative" data-name="Frame/Default">
            <div className="h-[14.071px] relative shrink-0 w-[7.789px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.78932 14.071">
                <path d={svgPaths.p3efc7980} fill="var(--fill-0, #323544)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame />
      <div className="h-[135px] relative shrink-0 w-[131px]" data-name="Gemini_Generated_Image_u7unq1u7unq1u7un 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[99.36%] left-[-45.92%] max-w-none top-[0.37%] w-[188.86%]" src={imgGeminiGeneratedImageU7Unq1U7Unq1U7Un2} />
        </div>
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-[#f7f4fb] content-stretch flex flex-col items-center justify-center pb-[19.326px] pl-[25.124px] pr-[17.394px] pt-[17.394px] relative rounded-[19.096px] size-full">
      <div aria-hidden="true" className="absolute border-[#222b37] border-[1.005px] border-solid inset-0 pointer-events-none rounded-[19.096px]" />
      <Frame1 />
    </div>
  );
}