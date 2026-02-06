import svgPaths from "./svg-1pvamwaak4";
import imgRectangle1984 from "figma:asset/a3bed3c7260b6bcacb2be941323d9c68785af310.png";
import imgHeader from "figma:asset/5f5380810e5937b8b262591e79df134e9a163312.png";

function Container1() {
  return <div className="absolute bg-gradient-to-b from-[#a11212] h-[2px] left-0 shadow-[0px_0px_10px_0px_rgba(161,18,18,0.8)] to-[#a11212] top-[54px] via-1/2 via-[#c0392b] w-[64.297px]" data-name="Container" />;
}

function Button() {
  return (
    <div className="absolute h-[56px] left-0 top-0 w-[64.297px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[32.5px] text-[16px] text-center text-white top-[14px]">INÍCIO</p>
      <Container1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[56px] left-[96.3px] top-0 w-[94.141px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[47.5px] text-[#6a7282] text-[16px] text-center top-[14px]">MEMBROS</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[56px] left-[222.44px] top-0 w-[67.281px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[34px] text-[#6a7282] text-[16px] text-center top-[14px]">FARMS</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[56px] left-[321.72px] top-0 w-[139.406px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[70px] text-[#6a7282] text-[16px] text-center top-[14px]">RECRUTAMENTO</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[56px] left-[493.13px] top-0 w-[70.516px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[35.5px] text-[#6a7282] text-[16px] text-center top-[14px]">BANCO</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[56px] left-[595.64px] top-0 w-[85.625px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[43.5px] text-[#6a7282] text-[16px] text-center top-[14px]">PD</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function TabNavigation() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col h-[57px] items-start left-0 pb-px px-[32px] top-[277px] w-[1440px]" data-name="TabNavigation">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Saldo bancário</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[20px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #00FF9D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #00FF9D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Icon />
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[32px] left-[28px] text-[#00ff9d] text-[24px] top-[-2px]">9,601,630.00</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-b from-[#1a0a0a] h-[78px] relative rounded-[14px] shrink-0 to-[#0c0505] w-[221.766px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[25px] relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Membros online</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[20px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p19291480} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[32px] left-[28px] text-[24px] text-white top-[-2px]">9/149</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-gradient-to-b from-[#1a0a0a] h-[78px] relative rounded-[14px] shrink-0 to-[#0c0505] w-[160px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[25px] relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Avaliação</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[32px] relative shrink-0 w-[47.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[24px] text-white">4.93</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p24292e00} fill="var(--fill-0, #D4AF37)" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p24292e00} fill="var(--fill-0, #D4AF37)" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p24292e00} fill="var(--fill-0, #D4AF37)" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p24292e00} fill="var(--fill-0, #D4AF37)" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.24%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
              <path d={svgPaths.p1416a00} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-start relative size-full">
        <Icon2 />
        <Icon3 />
        <Icon4 />
        <Icon5 />
        <Icon6 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px]">(51)</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container13 />
      <Text1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-gradient-to-b flex-[1_0_0] from-[#1a0a0a] h-[78px] min-h-px min-w-px relative rounded-[14px] to-[#0c0505]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[25px] relative size-full">
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[78px] items-start left-[402.88px] top-0 w-[651.875px]" data-name="Container">
      <Container4 />
      <Container7 />
      <Container10 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#a11212] flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[49.5px] text-[16px] text-center text-white top-[10px]">Avaliar</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 17.4966">
            <path d={svgPaths.p190f2380} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#1a0a0a] relative rounded-[10px] shrink-0 size-[46px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.4)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, #A11212)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, #A11212)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#1a0a0a] relative rounded-[10px] shrink-0 size-[46px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.4)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-[1162.77px] top-[15px] w-[213.234px]" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[78px] left-0 top-0 w-[1376px]" data-name="Container">
      <Container3 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-0 w-[294.859px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Organização</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[40px] left-[50px] top-[21px] w-[294.859px]" data-name="Heading 1">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[40px] left-0 text-[36px] text-white top-[-3px] tracking-[0.9px]">é os cria</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[60px] relative shrink-0 w-[294.859px]" data-name="Container">
      <Container16 />
      <Heading />
      <div className="absolute left-0 rounded-[8px] size-[42px] top-[20px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle1984} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[78px] items-start relative shrink-0 w-[1376px]">
      <Container2 />
      <Container15 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col h-[277px] items-start left-0 pb-px pt-[24px] px-[32px] top-0 w-[1440px]" data-name="Header">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeader} />
      <div aria-hidden="true" className="absolute border-[rgba(161,18,18,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Frame />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[20px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pf6c1580} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35aeb380} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <Icon9 />
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-[28px] text-[18px] text-white top-[-1px]">Ranking | Entrega de farm</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">1°</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Florian Iue</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #00FF9D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #00FF9D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[33.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#00ff9d] text-[14px] top-[-2px]">+2</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[24px] relative shrink-0 w-[154.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text2 />
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-white top-[-2px]">328</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p31a31050} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3aa65680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35d0aa80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d126f60} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24c07500} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[50.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text5 />
        <Icon11 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">2°</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">kevyn soares</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[24px] relative shrink-0 w-[126.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-white top-[-2px]">308</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p227d3a80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3eb4fd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[50.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text8 />
        <Icon12 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container24 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">3°</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">alejandro miguel</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[154.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text9 />
        <Text10 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-white top-[-2px]">186</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p31a31050} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3aa65680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35d0aa80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d126f60} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24c07500} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[48.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text11 />
        <Icon13 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container27 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[168px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-gradient-to-b from-[rgba(26,10,10,0.5)] h-[262px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading1 />
        <Container19 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[20px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_403)" id="Icon">
          <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p39b9b180} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_403">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <Icon14 />
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-[28px] text-[18px] text-white top-[-1px]">Ranking | Tempo jogado</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">1°</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white">1968 Patrício Belford</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[163.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px]">689h 53min</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p31a31050} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3aa65680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35d0aa80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d126f60} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24c07500} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text14 />
        <Icon15 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container32 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">2°</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white">63283 Bonnie Snowden</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[24px] relative shrink-0 w-[181.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text15 />
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px]">371h 21min</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p227d3a80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3eb4fd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text17 />
        <Icon16 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container35 />
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">3°</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white">53430 revoada FOX</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[24px] relative shrink-0 w-[156.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text18 />
        <Text19 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px]">353h 18min</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p118c8300} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26d22700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text20 />
        <Icon17 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container38 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">4°</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white">17232 gabriel carvalho</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[24px] relative shrink-0 w-[175.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text21 />
        <Text22 />
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px]">307h 49min</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p31a31050} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3aa65680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35d0aa80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d126f60} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24c07500} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text23 />
        <Icon18 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container41 />
          <Container42 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#d4af37] text-[16px] top-[-2px] w-[16px] whitespace-pre-wrap">5°</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-white">59778 kevyn soares</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[24px] relative shrink-0 w-[156.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text24 />
        <Text25 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px]">246h 36min</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p227d3a80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3eb4fd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text26 />
        <Icon19 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[rgba(0,0,0,0.54)] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container44 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[288px] items-start relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container34 />
      <Container37 />
      <Container40 />
      <Container43 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-gradient-to-b from-[rgba(26,10,10,0.5)] h-[382px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading2 />
        <Container30 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[870px] items-start left-0 top-0 w-[430.656px]" data-name="Container">
      <Container18 />
      <Container29 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[28px] left-[25px] top-[25px] w-[380.672px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-[190.59px] text-[18px] text-center text-white top-[-1px]">META DIÁRIA</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[32.34%_24.99%_32.34%_67.7%]" data-name="Vector">
          <div className="absolute inset-[-11.8%_-57.02%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.50248 6.98533">
              <path d={svgPaths.p2a4c7e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.56%_8.35%_20.55%_79.47%]" data-name="Vector">
          <div className="absolute inset-[-7.08%_-34.19%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.28324 10.756">
              <path d={svgPaths.p14e9c100} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.56%_79.49%_20.55%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-7.08%_-34.19%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.28324 10.756">
              <path d={svgPaths.p15468880} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[32.34%] left-1/4 right-[67.69%] top-[32.34%]" data-name="Vector">
          <div className="absolute inset-[-11.8%_-57.02%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.50248 6.98533">
              <path d={svgPaths.p28643e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[41.66%_41.66%_41.67%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center">10</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon20 />
        <Text27 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[53.71%_29.17%_8.33%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-10.98%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99786 7.40633">
              <path d={svgPaths.p319afb00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[41.66%] left-1/4 right-1/4 top-[8.34%]" data-name="Vector">
          <div className="absolute inset-[-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
              <path d={svgPaths.p341ae80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center">10</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon21 />
        <Text28 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] text-center whitespace-pre-wrap">Você receberá</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[14px] text-center text-white whitespace-pre-wrap">$00.00</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] content-stretch flex flex-col gap-[8px] h-[80px] items-start left-[25px] px-[4px] rounded-[6px] top-[236px] w-[381px]" data-name="Container">
      <Container49 />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#a11212] h-[48px] left-[25px] rounded-[10px] top-[388px] w-[380.672px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[190.53px] text-[16px] text-center text-white top-[10px]">Entregar</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#99a1af] text-[14px] text-center whitespace-pre-wrap">Prêmio para completar</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#00ff9d] text-[24px] text-center whitespace-pre-wrap">$2,000.00</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[85px] items-start left-[25px] pt-[25px] top-[441px] w-[380.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Group({ className }: { className?: string }) {
  return (
    <div className={className || "absolute h-[22px] left-[102px] top-[341px] w-[228px]"}>
      <div className="absolute bg-[#484848] inset-[31.82%_0_31.82%_1.75%] rounded-[4px]" />
      <div className="absolute inset-[0_88.6%_0_1.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, white)" id="Ellipse 180" r="11" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[199.17px] text-center top-[115.17px]">
      <p className="-translate-x-1/2 absolute font-['Arimo:Bold',sans-serif] font-bold leading-[36px] left-[214.67px] text-[24px] text-white top-[115.17px]">0</p>
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[214.67px] text-[#99a1af] text-[12px] top-[151.17px]">/2000</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[156px] top-[86px]">
      <Group1 />
      <div className="absolute flex inset-[15.61%_36.3%_62.92%_36.22%] items-center justify-center">
        <div className="-rotate-90 flex-none size-[118.333px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-5.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130.333 130.333">
                <path d={svgPaths.p239f5e80} id="Vector" stroke="var(--stroke-0, #2A1010)" strokeWidth="12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[15.61%_36.3%_62.92%_36.22%] items-center justify-center">
        <div className="-rotate-90 flex-none size-[118.333px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-5.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130.333 130.333">
                <path d={svgPaths.p239f5e80} id="Vector" stroke="url(#paint0_linear_1_383)" strokeDasharray="502.4 502.4" strokeLinecap="round" strokeWidth="12" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_383" x1="6" x2="11839.3" y1="6" y2="6">
                    <stop stopColor="#A11212" />
                    <stop offset="1" stopColor="#C0392B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-gradient-to-b from-[rgba(26,10,10,0.5)] h-[551px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-[430.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Heading3 />
      <Container48 />
      <Button9 />
      <Container52 />
      <Group />
      <Group2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-white top-[-1px]">Seu desempenho | Entrega de farm</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.516px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5156 24">
        <g id="Icon">
          <path d={svgPaths.p27c81280} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
          <path d={svgPaths.p299ee600} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.516px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[13.89px] top-[109px] w-[19.719px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Seg</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[128px] left-0 top-0 w-[47.516px]" data-name="Container">
      <Container56 />
      <Text29 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.531px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5312 24">
        <g id="Icon">
          <path d={svgPaths.p15c1f720} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
          <path d={svgPaths.p196ea400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.531px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[15.98px] top-[109px] w-[15.563px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Ter</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute h-[128px] left-[55.52px] top-0 w-[47.531px]" data-name="Container">
      <Container58 />
      <Text30 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.516px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5156 24">
        <g id="Icon">
          <path d={svgPaths.p27c81280} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
          <path d={svgPaths.p299ee600} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.516px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[12.78px] top-[109px] w-[21.953px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Qua</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[128px] left-[111.05px] top-0 w-[47.516px]" data-name="Container">
      <Container60 />
      <Text31 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.531px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5312 24">
        <g id="Icon">
          <path d={svgPaths.p15c1f720} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
          <path d={svgPaths.p196ea400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.531px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[14.39px] top-[109px] w-[18.75px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Qui</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[128px] left-[166.56px] top-0 w-[47.531px]" data-name="Container">
      <Container62 />
      <Text32 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.516px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5156 24">
        <g id="Icon">
          <path d={svgPaths.p27c81280} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
          <path d={svgPaths.p299ee600} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95964" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.516px]" data-name="Container">
      <Icon26 />
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[14.67px] top-[109px] w-[18.172px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Sex</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[128px] left-[222.09px] top-0 w-[47.516px]" data-name="Container">
      <Container64 />
      <Text33 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.531px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5312 24">
        <g id="Icon">
          <path d={svgPaths.p15c1f720} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
          <path d={svgPaths.p196ea400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
        </g>
      </svg>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.531px]" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[13.98px] top-[109px] w-[19.547px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Sáb</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute h-[128px] left-[277.61px] top-0 w-[47.531px]" data-name="Container">
      <Container66 />
      <Text34 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.531px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5312 24">
        <g id="Icon">
          <path d={svgPaths.p15c1f720} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
          <path d={svgPaths.p196ea400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.96094" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[96px] items-end justify-center left-0 pb-[12px] rounded-[10px] top-0 w-[47.531px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[10.88px] top-[109px] w-[25.781px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] text-center">Dom</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute h-[128px] left-[333.14px] top-0 w-[47.531px]" data-name="Container">
      <Container68 />
      <Text35 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container57 />
      <Container59 />
      <Container61 />
      <Container63 />
      <Container65 />
      <Container67 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[24px] relative shrink-0 w-[70.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2px]">Progresso</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-white top-[-2px]">0/2000</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text36 />
      <Text37 />
    </div>
  );
}

function Container72() {
  return <div className="bg-gradient-to-b from-[#a11212] h-[8px] rounded-[33554400px] shrink-0 to-[#c0392b] w-full" data-name="Container" />;
}

function Container71() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[380.672px] relative size-full">
        <Container72 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[57px] items-start pt-[17px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container70 />
      <Container71 />
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-gradient-to-b from-[rgba(26,10,10,0.5)] h-[295px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading4 />
        <Container54 />
        <Container69 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[870px] items-start left-[454.66px] top-0 w-[430.672px]" data-name="Container">
      <Container47 />
      <Container53 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-white top-[-1px]">Mensagens do líder</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Rádio: 320, 321, 323</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Jaqueta: 664 textura25</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Calça: 27a textura</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Mochila 22 textura 5</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-[rgba(0,0,0,0.19)] h-[164px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Paragraph4 />
        <Paragraph5 />
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="bg-gradient-to-b from-[rgba(26,10,10,0.5)] h-[258px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading5 />
        <Container75 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-white top-[-1px]">Líderes da organização</p>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ae89300} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M6.66797 28H25.3346" id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-[rgba(184,151,94,0.2)] h-[24px] relative rounded-[4px] shrink-0 w-[71.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[6px] text-[#d4af37] text-[14px] top-[2px] w-[60px] whitespace-pre-wrap">VIP Prata</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text38 />
    </div>
  );
}

function Paragraph8() {
  return <div className="h-[24px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container78() {
  return (
    <div className="flex-[1_0_0] h-[52px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container79 />
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[16px] text-white">97606 | Leonardo lima</p>
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-gradient-to-r from-[rgba(161,18,18,0.2)] h-[86px] relative rounded-[10px] shrink-0 to-[rgba(0,0,0,0)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(212,175,55,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[17px] py-px relative size-full">
          <Icon29 />
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[rgba(26,10,10,0.5)] gap-[16px] h-[180px] items-start pb-px pt-[25px] px-[25px] relative rounded-[14px] shrink-0 to-[rgba(12,5,5,0.5)] w-[430.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(161,18,18,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Heading6 />
      <Container77 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[87.66px] size-[32px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p18cd8300} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9d59e00} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p362b0d00} id="Vector_3" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p24828080} id="Vector_4" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p11a63e00} id="Vector_5" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[68px] w-[159.328px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Rádio</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#a11212] content-stretch flex h-[36px] items-start left-[24px] py-[8px] rounded-[10px] top-[104px] w-[159.328px]" data-name="Button">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[14px] text-center text-white whitespace-pre-wrap">Entrar</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-gradient-to-b border border-[rgba(161,18,18,0.3)] border-solid from-[rgba(26,10,10,0.5)] h-[166px] left-0 rounded-[10px] to-[rgba(12,5,5,0.5)] top-0 w-[209.328px]" data-name="Container">
      <Icon30 />
      <Paragraph9 />
      <Button10 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-[87.66px] size-[32px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p305f01f0} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p16150d00} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[68px] w-[159.328px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2px]">Localização</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#a11212] content-stretch flex h-[36px] items-start left-[24px] py-[8px] rounded-[10px] top-[104px] w-[159.328px]" data-name="Button">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[14px] text-center text-white whitespace-pre-wrap">Marcar</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute bg-gradient-to-b border border-[rgba(161,18,18,0.3)] border-solid from-[rgba(26,10,10,0.5)] h-[166px] left-[221.33px] rounded-[10px] to-[rgba(12,5,5,0.5)] top-0 w-[209.328px]" data-name="Container">
      <Icon31 />
      <Paragraph10 />
      <Button11 />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[166px] relative shrink-0 w-full" data-name="Container">
      <Container81 />
      <Container82 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[870px] items-start left-[909.33px] top-0 w-[430.656px]" data-name="Container">
      <Container74 />
      <Container76 />
      <Container80 />
    </div>
  );
}

function Inicio() {
  return (
    <div className="absolute h-[710px] left-[50px] overflow-x-clip overflow-y-auto top-[358px] w-[1340px]" data-name="Inicio">
      <Container17 />
      <Container46 />
      <Container73 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-black relative size-full" data-name="Desktop - 7">
      <TabNavigation />
      <Header />
      <div className="absolute bg-gradient-to-b from-[#070707] h-[690px] left-0 to-[#00afef] top-[334px] w-[1440px]" />
      <Inicio />
    </div>
  );
}