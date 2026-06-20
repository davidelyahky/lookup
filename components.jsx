/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- Scroll reveal ---------- */
function Reveal({ children, delay = 0, as = 'div', className = '', style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        done = true;
        el.classList.add('in');
        window.removeEventListener('scroll', reveal);
      }
    };
    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);
    const safety = setTimeout(() => {
      done = true;
      el.classList.add('in');
      el.style.transition = 'none';
      el.style.transform = 'none';
    }, 1000);
    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
      clearTimeout(safety);
    };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>);

}

/* ---------- Minimal glyphs (primitives only) ---------- */
function Glyph({ name }) {
  const s = { width: 26, height: 26, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone':return <svg viewBox="0 0 24 24" {...s}><rect x="7" y="2.5" width="10" height="19" rx="2.4" /><line x1="10.5" y1="18.5" x2="13.5" y2="18.5" /></svg>;
    case 'message':return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4.5" width="18" height="13" rx="3" /><path d="M8 17.5 L8 21 L12 17.5" /></svg>;
    case 'maps':return <svg viewBox="0 0 24 24" {...s}><path d="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21Z" /><circle cx="12" cy="10.4" r="2.1" /></svg>;
    case 'camera':return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="6.5" width="18" height="13" rx="3" /><circle cx="12" cy="13" r="3.3" /><line x1="8" y1="6.5" x2="9.4" y2="4.4" /></svg>;
    case 'music':return <svg viewBox="0 0 24 24" {...s}><circle cx="7" cy="17.5" r="2.4" /><circle cx="17" cy="15.5" r="2.4" /><path d="M9.4 17.5 V6 L19.4 4 V15.5" /></svg>;
    case 'clock':return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5 V12 L15 13.6" /></svg>;
    default:return null;
  }
}

/* ---------- Wordmark ---------- */
function Wordmark() {
  return <span className="wordmark">l<span className="lens"></span><span>okup</span></span>;
}

/* ============================================================ NAV */
function Nav({ onWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" aria-label="lookup home"><Wordmark /></a>
        <div className="nav-links">
          <a href="#problem">The problem</a>
          <a href="#features">What it does</a>
          <a href="#mission">Mission</a>
        </div>
        <div className="nav-cta">
          <button className="btn btn-primary" onClick={onWaitlist}>Contact us</button>
        </div>
      </div>
    </nav>);

}

/* ============================================================ PHONE */
function Phone() {
  return (
    <div
      className="phone phone-photo"
      role="img"
      aria-label="lookup phone with a forest wallpaper that reveals on hover">
      
      <div className="phone-screen">
        <div className="scr-photo"></div>
        <div className="scr-scrim"></div>
        <div className="scr-mark"><Wordmark /></div>
      </div>
    </div>);

}

/* ============================================================ HERO */
function Hero({ onWaitlist }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <Reveal as="div" className="eyebrow" style={{ marginBottom: 22 }}>Still in development · Coming 2026</Reveal>
          <Reveal as="h1" delay={60}>
            Less phone.<br />More <span className="accent">life</span>.
          </Reveal>
          <Reveal as="p" className="hero-sub" delay={130}>
            lookup does calls, texts, maps and music — and deliberately nothing else. No feeds. No app store. No reason to keep staring.
          </Reveal>
          <Reveal className="hero-actions" delay={190}>
            <button className="btn btn-primary" onClick={onWaitlist}>Contact us</button>
            <a className="btn btn-ghost" href="#features">See what it does →</a>
          </Reveal>
          <Reveal className="hero-note" delay={260}>
            <span className="dotpulse"></span> Be first in line when it ships.
          </Reveal>
        </div>
        <Reveal className="phone-stage" delay={120}>
          <Phone />
          <p className="phone-disclaimer" style={{ color: "rgb(49, 47, 42)" }}>Design in progress — the final phone will look different.</p>
        </Reveal>
      </div>
    </header>);

}

/* ============================================================ PROBLEM */
function Stat({ s }) {
  return (
    <div className="stat">
      <div className="num">{s.num}</div>
      <div className="stat-reveal">
        <div className="lbl">{s.lbl}</div>
        <div className="src">— {s.src}</div>
      </div>
    </div>);

}

