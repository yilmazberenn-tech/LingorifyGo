"use client";

import Image from "next/image";
import { useState } from "react";

const levels = [
  { id: "A1", name: "Başlangıç", words: "Temel kelimeler", tone: "mint" },
  { id: "A2", name: "Temel", words: "Günlük konuşmalar", tone: "blue" },
  { id: "B1", name: "Orta", words: "Daha akıcı İngilizce", tone: "peach" },
  { id: "B2", name: "Orta üstü", words: "Kendini özgürce ifade et", tone: "lilac" },
];

const vocabulary: Record<string, { word: string; meaning: string; options: string[]; example: string; translation: string; pronunciation: string; part: string }[]> = {
  A1: [
    { word: "curious", meaning: "meraklı", options: ["Meraklı", "Yorgun", "Nazik"], example: "The little cat is curious about everything.", translation: "Küçük kedi her şeyi merak ediyor.", pronunciation: "/ˈkjʊriəs/", part: "sıfat" },
    { word: "friendly", meaning: "arkadaş canlısı", options: ["Arkadaş canlısı", "Aç", "Sessiz"], example: "Our new neighbor is very friendly.", translation: "Yeni komşumuz çok arkadaş canlısı.", pronunciation: "/ˈfrendli/", part: "sıfat" },
    { word: "usually", meaning: "genellikle", options: ["Genellikle", "Nadiren", "Aniden"], example: "I usually walk to school.", translation: "Okula genellikle yürüyerek giderim.", pronunciation: "/ˈjuːʒuəli/", part: "zarf" },
    { word: "borrow", meaning: "ödünç almak", options: ["Ödünç almak", "Satmak", "Bulmak"], example: "Can I borrow your pencil?", translation: "Kalemini ödünç alabilir miyim?", pronunciation: "/ˈbɑːroʊ/", part: "fiil" },
    { word: "delicious", meaning: "lezzetli", options: ["Lezzetli", "Soğuk", "Pahalı"], example: "This soup smells delicious.", translation: "Bu çorba lezzetli kokuyor.", pronunciation: "/dɪˈlɪʃəs/", part: "sıfat" },
  ],
  A2: [
    { word: "borrow", meaning: "ödünç almak", options: ["Ödünç almak", "Kaybetmek", "Satın almak"], example: "Can I borrow your umbrella?", translation: "Şemsiyeni ödünç alabilir miyim?", pronunciation: "/ˈbɑːroʊ/", part: "fiil" },
    { word: "crowded", meaning: "kalabalık", options: ["Kalabalık", "Sakin", "Uzak"], example: "The bus is crowded this morning.", translation: "Bu sabah otobüs kalabalık.", pronunciation: "/ˈkraʊdɪd/", part: "sıfat" },
    { word: "improve", meaning: "geliştirmek", options: ["Geliştirmek", "Unutmak", "Beklemek"], example: "Reading every day can improve your English.", translation: "Her gün okumak İngilizceni geliştirebilir.", pronunciation: "/ɪmˈpruːv/", part: "fiil" },
    { word: "perhaps", meaning: "belki", options: ["Belki", "Kesinlikle", "Zaten"], example: "Perhaps we can meet after lunch.", translation: "Belki öğle yemeğinden sonra buluşabiliriz.", pronunciation: "/pərˈhæps/", part: "zarf" },
    { word: "quietly", meaning: "sessizce", options: ["Sessizce", "Dikkatlice", "Mutlulukla"], example: "The baby is sleeping quietly.", translation: "Bebek sessizce uyuyor.", pronunciation: "/ˈkwaɪətli/", part: "zarf" },
  ],
  B1: [
    { word: "confident", meaning: "kendinden emin", options: ["Kendinden emin", "Hayal kırıklığına uğramış", "Dikkatsiz"], example: "She feels confident before the interview.", translation: "Mülakattan önce kendine güveniyor.", pronunciation: "/ˈkɑːnfɪdənt/", part: "sıfat" },
    { word: "achieve", meaning: "başarmak", options: ["Başarmak", "Vazgeçmek", "Önermek"], example: "You can achieve your goals with practice.", translation: "Pratik yaparak hedeflerine ulaşabilirsin.", pronunciation: "/əˈtʃiːv/", part: "fiil" },
    { word: "reliable", meaning: "güvenilir", options: ["Güvenilir", "Sabırsız", "Yaratıcı"], example: "She is a reliable person to work with.", translation: "Birlikte çalışmak için güvenilir biridir.", pronunciation: "/rɪˈlaɪəbəl/", part: "sıfat" },
    { word: "environment", meaning: "çevre", options: ["Çevre", "Deneyim", "Etkinlik"], example: "We should protect the environment.", translation: "Çevreyi korumalıyız.", pronunciation: "/ɪnˈvaɪrənmənt/", part: "isim" },
    { word: "opportunity", meaning: "fırsat", options: ["Fırsat", "Sorumluluk", "Sonuç"], example: "This job is a great opportunity.", translation: "Bu iş harika bir fırsat.", pronunciation: "/ˌɑːpərˈtuːnəti/", part: "isim" },
  ],
  B2: [
    { word: "overwhelming", meaning: "bunaltıcı", options: ["Bunaltıcı", "Heyecan verici", "Alışılmadık"], example: "The amount of information can feel overwhelming.", translation: "Bilgi miktarı bunaltıcı gelebilir.", pronunciation: "/ˌoʊvərˈwelmɪŋ/", part: "sıfat" },
    { word: "inevitable", meaning: "kaçınılmaz", options: ["Kaçınılmaz", "Önemsiz", "Geçici"], example: "Some change is inevitable over time.", translation: "Zaman içinde bazı değişiklikler kaçınılmazdır.", pronunciation: "/ɪnˈevɪtəbəl/", part: "sıfat" },
    { word: "subtle", meaning: "ince, belli belirsiz", options: ["İnce, belli belirsiz", "Açık ve net", "Gürültülü"], example: "There is a subtle difference between the two words.", translation: "İki kelime arasında ince bir fark var.", pronunciation: "/ˈsʌtəl/", part: "sıfat" },
    { word: "perspective", meaning: "bakış açısı", options: ["Bakış açısı", "Tahmin", "Alışkanlık"], example: "Travel can change your perspective.", translation: "Seyahat bakış açını değiştirebilir.", pronunciation: "/pərˈspektɪv/", part: "isim" },
    { word: "sustainable", meaning: "sürdürülebilir", options: ["Sürdürülebilir", "Uygun fiyatlı", "Karmaşık"], example: "We need a more sustainable way to live.", translation: "Daha sürdürülebilir bir yaşam biçimine ihtiyacımız var.", pronunciation: "/səˈsteɪnəbəl/", part: "sıfat" },
  ],
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "home") return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></svg>;
  if (name === "book") return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 5.5v16M8 7h8M8 11h7" /></svg>;
  if (name === "chart") return <svg {...common}><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></svg>;
  if (name === "target") return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
  if (name === "settings") return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.8Z" transform="translate(-1 -1)" /></svg>;
  return <svg {...common}><path d="M12 3v18M3 12h18" /></svg>;
}

