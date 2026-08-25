# 🎈 Math Balloon

**Aprenda matemática enquanto voa!**

Jogo educativo em HTML5 com **Phaser 3** (motor de jogo) e **GSAP** (animações
de interface) para crianças de **6 a 9 anos**.
Matemática + aventura + sustentabilidade — todas as bibliotecas estão baixadas
em `vendor/`, sem nenhum link externo: basta abrir o `index.html` no navegador.

---

## 📁 Estrutura de arquivos

```
balao/
├── index.html        → Todas as telas (menu, fases, skins, como jogar, configurações, jogo, pausa, game over, fase concluída, modal)
├── style.css         → Visual cartoon infantil, botões grandes, HUD, responsividade e animações
├── script.js         → Lógica do jogo + cenas Phaser (Boot, Ambient e Game)
├── music/
│   ├── carefree.mp3  → Trilha dos menus (Kevin MacLeod, CC BY 4.0)
│   ├── monkeys.mp3   → Trilha das fases fáceis (Kevin MacLeod, CC BY 4.0)
│   ├── riley.mp3     → Trilha das fases difíceis (Kevin MacLeod, CC BY 4.0)
│   └── sneaky.mp3    → Trilha do modo infinito (Kevin MacLeod, CC BY 4.0)
├── vendor/
│   ├── phaser.min.js → Motor de jogos HTML5 Phaser 3 (v3.87, baixado, 100% offline)
│   ├── gsap.min.js   → GSAP 3 para animações de UI (baixado, 100% offline)
│   └── pico.min.css  → Framework de design Pico.css (baixado, 100% offline)
└── README.md         → Este documento
```

### 🎨 Frameworks utilizados

- **Phaser 3** (`vendor/phaser.min.js`) — motor do jogo. Renderiza via WebGL
  (com fallback Canvas) as duas cenas:
  - **BootScene** — gera todas as texturas em tempo real (balão, obstáculos,
    montanhas, nuvens, casas, pássaros…), sem arquivos de imagem;
  - **AmbientScene** — o fundo animado dos menus (sol com raios girando,
    nuvens, pássaros, borboletas, folhas, balõezinhos e fumaça de chaminé);
  - **GameScene** — o jogo em si: parallax de montanhas/colinas, cenário que
    rola, obstáculos, partículas profissionais (explosões de acerto, poeira de
    erro, faíscas de colisão, confete na conclusão), camera shake, rastro de
    combo e textos flutuantes.
- **GSAP** (`vendor/gsap.min.js`) — animações da interface: transições entre
  telas, pop dos cards de overlay, sequência das estrelas com áudio, contagem
  animada da pontuação, pulso do combo, tremida do painel ao errar e feedback
  elástico nos botões.
- **Pico.css** (`vendor/pico.min.css`) — base de design; toda a identidade
  visual infantil fica no `style.css` customizado.

Nenhum link externo é carregado: o jogo **funciona 100% offline**.

## ♾️ Modo Infinito

Novo modo acessível pelo botão **♾️ MODO INFINITO** no menu:

- Perguntas **nunca acabam** — o desafio é sobreviver o máximo possível.
- **Dificuldade progressiva**: a cada pergunta o tempo diminui (até 6s), a
  altitude cai mais rápido, os obstáculos ficam mais frequentes e velozes e os
  números crescem. Subtração entra a partir de 5 respostas, multiplicação com
  10 e divisão com 16.
- **O céu muda de tema** a cada 8 perguntas — a jornada atravessa o dia inteiro,
  do amanhecer até a noite estrelada.
- **Recorde salvo** automaticamente (`endlessHigh` no localStorage), com badge
  **🏆 NOVO RECORDE!** na tela de fim de jogo.

## 🎨 Um visual para cada fase

Cada uma das 10 fases tem **tema visual próprio** (`LEVEL_THEMES` em
`script.js`): cor do céu, tonalidade das montanhas, colinas, nuvens e árvores —
e a **Fase 10** é à noite, com lua, crateras e estrelas cintilantes.

| Fase | Tema |
|------|------|
| 1–2  | Dia clássico e dia vívido |
| 3    | Montanhas rochosas (tons frios) |
| 4–5  | Floresta e vale verde-dourado |
| 6    | Entardecer (roxo → pêssego, nuvens alaranjadas) |
| 7    | Alta altitude roxa |
| 8    | Verde sustentável vibrante |
| 9    | Hora dourada |
| 10   | Noite estrelada com lua |

## 🎈 Skins do balão

Tela **🎈 SKINS** no menu, com pré-visualização desenhada em canvas de cada skin:

| Skin     | Custo (estrelas) | Estilo |
|----------|------------------|--------|
| Clássico | Grátis           | O balão original |
| Arco-Íris| 6 ⭐             | 6 faixas coloridas |
| Abelha   | 12 ⭐            | Amarelo com listras pretas |
| Melancia | 18 ⭐            | Verde com sementes |
| Galáxia  | 24 ⭐            | Roxo cósmico com estrelas |
| Ouro     | 30 ⭐ (todas)    | Dourado com brilhos |

