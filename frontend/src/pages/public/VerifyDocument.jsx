import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import verificationService from '../../services/verificationService';
import Button from '../../components/common/Button/Button';
import Loading from '../../components/common/Loading/Loading';

export default function VerifyDocument() {
const { codigo } = useParams();
const navigate = useNavigate();

const [code, setCode] = useState(codigo || '');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
function handleResize() {
setIsMobile(window.innerWidth < 768);
}

window.addEventListener('resize', handleResize);

return () => window.removeEventListener('resize', handleResize);

}, []);

useEffect(() => {
if (codigo) {
verify(codigo);
}
}, [codigo]);

async function verify(value = code) {
if (!value) return;

try {
  setLoading(true);
  const data = await verificationService.verify(value);
  setResult(data);
} catch (error) {
  setResult({
    valid: false,
    message: 'Documento inválido ou inexistente.',
  });
} finally {
  setLoading(false);
}

}

function handleSubmit(event) {
event.preventDefault();
navigate(`/verificar/${code}`);
}

return (
<div
style={{
minHeight: '100vh',
background: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
padding: isMobile ? '16px' : '40px',
}}
>
<div
style={{
width: '100%',
maxWidth: '920px',
background: '#ffffff',
borderRadius: '24px',
padding: isMobile ? '24px' : '48px',
boxShadow: '0 24px 60px rgba(15,23,42,.08)',
border: '1px solid #e5e7eb',
}}
>
<div
style={{
textAlign: 'center',
marginBottom: 40,
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
}}
>
<img
src="/images/logo.png"
alt="SIGAR"
onClick={() => navigate('/')}
style={{
width: isMobile ? 90 : 110,
height: 'auto',
display: 'block',
margin: '0 auto 24px',
cursor: 'pointer',
}}
/>

      <div
        style={{
          display: 'inline-block',
          padding: '8px 18px',
          borderRadius: 999,
          background: '#eff6ff',
          color: '#1d4ed8',
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 18,
        }}
      >
        Sistema Integrado de Gestão Académica e Registos
      </div>

      <h1
        style={{
          margin: 0,
          color: '#0f172a',
          fontSize: isMobile ? '28px' : '40px',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: '760px',
        }}
      >
        Plataforma Web de Autoatendimento Académico para Solicitação de
        Documentos e Pagamentos Digitais
      </h1>

      <p
        style={{
          color: '#475569',
          marginTop: 16,
          fontSize: isMobile ? '15px' : '17px',
          lineHeight: 1.7,
          maxWidth: '680px',
        }}
      >
        Validação pública da autenticidade de documentos académicos emitidos
        eletronicamente através do SIGAR.
      </p>
    </div>

    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: isMobile ? 18 : 24,
        marginBottom: 28,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 12,
        }}
      >
        <input
          type="text"
          placeholder="Introduza o código de verificação do documento"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          style={{
            flex: 1,
            padding: '14px 16px',
            borderRadius: 12,
            border: '1px solid #d1d5db',
            fontSize: 16,
            outline: 'none',
            background: '#fff',
          }}
        />

        <div
          style={{
            width: isMobile ? '100%' : '220px',
          }}
        >
          <Button type="submit" variant="primary">
            Validar documento
          </Button>
        </div>
      </form>
    </div>

    {loading && <Loading />}

    {!loading &&
      result &&
      (result.valid ? (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #22c55e',
            borderRadius: 18,
            padding: isMobile ? 22 : 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#16a34a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              ✓
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  color: '#166534',
                  fontSize: isMobile ? '22px' : '28px',
                  fontWeight: 700,
                }}
              >
                Documento autêntico
              </h2>

              <p
                style={{
                  margin: '6px 0 0',
                  color: '#166534',
                }}
              >
                A autenticidade do documento foi confirmada pelo SIGAR.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 16,
            }}
          >
            <InfoCard
              label="Documento"
              value={result.data.document_type}
            />

            <InfoCard
              label="Referência"
              value={result.data.reference}
            />

            <InfoCard
              label="Nome do estudante"
              value={result.data.student_name}
            />

            <InfoCard
              label="Número de estudante"
              value={result.data.student_number}
            />

            <InfoCard label="Curso" value={result.data.course} />

            <InfoCard
              label="Faculdade"
              value={result.data.faculty}
            />

            <InfoCard
              label="Emitido em"
              value={new Date(result.data.issued_at).toLocaleDateString(
                'pt-PT'
              )}
            />

            <InfoCard
              label="Código de verificação"
              value={result.data.verification_code}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              background: '#f8fbff',
              border: '2px solid #bfdbfe',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    color: '#1d4ed8',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Selo Digital SIGAR
                </h3>

                <p
                  style={{
                    margin: '10px 0 18px',
                    color: '#334155',
                    lineHeight: 1.7,
                    fontSize: 14,
                  }}
                >
                  Este documento foi emitido eletronicamente e validado
                  através do Sistema Integrado de Gestão Académica e Registos
                  (SIGAR), garantindo a sua autenticidade, integridade e
                  rastreabilidade.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#64748b',
                        marginBottom: 4,
                      }}
                    >
                      Código de verificação
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                        color: '#0f172a',
                        letterSpacing: '0.08em',
                        fontSize: 15,
                      }}
                    >
                      {result.data.verification_code}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      borderRadius: 999,
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      fontWeight: 600,
                      fontSize: 13,
                      width: 'fit-content',
                    }}
                  >
                    Certificação confirmada
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: isMobile ? '100%' : 180,
                }}
              >
                <img
                  src="/images/selo.png"
                  alt="Selo Digital SIGAR"
                  style={{
                    width: isMobile ? 140 : 170,
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: 18,
            padding: isMobile ? 22 : 32,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#dc2626',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            ×
          </div>

          <h2
            style={{
              color: '#991b1b',
              marginTop: 0,
              fontSize: isMobile ? '22px' : '28px',
              fontWeight: 700,
            }}
          >
            Documento inválido
          </h2>

          <p
            style={{
              color: '#7f1d1d',
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            {result.message}
          </p>
        </div>
      ))}

    <div
      style={{
        marginTop: 40,
        paddingTop: 22,
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center',
        color: '#64748b',
        fontSize: 12,
        lineHeight: 1.7,
      }}
    >
      <strong style={{ color: '#0f172a' }}>SIGAR</strong> —
      Plataforma Web de Autoatendimento Académico para Solicitação de
      Documentos e Pagamentos Digitais
      <br />
      Validação pública de documentos académicos
    </div>
  </div>
</div>

);
}

function InfoCard({ label, value }) {
return (
<div
style={{
background: '#ffffff',
border: '1px solid #d1fae5',
borderRadius: 14,
padding: 18,
}}
>
<div
style={{
color: '#64748b',
fontSize: 12,
marginBottom: 8,
fontWeight: 500,
}}
>
{label} </div>
  <div
    style={{
      color: '#111827',
      fontWeight: 600,
      fontSize: 15,
      lineHeight: 1.6,
      wordBreak: 'break-word',
    }}
  >
    {value || '-'}
  </div>
</div>

);
}
