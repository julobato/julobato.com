export const I18N = {
  en: {
    role: 'Software Engineer · Lisbon',
    intro1: 'Software engineer with 6+ years building backend systems and full-stack applications. Most of my work lives <span class="highlight">where systems meet</span>: integrations, data pipelines, and the automation that stops a business from doing things by hand.',
    intro2: 'I\'ve built for music distribution and B2B e-commerce, mostly with Python, React and SQL. I like teams where engineers understand the system beyond their own piece and are happy to figure things out as they go.',
    work: 'Work',
    education: 'Education',
    writing: 'Writing',
    gapstarsDesc: 'Remote member of the Dutch tech team at ESTG, Europe\'s largest distributor of sustainable energy products. I own the integration layer between Magento, HubSpot, Exact ERP and Akeneo, and build the services that keep stock, orders and pricing consistent across warehouses.',
    closed: '(closed)',
    magrooveDesc: 'Music distribution platform, where I grew from intern to full stack developer. I worked across the whole product: the tools artists used to release their music, an audio pipeline that processed 400k+ tracks, payments, and the AWS infrastructure behind it all.',
    now: 'now',
    iselCourse: 'Computer Science and Computer Engineering · ISEL-UPL',
    scholarship: 'Merit scholarship in the first year, for the best GPA in the course.',
    uspCourse: 'Mathematics · IME-USP',
    back: '← Back to home',
    minRead: 'min read',
    hiTitle: 'Hi, I\'m Julianne',
    hi1: 'I\'m a software engineer living in Lisbon. Technology was always around, since both my parents work in the field, but I got here through maths.',
    hi2: 'I studied Statistics and Applied Mathematics in São Paulo. I didn\'t become a mathematician, but it taught me to think critically and break big problems into small ones.',
    hi3: 'In 2020 I joined Magroove, a music distribution startup, as an intern. By the time I left, four years later, I was one of the main developers on the platform, working on everything from the tools artists used to release their music to the infrastructure behind them.',
    hi4: 'In 2023 I moved to Lisbon to study Computer Science and Computer Engineering at ISEL. It added theory and structure to years of hands-on experience, and opened up areas I hadn\'t explored yet. I got a merit scholarship in my first year, and I\'ve just finished, with DiárioLX as my final project.',
    hi5: 'Today I work at Gapstars, for ESTG, a Dutch company, where I\'m responsible for the integration systems and work across the whole stack: frontend, backend and cloud infrastructure.',
    hi6: 'When I\'m not coding, I\'m probably playing cards, taking photos or watching a movie or a series.',
    dlxTitle: 'DiárioLX, my final project',
    dlx1: 'DiárioLX was my final project at ISEL, built with ESCS and the LIACOM research unit. The idea was a platform for a digital newspaper: a backoffice where journalists write and editors publish, and a public site where readers follow the news.',
    dlx2: 'Before writing any code, we looked at what already existed. WordPress and Ghost both publish articles well, but a newsroom works in a very specific way, and adapting them to it would have meant fighting the tool more than using it. So we built our own.',
    dlx3: 'The platform has three roles. Contributors write, editors review and publish, and admins manage everything else. Every article goes through the same flow: it starts as a draft, goes to review, and is either approved or sent back. Nothing reaches the public site without someone approving it.',
    dlx4: 'Articles are made of blocks, a bit like Notion: paragraphs, quotes, headings, images and videos. Writing feels like a normal editor, but each block is stored separately and in order, which makes it easy to show the article anywhere and to add new types of blocks later.',
    dlx5: 'The homepage is managed from the backoffice too. Editors choose what goes into each section (highlights, featured stories, photos, podcasts, videos) without touching code. The sections come from configuration, so a new type of section doesn\'t mean rewriting the page.',
    dlx6: 'The backend is Kotlin with Spring Boot, split into modules, with PostgreSQL for the data. We used JDBI instead of an ORM, so the SQL stays visible and we know exactly what runs against the database. Errors are returned as values instead of exceptions, and the API reports problems in a standard format (RFC 9457), which kept the frontend simpler.',
    dlx7: 'Media lives in SeaweedFS, an S3-compatible storage. The browser uploads files directly with signed URLs, so large videos never go through the backend.',
    dlx8: 'Authentication uses short-lived access tokens and long-lived refresh tokens in HttpOnly cookies, and every route checks the user\'s role. Content is sanitised before it shows up on the public site, so nothing written in the backoffice can inject code into the pages readers see.',
    dlx9: 'The frontend is React and TypeScript with Vite, and the editor is built on Tiptap. Everything runs in Docker behind Nginx, with CI on GitHub Actions.',
    dlx10: 'More than the code, the project was about understanding how a newsroom works and turning that into rules the system can follow. We presented it in July and got 18/20.',
    fDraft: 'Draft',
    fReview: 'In review',
    fApproved: 'Approved',
    fLive: 'Public site',
    fBack: '↺ Or sent back to the author with changes',
    flowCap: 'Every article follows the same flow.',
    shotEditor: 'Screenshot: block editor',
    shotEditorCap: 'Writing an article with blocks.',
    shotHome: 'Screenshot: homepage manager',
    shotHomeCap: 'Editors choose what goes into each section of the homepage.',
    browser: 'Browser',
    signed: 'upload with a signed URL',
    archCap: 'API requests go through Nginx to Spring Boot. Media goes straight to storage.',
    themeDark: 'Dark mode',
    themeLight: 'Light mode'
  },
  pt: {
    role: 'Engenheira de Software · Lisboa',
    intro1: 'Engenheira de software com mais de 6 anos construindo sistemas backend e aplicações full-stack. A maior parte do meu trabalho acontece <span class="highlight">onde os sistemas se encontram</span>: integrações, pipelines de dados e a automação que evita que uma empresa faça tudo na mão.',
    intro2: 'Já desenvolvi para distribuição musical e e-commerce B2B, principalmente com Python, React e SQL. Gosto de times onde os engenheiros entendem o sistema além da própria parte e não têm medo de descobrir as coisas no caminho.',
    work: 'Experiência',
    education: 'Formação',
    writing: 'Textos',
    gapstarsDesc: 'Membro remoto do time de tecnologia holandês da ESTG, a maior distribuidora europeia de produtos de energia sustentável. Sou responsável pela camada de integração entre Magento, HubSpot, Exact ERP e Akeneo, e desenvolvo os serviços que mantêm estoque, pedidos e preços consistentes entre armazéns.',
    closed: '(encerrada)',
    magrooveDesc: 'Plataforma de distribuição musical, onde passei de estagiária a full stack developer. Trabalhei no produto inteiro: as ferramentas que os artistas usavam para lançar suas músicas, um pipeline de áudio que processou mais de 400 mil faixas, pagamentos e a infraestrutura na AWS por trás de tudo.',
    now: 'atual',
    iselCourse: 'Engenharia Informática e de Computadores · ISEL-UPL',
    scholarship: 'Bolsa de mérito no primeiro ano, pela melhor média do curso.',
    uspCourse: 'Matemática · IME-USP',
    back: '← Voltar ao início',
    minRead: 'min de leitura',
    hiTitle: 'Oi, eu sou a Julianne',
    hi1: 'Sou engenheira de software e moro em Lisboa. A tecnologia sempre esteve por perto, já que meus pais trabalham na área, mas eu cheguei até ela pela matemática.',
    hi2: 'Estudei Estatística e Matemática Aplicada em São Paulo. Não virei matemática, mas aprendi a pensar de forma crítica e a quebrar problemas grandes em partes menores.',
    hi3: 'Em 2020 entrei na Magroove, uma startup de distribuição musical, como estagiária. Quando saí, quatro anos depois, eu era uma das principais desenvolvedoras da plataforma, trabalhando desde as ferramentas que os artistas usavam para lançar suas músicas até a infraestrutura por trás delas.',
    hi4: 'Em 2023 me mudei para Lisboa para estudar Engenharia Informática e de Computadores no ISEL. O curso somou teoria e fundamentos a anos de experiência prática e me mostrou áreas que eu ainda não conhecia. Ganhei uma bolsa de mérito no primeiro ano e acabei de terminar, com o DiárioLX como projeto final.',
    hi5: 'Hoje trabalho na Gapstars, para a ESTG, uma empresa holandesa, onde sou responsável pelos sistemas de integração e trabalho em toda a stack: frontend, backend e infraestrutura em nuvem.',
    hi6: 'Quando não estou programando, provavelmente estou jogando cartas, fotografando ou assistindo a algum filme ou série.',
    dlxTitle: 'DiárioLX, meu projeto final',
    dlx1: 'O DiárioLX foi meu projeto final no ISEL, feito com a ESCS e a unidade de pesquisa LIACOM. A ideia era uma plataforma para um jornal digital: um backoffice, onde os jornalistas escrevem e os editores publicam, e um site público, onde os leitores acompanham as notícias.',
    dlx2: 'Antes de escrever qualquer código, olhamos o que já existia. WordPress e Ghost publicam artigos muito bem, mas uma redação funciona de um jeito bem específico, e adaptar essas ferramentas a isso seria brigar com elas mais do que usá-las. Então construímos a nossa.',
    dlx3: 'A plataforma tem três papéis. Colaboradores escrevem, editores revisam e publicam, e administradores cuidam do resto. Todo artigo passa pelo mesmo fluxo: começa como rascunho, vai para revisão e é aprovado ou devolvido. Nada chega ao site público sem alguém aprovar.',
    dlx4: 'Os artigos são feitos de blocos, meio como no Notion: parágrafos, citações, títulos, imagens e vídeos. Escrever parece um editor normal, mas cada bloco é guardado separado e em ordem, o que facilita mostrar o artigo em qualquer lugar e criar novos tipos de bloco depois.',
    dlx5: 'A home também é gerida pelo backoffice. Os editores escolhem o que entra em cada seção (destaques, matérias em evidência, fotos, podcasts, vídeos) sem mexer em código. As seções vêm de configuração, então um novo tipo de seção não significa reescrever a página.',
    dlx6: 'O backend é em Kotlin com Spring Boot, dividido em módulos, com PostgreSQL para os dados. Usamos JDBI em vez de um ORM, então o SQL fica visível e sabemos exatamente o que roda no banco. Os erros são tratados como valores, e não como exceções, e a API devolve os problemas num formato padrão (RFC 9457), o que deixou o frontend mais simples.',
    dlx7: 'As mídias ficam no SeaweedFS, um armazenamento compatível com S3. O navegador envia os arquivos direto, com URLs assinadas, então vídeos grandes nunca passam pelo backend.',
    dlx8: 'A autenticação usa access tokens de curta duração e refresh tokens de longa duração em cookies HttpOnly, e cada rota verifica o papel do usuário. O conteúdo é sanitizado antes de aparecer no site público, então nada escrito no backoffice consegue injetar código nas páginas que os leitores veem.',
    dlx9: 'O frontend é em React e TypeScript com Vite, e o editor é feito com Tiptap. Tudo roda em Docker atrás do Nginx, com CI no GitHub Actions.',
    dlx10: 'Mais do que o código, o projeto foi sobre entender como uma redação funciona e transformar isso em regras que o sistema consegue seguir. Apresentamos em julho e tiramos 18/20.',
    fDraft: 'Rascunho',
    fReview: 'Em revisão',
    fApproved: 'Aprovado',
    fLive: 'Site público',
    fBack: '↺ Ou devolvido ao autor com alterações',
    flowCap: 'Todo artigo segue o mesmo fluxo.',
    shotEditor: 'Captura: editor por blocos',
    shotEditorCap: 'Escrevendo um artigo com blocos.',
    shotHome: 'Captura: gestão da home',
    shotHomeCap: 'Os editores escolhem o que entra em cada seção da home.',
    browser: 'Navegador',
    signed: 'upload com URL assinada',
    archCap: 'As requisições da API passam pelo Nginx até o Spring Boot. As mídias vão direto para o armazenamento.',
    themeDark: 'Modo escuro',
    themeLight: 'Modo claro'
  }
}

export const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
}

export type Lang = keyof typeof I18N
export type Key = keyof typeof I18N.en

type YearMonth = { year: number; month: number }

export const parseMonth = (value: string): YearMonth => {
  const [year, month] = value.split('-').map(Number)
  return { year, month }
}

export const formatMonth = (value: string, lang: Lang) => {
  const { year, month } = parseMonth(value)
  return `${MONTHS[lang][month - 1]} ${year}`
}

export const monthsBetween = (start: YearMonth, end: YearMonth) =>
  (end.year - start.year) * 12 + end.month - start.month + 1

export const formatDuration = (months: number, lang: Lang) => {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = lang === 'en'
    ? [years && `${years} yr${years > 1 ? 's' : ''}`, rest && `${rest} mo${rest > 1 ? 's' : ''}`]
    : [years && `${years} ano${years > 1 ? 's' : ''}`, rest && `${rest} ${rest > 1 ? 'meses' : 'mês'}`]
  return parts.filter(Boolean).join(' ')
}

export const currentMonth = (): YearMonth => {
  const today = new Date()
  return { year: today.getFullYear(), month: today.getMonth() + 1 }
}