A skin escolhida fica salva e é aplicada no jogo (textura gerada por
`paintBalloon()`, usada tanto no Phaser quanto nas pré-visualizações).

## ✨ Outras melhorias

- **Contagem 3‑2‑1‑VAI!** com sons antes de cada fase começar.
- **Pausa automática** ao trocar de aba/janela (nada de perder altitude
  distraído).
- **Chuva de confete** a cada combo múltiplo de 5, com pulso de câmera.
- **Contador de estrelas totais** (x/30) no menu de fases e na loja de skins.

## 🚀 Como executar

1. Dê **duplo clique** em `index.html` (abre direto no navegador).
2. Ou abra via barra de endereço: `file:///C:/xampp/htdocs/balao/index.html`.
3. Nada para instalar. Funciona offline.

Recomendado para: **Chrome**, **Edge**, **Firefox** ou **Safari** (versões recentes),
no computador, tablet ou celular.

## 🎮 Controles

| Dispositivo    | Ação                                    |
|----------------|-----------------------------------------|
| Todos          | Toque/clique no botão de resposta certa |
| Teclado        | `Tab` para navegar e `Enter` para responder |
| Geral          | `P` ou `Esc` → pausar / continuar       |

**Não há botão de subir.** O balão sobe **somente quando você acerta a conta**:
- ✅ Acertou → o balão sobe (+altitude).
- ❌ Errou, demorou demais ou bateu → o balão desce (−altitude).
- A altitude também diminui lentamente com o tempo — responda com calma, mas sem enrolar.

## 🧠 Como o jogo funciona

1. Um **desafio matemático** com 4 alternativas aparece na tela.
2. **Acertou** → o balão sobe, você ganha pontos, o combo aumenta e o planeta
   fica mais saudável (flores, árvores verdes, céu limpo).
3. **Errou ou demorou demais** → o balão desce, o combo zera e o ambiente
   polui um pouco (fumaça, árvores queimadas, céu mais escuro).
4. **Bateu em obstáculos** (nuvem de tempestade, pássaro, montanha, árvore,
   fábrica, balão adversário) → perde altitude, pontos e ganha invulnerabilidade
   por 1,2s (sem game over imediato).
5. Se a **ALTITUDE chegar a 0** (balão desce até o chão) → fim de fase.
6. Responda todas as perguntas da fase para **concluir**, ganhar **estrelas**
   e desbloquear a próxima fase.

> Dica: mantenha a altitude alta acertando as contas — obstáculos perto do chão
> (montanhas, árvores, fábricas) só atingem balões baixos!

## 🗺️ Sistema de fases

10 fases, cada uma com dificuldade crescente (números maiores, mais operações,
menos tempo e mais obstáculos):

| Fase | Nome                    | Operações | Dificuldade |
|------|-------------------------|-----------|-------------|
| 1    | Primeiro Voo            | +         | Fácil       |
| 2    | Céu Azul                | + −       | Fácil       |
| 3    | Montanhas               | + −       | Médio       |
| 4    | Floresta                | + − ×     | Médio       |
| 5    | Vale Verde              | + − ×     | Médio       |
| 6    | Desafio das Nuvens      | + − × ÷   | Difícil     |
| 7    | Alto das Montanhas      | + − × ÷   | Difícil     |
| 8    | Floresta Sustentável    | + − × ÷   | Difícil     |
| 9    | Céu dos Campeões        | + − × ÷   | Expert      |
| 10   | Grande Voo              | + − × ÷   | Expert      |

- A **Fase 1** começa desbloqueada; as demais desbloqueiam ao concluir a anterior.
- Cada fase rende de **1 a 3 estrelas** (baseado na precisão de acertos e na
  altitude final). Recorde e estrelas são **atualizados** se você melhorar.
- **Divisão** sempre gera resultados inteiros e sem divisão por zero.
- **Subtração** nunca gera resultado negativo.

### ⭐ Cálculo das estrelas
- 1 estrela: concluiu a fase.
- 2 estrelas: ≥ 60% de acertos e altitude final ≥ 50%.
- 3 estrelas: ≥ 85% de acertos e altitude final ≥ 70%.

## 📈 Pontuação e combo

- Resposta certa: **+100 pontos** + bônus de tempo (até +50) + bônus de combo
  (+10 por nível de combo).
- **Combo** aumenta a cada acerto consecutivo e zera ao errar, demorar ou colidir.
- Colisão tira 50 pontos (nunca negativa) e zera o combo.

## ⚙️ Onde alterar a dificuldade

Tudo fica em `script.js`, no array **`LEVELS`** no topo do arquivo. Cada fase é
um objeto:

