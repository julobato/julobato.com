/** The full project report, published on LinkedIn. */
export const REPORT_URL = 'https://www.linkedin.com/in/julianne-lobato/overlay/1787671469215/single-media-viewer/?profileId=ACoAAC_lHFEBzceM-JpqDQZWhKPLikl3vqh44_0'

/** Text for the DiárioLX engineering notes page (/notes/diariolx), in both languages. */

export type Role = 'contributor' | 'editor' | 'admin'
export type NodeId = 'browser' | 'tls' | 'router' | 'react' | 'spring' | 'postgres' | 'seaweed'
export type State = 'draft' | 'review' | 'approved' | 'rejected' | 'archived' | 'any'

type Snippet = { file: string; lang: 'ts' | 'kotlin'; code: string }

/** Real code from the DiárioLX repository, trimmed to the relevant lines. */
export const UPLOAD_CODE: Snippet[] = [
  {
    file: 'media.api.ts',
    lang: 'ts',
    code: `const result = await post<SignedUpload>(endpoints.backoffice.medias.signedUrl.href, {
  altText: media.altText,
  credits: media.credits.map((credit) => ({ userId: credit.userId, role: credit.role })),
  originalFileName: media.file.name,
  mimeType: media.file.type,
  uploadType: media.uploadType
});`
  },
  {
    file: 'MediaService.kt',
    lang: 'kotlin',
    code: `val objectName = buildObjectName(uploadType = uploadType, extension = extension)
val upload = NewUpload(buckets.public, objectName, altText, credits, originalFileName, mimeType, uploadType)

val id = transactionManager.run { it.mediaRepository.create(upload) }
val signedUrl = fileStorage.getUploadSignedUrl(buckets.public, objectName, upload.mimeType)
return success(SignedUrl(id, signedUrl))`
  },
  {
    file: 'MediaGallery.tsx',
    lang: 'ts',
    code: `const xhr = new XMLHttpRequest();

xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
        dispatch({ type: 'set-upload-progress', value: Math.round((event.loaded / event.total) * 100) });
    }
};

xhr.open('PUT', signedUrl);
xhr.setRequestHeader('Content-Type', selectedFile.type);
xhr.send(selectedFile);`
  },
  {
    file: 'media.api.ts',
    lang: 'ts',
    code: `async completeUpload(id) {
  const result = await post(endpoints.backoffice.medias.completeUpload.href.replace('{id}', id.toString()), {});
  if (!result.success) {
    throw new Error(result.error || 'Failed to complete upload');
  }
}`
  },
  {
    file: 'MediaService.kt',
    lang: 'kotlin',
    code: `fun completeUpload(id: Int): Boolean {
    val media = transactionManager.run { it.mediaRepository.get(id) } ?: return false
    val info = fileStorage.getObjectInfo(media.bucket, media.objectKey) ?: return false
    transactionManager.run { it.mediaRepository.completeUpload(NewMedia(id, info.sizeBytes)) }
    return true
}`
  }
]

/** Editorial transitions and the minimum role each one needs. */
export const TRANSITIONS: { from: State; to: State; min: Role }[] = [
  { from: 'draft', to: 'review', min: 'contributor' },
  { from: 'review', to: 'approved', min: 'editor' },
  { from: 'review', to: 'rejected', min: 'editor' },
  { from: 'rejected', to: 'draft', min: 'contributor' },
  { from: 'draft', to: 'approved', min: 'editor' },
  { from: 'rejected', to: 'approved', min: 'editor' },
  { from: 'approved', to: 'draft', min: 'editor' },
  { from: 'any', to: 'archived', min: 'editor' }
]

/** Permission table rows, by minimum role. */
export const PERMISSIONS: Role[] = ['contributor', 'contributor', 'contributor', 'editor', 'editor', 'editor', 'admin', 'admin', 'admin']

export const ROLE_ORDER: Role[] = ['contributor', 'editor', 'admin']

