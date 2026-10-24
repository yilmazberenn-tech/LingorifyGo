const lessonItems = [
  { icon: "01", title: "Kendi hızında öğren", text: "Günde sadece 10 dakika. Öğrenme alışkanlığını küçük adımlarla oluştur." },
  { icon: "02", title: "Gerçek hayata hazırlan", text: "Kelimeleri ezberlemekle kalma; günlük konuşmalarda kullan." },
  { icon: "03", title: "İlerlemeni gör", text: "Her ders seni hedefine biraz daha yaklaştırsın. Gelişimin hep yanında." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Lingorify ana sayfa">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span>lingorify<span className="brand-period">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Ana menü">
          <a href="#ozellikler">Özellikler</a>
          <a href="#nasil-calisir">Nasıl çalışır?</a>
        </nav>
        <a className="header-cta" href="#basla">Ücretsiz başla <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="basla">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YENİ BİR DİL, YENİ BİR SEN</div>
          <h1>Dünyan,<br />bir kelimeyle<br /><span>büyüsün.</span></h1>
          <p className="hero-description">
            Yeni bir dil öğrenmek gözünde büyümesin. Sana özel, kısa ve keyifli
            derslerle her gün biraz daha ilerle.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#ozellikler">Öğrenmeye başla <span aria-hidden="true">→</span></a>
            <span className="no-card">Ücretsiz. Üstelik kendi hızında.</span>
          </div>
          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>E</span><span>M</span><span>A</span><span>+</span>
            </div>
            <p><strong>Yeni bir başlangıç yapan binlerce kişi.</strong><br />Sen de aramıza katıl.</p>
          </div>
        </div>

        <div className="hero-art" aria-label="Lingorify günlük dil öğrenme hedefi örneği">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="floating-note note-top"><span className="note-flag">ES</span><span><strong>¡Hola!</strong><small>Merhaba</small></span><span className="note-sound">♫</span></div>
          <div className="floating-note note-bottom"><span className="note-flag flag-fr">FR</span><span><strong>Bonjour</strong><small>Günaydın</small></span><span className="note-sound">♫</span></div>
          <div className="lesson-card">
            <div className="lesson-card-top"><span>BUGÜNKÜ HEDEFİN</span><span className="streak">✦ 04</span></div>
            <div className="lesson-illustration"><span className="sun-shape" /><span className="speech-bubble">hello!<i /></span><span className="plant-shape"><i /><i /><i /></span></div>
            <div className="lesson-title-row"><div><span className="lesson-kicker">İNGİLİZCE · 1. DERS</span><h2>İlk kelimelerin</h2></div><span className="play-button" aria-hidden="true">▶</span></div>
            <p className="lesson-caption">Güzel bir başlangıç yapmaya ne dersin?</p>
            <div className="progress-row"><div className="progress-track"><span /></div><span>8 dk</span></div>
          </div>
          <div className="sparkle sparkle-one" aria-hidden="true">✳</div>
          <div className="sparkle sparkle-two" aria-hidden="true">✦</div>
          <div className="art-caption">Her gün küçük bir adım. <span>Büyük bir değişim.</span></div>
        </div>
      </section>

      <section className="features-section" id="ozellikler">
        <div className="section-heading">
          <span className="section-label">ÖĞRENMENİN YENİ YOLU</span>
          <h2>Dil öğrenmek, <span>iyi hissettirmeli.</span></h2>
          <p>Karmaşık planlar yok. Sana uyan, hayatına kolayca sığan bir öğrenme deneyimi var.</p>
        </div>
        <div className="feature-grid" id="nasil-calisir">
          {lessonItems.map((item) => (
            <article className="feature-card" key={item.icon}>
              <span className="feature-number">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="feature-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark" aria-hidden="true">L</span><span>lingorify<span className="brand-period">.</span></span></a>
        <span>Her gün yeni bir kelime, her gün yeni bir ihtimal.</span>
        <span>© 2026 Lingorify</span>
      </footer>
    </main>
  );
}