```js
{
  id: 1,                // número da fase
  name: 'Primeiro Voo', // nome exibido
  icon: '🎈',           // emoji do card
  difficulty: 1,        // 1 Fácil · 2 Médio · 3 Difícil · 4 Expert
  operations: ['add'],  // 'add' | 'sub' | 'mul' | 'div'
  maxNumber: 10,        // maior número usado (soma/subtração)
  maxMul: 4,            // maior fator na multiplicação
  maxDiv: 9,            // maior divisor/quociente na divisão
  questionCount: 6,     // quantas perguntas por fase
  timePerQuestion: 20,  // segundos para responder
  obstacleRate: 0,      // segundos entre obstáculos (0 = nenhum)
  obstacleSpeed: 60,    // velocidade do cenário/obstáculos
  drainRate: 1.4,       // perda passiva de altitude por segundo
  cloudDensity: 1       // quantidade de nuvens decorativas
}
```

Basta ajustar os valores e recarregar a página.

## 💾 Como o progresso é salvo

Usa `localStorage` (chave `mathBalloon`) com esta estrutura:

```js
{
  unlockedLevels: 3,     // fase mais alta desbloqueada
  stars:     { 1: 3, 2: 2, 3: 0 },          // estrelas por fase
  highScores:{ 1: 2500, 2: 1800 },          // melhor pontuação por fase
  skin: 'galaxy',                            // skin selecionada do balão
  endlessHigh: 604,                          // recorde do modo infinito
  settings:  { sound: true, music: true, animations: true }
}
```

- Salvo automaticamente ao concluir uma fase ou mudar configurações.
- Sobrevive ao fechar/reabrir o navegador.
- Para zerar: botão **REINICIAR PROGRESSO** (com confirmação) ou
  **CONFIGURAÇÕES → Redefinir progresso**.

## 🔊 Áudio

**Música de fundo** (arquivos MP3 em `music/`, tocados em loop com volume baixo):

| Faixa | Onde toca |
|-------|-----------|
| Carefree | Menus e telas |
| Monkeys Spinning Monkeys | Fases 1–5 (fáceis/médias) |
| Life of Riley | Fases 6–10 (difíceis) |
| Sneaky Snitch | Modo Infinito |

> Créditos: músicas por **Kevin MacLeod** (incompetech.com), licenciadas sob
> **Creative Commons: By Attribution 4.0** — https://creativecommons.org/licenses/by/4.0/
> A trilha é 100% livre para uso educacional (com atribuição, incluída aqui e
> nos créditos do jogo).

**Efeitos sonoros** continuam 100% gerados por **Web Audio API** (sem arquivos):
clique, acerto, erro, estrela, colisão, conclusão e game over. Se algum MP3
não carregar, o jogo volta automaticamente para a melodia sintetizada.

Ative/desative **Som** e **Música** nas Configurações (a preferência também
fica salva). A música pausa automaticamente quando o jogo pausa e ao trocar de
contexto (menu ↔ jogo).

> Obs.: o navegador só permite som após uma interação do usuário
> (clique/toque/tecla) — comportamento padrão de todos os navegadores.

## ♿ Acessibilidade e responsividade

- Botões grandes, textos legíveis, feedback por **texto + ícone + cor**
  (✓ CORRETO! / ✕ OPS!…), nunca só cor.
- Funciona com teclado, mouse e toque.
- Layout adaptável de 1920×1080 até smartphones; sem rolagem horizontal.
- Em celulares em pé aparece um aviso para **virar o aparelho** (paisagem é o
  melhor jeito de jogar).
- Respeita `prefers-reduced-motion` (reduz animações).

## 🌱 Sustentabilidade (ODS 4 e ODS 8)

Cada resposta certa deixa o ambiente mais verde; cada erro degrada o cenário.
No fim da fase, uma mensagem curta conecta o jogo ao cuidado com o planeta e
ao valor de aprender — alinhado à **ODS 4 (Educação de Qualidade)** e à
**ODS 8 (Trabalho Decente e Crescimento Econômico)**, sem virar lição longa.

## 🌳 Ambientação

Além do jogo, o cenário é vivo nos dois momentos:

- **Menu e telas (fundo animado):** céu azul com sol brilhando (com halo),
  nuvens em movimento, pássaros de várias cores e tamanhos, balõezinhos,
  borboletas, folhas caindo e uma paisagem com morros, árvores e **casinhas
  com chaminés soltando fumaça**.
- **Durante o jogo (Canvas):** céu, sol com brilho, nuvens em parallax,
  montanhas, colinas, árvores (que "queimam" se o planeta poluir), flores,
  **casinhas com chaminés animadas**, pássaros e borboletas que aparecem
  quando o ambiente está saudável.

## 🧹 Simplificações intencionais

- A música de fundo usa MP3s livres (Kevin MacLeod, CC BY 4.0) baixados em
  `music/` — se não carregarem, cai automaticamente na melodia sintetizada.
- Os efeitos sonoros são sintetizados por osciladores (estilo arcade), não samples.
- Todas as artes do jogo (balão, obstáculos, montanhas, casas, pássaros) são
  **texturas geradas por código** no BootScene do Phaser — nenhum PNG/GIF
  externo, projeto leve e rápido de carregar.

---

Feito com ❤️ para pequenos astronautas da matemática. Boa viagem! 🎈
