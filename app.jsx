/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, Nav, Hero, Problem, Features, Mission, Contact, Footer */
const { useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "a",
  "accent": "#e85d3d",
  "headFont": "'Schibsted Grotesk', sans-serif"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const contactRef = useRef(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  };

  return (
    <div className="site" data-dir={t.direction} style={{ '--accent': t.accent, '--font-head': t.headFont }}>
      <Nav onWaitlist={scrollToContact} />
      <main>
        <Hero onWaitlist={scrollToContact} />
        <Problem />
        <Features />
        <Mission />
        <Contact formRef={contactRef} />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Direction" />
        <TweakRadio
          label="Look"
          value={t.direction}
          options={[{ label: 'Quiet', value: 'a' }, { label: 'Signal', value: 'b' }]}
          onChange={(v) => setTweak('direction', v)}
        />
        <TweakSection label="Accent" />
        <TweakColor
          label="Color"
          value={t.accent}
          options={['#e85d3d', '#2b59ff', '#1f9d57', '#6a4cf0']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSection label="Type" />
        <TweakSelect
          label="Headline font"
          value={t.headFont}
          options={[
            { label: 'Schibsted Grotesk', value: "'Schibsted Grotesk', sans-serif" },
            { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
            { label: 'Hanken Grotesk', value: "'Hanken Grotesk', sans-serif" },
          ]}
          onChange={(v) => setTweak('headFont', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