function Problem() {
  const stats = [
  { num: '5h 16m', lbl: 'the average person spends on their phone — every single day', src: 'US avg, 2025' },
  { num: '144×', lbl: 'times a day we pick it up, mostly without deciding to', src: 'reviews.org' },
  { num: '53%', lbl: 'of us want to cut down on screen time, and quietly can’t', src: '2025 survey' }];

  return (
    <section className="problem section-pad" id="problem">
      <div className="wrap">
        <div className="section-head">
          <Reveal as="div" className="eyebrow">The problem</Reveal>
          <Reveal as="h2" delay={50}>Your phone was supposed to help.</Reveal>
          <Reveal as="p" className="lead" delay={100}>
            Somewhere along the way, the most useful device ever made became the cause of all your wasted time. Every app engineered to keep you scrolling a little longer. It adds up.
          </Reveal>
        </div>
        <Reveal className="stats">
          {stats.map((s, i) =>
          <Stat s={s} key={i} />
          )}
        </Reveal>
      </div>
    </section>);

}

/* ============================================================ FEATURES */
function Features() {
  const does = [
  { t: 'Calls & texts', m: 'The things a phone is for. Nothing fancy — it just does the job.' },
  { t: 'Maps & directions', m: 'Turn-by-turn when you need it. Nothing when you don’t.' },
  { t: 'E-ink display', m: 'Easy on the eyes, readable in sunlight, and sips battery.' },
  { t: 'Music & podcasts', m: 'For the walk and the run.' },
  { t: 'Clock, timer, notes, calculator', m: 'The quiet essentials.' },
  { t: 'Days of battery', m: 'Charge it on Sunday. Forget about it.' }];

  const dont = [
  { t: 'No social media' },
  { t: 'No infinite feeds' },
  { t: 'No app store' },
  { t: 'No web browser' },
  { t: 'No attention-grabbing notifications' },
  { t: 'No ads, ever' }];

  return (
    <section className="section-pad" id="features">
      <div className="wrap">
        <div className="section-head">
          <Reveal as="div" className="eyebrow">What’s inside</Reveal>
          <Reveal as="h2" delay={50}>What it does. What it doesn’t.</Reveal>
          <Reveal as="p" delay={100}>
            We didn’t strip features to save money. We removed everything that was designed to keep you hooked — and kept everything that earns its place.
          </Reveal>
        </div>
        <div className="feat-grid">
          <Reveal className="feat-col feat-does">
            <h3><span className="feat-badge">+</span> Everything you need</h3>
            <div className="sub">The essentials, beautifully made.</div>
            <ul className="feat-list">
              {does.map((d, i) =>
              <li key={i}>
                  <span className="ic">→</span>
                  <span><span className="txt">{d.t}</span><span className="meta">{d.m}</span></span>
                </li>
              )}
            </ul>
          </Reveal>
          <Reveal className="feat-col feat-not" delay={90}>
            <h3><span className="feat-badge">–</span> Nothing you don’t</h3>
            <div className="sub">The stuff built to steal your time.</div>
            <ul className="feat-list">
              {dont.map((d, i) =>
              <li key={i}>
                  <span className="ic">×</span>
                  <span className="txt">{d.t}</span>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>);

}

/* ============================================================ MISSION */
function Mission() {
  return (
    <section className="mission section-pad" id="mission">
      <div className="wrap mission-inner">
        <Reveal as="div" className="eyebrow" style={{ marginBottom: 26 }}>Why we’re building this</Reveal>
        <Reveal as="blockquote" delay={60}>
          We hate how <span className="hl">dependent</span> we’ve become on our phones — our lives <span className="hl">passing us by</span> while we stare. So we’re building the phone we wish existed: one that does its job, then disappears, and leaves the rest of your day to you.
        </Reveal>
        <Reveal className="signoff" delay={140}>
          <div className="avatar">L</div>
          <div className="who">
            <div className="n">The lookup team</div>
            <div className="r">Founders</div>
          </div>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================ CONTACT */
function Contact({ formRef }) {
  const recipient = 'learn2lookup@gmail.com';
  const subject = 'Hello from the lookup website';
  const body = 'Hi lookup team,\n\n';
  const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="waitlist section-pad" id="contact" ref={formRef}>
      <div className="wrap">
        <Reveal className="panel">
          <div className="contact-cta">
            <h2>Get in touch.</h2>
            <p className="lead">Questions, partnerships, or just want to say hi?<br />Send us an email and we'll write back.</p>
            <a className="btn btn-primary contact-mail-btn" href={href}>Email us</a>
            <div className="wl-fine">We read everything. No auto-replies, no spam.</div>
          </div>
        </Reveal>
      </div>
    </section>);

}

/* ============================================================ FOOTER */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-inner">
          <div>
            <Wordmark />
            <p className="tag">A phone for everything that matters, and nothing that doesn’t.</p>
          </div>
          <div className="foot-links">
            <a href="#problem">The problem</a>
            <a href="#features">What it does</a>
            <a href="#mission">Mission</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 lookup</span>
          <span>Built to be put down.</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Reveal, Glyph, Wordmark, Nav, Phone, Hero, Stat, Problem, Features, Mission, Contact, Footer });