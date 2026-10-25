import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
// import photo3 from '../assets/photo3.jpg';

const AUTOPLAY_MS = 6000; // 슬라이드 자동 전환 간격
const INTRO_END_MS = 4700; // 인트로 종료 시점 (헤더가 나타나는 시간과 동일)

const slides = [
  {
    image: photo1,
    badge: 'Acts 29 Model Church · 2030 세계비전',
    title: '200명의 리더\n1000명의 예배자',
    description:
      '"그 작은 자가 천명을 이루겠고 그 약한 자가 강국을 이룰 것이라\n때가 되면 나 여호와가 속히 이루리라" (사 60:22)',
    cta: { label: '교회비전 보기', to: '/vision' },
  },
  {
    image: photo2,
    badge: '2026 Vision 표어',
    title: '만남, 그리고\n누림과 나눔이 넘치는 교회',
    description:
      '하나님의 사랑으로 서로를 만나고,\n은혜를 누리고, 세상에 나누는 공동체',
    cta: { label: '예배 안내 보기', to: '/worship/sunday' },
  },
  {
    image: photo2, // photo3 준비되면 교체
    badge: '5천5백 세계비전 · 선교',
    title: '열방을 향한\n하나님의 꿈을 함께',
    description:
      '"땅 끝까지 이르러 내 증인이 되리라" (행 1:8)\n순복음누림교회와 함께 세계선교에 동참하세요',
    cta: { label: '소그룹 알아보기', to: '/training/group' },
  },
];

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [paused, setPaused] = useState(false);

  const total = slides.length;
  const slide = slides[currentIndex];

  const goTo = (index) => {
    setIntroDone(true);
    setCurrentIndex((index + total) % total);
  };

  // 첫 진입엔 느린 인트로, 슬라이드 전환 때는 짧은 등장 애니메이션
  const enter = (n) => (introDone ? `animate-swap-${n}` : `opacity-0 animate-slide-up-${n}`);

  return (
    <>
      <section className="relative w-full h-[100dvh] -mt-[86px] text-white overflow-hidden">
        {/* 1. 배경: 모든 사진을 겹쳐 두고 크로스페이드 */}
        <div className="absolute inset-0 z-0">
          {slides.map((s, i) => {
            const active = i === currentIndex;
            return (
              <img
                key={i}
                src={s.image}
                alt={active ? `순복음누림교회 슬라이드 ${i + 1}` : ''}
                aria-hidden={!active}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${active ? 'opacity-100 animate-zoom-in' : 'opacity-0'
                  }`}
              />
            );
          })}

          {/* 2. 오버레이: 글씨가 놓이는 왼쪽만 진하게, 오른쪽은 사진이 보이도록 */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/30 to-transparent opacity-0 animate-overlay-in" />
          <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* 3. 메인 컨텐츠: 좌측 정렬 */}
        <div className="relative z-20 h-full flex items-center pt-[85px] pb-36 md:pb-40">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div key={currentIndex} className="max-w-4xl">
              <h1
                className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.12] whitespace-pre-line ${enter(1)}`}
              >
                {slide.title}
              </h1>

              <p
                className={`mt-6 md:mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-200 whitespace-pre-line ${enter(2)}`}
              >
                {slide.description}
              </p>

              <div className={`mt-10 flex flex-wrap gap-3 ${enter(3)}`}>
                <NavLink
                  to={slide.cta.to}
                  className={`inline-flex items-center rounded-full bg-amber-400 px-7 py-3.5 text-base font-bold text-neutral-900 transition-colors hover:bg-amber-300 ${focusRing}`}
                >
                  {slide.cta.label}
                </NavLink>
                <NavLink
                  to="/location"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                >
                  오시는 길
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 하단: 진행 바 형태의 슬라이드 네비게이션 */}
        <div className="absolute inset-x-0 bottom-0 z-30 opacity-0 animate-slide-up-4">
          <div
            className="max-w-7xl mx-auto px-6 pb-8 md:pb-10"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
            onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="flex items-end gap-4 md:gap-8">
              <ul className="flex flex-1 gap-3 md:gap-6">
                {slides.map((s, i) => {
                  const active = i === currentIndex;
                  return (
                    <li key={i} className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`슬라이드 ${i + 1}: ${s.badge}`}
                        aria-current={active}
                        className={`group w-full text-left cursor-pointer ${focusRing}`}
                      >
                        <span
                          className={`mb-3 flex items-baseline gap-3 text-sm transition-colors ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                            }`}
                        >
                          <span className="font-semibold tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="hidden md:block truncate">{s.badge}</span>
                        </span>

                        <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                          {active && (
                            <span
                              key={currentIndex}
                              onAnimationEnd={() => goTo(currentIndex + 1)}
                              className="progress-fill absolute inset-0 origin-left bg-amber-400"
                              style={{
                                '--autoplay-ms': `${AUTOPLAY_MS}ms`,
                                '--autoplay-delay': introDone ? '0ms' : `${INTRO_END_MS}ms`,
                                animationPlayState: paused ? 'paused' : 'running',
                              }}
                            />
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(currentIndex - 1)}
                  aria-label="이전 슬라이드"
                  className={`grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer ${focusRing}`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex + 1)}
                  aria-label="다음 슬라이드"
                  className={`grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer ${focusRing}`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 바로가기 섹션 */}
      <section className="w-full bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {/* 예배 안내 */}
            <NavLink
              to="/worship/sunday"
              className="group flex min-h-[400px] flex-col items-center justify-between rounded-full border border-slate-200/80 bg-white px-4 py-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)] sm:min-h-[270px] sm:px-5 sm:py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-9 sm:w-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M5 8h14M7 8v4a5 5 0 0010 0V8M4 21h16" />
                </svg>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">예배 안내</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">함께 예배하는 시간</p>
              </div>
              <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>
            </NavLink>

            {/* 설교 말씀 */}
            <NavLink
              to="/sermon/thisweek"
              className="group flex min-h-[400px] flex-col items-center justify-between rounded-full border border-slate-200/80 bg-white px-4 py-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)] sm:min-h-[270px] sm:px-5 sm:py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-9 sm:w-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 4.5A2.5 2.5 0 017.5 2H20v17H7.5A2.5 2.5 0 015 16.5v-12zM5 16.5A2.5 2.5 0 017.5 14H20M9 7h7M9 10h7" />
                </svg>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">설교 말씀</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">말씀으로 채우는 하루</p>
              </div>
              <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>
            </NavLink>

            {/* 선교비전 */}
            <NavLink
              to="/mission/vision"
              className="group flex min-h-[400px] flex-col items-center justify-between rounded-full border border-slate-200/80 bg-white px-4 py-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)] sm:min-h-[270px] sm:px-5 sm:py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-9 sm:w-9">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
                </svg>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">선교비전</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">복음을 세상으로</p>
              </div>
              <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>
            </NavLink>

            {/* 온라인 헌금 */}
            <NavLink
              to="/offering"
              className="group flex min-h-[400px] flex-col items-center justify-between rounded-full border border-slate-200/80 bg-white px-4 py-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)] sm:min-h-[270px] sm:px-5 sm:py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-9 sm:w-9">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h3" />
                </svg>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">온라인 헌금</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">마음과 정성을 드리는</p>
              </div>
              <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>
            </NavLink>

            {/* 오시는 길 */}
            <NavLink
              to="/location"
              className="group flex min-h-[400px] flex-col items-center justify-between rounded-full border border-slate-200/80 bg-white px-4 py-7 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)] sm:min-h-[270px] sm:px-5 sm:py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-9 sm:w-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">오시는 길</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">누림교회 찾아오시는 길</p>
              </div>
              <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </div>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