const en = {
  postLink: 'DiárioLX, from draft to reader',
  hero: {
    sheetTitle: 'DiárioLX',
    sheetLede: 'The platform behind a digital newspaper.',
    facts: [
      ['What', 'A newsroom backoffice and a public news site'],
      ['Where', 'Final project at ISEL, with ESCS and LIACOM'],
      ['Stack', 'Kotlin, Spring Boot, React, PostgreSQL, SeaweedFS'],
      ['When', 'Presented in July 2026, graded 18/20']
    ],
    story: 'The story',
    report: 'Report',
    reportLink: 'Read the full report',
  },
  toc: ['TL;DR', 'Architecture', 'Decisions', 'Uploads', 'Workflow', 'Security', 'CI/CD', 'Details', 'Improvements'],
  summary: [
    ['Architecture', 'React, Kotlin with Spring Boot, PostgreSQL and SeaweedFS, in Docker on one server.'],
    ['Uploads', 'Files go straight to storage with a 15-minute signed link, never through the backend.'],
    ['Workflow', 'Four states and three roles, checked on the server at every step.'],
    ['Security', 'bcrypt, HttpOnly cookies, and a minimum role on every route.'],
    ['CI/CD', 'JUnit on every backend layer on every push, and Playwright on Chromium, Firefox and phone sizes on main and every pull request. The server only pulls ready-made images.'],
    ['Improvements', 'Server rendering, a policy engine for permissions, and a cache that clears itself when an article changes.']
  ],
  arch: {
    intro: 'One server, two Nginx in front. Click a box.',
    caption: 'Only Nginx is exposed. The database and storage never are.',
    cacheTitle: 'Caching',
    cacheIntro: 'I set up a basic cache in Nginx, route by route. It only relies on time: each entry simply expires.',
    cacheHead: ['Path', 'Cached for', 'Why'],
    cache: [
      ['/api (bootstrap)', 'never', 'The answer depends on who\'s logged in.'],
      ['/api/backoffice, /api/auth', 'never', 'Private data, and editors must always see the latest version.'],
      ['/api (public)', '30 seconds', 'A burst of readers doesn\'t reach the backend.'],
      ['/media', '30 days', 'A file never changes once it\'s uploaded.'],
      ['JS, CSS, fonts, images', '30 days', 'Build files have new names on every build.'],
      ['/ (the app)', 'revalidated', 'A new release shows up right away.']
    ],
    cacheNote: 'Every cached response carries an X-Cache-Status header, so a hit or a miss is easy to see. What it\'s missing, clearing itself when an article changes, is in Improvements.',
    hint: 'Click a box',
    nodes: {
      browser: ['Browser', 'Readers and editors use the same React app. It only ever talks to Nginx, over HTTPS, and uploads go from here straight to storage with a signed link.'],
      tls: ['Nginx · HTTPS', 'Runs on the server itself, outside Docker, because HTTPS and certificate renewal are the server\'s job, not the app\'s. It uses Let\'s Encrypt, renewed by Certbot, and forwards everything inside.'],
      router: ['Nginx · routing', 'The single way into Docker, so the database and storage are never reachable from outside. It serves the React build, sends /api to Spring Boot and /media straight to storage, applies the cache rules, and serves link previews to social media crawlers.'],
      react: ['React · TypeScript', 'One Vite app for the public site and the backoffice. Every call goes through a Services interface, so the whole app can run against a mock, which keeps the public tests fast and independent of the database.'],
      spring: ['Spring Boot · Kotlin', 'Split into modules, with the editorial rules in a domain module that has no framework code, so they can be tested on their own. Controllers stay thin: they parse, delegate and answer. In the upload flow, it never touches file bytes.'],
      postgres: ['PostgreSQL', 'Hand-written SQL through JDBI, views for the joins that repeat, and constraints that enforce some rules in the database itself. The data lives on a Docker volume.'],
      seaweed: ['SeaweedFS · S3', 'Self-hosted, S3-compatible storage, instead of paying AWS by the gigabyte. Browsers upload to it and readers load from it, so in the upload flow the bytes never pass through the backend.']
    } as Record<NodeId, [string, string]>
  },
  decisions: {
    intro: 'Why each part is the way it is. Click one.',
    over: 'over',
    groups: [
      ['Platform', [
        ['Our own platform', 'WordPress · Ghost', 'The project started as a WordPress proof of concept, and it showed its limits in control, customisation and long-term growth. Ghost was closer, but it has no rejection step for contributors, its roles can\'t be extended, and its frontend is tied to its themes. Building our own put the editorial rules in the code itself.'],
        ['React SPA', 'Server rendering', 'We chose React, which we already knew well, so the project\'s time went into the newsroom\'s rules instead of learning a new framework. Server rendering wasn\'t in the requirements either.', 'The trade-off →'],
      ]],
      ['Frontend', [
        ['Services + a mock', 'Calling the API from each component', 'Every call goes through one Services interface, with a real implementation and a mock. Hooks never call fetch directly, so the whole app can run against the mock, which keeps the public tests fast, predictable and independent of the database.'],
        ['Routes from the backend', 'URLs in the frontend', 'The frontend asks the backend for every endpoint when it starts. No URL is hardcoded, so the backend can move without rebuilding the frontend, and visitors who aren\'t logged in never even learn the backoffice routes.']
      ]],
      ['Backend', [
        ['@RequireRole', 'A policy engine', 'We were asked why we weren\'t using a policy engine, like Casbin. We had three well-defined roles, each including the one below, so one annotation per route was simpler and kept each rule next to its endpoint.', 'The trade-off →'],
        ['JDBI', 'An ORM', 'We wanted to see exactly what runs against the database. With JDBI, every query is SQL we wrote and can read, and one transaction manager runs several repositories on the same connection, so multi-step changes are all or nothing. An ORM would have saved some typing, but hidden the queries we cared most about.'],
        ['Errors as values', 'Exceptions', 'Services return a success or a failure instead of throwing. Failures are sealed types, and the controllers match every one of them, so a new kind of error doesn\'t compile until it has an HTTP response. Mapped failures become responses in a standard format (RFC 9457), so the frontend has one way to read them.']
      ]],
      ['Data', [
        ['Blocks as rows', 'One blob of HTML', 'We wanted the database to know what\'s inside an article. As rows, uploaded image and video blocks point to their media record, so credits and descriptions travel with the file, and we can tell where each file is used. A blob of HTML would hide all of that.'],
        ['published_at', 'Publish on approval', 'Approving an article is an editorial decision. Going live is a moment in time. Keeping them apart, with a published_at date, is what lets an editor approve today and schedule for tomorrow, and the backoffice shows published and scheduled articles separately.'],
        ['Views', 'Repeated joins', 'Some joins come back everywhere, like an article with its authors, or a media file with its credits. Views keep that logic in one place, so every query reads the same shape, and article views pick only the author fields they need.'],
        ['Rules in the database', 'Only in code', 'Some rules are enforced by PostgreSQL itself. A partial unique index allows only one primary author and one primary tag per article, and a check constraint makes sure a text block has text and an image block has a file. Even a bug in the code can\'t break them.'],
        ['Integer keys', 'UUIDs', 'Plain integer keys keep joins and indexes small. Public URLs use slugs instead, so readers never see an ID.'],
        ['Unix time', 'Timezones', 'Every date is stored as a single number, always in UTC. There\'s no time zone to get wrong between PostgreSQL and the JVM, and the value maps straight to Kotlin\'s Instant.']
      ]],
      ['Media', [
        ['Direct upload', 'Through the API', 'Videos can be up to 2 GB. Sending them through the backend would hold memory and a connection for the whole upload, just to pass bytes along. With a signed link, the file goes straight from the browser to storage, and the backend only handles the details.'],
        ['SeaweedFS', 'AWS S3', 'Paying AWS by the gigabyte didn\'t make sense for a project full of photos and video. SeaweedFS runs on our own server and speaks the same S3 protocol, so moving to AWS, or any other S3 service, wouldn\'t change the code.']
      ]],
      ['Infra', [
        ['Cache per route', 'No cache', 'Different things age differently. The public API is cached for about 30 seconds, so a burst of readers doesn\'t hit the backend. Media and built files are cached for 30 days, because they never change. The backoffice is never cached, so editors always see the latest version.'],
        ['Prebuilt images', 'Building on the server', 'GitHub Actions builds the images on each version tag, and the server only pulls and runs them. The server needs no build tools, and secrets never end up inside an image.']
      ]],
      ['Access', [
        ['JWT + stored refresh', 'Sessions only', 'The access token is a short-lived JWT carrying the user\'s role, so checking permissions needs no database lookup. The refresh token is stored, so a session can be ended on the server, and a role change takes effect at the next refresh. The speed of JWTs, without losing control of sessions.'],
        ['Invite only', 'Open sign-up', 'DiárioLX is a newsroom, not a public forum. New people join with an invite code that already carries their role and expires after an hour, so nobody can sign up and pick their own permissions.']
      ]]
    ] as [string, [string, string, string, string?][]][]
  },
  upload: {
    intro: 'Files can be up to 2 GB, so they never go through the backend. Step through it:',
    steps: [
      'The browser sends only the details: type, accessible description and credits.',
      'The backend saves a pending record and picks the file\'s name itself, so nobody chooses where a file lands. Then it signs an upload link that lasts 15 minutes.',
      'The browser uploads straight to SeaweedFS, using XMLHttpRequest because fetch can\'t report upload progress.',
      'When the upload finishes, the browser tells the backend, using the id it got in step 2.',
      'The backend checks the file is really there, and reads its size from storage instead of trusting the browser.'
    ],
    prev: 'Previous',
    next: 'Next',
    step: 'Step',
    of: 'of'
  },
  workflow: {
    intro: 'Pick a role. Every change is checked against the route\'s minimum role, and contributors are also limited to their own unpublished articles.',
    roles: { contributor: 'Contributor', editor: 'Editor', admin: 'Admin' } as Record<Role, string>,
    states: { draft: 'Draft', review: 'In review', approved: 'Approved', rejected: 'Rejected', archived: 'Off the site', any: 'Any state' } as Record<State, string>,
    actions: ['submit for review', 'approve, now or on a set date', 'reject, with a comment', 'edit and try again', 'approve directly', 'approve directly', 'edit a live article', 'archive'],
    can: 'Allowed',
    cannot: 'Not allowed',
    note: 'Each role includes the ones below it. Admins also manage the team and the site.'
  },
  perms: {
    intro: 'Who can do what is declared on every route, with one annotation.',
    rows: ['Write and edit drafts', 'Upload media', 'Submit for review', 'Approve, schedule and reject', 'Edit a live article', 'Archive', 'Curate the homepage', 'Categories and tags', 'Users, invites and settings'],
    action: 'Action',
    extraTitle: 'Logins and sessions',
    cookieHead: ['Name', 'Expires', 'HttpOnly', 'SameSite'],
    cookies: [['accessToken', '10 min'], ['refreshToken', '7 days']],
    cookieCaption: 'Both are set at login. No script on the page can read either of them.',
    facts: [
      ['Hashed passwords', 'Passwords are only ever stored as bcrypt hashes.'],
      ['One refresh', 'Requests that hit an expired token together share a single refresh.'],
      ['Single-use reset links', 'Reset links are long random tokens, and each one works only once.'],
      ['Hidden backoffice', 'Its endpoints only appear in the bootstrap after logging in.']
    ]
  },
  tests: {
    intro: 'Each layer is tested on its own. JUnit runs on every push, and Playwright on every push to main and every pull request. In CI, a failed Playwright test is retried and leaves a trace to debug.',
    title: 'What the tests cover',
    head: ['Layer', 'Tool', 'What it covers'],
    rows: [
      ['Domain', 'JUnit 5', 'Article states, publishing and editing rules, invites, value objects.'],
      ['Services', 'JUnit 5', 'Categories, tags and content queries, against a real PostgreSQL, rolled back after each test.'],
      ['Repository', 'JUnit 5 · JDBI', 'Users, content, tags and categories, against a real PostgreSQL, rolled back after each test.'],
      ['HTTP', 'WebTestClient', 'Full requests, from logging in to publishing an article.'],
      ['Public site', 'Playwright', 'Homepage, navigation, articles, listings, search and 404, on Chromium, Firefox and phone sizes.'],
      ['Backoffice', 'Playwright', 'Setup, categories and tags. It logs in once and reuses the session.']
    ],
    deploy: {
      push: 'CI, on every push and pull request',
      release: 'CD, on each version tag',
      tests: 'Tests',
      images: 'Three images',
      imageNames: ['backend', 'web + Nginx', 'PostgreSQL + schema'],
      registry: 'GitHub registry',
      server: 'Server',
      serverSub: 'only pulls and runs',
      note: 'The server never builds anything. Secrets and data stay on it: secrets in files only it has, data on Docker volumes, so the whole stack can be recreated without losing anything.'
    }
  },
  details: [
    ['The API documents itself', 'The annotations on each route become the OpenAPI docs at /docs, response codes included, so the docs live next to the code they describe.'],
    ['Routes come from the backend', 'This is what the app receives when it starts. Switch to logged in, and the backoffice routes appear.'],
    ['Menu without a deploy', 'From one settings page, admins switch sections on and off, and edit the contacts, social links and the legal details a Portuguese newspaper has to publish. The public site reads it all from the backend, so none of it needs a deploy. Try it.'],
    ['Blocks as rows', 'An article is an ordered list of blocks, one row each. Image and video blocks hold a media_id that points to the file and its credits.']
  ],
  loggedOut: 'Logged out',
  loggedIn: 'Logged in',
  blocks: ['Heading', 'Paragraph', 'Image', 'Quote', 'Video'],
  changes: [
    ['Server rendering', 'React SPA, with Nginx serving link previews to crawlers', 'Next.js', 'We chose React, which we already knew well, so the time went into the newsroom\'s rules. As the project went on, I started thinking about things nobody had asked for. Link previews weren\'t in the requirements, but as a user I know a newspaper lives on articles shared on WhatsApp and LinkedIn, and a link without a title and an image doesn\'t get clicked. So I added them: Nginx recognises social media crawlers and sends them to a small page rendered by the backend, with the Open Graph tags. That covers the crawlers we recognise. Full SEO needs every page rendered on the server, so the next step would be a framework like Next.js.'],
    ['Permissions per person', 'Three roles with @RequireRole', 'A policy engine, like Casbin', 'During the project, we were asked why we weren\'t using a policy engine for permissions. With three well-defined roles, one annotation per route was the simpler choice. The trade-off is flexibility: letting a single contributor publish would need a new role or a special case in the code. With a policy engine, Casbin for example, it would be one line in a policy.'],
    ['Lighter media', 'Readers get the original file', 'Resized in a background job', 'Today a large photo reaches the reader at full size, even on a phone. Resizing images and pulling video thumbnails in a background job after the upload would make pages lighter, without making the upload itself any slower.'],
    ['A cache that clears itself', 'Entries expire after 30 seconds', 'Cleared the moment an article changes', 'It\'s a deliberately simple first version: it only relies on time. A published or edited article can take up to 30 seconds to appear. I\'d clear it from the backend whenever an article is published or edited, or give editors a button in the backoffice to do it.'],
    ['Content in two languages', 'Only the interface is translated', 'Articles in PT and EN', 'The interface already speaks Portuguese and English, from a single translations file. The articles don\'t: each one exists in one language. The next step is letting an article be written in more than one, and serving each reader the version in their language.']
  ],
  changesIntro: 'Where I\'d take the project next. Some of these are trade-offs we made on purpose, to keep a final project focused. Others are the natural next steps for a platform meant to be used by a real newsroom. Each card shows where it stands today and where it could go, and "Why?" explains the reasoning.',
  then: 'Then',
  why: 'Why?',
  now: 'Now',
  back: '← Back to the post'
}