function Octopus() {
  return <Image className="octopus-svg" src="/ollie-hero-v2.webp" width={480} height={350} priority alt="Ollie isimli mor ahtapot maskot" />;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Bugün");
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");
  const [completed, setCompleted] = useState(false);
  const [xp, setXp] = useState(240);

  const currentWord = vocabulary[selectedLevel][questionIndex] ?? vocabulary[selectedLevel][0];

  function chooseAnswer(answer: string) {
    if (answered) return;
    const isCorrect = answer.toLocaleLowerCase("tr") === currentWord.meaning.toLocaleLowerCase("tr");
    setCorrect(isCorrect);
    setChosenAnswer(answer);
    setAnswered(true);
    if (isCorrect) setXp((value) => value + 10);
  }

  function closeQuiz() {
    setQuizOpen(false);
    setAnswered(false);
    setCompleted(false);
    setChosenAnswer("");
    setQuestionIndex(0);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#bugun" aria-label="Lingorify ana sayfa">
          <span className="brand-mark" aria-hidden="true">l</span>
          <span>lingorify<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-label">ÖĞRENME ALANI</div>
        <nav className="side-nav" aria-label="Ana menü">
          {[
            { label: "Bugün", icon: "home", href: "#bugun" },
            { label: "Kelimelerim", icon: "book", href: "#kelimeler" },
            { label: "İlerlemem", icon: "chart", href: "#ilerleme" },
            { label: "Hedefler", icon: "target", href: "#hedefler" },
          ].map((item) => (
            <a
              className={`nav-link${activeNav === item.label ? " active" : ""}`}
              href={item.href}
              key={item.label}
              onClick={() => setActiveNav(item.label)}
            >
              <Icon name={item.icon} /><span>{item.label}</span>
              {item.label === "Kelimelerim" && <span className="nav-count">12</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon">✦</div>
          <strong>Küçük adımlar, büyük işler.</strong>
          <p>Bugün 5 kelime öğren, yarın kendine teşekkür et.</p>
          <a href="#hedefler">Hedefini gör <span>→</span></a>
        </div>
        <button className="profile-button" type="button" onClick={() => setActiveNav("Profil")}>
          <span className="profile-avatar">B</span>
          <span className="profile-copy"><strong>Beren</strong><small>Ücretsiz hesap</small></span>
          <span className="profile-menu">···</span>
        </button>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Öğrenme alanı</span><span className="breadcrumb-slash">/</span><strong>{activeNav}</strong></div>
          <div className="topbar-right">
            <div className="top-stat streak-stat"><span className="stat-emoji">🔥</span><strong>4</strong><span>gün</span></div>
            <div className="top-stat xp-stat"><span className="stat-emoji">✦</span><strong>{xp}</strong><span>XP</span></div>
            <button className="icon-button" type="button" aria-label="Ayarlar" onClick={() => setActiveNav("Ayarlar")}><Icon name="settings" size={19} /></button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row" id="bugun">
            <div>
              <div className="date-label"><span className="date-sparkle">✳</span> 24 EKİM 2026, CUMARTESİ</div>
              <h1>Günaydın, Beren <span className="wave">✦</span></h1>
              <p className="welcome-subtitle">İngilizce yolculuğunda bugün de harika bir gün.</p>
            </div>
            <div className="daily-progress">
              <div className="daily-progress-copy"><span>GÜNLÜK HEDEF</span><strong>3 <small>/ 5 kelime</small></strong></div>
              <div className="daily-progress-track"><span /></div>
              <small className="daily-progress-note">Hedefine çok az kaldı!</small>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="main-column">
              <article className={`lesson-panel${quizOpen ? " lesson-panel-quiz" : ""}`} id="hedefler">
                {!quizOpen ? (
                  <>
                    <div className="lesson-panel-copy">
                      <div className="panel-eyebrow"><span className="live-dot" /> BUGÜNÜN DERSİ <span className="lesson-time">· 5 DK</span></div>
                      <h2>Biraz kelime,<br />biraz <span>özgüven.</span></h2>
                      <p>Günün 5 yeni kelimesi seni bekliyor. Hazır mısın?</p>
                      <button className="start-button" type="button" onClick={() => setQuizOpen(true)}>
                        Derse başla <span aria-hidden="true">→</span>
                      </button>
                      <div className="lesson-meta"><span><span className="meta-icon">✦</span> +50 XP</span><i /> <span>5 yeni kelime</span></div>
                    </div>
                    <div className="mascot-scene">
                      <span className="mascot-sparkle sparkle-left">✦</span>
                      <div className="mascot-bubble"><span>Let&apos;s learn!</span><i /></div>
                      <Octopus />
                      <span className="mascot-sparkle sparkle-right">✳</span>
                      <span className="mascot-name">Ollie <span>seninle!</span></span>
                    </div>
                    <div className="lesson-corner" aria-hidden="true">✳</div>
                  </>
                ) : (
                  <div className="quiz-content">
                    <div className="quiz-header">
                      <button className="quiz-back" type="button" onClick={closeQuiz} aria-label="Ders ekranını kapat">←</button>
                      <div className="quiz-progress"><span style={{ width: `${((questionIndex + 1) / vocabulary[selectedLevel].length) * 100}%` }} /></div>
                      <span className="quiz-step">{questionIndex + 1} / 5</span>
                    </div>
                    {!completed ? (
                      <>
                        <span className="quiz-kicker">{selectedLevel} · KELİME PRATİĞİ</span>
                        <h2 className="quiz-question">Bu kelime ne anlama geliyor?</h2>
                        <div className="word-card"><span>İNGİLİZCE KELİME</span><strong>{currentWord.word}</strong><small>{currentWord.pronunciation}</small></div>
                        <div className="answer-list">
                          {currentWord.options.map((option, index) => (
                            <button
                              className={`answer-option${answered && option.toLocaleLowerCase("tr") === currentWord.meaning.toLocaleLowerCase("tr") ? " answer-correct" : ""}${answered && option === chosenAnswer && !correct ? " answer-wrong" : ""}`}
                              key={option}
                              type="button"
                              onClick={() => chooseAnswer(option)}
                              disabled={answered}
                            >
                              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}
                              {answered && option.toLocaleLowerCase("tr") === currentWord.meaning.toLocaleLowerCase("tr") && <span className="answer-check">✓</span>}
                            </button>
                          ))}
                        </div>
                        {answered && (
                          <div className={`answer-feedback${correct ? " feedback-correct" : " feedback-incorrect"}`}>
                            <strong>{correct ? "Harika, doğru cevap! ✨" : `Doğru cevap: ${currentWord.meaning}`}</strong>
                            <span>{currentWord.example}</span>
                            <button type="button" onClick={() => {
                              if (questionIndex === vocabulary[selectedLevel].length - 1) {
                                setCompleted(true);
                              } else {
                                setQuestionIndex((index) => index + 1);
                              }
                              setAnswered(false);
                              setChosenAnswer("");
                            }}>Devam et <span>→</span></button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="quiz-complete">
                        <span className="complete-icon">✦</span>
                        <span className="quiz-kicker">GÜNLÜK DERSİN TAMAM!</span>
                        <h2>Harika gidiyorsun.</h2>
                        <p>Bugün <strong>5 yeni kelime</strong> öğrendin. Her yeni kelime seni hedefine yaklaştırıyor.</p>
                        <button className="start-button" type="button" onClick={closeQuiz}>Derse dön <span>→</span></button>
                      </div>
                    )}
                  </div>
                )}
              </article>

              <section className="section-block" id="kelimeler">
                <div className="section-heading-row">
                  <div><span className="section-kicker">ADIM ADIM İLERLE</span><h2>Öğrenme yolun</h2></div>
                  <a href="#ilerleme" className="text-link">Tüm seviyeler <span>→</span></a>
                </div>
                <div className="level-grid">
                  {levels.map((level, index) => (
                    <button
                      className={`level-card level-${level.tone}${selectedLevel === level.id ? " level-selected" : ""}`}
                      key={level.id}
                      type="button"
                      onClick={() => {
                        setSelectedLevel(level.id);
                        setQuestionIndex(0);
                        setAnswered(false);
                        setCompleted(false);
                        setChosenAnswer("");
                      }}
                      aria-pressed={selectedLevel === level.id}
                    >
                      <span className="level-top"><span className="level-badge">{level.id}</span><span className="level-chevron">{selectedLevel === level.id ? "✓" : "↗"}</span></span>
                      <strong>{level.name}</strong>
                      <small>{level.words}</small>
                      <span className="level-progress"><i style={{ width: `${[36, 12, 0, 0][index]}%` }} /></span>
                      <span className="level-progress-label">{[18, 6, 0, 0][index]} / 50 kelime</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="right-column">
              <article className="streak-card">
                <div className="streak-card-heading"><span className="streak-icon">🔥</span><span className="streak-label">SERİ TAKİBİ</span><button type="button" aria-label="Seri hakkında bilgi">···</button></div>
                <div className="streak-count">4 <span>gün</span></div>
                <p>Harika gidiyorsun! Serini<br />bugün de koru.</p>
                <div className="week-days">
                  {([["P", true], ["S", true], ["Ç", true], ["P", true], ["C", false], ["C", false], ["P", false]] as [string, boolean][]).map(([day, done], index) => (
                    <div className="week-day" key={`${day}-${index}`}><span>{day}</span><i className={done ? "day-done" : ""}>{done ? "✓" : ""}</i></div>
                  ))}
                </div>
              </article>

              <article className="word-card-small">
                <div className="small-card-heading"><span className="small-card-icon"><Icon name="book" size={16} /></span><span>GÜNÜN KELİMESİ</span><span className="level-pill">{selectedLevel}</span></div>
                <div className="daily-word">{currentWord.word}<button type="button" aria-label="Kelimeyi seslendir" onClick={() => { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentWord.word)); } }}>◖))</button></div>
                <div className="daily-word-meaning">{currentWord.meaning} <span>·</span> {currentWord.part}</div>
                <div className="word-example">&ldquo;{currentWord.example}&rdquo;</div>
                <div className="word-example-translation">{currentWord.translation}</div>
                <button className="save-word" type="button" onClick={(event) => { event.currentTarget.textContent = "✓ Kaydedildi"; event.currentTarget.classList.add("saved"); }}>+ Kelimelerime ekle</button>
              </article>

              <article className="weekly-card" id="ilerleme">
                <div className="weekly-heading"><div><span className="section-kicker">GÜZEL GİDİYORSUN</span><h3>Haftalık ilerleme</h3></div><span className="weekly-icon">↗</span></div>
                <div className="weekly-summary"><strong>18</strong><span>kelime öğrendin<br />bu hafta</span><span className="weekly-change">+24%</span></div>
                <div className="chart" aria-label="Haftanın kelime çalışma grafiği">
                  {[34, 52, 41, 74, 56, 89, 63].map((height, index) => (
                    <div className="chart-column" key={index}><span className={index === 5 ? "chart-bar chart-bar-active" : "chart-bar"} style={{ height: `${height}%` }} /><small>{["P", "S", "Ç", "P", "C", "C", "P"][index]}</small></div>
                  ))}
                </div>
              </article>
            </aside>
          </section>
          <footer className="dashboard-footer"><span>Her gün bir kelime daha. 💜</span><span>Lingorify · Öğrenmek sana iyi gelsin.</span></footer>
        </div>
      </section>
    </main>
  );
}
