import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import './Home.css';

const slides = [
  {
    title: 'Solicite documentos académicos sem filas',
    text: 'Faça pedidos de declarações, certificados e outros documentos de forma totalmente digital através do SIGAR.',
    image: '/images/hero-1.png',
  },
  {
    title: 'Pagamentos digitais com referência Multicaixa',
    text: 'Gere referências automaticamente e acompanhe o estado do pagamento em tempo real.',
    image: '/images/hero-2.png',
  },
  {
    title: 'Documentos com validação eletrónica',
    text: 'Todos os documentos emitidos podem ser verificados através do SIGAR utilizando QR Code e código de verificação.',
    image: '/images/hero-3.png',
  },
];

const features = [
  { title: 'Solicitação eletrónica', text: 'Peça documentos académicos sem deslocações.' },
  { title: 'Pagamentos Multicaixa', text: 'Referências geradas automaticamente pelo sistema.' },
  { title: 'Acompanhamento em tempo real', text: 'Consulte o estado das suas solicitações.' },
  { title: 'Notificações automáticas', text: 'Receba actualizações sobre pedidos e pagamentos.' },
  { title: 'Validação por QR Code', text: 'Confirme a autenticidade dos documentos emitidos.' },
  { title: 'Documentos digitais', text: 'Visualize e faça download dos documentos emitidos.' },
];

const testimonials = [
  {
    name: 'Ana Paulo',
    role: 'Estudante',
    text: 'Solicitei a minha declaração e acompanhei todo o processo pelo telemóvel.',
  },
  {
    name: 'Carlos Manuel',
    role: 'Funcionário',
    text: 'O painel do SIGAR reduziu significativamente o tempo de gestão das solicitações.',
  },
  {
    name: 'Secretaria Académica',
    role: 'Universidade',
    text: 'A emissão digital trouxe maior controlo e transparência para os serviços académicos.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="home">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo">
            <img src="/images/logo.png" alt="SIGAR" />
            <div>
              <h3>SIGAR</h3>
              <span>Sistema Integrado de Gestão Académica e Registos</span>
            </div>
          </div>

          <nav className="nav desktop-nav">
            <a href="#sobre">Sobre</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#parceiros">Parceiros</a>
            <a href="#contactos">Contactos</a>
          </nav>

          <div className="header-actions">
            <Button
              variant="secondary"
              onClick={() => navigate('/verificar')}
            >
              Validar
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <strong>Menu</strong>

          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <a href="#sobre" onClick={() => setMenuOpen(false)}>
          Sobre
        </a>

        <a href="#funcionalidades" onClick={() => setMenuOpen(false)}>
          Funcionalidades
        </a>

        <a href="#parceiros" onClick={() => setMenuOpen(false)}>
          Parceiros
        </a>

        <a href="#contactos" onClick={() => setMenuOpen(false)}>
          Contactos
        </a>
      </div>

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="hero-badge">Transformação digital académica</div>

            <h1>{slide.title}</h1>

            <p>{slide.text}</p>

            <div className="hero-buttons">
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
              >
                Solicitar documento
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate('/verificar')}
              >
                Validar documento
              </Button>
            </div>

            <div className="hero-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? 'active' : ''}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className="hero-image">
            <img src={slide.image} alt={slide.title} />
          </div>
        </div>
      </section>

      <section className="metrics">
        <div className="container metrics-grid">
          <div className="metric-card">
            <h2>12.500+</h2>
            <p>Documentos emitidos</p>
          </div>

          <div className="metric-card">
            <h2>8.400+</h2>
            <p>Estudantes registados</p>
          </div>

          <div className="metric-card">
            <h2>5.900+</h2>
            <p>Pagamentos processados</p>
          </div>

          <div className="metric-card">
            <h2>24h</h2>
            <p>Tempo médio de emissão</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="about">
        <div className="container about-grid">
          <div>
            <div className="section-badge">Sobre o SIGAR</div>

            <h2>Transformação digital dos serviços académicos</h2>

            <p>
              O SIGAR é uma plataforma web de autoatendimento académico desenvolvida para modernizar a relação entre estudantes e instituições de ensino superior, permitindo a solicitação de documentos, pagamentos digitais, acompanhamento de processos e validação eletrónica de documentos emitidos.
            </p>

            <p>
              A plataforma reduz interações presenciais, padroniza referências de pagamento e assegura transparência em todo o ciclo de requisições académicas.
            </p>
          </div>

          <div className="about-image">
            <img
              src="/images/dashboard.png"
              alt="Dashboard do SIGAR"
            />
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Funcionalidades</div>

            <h2>Tudo o que precisa num único sistema</h2>
          </div>

          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon" />

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="steps">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Como funciona</div>

            <h2>Um processo simples e transparente</h2>
          </div>

          <div className="steps-grid">
            {[
              ['01', 'Solicite o documento'],
              ['02', 'Gere a referência de pagamento'],
              ['03', 'Acompanhe o processo'],
              ['04', 'Receba o documento digital'],
            ].map(([step, title]) => (
              <div key={step} className="step-card">
                <div className="step-number">{step}</div>

                <h3>{title}</h3>

                <p>
                  Todo o ciclo é acompanhado através do dashboard do estudante.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="parceiros" className="partners">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Parceiros</div>

            <h2>Instituições que apoiam a transformação digital académica</h2>
          </div>

          <div className="partners-grid">
            {[
              'Universidade',
              'Rede Multicaixa',
              'Bancos parceiros',
              'Instituições de apoio',
            ].map(name => (
              <div key={name} className="partner-card">
                <div className="partner-logo" />

                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Testemunhos</div>

            <h2>A experiência de quem utiliza o SIGAR</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(item => (
              <div key={item.name} className="testimonial-card">
                <p>“{item.text}”</p>

                <h4>{item.name}</h4>

                <span>{item.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-content">
          <h2>Pronto para utilizar o SIGAR?</h2>

          <p>
            Aceda à plataforma ou valide a autenticidade de um documento emitido eletronicamente.
          </p>

          <div className="cta-buttons">
            <Button
              variant="secondary"
              onClick={() => navigate('/verificar')}
            >
              Validar documento
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Entrar no SIGAR
            </Button>
          </div>
        </div>
      </section>

      <footer id="contactos" className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/images/logo.png" alt="SIGAR" />

              <strong>SIGAR</strong>
            </div>

            <p>
              Plataforma Web de Autoatendimento Académico para Solicitação de Documentos e Pagamentos Digitais.
            </p>
          </div>

          <div>
            <h4>Links úteis</h4>

            <ul>
              <li>Início</li>
              <li>Funcionalidades</li>
              <li>Validação</li>
              <li>Contactos</li>
            </ul>
          </div>

          <div>
            <h4>Serviços</h4>

            <ul>
              <li>Solicitação de documentos</li>
              <li>Pagamentos digitais</li>
              <li>Validação eletrónica</li>
            </ul>
          </div>

          <div>
            <h4>Contactos</h4>

            <ul>
              <li>suporte@sigar.ao</li>
              <li>+244 900 000 000</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 SIGAR — Plataforma Web de Autoatendimento Académico para Solicitação de Documentos e Pagamentos Digitais.
        </div>
      </footer>
    </div>
  );
}

