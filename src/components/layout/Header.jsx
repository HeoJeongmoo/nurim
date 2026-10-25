import { NavLink } from 'react-router-dom';

const menus = [
  {
    label: '교회소개',
    engTitle: 'ABOUT US',
    children: [
      { label: '교회소개 전체보기', to: '/about' },
      { label: '담임목사 인사말', to: '/greeting' },
      { label: '교회비전', to: '/vision' },
      { label: '교회역사', to: '/history' },
      { label: '교역자 소개', to: '/pastors' },
      { label: '교회 조직', to: '/organization' },
      { label: '오시는 길', to: '/location' },
    ],
  },
  {
    label: '예배·말씀',
    engTitle: 'BROADCAST',
    children: [
      { label: '주일예배', to: '/worship/sunday' },
      { label: '수요예배', to: '/worship/wednesday' },
      { label: '새벽기도회', to: '/worship/dawn' },
      { label: '금요기도회', to: '/worship/friday' },
      { label: '이번 주 설교', to: '/sermon/thisweek' },
      { label: '설교 아카이브', to: '/sermon/archive' },
      { label: '특별집회', to: '/sermon/special' },
      { label: '찬양', to: '/media/praise' },
      { label: '사진갤러리', to: '/media/gallery' },
    ],
  },
  {
    label: '훈련·성장',
    engTitle: 'TRAINING',
    children: [
      { label: '제자훈련', to: '/training/disciple' },
      { label: '사역훈련', to: '/training/ministry' },
      { label: '새가족교육', to: '/training/newcomer' },
      { label: '성경공부', to: '/training/bible' },
      { label: '소그룹(목장)', to: '/training/group' },
    ],
  },
  {
    label: '부서·사역',
    engTitle: 'MINISTRY',
    children: [
      { label: '유아·유치부', to: '/dept/preschool' },
      { label: '초등부', to: '/dept/children' },
      { label: '중고등부', to: '/dept/youth' },
      { label: '청년부', to: '/dept/youngadult' },
      { label: '선교부', to: '/dept/missions' },
      { label: '찬양팀', to: '/dept/praise' },
    ],
  },
  {
    label: '선교',
    engTitle: 'MISSION',
    children: [
      { label: '선교 전체보기', to: '/mission' },
      { label: '선교비전 2030', to: '/mission/vision' },
      { label: '파송선교사', to: '/mission/sent' },
      { label: '해외선교', to: '/mission/overseas' },
      { label: '지역사회섬김', to: '/mission/local' },
    ],
  },
  {
    label: '커뮤니티',
    engTitle: 'COMMUNITY',
    children: [
      { label: '공지사항', to: '/comm/notice' },
      { label: '주보', to: '/comm/bulletin' },
      { label: '교우소식', to: '/comm/news' },
      { label: '기도요청', to: '/comm/prayer' },
      { label: '자료실', to: '/comm/archive' },
    ],
  },
  { label: '새가족·문의', to: '/contact' },
  { label: '헌금', to: '/offering' },
];

export default function Header() {
  return (
    /* 블랙 글래스모피즘 적용 및 border 고정 */
    <header id="header" className="sticky top-0 z-50 w-full border-b border-white/15 bg-slate-950/35 text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl opacity-0 animate-fade-in-header">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[85px] gap-8">
          
          {/* 1. 왼쪽: 로고 영역 */}
          <div className="flex items-center shrink-0">
            <NavLink to="/" className="logo flex items-center gap-3 group">
              <div className="w-9 h-9 flex items-center justify-center"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-300 tracking-wider font-normal">기독교대한하나님의성회</span>
                <span className="text-xl font-bold tracking-tight text-white transition-colors">
                  순복음누림교회
                </span>
              </div>
            </NavLink>
          </div>

          {/* 2. GNB 메뉴 영역 */}
          <nav className="hidden md:flex justify-around flex-1 h-full">
            <ul className="flex items-center gap-7 lg:gap-9 h-full">
              {menus.map((menu, index) => (
                <li key={index} className="group h-full flex items-center">
                  {menu.children ? (
                    <>
                      <button className="flex items-center text-[17px] font-bold text-gray-100 group-hover:text-amber-400 transition-colors py-2 cursor-pointer h-full whitespace-nowrap">
                        {menu.label}
                      </button>

                      {/* ======= 메가 메뉴: 블랙 반투명 유리질감(글래스모피즘) 적용 ======= */}
                      <div className="absolute top-[85px] left-0 w-full h-[240px] bg-black/60 backdrop-blur-xl border-t border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex items-center">
                        <div className="max-w-7xl mx-auto px-6 w-full flex gap-12 items-center">
                          
                          {/* 왼쪽: 대분류 타이틀 영역 */}
                          <div className="w-64 border-r border-white/10 pr-8 flex flex-col justify-center shrink-0">
                            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
                              {menu.engTitle}
                            </span>
                            <h3 className="text-2xl font-bold text-white tracking-tight">
                              {menu.label}
                            </h3>
                          </div>

                          {/* 오른쪽: 하위 메뉴 리스트 */}
                          <div className="flex-1 flex flex-wrap content-center">
                            {menu.children.map((child, cIdx) => (
                              <div key={cIdx} className="w-1/4 h-[50px] flex items-center px-2">
                                <NavLink
                                  to={child.to}
                                  className={({ isActive }) =>
                                    `text-[17px] font-medium transition-colors hover:text-amber-400 ${
                                      isActive ? 'text-amber-400 font-bold' : 'text-gray-200'
                                    }`
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        `text-[17px] font-bold transition-colors hover:text-amber-400 whitespace-nowrap ${
                          isActive ? 'text-amber-400 font-bold' : 'text-gray-100'
                        }`
                      }
                    >
                      {menu.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="https://www.youtube.com/@nureum/live"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold tracking-wider text-red-600 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 group-hover:bg-white" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 group-hover:bg-white" />
            </span>
                      
            LIVE
          </a>
        </div>
      </div>
    </header>
  );
}