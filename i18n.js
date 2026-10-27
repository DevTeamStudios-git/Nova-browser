/* Nova interface translations. Page content, user data and AI replies are never translated here. */
(() => {
  const languages = ['en', 'fr', 'es', 'de', 'ja', 'pt'];
  // English | French | Spanish | German | Japanese | Portuguese
  const rows = `
General|Général|General|Allgemein|一般|Geral
Appearance|Apparence|Apariencia|Darstellung|外観|Aparência
New Tab Page|Nouvel onglet|Página de nueva pestaña|Neue-Tab-Seite|新しいタブページ|Página de nova aba
Privacy & Security|Confidentialité et sécurité|Privacidad y seguridad|Datenschutz und Sicherheit|プライバシーとセキュリティ|Privacidade e segurança
Search Engine|Moteur de recherche|Motor de búsqueda|Suchmaschine|検索エンジン|Motor de pesquisa
Downloads|Téléchargements|Descargas|Downloads|ダウンロード|Transferências
Extensions|Extensions|Extensiones|Erweiterungen|拡張機能|Extensões
Sync & Accounts|Synchronisation et comptes|Sincronización y cuentas|Synchronisierung und Konten|同期とアカウント|Sincronização e contas
Passwords|Mots de passe|Contraseñas|Passwörter|パスワード|Palavras-passe
Accessibility|Accessibilité|Accesibilidad|Barrierefreiheit|アクセシビリティ|Acessibilidade
Languages|Langues|Idiomas|Sprachen|言語|Idiomas
Import Browser Data|Importer les données|Importar datos del navegador|Browserdaten importieren|ブラウザーデータのインポート|Importar dados do navegador
Advanced|Avancé|Avanzado|Erweitert|詳細設定|Avançado
AI Assistant|Assistant IA|Asistente de IA|KI-Assistent|AIアシスタント|Assistente de IA
Dev Tools|Outils de développement|Herramientas de desarrollo|Entwicklerwerkzeuge|開発者ツール|Ferramentas de desenvolvimento
Back to Browser|Retour au navigateur|Volver al navegador|Zurück zum Browser|ブラウザーに戻る|Voltar ao navegador
Search settings…|Rechercher un paramètre…|Buscar ajustes…|Einstellungen suchen…|設定を検索…|Pesquisar definições…
Search settings|Rechercher un paramètre|Buscar ajustes|Einstellungen suchen|設定を検索|Pesquisar definições
Settings|Paramètres|Configuración|Einstellungen|設定|Definições
History|Historique|Historial|Verlauf|履歴|Histórico
Bookmarks|Favoris|Marcadores|Lesezeichen|ブックマーク|Favoritos
New Tab|Nouvel onglet|Nueva pestaña|Neuer Tab|新しいタブ|Nova aba
New tab|Nouvel onglet|Nueva pestaña|Neuer Tab|新しいタブ|Nova aba
Back|Retour|Atrás|Zurück|戻る|Voltar
Forward|Avancer|Adelante|Vorwärts|進む|Avançar
Reload|Recharger|Recargar|Neu laden|再読み込み|Recarregar
Home|Accueil|Inicio|Startseite|ホーム|Início
Close|Fermer|Cerrar|Schließen|閉じる|Fechar
Cancel|Annuler|Cancelar|Abbrechen|キャンセル|Cancelar
Save|Enregistrer|Guardar|Speichern|保存|Guardar
Test|Tester|Probar|Testen|テスト|Testar
Clear|Effacer|Borrar|Löschen|消去|Limpar
Delete|Supprimer|Eliminar|Löschen|削除|Eliminar
Reset|Réinitialiser|Restablecer|Zurücksetzen|リセット|Repor
Open|Ouvrir|Abrir|Öffnen|開く|Abrir
Change|Modifier|Cambiar|Ändern|変更|Alterar
Browse…|Parcourir…|Examinar…|Durchsuchen…|参照…|Procurar…
Manage|Gérer|Administrar|Verwalten|管理|Gerir
Import|Importer|Importar|Importieren|インポート|Importar
Sign In|Se connecter|Iniciar sesión|Anmelden|ログイン|Iniciar sessão
Sign in|Se connecter|Iniciar sesión|Anmelden|ログイン|Iniciar sessão
Sign Out|Se déconnecter|Cerrar sesión|Abmelden|ログアウト|Terminar sessão
Continue with Google|Continuer avec Google|Continuar con Google|Mit Google fortfahren|Googleで続行|Continuar com o Google
Email|Adresse e-mail|Correo electrónico|E-Mail|メールアドレス|E-mail
Password|Mot de passe|Contraseña|Passwort|パスワード|Palavra-passe
Not signed in|Non connecté|Sin sesión iniciada|Nicht angemeldet|未ログイン|Sessão não iniciada
On Startup|Au démarrage|Al iniciar|Beim Start|起動時|Ao iniciar
On startup|Au démarrage|Al iniciar|Beim Start|起動時|Ao iniciar
Homepage|Page d’accueil|Página de inicio|Startseite|ホームページ|Página inicial
Show Home Button|Afficher le bouton Accueil|Mostrar botón de inicio|Startseiten-Schaltfläche anzeigen|ホームボタンを表示|Mostrar botão de início
Restore tabs on restart|Restaurer les onglets au redémarrage|Restaurar pestañas al reiniciar|Tabs beim Neustart wiederherstellen|再起動時にタブを復元|Restaurar abas ao reiniciar
Smooth scrolling|Défilement fluide|Desplazamiento suave|Sanftes Scrollen|スムーズスクロール|Deslocamento suave
Spell check|Vérification orthographique|Revisión ortográfica|Rechtschreibprüfung|スペルチェック|Verificação ortográfica
Default zoom|Zoom par défaut|Zoom predeterminado|Standardzoom|既定のズーム|Zoom predefinido
Show images|Afficher les images|Mostrar imágenes|Bilder anzeigen|画像を表示|Mostrar imagens
Theme|Thème|Tema|Design|テーマ|Tema
Accent Colour|Couleur d’accentuation|Color de acento|Akzentfarbe|アクセントカラー|Cor de destaque
Tab Layout|Disposition des onglets|Diseño de pestañas|Tab-Anordnung|タブの配置|Disposição das abas
Font Size|Taille de police|Tamaño de letra|Schriftgröße|フォントサイズ|Tamanho da letra
Bookmarks Bar|Barre des favoris|Barra de marcadores|Lesezeichenleiste|ブックマークバー|Barra de favoritos
Vertical Tabs|Onglets verticaux|Pestañas verticales|Vertikale Tabs|縦型タブ|Abas verticais
Custom CSS|CSS personnalisé|CSS personalizado|Benutzerdefiniertes CSS|カスタムCSS|CSS personalizado
UI Corner Radius|Arrondi des coins|Radio de las esquinas|Eckenradius|角の丸み|Raio dos cantos
Glass Effect|Effet de verre|Efecto de cristal|Glaseffekt|ガラス効果|Efeito de vidro
Compact Mode|Mode compact|Modo compacto|Kompaktmodus|コンパクトモード|Modo compacto
Background Style|Style d’arrière-plan|Estilo de fondo|Hintergrundstil|背景スタイル|Estilo do fundo
Quick Notes Widget|Bloc-notes rapide|Notas rápidas|Schnellnotizen|クイックメモ|Notas rápidas
News & Weather Widget|Actualités et météo|Noticias y tiempo|Nachrichten und Wetter|ニュースと天気|Notícias e meteorologia
Popular Sites|Sites populaires|Sitios populares|Beliebte Websites|よく使うサイト|Sites populares
Quick Links|Liens rapides|Enlaces rápidos|Schnellzugriffe|クイックリンク|Ligações rápidas
Block Trackers|Bloquer les traqueurs|Bloquear rastreadores|Tracker blockieren|トラッカーをブロック|Bloquear rastreadores
Do Not Track|Ne pas me pister|No rastrear|Nicht verfolgen|追跡拒否|Não rastrear
Fingerprint Protection|Protection contre le pistage numérique|Protección de huella digital|Fingerabdruckschutz|フィンガープリント保護|Proteção de impressão digital
Cookie Policy|Politique des cookies|Política de cookies|Cookie-Richtlinie|Cookieポリシー|Política de cookies
HTTPS-Only Mode|Mode HTTPS uniquement|Modo solo HTTPS|Nur-HTTPS-Modus|HTTPS専用モード|Modo apenas HTTPS
Global Privacy Control|Contrôle global de confidentialité|Control global de privacidad|Globale Datenschutzkontrolle|グローバルプライバシー制御|Controlo global de privacidade
DNS over HTTPS|DNS sur HTTPS|DNS sobre HTTPS|DNS über HTTPS|DNS over HTTPS|DNS sobre HTTPS
Cookie Manager|Gestionnaire de cookies|Administrador de cookies|Cookie-Verwaltung|Cookie管理|Gestor de cookies
Site Permissions|Autorisations des sites|Permisos de sitios|Website-Berechtigungen|サイトの権限|Permissões dos sites
Clear Browsing Data|Effacer les données de navigation|Borrar datos de navegación|Browserdaten löschen|閲覧データを消去|Limpar dados de navegação
Default Search Engine|Moteur de recherche par défaut|Buscador predeterminado|Standardsuchmaschine|既定の検索エンジン|Motor de pesquisa predefinido
Show Suggestions|Afficher les suggestions|Mostrar sugerencias|Vorschläge anzeigen|候補を表示|Mostrar sugestões
Download Location|Dossier de téléchargement|Ubicación de descargas|Downloadordner|ダウンロード先|Pasta de transferências
Ask Where to Save|Demander où enregistrer|Preguntar dónde guardar|Speicherort erfragen|保存先を毎回確認|Perguntar onde guardar
Auto-Open DevTools|Ouvrir automatiquement les outils|Abrir herramientas automáticamente|Entwicklerwerkzeuge automatisch öffnen|開発者ツールを自動表示|Abrir ferramentas automaticamente
DevTools Layout|Disposition des outils|Diseño de herramientas|Werkzeuganordnung|開発者ツールの配置|Disposição das ferramentas
Network Throttle|Limitation réseau|Limitación de red|Netzwerkdrosselung|ネットワーク速度制限|Limitação de rede
Debug Overlay|Superposition de débogage|Capa de depuración|Debug-Anzeige|デバッグ表示|Sobreposição de depuração
Open DevTools Now|Ouvrir les outils maintenant|Abrir herramientas ahora|Entwicklerwerkzeuge jetzt öffnen|開発者ツールを開く|Abrir ferramentas agora
Hardware Acceleration|Accélération matérielle|Aceleración de hardware|Hardwarebeschleunigung|ハードウェアアクセラレーション|Aceleração de hardware
Memory Saver|Économiseur de mémoire|Ahorro de memoria|Speichersparmodus|メモリセーバー|Poupança de memória
Energy Saver|Économiseur d’énergie|Ahorro de energía|Energiesparmodus|省エネモード|Poupança de energia
Reset Nova|Réinitialiser Nova|Restablecer Nova|Nova zurücksetzen|Novaをリセット|Repor o Nova
Enable AI Assistant|Activer l’assistant IA|Activar asistente de IA|KI-Assistent aktivieren|AIアシスタントを有効化|Ativar assistente de IA
Default Model|Modèle par défaut|Modelo predeterminado|Standardmodell|既定のモデル|Modelo predefinido
Include Page Context|Inclure le contexte de la page|Incluir contexto de la página|Seitenkontext einbeziehen|ページの情報を含める|Incluir contexto da página
Groq API Key|Clé API Groq|Clave API de Groq|Groq-API-Schlüssel|Groq APIキー|Chave API Groq
Clear all AI keys|Effacer toutes les clés IA|Borrar todas las claves de IA|Alle KI-Schlüssel löschen|すべてのAIキーを削除|Limpar todas as chaves de IA
Model ID|Identifiant du modèle|ID del modelo|Modell-ID|モデルID|ID do modelo
Offer to save passwords|Proposer d’enregistrer les mots de passe|Ofrecer guardar contraseñas|Speichern von Passwörtern anbieten|パスワード保存を提案|Oferecer guardar palavras-passe
Auto sign-in|Connexion automatique|Inicio de sesión automático|Automatisch anmelden|自動ログイン|Início de sessão automático
Check passwords for breaches|Vérifier les fuites de mots de passe|Comprobar contraseñas filtradas|Passwörter auf Datenlecks prüfen|パスワード漏えいを確認|Verificar fugas de palavras-passe
Saved Passwords|Mots de passe enregistrés|Contraseñas guardadas|Gespeicherte Passwörter|保存したパスワード|Palavras-passe guardadas
No passwords saved yet|Aucun mot de passe enregistré|No hay contraseñas guardadas|Noch keine Passwörter gespeichert|保存したパスワードはありません|Ainda não há palavras-passe guardadas
Page Zoom|Zoom des pages|Zoom de página|Seitenzoom|ページズーム|Zoom da página
Show focus highlights|Afficher le focus|Mostrar indicadores de foco|Fokusmarkierungen anzeigen|フォーカスを強調表示|Mostrar realce do foco
Reduce animations|Réduire les animations|Reducir animaciones|Animationen reduzieren|アニメーションを減らす|Reduzir animações
Read Aloud speed|Vitesse de lecture vocale|Velocidad de lectura en voz alta|Vorlesegeschwindigkeit|読み上げ速度|Velocidade de leitura em voz alta
Browser Language|Langue du navigateur|Idioma del navegador|Browsersprache|ブラウザーの言語|Idioma do navegador
Offer page translation|Proposer la traduction des pages|Ofrecer traducción de páginas|Seitenübersetzung anbieten|ページの翻訳を提案|Oferecer tradução de páginas
Import from Chrome|Importer depuis Chrome|Importar desde Chrome|Aus Chrome importieren|Chromeからインポート|Importar do Chrome
Import from Edge|Importer depuis Edge|Importar desde Edge|Aus Edge importieren|Edgeからインポート|Importar do Edge
Import from HTML file|Importer un fichier HTML|Importar archivo HTML|Aus HTML-Datei importieren|HTMLファイルからインポート|Importar ficheiro HTML
Startup, homepage, and home button settings.|Paramètres de démarrage, de page d’accueil et du bouton Accueil.|Ajustes de inicio, página de inicio y botón de inicio.|Einstellungen für Start, Startseite und Startseiten-Schaltfläche.|起動、ホームページ、ホームボタンの設定。|Definições de arranque, página inicial e botão de início.
What to show when Nova opens|Contenu affiché à l’ouverture de Nova|Qué mostrar al abrir Nova|Anzeige beim Öffnen von Nova|Nova起動時に表示する内容|O que mostrar ao abrir o Nova
Used when startup is set to Homepage|Utilisée si le démarrage est réglé sur Page d’accueil|Se usa al iniciar con la página de inicio|Wird beim Start mit der Startseite verwendet|起動時にホームページを選んだ場合に使用|Usada ao iniciar com a página inicial
Display home button in the toolbar|Afficher le bouton Accueil dans la barre d’outils|Mostrar el botón de inicio en la barra|Startseiten-Schaltfläche in der Symbolleiste anzeigen|ツールバーにホームボタンを表示|Mostrar o botão de início na barra
Re-open tabs from previous session|Rouvrir les onglets de la session précédente|Reabrir pestañas de la sesión anterior|Tabs der letzten Sitzung erneut öffnen|前回のセッションのタブを開く|Reabrir abas da sessão anterior
Enable smooth page scrolling|Activer le défilement fluide|Activar desplazamiento suave|Sanftes Scrollen aktivieren|スムーズスクロールを有効化|Ativar deslocamento suave
Check spelling in text fields|Vérifier l’orthographe dans les champs de texte|Revisar ortografía en los campos|Rechtschreibung in Textfeldern prüfen|テキスト欄のスペルを確認|Verificar ortografia nos campos de texto
Default page zoom level|Niveau de zoom par défaut|Nivel de zoom predeterminado|Standardzoom für Seiten|ページの既定のズーム倍率|Nível de zoom predefinido
Load and display images on pages|Charger et afficher les images des pages|Cargar y mostrar imágenes en las páginas|Bilder auf Seiten laden und anzeigen|ページの画像を読み込んで表示|Carregar e mostrar imagens nas páginas
Enable JavaScript on all pages|Activer JavaScript sur toutes les pages|Activar JavaScript en todas las páginas|JavaScript auf allen Seiten aktivieren|すべてのページでJavaScriptを有効化|Ativar JavaScript em todas as páginas
Language and spell check settings.|Paramètres de langue et d’orthographe.|Ajustes de idioma y ortografía.|Sprach- und Rechtschreibeinstellungen.|言語とスペルチェックの設定。|Definições de idioma e ortografia.
Language used for browser menus and dialogs|Langue des menus et boîtes de dialogue du navigateur|Idioma de los menús y cuadros de diálogo|Sprache für Browsermenüs und Dialoge|ブラウザーのメニューとダイアログの言語|Idioma dos menus e diálogos do navegador
Highlight misspelled words in text fields|Souligner les fautes dans les champs de texte|Resaltar errores ortográficos en los campos|Rechtschreibfehler in Textfeldern hervorheben|テキスト欄のスペルミスを強調|Realçar erros ortográficos nos campos de texto
Ask to translate pages in foreign languages|Proposer de traduire les pages en langue étrangère|Ofrecer traducir páginas en otros idiomas|Übersetzung fremdsprachiger Seiten anbieten|外国語のページの翻訳を提案|Oferecer traduzir páginas noutros idiomas
Theme, colours, font size, and layout options.|Thème, couleurs, taille de police et disposition.|Tema, colores, tamaño de letra y diseño.|Design, Farben, Schriftgröße und Layout.|テーマ、色、フォントサイズ、レイアウトの設定。|Tema, cores, tamanho da letra e disposição.
Customise what appears on every new tab.|Personnaliser le contenu des nouveaux onglets.|Personalizar cada nueva pestaña.|Inhalt neuer Tabs anpassen.|新しいタブの表示内容をカスタマイズ。|Personalizar o conteúdo de cada nova aba.
Control how Nova handles tracking, cookies, and your data.|Gérer le pistage, les cookies et vos données.|Controlar rastreo, cookies y tus datos.|Tracking, Cookies und Daten verwalten.|トラッキング、Cookie、データの管理。|Controlar rastreio, cookies e dados.
Choose your default search engine and suggestion settings.|Choisir le moteur de recherche et les suggestions.|Elegir buscador y sugerencias.|Standardsuchmaschine und Vorschläge auswählen.|既定の検索エンジンと候補の設定。|Escolher o motor de pesquisa e as sugestões.
Control where files are saved and how downloads are handled.|Gérer l’enregistrement des fichiers et les téléchargements.|Controlar dónde guardar archivos y las descargas.|Speicherort und Downloads verwalten.|ファイルの保存先とダウンロードの設定。|Controlar onde guardar ficheiros e as transferências.
Manage your installed browser extensions.|Gérer les extensions installées.|Administrar las extensiones instaladas.|Installierte Browsererweiterungen verwalten.|インストールした拡張機能を管理。|Gerir as extensões instaladas.
Sign in to sync your bookmarks and history across devices.|Se connecter pour synchroniser favoris et historique.|Inicia sesión para sincronizar marcadores e historial.|Anmelden, um Lesezeichen und Verlauf zu synchronisieren.|ログインしてブックマークと履歴を同期。|Inicie sessão para sincronizar favoritos e histórico.
Sign in with a Nova Account to sync|Se connecter à un compte Nova pour synchroniser|Inicia sesión con Nova para sincronizar|Mit Nova-Konto anmelden und synchronisieren|Novaアカウントでログインして同期|Inicie sessão com uma conta Nova para sincronizar
Manage saved passwords and autofill settings.|Gérer les mots de passe et la saisie automatique.|Administrar contraseñas y autocompletado.|Passwörter und automatisches Ausfüllen verwalten.|保存したパスワードと自動入力の設定。|Gerir palavras-passe e preenchimento automático.
Make Nova Browser easier to see and use.|Faciliter la lecture et l’utilisation de Nova.|Facilitar la visualización y el uso de Nova.|Nova leichter sehen und bedienen.|Novaを見やすく使いやすくする設定。|Tornar o Nova mais fácil de ver e utilizar.
Performance and reset options.|Options de performances et de réinitialisation.|Opciones de rendimiento y restablecimiento.|Leistung und Zurücksetzen.|パフォーマンスとリセットの設定。|Opções de desempenho e reposição.
Bring your bookmarks, history, and passwords from another browser.|Importer favoris, historique et mots de passe d’un autre navigateur.|Importar marcadores, historial y contraseñas de otro navegador.|Lesezeichen, Verlauf und Passwörter aus einem anderen Browser importieren.|他のブラウザーからブックマーク、履歴、パスワードを移行。|Importar favoritos, histórico e palavras-passe de outro navegador.
Dark|Sombre|Oscuro|Dunkel|ダーク|Escuro
Light|Clair|Claro|Hell|ライト|Claro
System|Système|Sistema|System|システム|Sistema
Horizontal|Horizontal|Horizontal|Horizontal|横型|Horizontal
Vertical|Vertical|Vertical|Vertikal|縦型|Vertical
Small|Petite|Pequeño|Klein|小|Pequeno
Medium|Moyenne|Mediano|Mittel|中|Médio
Large|Grande|Grande|Groß|大|Grande
Open New Tab|Ouvrir un nouvel onglet|Abrir nueva pestaña|Neuen Tab öffnen|新しいタブを開く|Abrir nova aba
Open Homepage|Ouvrir la page d’accueil|Abrir página de inicio|Startseite öffnen|ホームページを開く|Abrir página inicial
Continue where you left off|Reprendre la session précédente|Continuar donde lo dejaste|Letzte Sitzung fortsetzen|前回の続きから開始|Continuar de onde ficou
Find in Page|Rechercher dans la page|Buscar en la página|Auf Seite suchen|ページ内検索|Localizar na página
Privacy Dashboard|Tableau de confidentialité|Panel de privacidad|Datenschutzübersicht|プライバシーダッシュボード|Painel de privacidade
Collections|Collections|Colecciones|Sammlungen|コレクション|Coleções
Read Aloud|Lire à voix haute|Leer en voz alta|Vorlesen|読み上げ|Ler em voz alta
Reader Mode|Mode lecture|Modo lectura|Lesemodus|リーダーモード|Modo de leitura
Split Screen|Écran partagé|Pantalla dividida|Geteilter Bildschirm|画面分割|Ecrã dividido
Screenshot|Capture d’écran|Captura de pantalla|Bildschirmfoto|スクリーンショット|Captura de ecrã
Developer Tools|Outils de développement|Herramientas de desarrollo|Entwicklerwerkzeuge|開発者ツール|Ferramentas de desenvolvimento
Print|Imprimer|Imprimir|Drucken|印刷|Imprimir
Save Page As…|Enregistrer la page sous…|Guardar página como…|Seite speichern unter…|名前を付けてページを保存…|Guardar página como…
Send|Envoyer|Enviar|Senden|送信|Enviar
Ask anything… (Enter to send, Shift+Enter for newline)|Posez une question… (Entrée pour envoyer)|Pregunta algo… (Intro para enviar)|Frage stellen… (Enter zum Senden)|質問を入力…（Enterで送信）|Faça uma pergunta… (Enter para enviar)
Sign in to Puter|Se connecter à Puter|Iniciar sesión en Puter|Bei Puter anmelden|Puterにログイン|Iniciar sessão no Puter
Search with {engine} or enter URL…|Rechercher avec {engine} ou saisir une URL…|Buscar con {engine} o escribir URL…|Mit {engine} suchen oder URL eingeben…|{engine}で検索またはURLを入力…|Pesquisar com {engine} ou introduzir URL…
GENERAL|GÉNÉRAL|GENERAL|ALLGEMEIN|一般|GERAL
PRIVACY & SECURITY|CONFIDENTIALITÉ ET SÉCURITÉ|PRIVACIDAD Y SEGURIDAD|DATENSCHUTZ UND SICHERHEIT|プライバシーとセキュリティ|PRIVACIDADE E SEGURANÇA
FILES & TOOLS|FICHIERS ET OUTILS|ARCHIVOS Y HERRAMIENTAS|DATEIEN UND WERKZEUGE|ファイルとツール|FICHEIROS E FERRAMENTAS
ACCOUNT|COMPTE|CUENTA|KONTO|アカウント|CONTA
SYSTEM|SYSTÈME|SISTEMA|SYSTEM|システム|SISTEMA
On startup|Au démarrage|Al iniciar|Beim Start|起動時|Ao iniciar
ON STARTUP|AU DÉMARRAGE|AL INICIAR|BEIM START|起動時|AO INICIAR
BEHAVIOUR|COMPORTEMENT|COMPORTAMIENTO|VERHALTEN|動作|COMPORTAMENTO

Overall colour scheme|Palette générale|Esquema de colores|Allgemeines Farbschema|全体の配色|Esquema geral de cores
Highlights and active states|Éléments actifs et accentués|Elementos resaltados y activos|Hervorhebungen und aktive Zustände|強調表示とアクティブ状態|Destaques e estados ativos
How tabs are displayed|Affichage des onglets|Cómo se muestran las pestañas|Darstellung der Tabs|タブの表示方法|Como as abas são apresentadas
Base font size for browser UI|Taille de police de l’interface|Tamaño de letra de la interfaz|Grundschriftgröße der Oberfläche|ブラウザーの基本文字サイズ|Tamanho base da letra da interface
Show bookmarks bar below the toolbar|Afficher les favoris sous la barre d’outils|Mostrar marcadores bajo la barra de herramientas|Lesezeichen unter der Symbolleiste anzeigen|ツールバーの下にブックマークを表示|Mostrar favoritos por baixo da barra de ferramentas
Move the tab bar to the left side for easier navigation|Déplacer les onglets à gauche pour faciliter la navigation|Mover las pestañas a la izquierda para navegar mejor|Tableiste zur einfacheren Navigation nach links verschieben|タブを左側に配置して操作しやすくする|Mover as abas para a esquerda para facilitar a navegação
Inject custom styles into the browser UI|Appliquer des styles personnalisés à l’interface|Aplicar estilos personalizados a la interfaz|Eigene Stile auf die Oberfläche anwenden|ブラウザーの表示に独自のスタイルを適用|Aplicar estilos personalizados à interface
Roundness of UI elements|Arrondi des éléments de l’interface|Redondeo de los elementos de la interfaz|Rundung der Oberflächenelemente|画面上の要素の角の丸み|Arredondamento dos elementos da interface
Frosted glass on panels and menus|Verre dépoli sur les panneaux et menus|Cristal esmerilado en paneles y menús|Milchglaseffekt für Bereiche und Menüs|パネルやメニューのすりガラス効果|Efeito de vidro fosco em painéis e menus
Reduce padding and spacing throughout the UI|Réduire les marges et les espacements|Reducir márgenes y espacios de la interfaz|Abstände in der Oberfläche reduzieren|画面内の余白と間隔を減らす|Reduzir margens e espaçamento na interface
The NTP background preset|Arrière-plan des nouveaux onglets|Fondo de las nuevas pestañas|Hintergrund neuer Tabs|新しいタブの背景設定|Fundo das novas abas
Show the notes pad on new tab|Afficher les notes sur les nouveaux onglets|Mostrar notas en nuevas pestañas|Notizblock in neuen Tabs anzeigen|新しいタブにメモ帳を表示|Mostrar notas nas novas abas
Show weather and news on new tab|Afficher la météo et les actualités|Mostrar el tiempo y las noticias|Wetter und Nachrichten anzeigen|新しいタブに天気とニュースを表示|Mostrar meteorologia e notícias nas novas abas
Show top sites grid on new tab|Afficher les sites les plus consultés|Mostrar los sitios más visitados|Meistbesuchte Websites in neuen Tabs anzeigen|新しいタブによく使うサイトを表示|Mostrar sites mais visitados nas novas abas
Show category shortcuts row|Afficher les raccourcis par catégorie|Mostrar accesos directos por categoría|Kategorie-Schnellzugriffe anzeigen|カテゴリ別ショートカットを表示|Mostrar atalhos por categoria
Nova Shield blocks ads and trackers|Nova Shield bloque les publicités et les traqueurs|Nova Shield bloquea anuncios y rastreadores|Nova Shield blockiert Werbung und Tracker|Nova Shieldが広告とトラッカーをブロック|O Nova Shield bloqueia anúncios e rastreadores
Send DNT header with every request|Envoyer l’en-tête DNT à chaque requête|Enviar la cabecera DNT en cada solicitud|DNT-Header bei jeder Anfrage senden|すべてのリクエストでDNTヘッダーを送信|Enviar o cabeçalho DNT em cada pedido
Randomise browser fingerprint data|Randomiser l’empreinte du navigateur|Aleatorizar la huella del navegador|Browser-Fingerabdruck zufällig ändern|ブラウザーの識別情報をランダム化|Aleatorizar a impressão digital do navegador
How third-party cookies are handled|Traitement des cookies tiers|Cómo gestionar las cookies de terceros|Umgang mit Drittanbieter-Cookies|サードパーティCookieの取り扱い|Como tratar cookies de terceiros
Automatically upgrade HTTP sites to HTTPS|Passer automatiquement les sites HTTP en HTTPS|Actualizar automáticamente sitios HTTP a HTTPS|HTTP-Websites automatisch auf HTTPS umstellen|HTTPサイトを自動的にHTTPSへ切り替え|Atualizar automaticamente sites HTTP para HTTPS
Send Sec-GPC: 1 header to opt out of data sale|Envoyer Sec-GPC: 1 pour refuser la vente de données|Enviar Sec-GPC: 1 para rechazar la venta de datos|Mit Sec-GPC: 1 dem Datenverkauf widersprechen|Sec-GPC: 1でデータ販売の拒否を通知|Enviar Sec-GPC: 1 para recusar a venda de dados
Encrypt DNS queries to prevent snooping|Chiffrer les requêtes DNS contre l’espionnage|Cifrar consultas DNS para evitar espionaje|DNS-Anfragen zum Schutz vor Überwachung verschlüsseln|DNS問い合わせを暗号化して盗聴を防止|Cifrar consultas DNS para evitar vigilância
View and delete cookies for any site|Consulter et supprimer les cookies des sites|Ver y eliminar cookies de cualquier sitio|Cookies aller Websites anzeigen und löschen|各サイトのCookieを表示して削除|Ver e eliminar cookies de qualquer site
Manage camera, mic, location per site|Gérer caméra, micro et localisation par site|Gestionar cámara, micrófono y ubicación por sitio|Kamera, Mikrofon und Standort je Website verwalten|サイトごとのカメラ、マイク、位置情報の権限|Gerir câmara, microfone e localização por site
Delete history, cache, and cookies|Supprimer l’historique, le cache et les cookies|Eliminar historial, caché y cookies|Verlauf, Cache und Cookies löschen|履歴、キャッシュ、Cookieを削除|Eliminar histórico, cache e cookies
Used for address bar searches|Utilisé pour les recherches dans la barre d’adresse|Se usa en las búsquedas de la barra de direcciones|Für Suchen über die Adressleiste verwendet|アドレスバーからの検索に使用|Usado para pesquisas na barra de endereços
Display search suggestions as you type|Afficher les suggestions pendant la saisie|Mostrar sugerencias al escribir|Suchvorschläge während der Eingabe anzeigen|入力中に検索候補を表示|Mostrar sugestões de pesquisa enquanto escreve
Where files are saved by default|Dossier d’enregistrement par défaut|Dónde se guardan los archivos de forma predeterminada|Standard-Speicherort für Dateien|ファイルの既定の保存先|Onde os ficheiros são guardados por predefinição
Prompt for location before each download|Demander le dossier avant chaque téléchargement|Preguntar ubicación antes de cada descarga|Vor jedem Download nach dem Speicherort fragen|ダウンロードごとに保存先を確認|Perguntar a pasta antes de cada transferência
Developer options, DevTools layout, and debugging settings.|Options de développement, disposition et débogage.|Opciones de desarrollo, diseño y depuración.|Entwickleroptionen, Werkzeuglayout und Debug-Einstellungen.|開発者向けオプション、ツール配置、デバッグの設定。|Opções de desenvolvimento, disposição e depuração.
Automatically open developer tools for each new tab|Ouvrir les outils pour chaque nouvel onglet|Abrir herramientas en cada nueva pestaña|Entwicklerwerkzeuge für jeden neuen Tab öffnen|新しいタブごとに開発者ツールを開く|Abrir ferramentas em cada nova aba
Default docking position|Position d’ancrage par défaut|Posición de acoplamiento predeterminada|Standard-Andockposition|既定のドッキング位置|Posição de ancoragem predefinida
Simulate slow network connections for testing|Simuler un réseau lent pour les tests|Simular conexiones lentas para pruebas|Langsame Netzwerkverbindungen für Tests simulieren|テスト用に低速回線を再現|Simular ligações lentas para testes
Show element outlines and rendering info|Afficher les contours et les informations de rendu|Mostrar contornos e información de renderizado|Elementrahmen und Renderinformationen anzeigen|要素の枠線と描画情報を表示|Mostrar contornos e informações de apresentação
Open developer tools for the active tab|Ouvrir les outils pour l’onglet actif|Abrir herramientas de la pestaña activa|Entwicklerwerkzeuge für den aktiven Tab öffnen|現在のタブの開発者ツールを開く|Abrir ferramentas para a aba ativa
Use GPU for smoother rendering (restart required)|Utiliser le GPU pour un affichage fluide (redémarrage requis)|Usar GPU para mayor fluidez (requiere reinicio)|GPU für flüssigere Darstellung nutzen (Neustart erforderlich)|GPUを使って滑らかに描画（再起動が必要）|Usar GPU para maior fluidez (requer reinício)
Sleep inactive tabs after 30 min to free RAM|Mettre en veille les onglets inactifs après 30 min|Suspender pestañas inactivas tras 30 min para liberar RAM|Inaktive Tabs nach 30 Minuten in Ruhezustand versetzen|30分使われていないタブを休止してメモリを解放|Suspender abas inativas após 30 min para libertar RAM
Reduce background activity to extend battery life|Réduire l’activité en arrière-plan pour économiser la batterie|Reducir actividad en segundo plano para ahorrar batería|Hintergrundaktivität für längere Akkulaufzeit reduzieren|バックグラウンド動作を減らしてバッテリーを節約|Reduzir atividade em segundo plano para poupar bateria
Restore all settings to factory defaults|Restaurer les paramètres d’origine|Restaurar todos los ajustes de fábrica|Alle Einstellungen auf Werkseinstellungen zurücksetzen|すべての設定を初期状態に戻す|Restaurar todas as definições de fábrica
Configure Nova's built-in AI. Keys are stored locally on this device only — never sent anywhere except directly to the provider.|Configurer l’IA de Nova. Les clés sont stockées sur cet appareil et envoyées uniquement au fournisseur.|Configura la IA de Nova. Las claves se guardan en este dispositivo y solo se envían al proveedor.|Nova-KI konfigurieren. Schlüssel werden lokal gespeichert und nur an den Anbieter gesendet.|NovaのAIを設定。キーはこの端末に保存され、プロバイダーにのみ送信されます。|Configure a IA do Nova. As chaves ficam neste dispositivo e são enviadas apenas ao fornecedor.
Show "Ask Nova" button and sidebar AI panel|Afficher le bouton Ask Nova et le panneau IA|Mostrar el botón Ask Nova y el panel de IA|Ask-Nova-Schaltfläche und KI-Seitenbereich anzeigen|Ask NovaボタンとAIサイドパネルを表示|Mostrar o botão Ask Nova e o painel de IA
Which AI to use when you click "Ask Nova"|IA utilisée avec le bouton Ask Nova|IA que se usa al pulsar Ask Nova|KI für die Ask-Nova-Schaltfläche|Ask Novaで使用するAI|IA usada ao clicar em Ask Nova
Send page title and URL with every message|Envoyer le titre et l’URL avec chaque message|Enviar título y URL de la página con cada mensaje|Seitentitel und URL mit jeder Nachricht senden|メッセージごとにページのタイトルとURLを送信|Enviar título e URL da página com cada mensagem
200+ models — one key|Plus de 200 modèles avec une clé|Más de 200 modelos con una clave|Über 200 Modelle mit einem Schlüssel|1つのキーで200以上のモデル|Mais de 200 modelos com uma chave
API key and a model ID from your Together account are required|Clé API et identifiant de modèle Together requis|Se requieren clave API e ID de modelo de Together|API-Schlüssel und Modell-ID Ihres Together-Kontos erforderlich|TogetherのAPIキーとモデルIDが必要|São necessários chave API e ID do modelo da sua conta Together
A Groq API key is required to send messages|Une clé API Groq est nécessaire pour envoyer des messages|Se requiere una clave API de Groq para enviar mensajes|Zum Senden ist ein Groq-API-Schlüssel erforderlich|メッセージ送信にはGroq APIキーが必要|É necessária uma chave API Groq para enviar mensagens
Remove all stored API keys from this device|Supprimer toutes les clés API de cet appareil|Eliminar todas las claves API de este dispositivo|Alle gespeicherten API-Schlüssel von diesem Gerät entfernen|この端末の保存済みAPIキーをすべて削除|Remover todas as chaves API guardadas neste dispositivo
Nova will ask to save passwords when you sign in|Nova proposera d’enregistrer les mots de passe à la connexion|Nova ofrecerá guardar contraseñas al iniciar sesión|Nova bietet beim Anmelden das Speichern von Passwörtern an|ログイン時にパスワードの保存を確認|O Nova pergunta se pretende guardar palavras-passe ao iniciar sessão
Automatically sign in using saved credentials|Se connecter automatiquement avec les identifiants enregistrés|Iniciar sesión automáticamente con las credenciales guardadas|Mit gespeicherten Zugangsdaten automatisch anmelden|保存した認証情報で自動ログイン|Iniciar sessão automaticamente com credenciais guardadas
Alert you if saved passwords are found in data leaks|Alerter si des mots de passe apparaissent dans une fuite|Avisar si tus contraseñas aparecen en filtraciones|Bei Datenlecks mit gespeicherten Passwörtern warnen|保存したパスワードが漏えいした場合に通知|Alertar se as palavras-passe guardadas aparecerem em fugas de dados
Default zoom level for all pages|Zoom par défaut pour toutes les pages|Zoom predeterminado para todas las páginas|Standardzoom für alle Seiten|すべてのページの既定のズーム|Zoom predefinido para todas as páginas
Highlight focused elements with a visible ring|Entourer les éléments sélectionnés d’un anneau|Resaltar elementos enfocados con un anillo|Fokussierte Elemente mit einem Ring hervorheben|フォーカス中の要素を枠線で強調|Realçar elementos focados com um contorno
Minimize motion effects in the browser UI|Limiter les effets de mouvement de l’interface|Minimizar efectos de movimiento en la interfaz|Bewegungseffekte in der Oberfläche minimieren|ブラウザーの動きの効果を最小限にする|Minimizar efeitos de movimento na interface
Default speaking rate for Read Aloud|Vitesse de lecture vocale par défaut|Velocidad predeterminada de lectura en voz alta|Standardgeschwindigkeit beim Vorlesen|読み上げ機能の既定の速度|Velocidade predefinida de leitura em voz alta
Bookmarks, history, and passwords from Google Chrome|Favoris, historique et mots de passe de Google Chrome|Marcadores, historial y contraseñas de Google Chrome|Lesezeichen, Verlauf und Passwörter aus Google Chrome|Google Chromeのブックマーク、履歴、パスワード|Favoritos, histórico e palavras-passe do Google Chrome
Bookmarks, history, and passwords from Microsoft Edge|Favoris, historique et mots de passe de Microsoft Edge|Marcadores, historial y contraseñas de Microsoft Edge|Lesezeichen, Verlauf und Passwörter aus Microsoft Edge|Microsoft Edgeのブックマーク、履歴、パスワード|Favoritos, histórico e palavras-passe do Microsoft Edge
Import bookmarks from an exported HTML file|Importer les favoris depuis un fichier HTML|Importar marcadores desde un archivo HTML|Lesezeichen aus einer HTML-Datei importieren|書き出したHTMLファイルからブックマークをインポート|Importar favoritos de um ficheiro HTML exportado
Provider API keys — Puter uses account sign-in instead|Clés API des fournisseurs — Puter utilise la connexion au compte|Claves API de proveedores — Puter usa inicio de sesión|API-Schlüssel der Anbieter — Puter nutzt die Kontoanmeldung|プロバイダーのAPIキー — Puterはアカウントでログイン|Chaves API dos fornecedores — Puter usa início de sessão
`.trim().split('\n').map(row => row.split('|'));
  const catalog = new Map(rows.map(row => [row[0], row]));
  for (const [label, key] of [['Privacy','PRIVACY & SECURITY'],['Files & Tools','FILES & TOOLS'],['Account','ACCOUNT']]) {
    catalog.set(label, [label, ...catalog.get(key).slice(1)]);
  }
  const textBindings = new Map();
  const attributeBindings = [];
  let language = 'en';
  const excluded = 'script,style,textarea,input,pre,code,#ai-messages,#sp-browser-lang';
  function capture(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const original = node.nodeValue;
      if (catalog.has(original.trim()) && !node.parentElement?.closest(excluded) && !textBindings.has(node)) textBindings.set(node, original);
    }
  }
  capture(document.body);
  document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(element => {
    if (element.closest(excluded) && !element.matches('input,textarea')) return;
    for (const attribute of ['title', 'placeholder', 'aria-label']) {
      const original = element.getAttribute(attribute);
      if (catalog.has(original)) attributeBindings.push({element, attribute, original});
    }
  });
  function t(text, values = {}) {
    const row = catalog.get(text);
    const translated = row?.[languages.indexOf(language)] || text;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }
  function apply() {
    document.documentElement.lang = language;
    textBindings.forEach((original, node) => {
      if (!node.isConnected) { textBindings.delete(node); return; }
      node.nodeValue = original.replace(original.trim(), t(original.trim()));
    });
    attributeBindings.forEach(({element, attribute, original}) => element.setAttribute(attribute, t(original)));
    const select = document.getElementById('sp-browser-lang');
    if (select) select.value = language;
  }
  function setLanguage(value, persist = true) {
    const normalized = String(value).toLowerCase().split('-')[0];
    language = languages.includes(normalized) ? normalized : 'en';
    if (persist) localStorage.setItem('novaBrowserLang', language);
    apply();
    window.dispatchEvent(new CustomEvent('nova-language-change', {detail:{language}}));
  }
  window.novaI18n = {languages, t, apply, setLanguage, getLanguage:() => language};
  setLanguage(localStorage.getItem('novaBrowserLang') || 'en', false);
  // Translate labels created by settings renderers, without touching web pages or chat replies.
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.closest('#settings-page')) capture(node);
    }
    apply();
  }).observe(document.getElementById('settings-page'), {subtree:true, childList:true});
})();