const pt: typeof en = {
  postLink: 'DiárioLX, do rascunho ao leitor',
  hero: {
    sheetTitle: 'DiárioLX',
    sheetLede: 'A plataforma por trás de um jornal digital.',
    facts: [
      ['O quê', 'Um backoffice de redação e um site público de notícias'],
      ['Onde', 'Projeto final no ISEL, com a ESCS e o LIACOM'],
      ['Stack', 'Kotlin, Spring Boot, React, PostgreSQL, SeaweedFS'],
      ['Quando', 'Apresentado em julho de 2026, nota 18/20']
    ],
    story: 'A história',
    report: 'Relatório',
    reportLink: 'Ler o relatório completo',
  },
  toc: ['TL;DR', 'Arquitetura', 'Decisões', 'Uploads', 'Fluxo', 'Segurança', 'CI/CD', 'Detalhes', 'Melhorias'],
  summary: [
    ['Arquitetura', 'React, Kotlin com Spring Boot, PostgreSQL e SeaweedFS, em Docker num único servidor.'],
    ['Uploads', 'Os arquivos vão direto para o armazenamento com um link assinado de 15 minutos, nunca pelo backend.'],
    ['Fluxo', 'Quatro estados e três papéis, verificados no servidor a cada passo.'],
    ['Segurança', 'bcrypt, cookies HttpOnly e um papel mínimo em cada rota.'],
    ['CI/CD', 'JUnit em cada camada do backend a cada push, e Playwright no Chromium, no Firefox e em tamanhos de celular na main e em cada pull request. O servidor só baixa imagens prontas.'],
    ['Melhorias', 'Renderizar no servidor, um motor de políticas para as permissões e um cache que se limpa quando um artigo muda.']
  ],
  arch: {
    intro: 'Um servidor, dois Nginx na frente. Clique numa caixa.',
    caption: 'Só o Nginx fica exposto. O banco e o armazenamento nunca.',
    cacheTitle: 'Cache',
    cacheIntro: 'Configurei um cache básico no Nginx, rota por rota. Ele depende só do tempo: cada entrada simplesmente expira.',
    cacheHead: ['Caminho', 'Em cache por', 'Por quê'],
    cache: [
      ['/api (bootstrap)', 'nunca', 'A resposta depende de quem está logado.'],
      ['/api/backoffice, /api/auth', 'nunca', 'Dados privados, e os editores precisam ver sempre a versão mais recente.'],
      ['/api (pública)', '30 segundos', 'Uma leva de leitores não chega ao backend.'],
      ['/media', '30 dias', 'Um arquivo nunca muda depois de enviado.'],
      ['JS, CSS, fontes, imagens', '30 dias', 'Os arquivos de build ganham nomes novos a cada build.'],
      ['/ (o app)', 'revalidado', 'Uma nova release aparece na hora.']
    ],
    cacheNote: 'Toda resposta em cache leva um header X-Cache-Status, então dá para ver um hit ou um miss. O que falta, se limpar sozinho quando um artigo muda, está em Melhorias.',
    hint: 'Clique numa caixa',
    nodes: {
      browser: ['Navegador', 'Leitores e editores usam o mesmo app React. Ele só fala com o Nginx, por HTTPS, e os uploads saem daqui direto para o armazenamento com um link assinado.'],
      tls: ['Nginx · HTTPS', 'Roda no próprio servidor, fora do Docker, porque HTTPS e renovação de certificado são trabalho do servidor, não do app. Usa Let\'s Encrypt, renovado pelo Certbot, e repassa tudo para dentro.'],
      router: ['Nginx · rotas', 'A única entrada no Docker, então o banco e o armazenamento nunca ficam acessíveis de fora. Serve o build do React, manda /api para o Spring Boot e /media direto para o armazenamento, aplica as regras de cache e entrega as prévias de link aos robôs das redes sociais.'],
      react: ['React · TypeScript', 'Um app Vite para o site público e o backoffice. Toda chamada passa por uma interface Services, então o app inteiro roda contra um mock, o que deixa os testes públicos rápidos e independentes do banco.'],
      spring: ['Spring Boot · Kotlin', 'Dividido em módulos, com as regras editoriais num módulo de domínio sem código de framework, para poderem ser testadas sozinhas. Os controllers são finos: interpretam, delegam e respondem. No fluxo de upload, ele nunca toca nos bytes dos arquivos.'],
      postgres: ['PostgreSQL', 'SQL escrito à mão pelo JDBI, views para os joins que se repetem, e constraints que garantem algumas regras no próprio banco. Os dados ficam num volume do Docker.'],
      seaweed: ['SeaweedFS · S3', 'Armazenamento compatível com S3, hospedado por nós, em vez de pagar a AWS por gigabyte. Os navegadores enviam para ele e os leitores carregam dele, então no fluxo de upload os bytes nunca passam pelo backend.']
    }
  },
  decisions: {
    intro: 'Por que cada parte é como é. Clique numa.',
    over: 'em vez de',
    groups: [
      ['Plataforma', [
        ['Plataforma própria', 'WordPress · Ghost', 'O projeto começou como uma prova de conceito em WordPress, que mostrou os seus limites de controle, personalização e crescimento a longo prazo. O Ghost chegava mais perto, mas não tem etapa de rejeição para colaboradores, os papéis não podem ser estendidos e o frontend fica preso aos temas. Construir a nossa colocou as regras editoriais no próprio código.'],
        ['SPA em React', 'Renderizar no servidor', 'Escolhemos React, que a gente já conhecia bem, para o tempo do projeto ir para as regras da redação em vez de aprender um framework novo. Renderizar no servidor também não estava nos requisitos.', 'O custo dessa escolha →'],
      ]],
      ['Frontend', [
        ['Services + um mock', 'Chamar a API em cada componente', 'Toda chamada passa por uma interface Services, com uma implementação real e um mock. Os hooks nunca chamam o fetch direto, então o app inteiro roda contra o mock, o que deixa os testes públicos rápidos, previsíveis e independentes do banco.'],
        ['Rotas vindas do backend', 'URLs no frontend', 'O frontend pede ao backend todos os endpoints quando abre. Nenhuma URL fica fixa, então o backend pode mudar de lugar sem gerar o frontend de novo, e visitantes sem login nem chegam a conhecer as rotas do backoffice.']
      ]],
      ['Backend', [
        ['@RequireRole', 'Um motor de políticas', 'Perguntaram por que não usávamos um motor de políticas, como o Casbin. Tínhamos três papéis bem definidos, cada um incluindo o de baixo, então uma anotação por rota era mais simples e deixava cada regra ao lado do seu endpoint.', 'O custo dessa escolha →'],
        ['JDBI', 'Um ORM', 'A gente queria ver exatamente o que roda no banco. Com o JDBI, toda consulta é SQL que escrevemos e conseguimos ler, e um gerenciador de transações roda vários repositórios na mesma conexão, então mudanças em várias etapas acontecem por inteiro ou não acontecem. Um ORM pouparia digitação, mas esconderia justamente as consultas que mais importavam.'],
        ['Erros como valores', 'Exceções', 'Os serviços devolvem sucesso ou falha em vez de lançar exceções. As falhas são tipos selados, e os controllers tratam todas elas, então um tipo novo de erro não compila até ter uma resposta HTTP. As falhas mapeadas viram respostas num formato padrão (RFC 9457), então o frontend tem um jeito só de lê-las.']
      ]],
      ['Dados', [
        ['Blocos como linhas', 'Um bloco único de HTML', 'A gente queria que o banco soubesse o que tem dentro de um artigo. Como linhas, os blocos de imagem e de vídeo enviados apontam para o registro da mídia, então créditos e descrições acompanham o arquivo, e sabemos onde cada arquivo é usado. Um bloco de HTML esconderia tudo isso.'],
        ['published_at', 'Publicar ao aprovar', 'Aprovar um artigo é uma decisão editorial. Ir ao ar é um momento no tempo. Separar as duas coisas, com uma data published_at, é o que permite a um editor aprovar hoje e agendar para amanhã, e o backoffice mostra os publicados e os agendados separadamente.'],
        ['Views', 'Joins repetidos', 'Alguns joins aparecem em todo lugar, como um artigo com os seus autores, ou uma mídia com os seus créditos. As views deixam essa lógica num lugar só, então toda consulta lê o mesmo formato, e as views de artigo só pegam os campos do autor de que precisam.'],
        ['Regras no banco', 'Só no código', 'Algumas regras são garantidas pelo próprio PostgreSQL. Um índice único parcial permite um só autor principal e uma só tag principal por artigo, e uma constraint de verificação garante que um bloco de texto tem texto e um bloco de imagem tem um arquivo. Nem um bug no código consegue quebrá-las.'],
        ['Chaves inteiras', 'UUIDs', 'Chaves inteiras simples deixam joins e índices pequenos. As URLs públicas usam slugs, então o leitor nunca vê um ID.'],
        ['Tempo Unix', 'Fusos horários', 'Toda data é guardada como um único número, sempre em UTC. Não tem fuso para dar errado entre o PostgreSQL e a JVM, e o valor vira direto um Instant do Kotlin.']
      ]],
      ['Mídia', [
        ['Upload direto', 'Pela API', 'Os vídeos podem ter até 2 GB. Mandar isso pelo backend ocuparia memória e uma conexão durante todo o upload, só para repassar bytes. Com um link assinado, o arquivo vai direto do navegador para o armazenamento, e o backend só cuida dos detalhes.'],
        ['SeaweedFS', 'AWS S3', 'Pagar a AWS por gigabyte não fazia sentido num projeto cheio de fotos e vídeos. O SeaweedFS roda no nosso próprio servidor e fala o mesmo protocolo S3, então migrar para a AWS, ou outro serviço S3, não mudaria o código.']
      ]],
      ['Infra', [
        ['Cache por rota', 'Sem cache', 'Cada coisa envelhece de um jeito. A API pública fica em cache por uns 30 segundos, então uma leva de leitores não chega ao backend. Mídias e arquivos de build ficam 30 dias, porque nunca mudam. O backoffice nunca fica em cache, então os editores sempre veem a versão mais recente.'],
        ['Imagens prontas', 'Gerar no servidor', 'O GitHub Actions gera as imagens a cada tag de versão, e o servidor só baixa e roda. O servidor não precisa de ferramentas de build, e nenhum segredo acaba dentro de uma imagem.']
      ]],
      ['Acesso', [
        ['JWT + refresh guardado', 'Só sessões', 'O access token é um JWT de curta duração com o papel do usuário, então verificar permissões não precisa consultar o banco. O refresh token fica guardado, então uma sessão pode ser encerrada no servidor, e uma mudança de papel vale no próximo refresh. A velocidade do JWT, sem perder o controle das sessões.'],
        ['Só por convite', 'Cadastro aberto', 'O DiárioLX é uma redação, não um fórum público. As pessoas entram com um código de convite que já traz o seu papel e expira em uma hora, então ninguém se cadastra escolhendo as próprias permissões.']
      ]]
    ]
  },
  upload: {
    intro: 'Os arquivos podem ter até 2 GB, então nunca passam pelo backend. Veja passo a passo:',
    steps: [
      'O navegador envia só os detalhes: tipo, descrição acessível e créditos.',
      'O backend guarda um registro pendente e escolhe ele mesmo o nome do arquivo, então ninguém decide onde um arquivo vai parar. Depois assina um link de upload que dura 15 minutos.',
      'O navegador envia direto para o SeaweedFS, usando XMLHttpRequest porque o fetch não informa o progresso do upload.',
      'Quando o upload termina, o navegador avisa o backend, usando o id que recebeu no passo 2.',
      'O backend confirma que o arquivo está mesmo lá, e lê o tamanho do armazenamento em vez de confiar no navegador.'
    ],
    prev: 'Anterior',
    next: 'Próximo',
    step: 'Passo',
    of: 'de'
  },
  workflow: {
    intro: 'Escolha um papel. Cada mudança é verificada contra o papel mínimo da rota, e os colaboradores ainda ficam limitados aos seus próprios artigos não publicados.',
    roles: { contributor: 'Colaborador', editor: 'Editor', admin: 'Admin' },
    states: { draft: 'Rascunho', review: 'Em revisão', approved: 'Aprovado', rejected: 'Rejeitado', archived: 'Fora do site', any: 'Qualquer estado' },
    actions: ['enviar para revisão', 'aprovar, agora ou numa data marcada', 'rejeitar, com um comentário', 'editar e tentar de novo', 'aprovar direto', 'aprovar direto', 'editar um artigo no ar', 'arquivar'],
    can: 'Pode',
    cannot: 'Não pode',
    note: 'Cada papel inclui os de baixo. Administradores também gerenciam a equipe e o site.'
  },
  perms: {
    intro: 'Quem pode fazer o quê é declarado em cada rota, com uma anotação.',
    rows: ['Escrever e editar rascunhos', 'Enviar mídia', 'Enviar para revisão', 'Aprovar, agendar e rejeitar', 'Editar um artigo no ar', 'Arquivar', 'Montar a home', 'Categorias e tags', 'Usuários, convites e configurações'],
    action: 'Ação',
    extraTitle: 'Login e sessões',
    cookieHead: ['Nome', 'Expira', 'HttpOnly', 'SameSite'],
    cookies: [['accessToken', '10 min'], ['refreshToken', '7 dias']],
    cookieCaption: 'Os dois são criados no login. Nenhum script na página consegue ler nenhum deles.',
    facts: [
      ['Senhas com hash', 'As senhas só são guardadas como hashes bcrypt.'],
      ['Uma renovação', 'Pedidos que esbarram juntos num token expirado dividem uma única renovação.'],
      ['Links de reset de uso único', 'Os links de reset são tokens aleatórios longos, e cada um só funciona uma vez.'],
      ['Backoffice escondido', 'Os seus endpoints só aparecem no bootstrap depois do login.']
    ]
  },
  tests: {
    intro: 'Cada camada é testada sozinha. O JUnit roda a cada push, e o Playwright a cada push na main e em cada pull request. No CI, um teste do Playwright que falha é repetido e deixa um trace para depurar.',
    title: 'O que os testes cobrem',
    head: ['Camada', 'Ferramenta', 'O que cobre'],
    rows: [
      ['Domínio', 'JUnit 5', 'Estados do artigo, regras de publicação e edição, convites, value objects.'],
      ['Serviços', 'JUnit 5', 'Categorias, tags e consultas de conteúdo, contra um PostgreSQL de verdade, desfeito depois de cada teste.'],
      ['Repositório', 'JUnit 5 · JDBI', 'Usuários, conteúdo, tags e categorias, contra um PostgreSQL de verdade, desfeito depois de cada teste.'],
      ['HTTP', 'WebTestClient', 'Pedidos completos, do login até a publicação de um artigo.'],
      ['Site público', 'Playwright', 'Home, navegação, artigos, listagens, busca e 404, no Chromium, no Firefox e em tamanhos de celular.'],
      ['Backoffice', 'Playwright', 'Configuração inicial, categorias e tags. Faz login uma vez e reaproveita a sessão.']
    ],
    deploy: {
      push: 'CI, a cada push e pull request',
      release: 'CD, a cada tag de versão',
      tests: 'Testes',
      images: 'Três imagens',
      imageNames: ['backend', 'web + Nginx', 'PostgreSQL + schema'],
      registry: 'Registro do GitHub',
      server: 'Servidor',
      serverSub: 'só baixa e roda',
      note: 'O servidor nunca gera nada. Segredos e dados ficam nele: os segredos em arquivos que só ele tem, os dados em volumes do Docker, então dá para recriar tudo sem perder nada.'
    }
  },
  details: [
    ['A API se documenta sozinha', 'As anotações de cada rota viram a documentação OpenAPI em /docs, com os códigos de resposta, então a documentação fica ao lado do código que descreve.'],
    ['As rotas vêm do backend', 'Isto é o que o app recebe quando abre. Mude para com login, e as rotas do backoffice aparecem.'],
    ['Menu sem deploy', 'Numa única página de configurações, os administradores ligam e desligam seções e editam os contatos, as redes sociais e a ficha técnica que um jornal português precisa publicar. O site público lê tudo isso do backend, então nada precisa de deploy. Experimente.'],
    ['Blocos como linhas', 'Um artigo é uma lista de blocos em ordem, uma linha cada. Os blocos de imagem e de vídeo guardam um media_id que aponta para o arquivo e os seus créditos.']
  ],
  loggedOut: 'Sem login',
  loggedIn: 'Com login',
  blocks: ['Título', 'Parágrafo', 'Imagem', 'Citação', 'Vídeo'],
  changes: [
    ['Renderizar no servidor', 'SPA em React, com o Nginx entregando prévias de link aos robôs', 'Next.js', 'Escolhemos React, que a gente já conhecia bem, para o tempo ir para as regras da redação. Com o projeto andando, comecei a pensar em coisas que ninguém tinha pedido. Prévias de link não estavam nos requisitos, mas como usuária eu sei que um jornal vive de artigos compartilhados no WhatsApp e no LinkedIn, e um link sem título e sem imagem não recebe clique. Então eu acrescentei: o Nginx reconhece os robôs das redes sociais e os manda para uma página pequena, renderizada pelo backend, com as tags Open Graph. Isso cobre os robôs que a gente reconhece. SEO completo exige que toda página seja renderizada no servidor, então o próximo passo seria um framework como o Next.js.'],
    ['Permissões por pessoa', 'Três papéis com @RequireRole', 'Um motor de políticas, como o Casbin', 'Durante o projeto, perguntaram por que não usávamos um motor de políticas para as permissões. Com três papéis bem definidos, uma anotação por rota era a escolha mais simples. O custo é a flexibilidade: deixar um único colaborador publicar exigiria um papel novo ou uma exceção no código. Com um motor de políticas, o Casbin por exemplo, seria uma linha numa política.'],
    ['Mídia mais leve', 'Os leitores recebem o arquivo original', 'Redimensionada numa tarefa em segundo plano', 'Hoje uma foto grande chega ao leitor no tamanho original, mesmo no celular. Redimensionar as imagens e gerar miniaturas dos vídeos numa tarefa em segundo plano, depois do upload, deixaria as páginas mais leves sem deixar o upload mais lento.'],
    ['Um cache que se limpa sozinho', 'As entradas expiram em 30 segundos', 'Limpo no momento em que um artigo muda', 'É uma primeira versão simples de propósito: depende apenas do tempo. Um artigo publicado ou editado pode levar até 30 segundos para aparecer. Eu limparia o cache pelo backend sempre que um artigo fosse publicado ou editado, ou daria aos editores um botão no backoffice para fazer isso.'],
    ['Conteúdo em dois idiomas', 'Só a interface é traduzida', 'Artigos em PT e EN', 'A interface já fala português e inglês, a partir de um único arquivo de traduções. Os artigos não: cada um existe num idioma só. O próximo passo é deixar um artigo ser escrito em mais de um idioma, e entregar a cada leitor a versão no seu.']
  ],
  changesIntro: 'Para onde eu levaria o projeto a seguir. Algumas são escolhas que fizemos de propósito, para manter um projeto final focado. Outras são os próximos passos naturais de uma plataforma feita para ser usada por uma redação de verdade. Cada card mostra onde ela está hoje e para onde poderia ir, e o "Por quê?" explica o raciocínio.',
  then: 'Antes',
  why: 'Por quê?',
  now: 'Hoje',
  back: '← Voltar ao post'
}

export const NOTES = { en, pt }
