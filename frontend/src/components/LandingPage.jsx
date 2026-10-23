import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiLock, FiMessageCircle, FiPlay, FiShield, FiUsers } from 'react-icons/fi';

const previewMessages = [
  { author: 'Aisha', text: 'The weekend plan is still on 🌿', time: '10:42', mine: false },
  { author: 'You', text: 'Absolutely. I found the perfect spot.', time: '10:43', mine: true },
  { author: 'Aisha', text: 'Perfect. See you there!', time: '10:43', mine: false },
];

const LandingPage = () => {
  return (
    <main className="landing-page relative h-full min-h-screen overflow-x-hidden overflow-y-auto bg-[#111b21] text-slate-100">
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-emerald-900/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 -top-20 h-96 w-96 rounded-full bg-emerald-700/20 blur-3xl sm:-right-24" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="chatX home">
          <img
            src="/chatx-neon-logo.png"
            alt=""
            className="h-12 w-12 rounded-[13px] object-cover shadow-lg shadow-[#168c63]/20"
          />
          <span className="text-lg font-black tracking-[-0.04em]">chatX</span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link className="hidden px-3 py-2 text-slate-300 transition hover:text-white sm:block" to="/login">
            Log in
          </Link>
          <Link className="rounded-full bg-emerald-500 px-5 py-2.5 text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-400" to="/signup">
            Get started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div className="max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#202c33] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Conversations, made human
          </div>
          <h1 className="max-w-lg text-5xl font-black leading-[0.98] tracking-[-0.065em] text-slate-50 sm:text-6xl lg:text-7xl">
            Stay close to the people who matter.
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-slate-400 sm:text-lg">
            A calm, private place for your everyday conversations. Message friends, share the moment, and always pick up right where you left off.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-400" to="/signup">
              Start chatting
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} />
            </Link>
            <Link className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#202c33] px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-emerald-300/60 hover:bg-[#26343b]" to="/login">
              <FiPlay size={14} fill="currentColor" />
              I have an account
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
            <span className="inline-flex items-center gap-2"><FiLock size={14} className="text-emerald-300" /> Private by default</span>
            <span className="inline-flex items-center gap-2"><FiCheck size={14} className="text-emerald-300" /> Simple to use</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:pl-8">
          <div className="absolute -right-2 top-8 hidden rounded-2xl border border-white/10 bg-[#202c33]/95 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:block lg:-right-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200"><span className="h-2 w-2 rounded-full bg-emerald-400" /> 3 friends online</div>
          </div>
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#202c33] p-3 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.55)] sm:p-5">
            <div className="absolute inset-x-12 top-0 h-20 rounded-full bg-emerald-300/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#111b21] shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#202c33] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e3b078] text-sm font-black text-[#5a3822]">A<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#35c58a]" /></div>
                  <div><p className="text-sm font-bold text-slate-100">Aisha Rahman</p><p className="text-[11px] font-medium text-slate-400">online now</p></div>
                </div>
                <FiMessageCircle className="text-emerald-300" size={20} />
              </div>
              <div className="space-y-4 bg-[linear-gradient(135deg,#111b21_25%,#17242a_25%,#17242a_50%,#111b21_50%,#111b21_75%,#17242a_75%)] bg-size-[28px_28px] px-4 py-7 sm:px-8 sm:py-10">
                <div className="mx-auto mb-5 w-fit rounded-full bg-[#202c33] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 shadow-sm">Today</div>
                {previewMessages.map((item) => (
                  <div key={`${item.author}-${item.time}`} className={`flex ${item.mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${item.mine ? 'rounded-br-md bg-emerald-500/20 text-emerald-50' : 'rounded-bl-md bg-[#202c33] text-slate-200'}`}>
                      <p className="text-[11px] font-bold text-emerald-300">{item.author}</p>
                      <p className="mt-1 text-sm leading-5">{item.text}</p>
                      <p className="mt-1 text-right text-[10px] font-medium text-slate-400">{item.time} <span className="text-emerald-300">✓✓</span></p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-3 text-xs font-medium text-slate-400"><span className="flex gap-1 rounded-full bg-[#202c33] px-3 py-2 shadow-sm"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>Aisha is typing...</div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 bg-[#202c33] px-4 py-3"><div className="h-10 flex-1 rounded-full bg-[#111b21] px-4 py-3 text-xs text-slate-500">Write a message...</div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-slate-950"><FiArrowUpRight size={18} /></span></div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#202c33]/95 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:flex lg:-left-8"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"><FiShield size={18} /></span><div><p className="text-xs font-bold text-slate-200">Your space, your rules</p><p className="text-[10px] text-slate-400">Built for real connection</p></div></div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 pb-12 sm:grid-cols-3 lg:px-10">
        {[
          [FiLock, 'Private conversations', 'Your chats stay personal and easy to manage.'],
          [FiUsers, 'People, not noise', 'Keep the important conversations close.'],
          [FiMessageCircle, 'Always in the flow', 'Pick up naturally across every conversation.'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="border-t border-white/10 px-1 pt-5 sm:px-4"><Icon className="mb-3 text-emerald-300" size={20} /><h2 className="text-sm font-bold text-slate-200">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-5 text-center text-sm text-slate-400">
        Made by <span className="font-semibold text-emerald-300">Muzahir Ali</span>
      </footer>
    </main>
  );
};

export default LandingPage;
