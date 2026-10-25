
import { NavLink } from 'react-router-dom';

const footerMenus = [
  {
    title: '교회소개',
    engTitle: 'ABOUT US',
    links: [
      { label: '교회소개', to: '/about' },
      { label: '담임목사 인사말', to: '/greeting' },
      { label: '교회비전', to: '/vision' },
      { label: '교회역사', to: '/history' },
      { label: '오시는 길', to: '/location' },
    ],
  },
  {
    title: '예배·말씀',
    engTitle: 'BROADCAST',
    links: [
      { label: '주일예배', to: '/worship/sunday' },
      { label: '수요예배', to: '/worship/wednesday' },
      { label: '새벽기도회', to: '/worship/dawn' },
      { label: '이번 주 설교', to: '/sermon/thisweek' },
      { label: '설교 아카이브', to: '/sermon/archive' },
    ],
  },
  {
    title: '훈련·성장',
    engTitle: 'TRAINING',
    links: [
      { label: '제자훈련', to: '/training/disciple' },
      { label: '사역훈련', to: '/training/ministry' },
      { label: '새가족교육', to: '/training/newcomer' },
      { label: '성경공부', to: '/training/bible' },
      { label: '소그룹(목장)', to: '/training/group' },
    ],
  },
  {
    title: '커뮤니티',
    engTitle: 'COMMUNITY',
    links: [
      { label: '공지사항', to: '/comm/notice' },
      { label: '주보', to: '/comm/bulletin' },
      { label: '교우소식', to: '/comm/news' },
      { label: '기도요청', to: '/comm/prayer' },
      { label: '자료실', to: '/comm/archive' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 text-white shadow-[0_-8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-6">

        {/* 상단: 교회 정보와 메뉴 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-3 lg:grid-cols-6 lg:gap-10 lg:py-16">

          {/* 교회 로고 및 소개 */}
          <div className="col-span-2 lg:col-span-2">
            <NavLink to="/" className="group inline-flex flex-col">
              <span className="text-[10px] font-normal tracking-wider text-gray-400">
                기독교대한하나님의성회
              </span>

              <span className="mt-1 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-amber-400">
                순복음누림교회
              </span>
            </NavLink>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
              만남, 그리고 누림과 나눔이 넘치는 교회.
              하나님의 사랑을 함께 누리고 세상에 나눕니다.
            </p>

            <div className="mt-6">
              <span className="text-xs font-bold tracking-[0.2em] text-amber-400">
                2026 VISION
              </span>
              <p className="mt-2 text-sm text-gray-400">
                Acts 29 Model Church · 2030 세계비전
              </p>
            </div>
          </div>

          {/* 메뉴 그룹 */}
          {footerMenus.map((menu) => (
            <div key={menu.engTitle}>
              <h3 className="text-sm font-bold text-white">
                {menu.title}
              </h3>

              <p className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-amber-400">
                {menu.engTitle}
              </p>

              <ul className="mt-5 space-y-3">
                {menu.links.map((link) => (
                  <li key={link.to + link.label}>
                    <NavLink
                      to={link.to}
                      className="text-sm text-gray-400 transition-colors duration-200 hover:text-amber-400"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단: 문의 및 오시는 길 */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">

          <div className="space-y-2 text-xs leading-6 text-gray-400">
            <p>
              <span className="mr-3 font-semibold text-gray-300">
                순복음누림교회
              </span>
              하나님의 사랑을 누리고 나누는 공동체
            </p>

            <p>
              교회 주소 및 대표 전화번호를 입력해 주세요.
            </p>
          </div>

          <NavLink
            to="/location"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-amber-400/50 hover:bg-white/10 hover:text-amber-400"
          >
            오시는 길
            <span aria-hidden="true">↗</span>
          </NavLink>
        </div>

        {/* 저작권 */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} 순복음누림교회. All rights reserved.
          </p>

          <NavLink
            to="/"
            className="w-fit transition-colors hover:text-amber-400"
          >
            HOME ↑
          </NavLink>
        </div>

      </div>
    </footer>
  );
}
