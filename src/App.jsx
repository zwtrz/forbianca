import { useState } from "react";

// Custom Button component
function Button({ children, className = "", variant = "default", ...props }) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    outline: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  const variants = {
    default: {
      backgroundColor: '#f472b6',
      color: 'white',
      boxShadow: '0 4px 12px rgba(244, 114, 182, 0.3)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#db2777',
      textDecoration: 'underline',
      padding: '8px 12px',
      fontSize: '14px',
    },
    white: {
      backgroundColor: 'white',
      color: '#ec4899',
      boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
    }
  };

  const style = { ...baseStyle, ...variants[variant] };

  return (
    <button 
      style={style}
      className={className}
      onMouseEnter={(e) => {
        if (variant === 'default') {
          e.target.style.backgroundColor = '#ec4899';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(236, 72, 153, 0.4)';
        } else if (variant === 'white') {
          e.target.style.backgroundColor = '#fdf2f8';
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'default') {
          e.target.style.backgroundColor = '#f472b6';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(244, 114, 182, 0.3)';
        } else if (variant === 'white') {
          e.target.style.backgroundColor = 'white';
          e.target.style.transform = 'translateY(0)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default function LoveLetter() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [showApology, setShowApology] = useState(false);

  const handleRevealSite = () => setShowIntro(false);

  const handleOpenLetter = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('Sound effect not available');
    }

    setShowLetter(true);
  };

  const styles = {
    container: {
  minHeight: '100vh',
  backgroundColor: '#fce7f3',
  color: '#831843',
  fontFamily: 'sans-serif',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 0,
  width: '100vw',         
  overflowX: 'hidden',     
},
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',  // <- corrigido aqui
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box',
    },
    introOverlay: {
      backgroundColor: '#fbcfe8',
      animation: 'fadeIn 0.8s ease-in-out',
    },
    apologyOverlay: {
      backgroundColor: 'rgba(251, 207, 232, 0.95)',
      animation: 'fadeIn 0.5s ease-in-out',
      backdropFilter: 'blur(4px)',
    },
    introCard: {
      backgroundColor: '#f9a8d4',
      color: 'white',
      textAlign: 'center',
      borderRadius: '20px',
      padding: '40px 32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      animation: 'scaleIn 0.5s ease-in-out',
      maxWidth: '500px',
      width: '100%',
    },
    apologyCard: {
      backgroundColor: 'white',
      color: '#9f1239',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      textAlign: 'center',
      animation: 'scaleIn 0.4s ease-in-out',
    },
    mainContent: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      width: '100%',
      position: 'relative',
      zIndex: 1,
    },
    mainTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '40px',
      textAlign: 'center',
      animation: 'slideUp 1s ease-in-out',
    },
    letterCard: {
      borderRadius: '20px',
      backgroundColor: '#fbcfe8',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      animation: 'scaleIn 0.8s ease-in-out',
    },
    letterContent: {
      marginTop: '30px',
      backgroundColor: '#fce7f3',
      padding: '30px',
      borderRadius: '16px',
      textAlign: 'left',
      animation: 'letterAppear 0.5s ease-in-out',
    },
    disclaimerButton: {
      marginTop: '20px',
      textAlign: 'right',
    },
    letterText: {
      whiteSpace: 'pre-line',
      lineHeight: '1.8',
      fontSize: '1.1rem',
    },
  };

  const keyframes = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes letterAppear { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `;

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {showApology && (
        <div style={{ ...styles.overlay, ...styles.apologyOverlay }}>
          <div style={styles.apologyCard}>
            <h2>Então . . .</h2>
            <p style={{ marginBottom: '20px' }}>
              olha, peço desculpas por tudo hoje, e essa semana..eu percebi sim que você quer muito que fáçamos algo juntos relacionado a trabalho e óbviamente sim pra começarmos a juntar pra morar juntinho, pois eu também quero muito isso. admito que me sinto perdido ainda e não sei o melhor caminho, mas depois de fazer essa página pra você eu percebi que quero começar a fazer algo quanto ao ADS de uma vez, a partir de hoje. Eu tive uma ideia que quero te contar depois disso, meu amor.


Novamente, desculpa por nunca fazer algo "por conta própria" assim dizer, sempre parece que eu estou fazendo só porque você pediu, mas nesse caso não, eu já estava há alguns dias pensando sobre o que tentar com você, e enfim tive essa ideia que pode ser melhor por conta dos estágios. Eu quero fazer home office ao seu lado mesmo que não ganhe muito &lt;3 pois vai ser nosso começo, mesmo que tarde. também peço desculpa por não fazer o maior texto de todos, é difícil me expressar em palavras diante dos conflitos como hoje e as preocupações.

eu quero apenas acordar de manhãzinha ao seu lado e podermos passear &lt;3
            </p>
            <Button onClick={() => setShowApology(false)}>Fechar</Button>
          </div>
        </div>
      )}

      {showIntro && (
        <div style={{ ...styles.overlay, ...styles.introOverlay }}>
          <div style={styles.introCard}>
            <h1>Oii amor &gt; &lt;</h1>
            <Button variant="white" onClick={handleRevealSite}>
              Abrir Envelope
            </Button>
          </div>
        </div>
      )}

      {!showIntro && (
        <div style={styles.mainContent}>
          <h1 style={styles.mainTitle}>💖 pra você :) 💖</h1>

          <div style={styles.letterCard}>
            <p>fiz essa páginazinha com uma (pequena) ajuda pra você meu bebê, aperta o botãozinho embaixo agora 💌</p>

            {!showLetter && <Button onClick={handleOpenLetter}>Abrir :o</Button>}

            {showLetter && (
              <div style={styles.letterContent}>
                <p style={styles.letterText}>
                  {`Bianca,

todos os dias penso sobre você, todos os dias tenho desejos com você, eu não consigo te tirar da minha mente muito menos iria querer tal coisa :)

Todos os dias que passo com você, seja ao seu lado ou pela internet são como um sonho pra mim, eu sempre penso e me lembro sobre a forma que você me admira e isso aquece muito meu coração.

É difícil botar em palavras tudo que sinto por você pois o que mais queria estar fazendo agora era te abraçar muito, te beijar, sentir seu calor, sentir seu olhar, tudo que você sente por mim, estariamos caminhando lentamente por aqui visitando lugares e depois dormiriamos juntos após chegarmos cansados, tudo que eu mais quero é viver ao seu lado pra sempre, quando possível começarmos nossa família. Eu quero MUITO ter um filho ou filha com você Bianca, quero desde sentir me conectando junto a você no ato até a parte em que vamos estar fazendo comidinha juntos pra ele e saindo com ele pra passear junto com nossos bixinhos.

Eu admiro muito sua preocupação comigo e eu me sinto feliz em sentir você se preocupando comigo, por isso que eu sempre estou tentando fazer algo todos os dias pra juntar e gastar comigo e com você <3 do meu jeitinho, podendo ainda ficar com você e aproveitar nosso tempo juntinhos jogando ou fazendo algo diferente.

Hoje é..bem..era pra ser um dia especial, eu queria te mostrar este pequeno site com algumas colações de fotos nossas e comentários meus de como eu me senti, porém por conta da discussão eu me senti preocupado sobre você achar que eu apenas estava fazendo isso porque você pediu..

não.


clica no triangulinho ali > por favor

Eu te amo, Bianca.`}
                </p>

                <div style={styles.disclaimerButton}>
                  <Button variant="ghost" onClick={() => setShowApology(true)}>
                    ⚠️
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
