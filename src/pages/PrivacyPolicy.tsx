import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/o-recebimento-correto-de-suas-horas-extras-e-verbas-rescisorias-com-especialistas"
          className="mb-8 inline-block font-body text-sm text-primary hover:underline"
        >
          ← Voltar ao site
        </Link>

        <h1 className="mb-8 font-heading text-heading-mobile text-foreground lg:text-heading-desktop">
          Política de Privacidade
        </h1>

        <div className="space-y-6 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          <p>
            A <strong>Aceleração Jurídica</strong> ("nós") valoriza a privacidade dos visitantes deste site. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">1. Informações Coletadas</h2>
          <p>
            Coletamos as seguintes informações quando você preenche nosso formulário de contato: nome completo, número de telefone. Também podemos coletar dados de navegação como parâmetros UTM (origem da campanha), URL da página visitada e timestamp do envio.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">2. Uso das Informações</h2>
          <p>
            As informações coletadas são utilizadas exclusivamente para: entrar em contato com você para prestar atendimento jurídico, organizar internamente os leads recebidos e melhorar nossas campanhas de marketing.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">3. Compartilhamento de Dados</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a prestação dos serviços jurídicos contratados ou por determinação legal.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">4. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados em servidores seguros e protegidos com medidas técnicas e administrativas adequadas contra acessos não autorizados, destruição, perda ou alteração.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">5. Seus Direitos</h2>
          <p>
            Conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem direito a: acessar, corrigir, excluir e solicitar a portabilidade de seus dados pessoais. Para exercer esses direitos, entre em contato pelo e-mail contato@aceleracaojuridica.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">6. Cookies</h2>
          <p>
            Este site pode utilizar cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados no seu dispositivo que nos ajudam a entender como o site é utilizado.
          </p>

          <h2 className="font-heading text-card-title-desktop text-foreground">7. Alterações</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente. A data da última atualização será indicada ao final desta página.
          </p>

          <p className="text-sm text-muted-foreground">Última atualização: Março de 2026.</p>
        </div>
      </div>
    </div>
  );
}
