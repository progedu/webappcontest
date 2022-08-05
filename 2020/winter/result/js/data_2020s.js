const datas = [
  {
    "category": "N高等学校",
    "id": 1,
    "award": "最優秀賞",
    "name": "yahiro",
    "title": "mondai",
    "desc": "通話しながら遊べるような、ちょっとしたツールがほしかったので作りました。\nこのWebアプリを使うことによって、クイズを作って、コードを共有して、友達と一緒に遊ぶことができます。\n友達とのちょっとしたミニゲームにも使えますし、イベントでのちょっとしたアイスブレイクにも使えます。完全に非接触で楽しむことができるため、現在の世界情勢の中でも楽しく使えます。",
    "page": "https://mondai.page",
    "source": "https://github.com/Yahirrro/mondai"
  },
  {
    "category": "N高等学校",
    "id": 2,
    "award": "健闘賞",
    "name": "fiore",
    "title": "かな漢字タイピング",
    "desc": "動機：\nかな漢字変換無しのタイピング練習アプリは多いが、かな漢字変換込みのタイピング練習アプリは少なく、作って使いたいと思ったから。\n機能：\n- 日本国憲法前文を入力するタイムの計測・記録・ネットランキングへの登録\n- 自分の記録の閲覧\n- ネットランキングの閲覧\nPR：\n実際に何かを入力するときには、入力した文字列が正しいかどうかを注意して見なければならない。\nしかし、タイピングゲームでどの文字が誤っているのか知ることができないのは、大きなストレスになる。\n実践的なタイピング練習とゲーム性のバランスを取って、Enterキーを押したときのみ誤っている文字を表示するようにした。",
    "page": "https://kk-typing.herokuapp.com/",
    "source": "https://github.com/fiore57/kk-typing"
  },
  {
    "category": "N高等学校",
    "id": 3,
    "award": "健闘賞",
    "name": "もち",
    "title": "英単語暗記アプリ",
    "desc": "英単語を覚えるためのアプリをつかって作りました。ダークモードにも対応してます。",
    "page": "https://my-english-words-app-diysobu0z.vercel.app",
    "source": "https://github.com/mochi-sann/my-english-words-app/tree/dev-nyobi-contest"
  },
  {
    "category": "N高等学校",
    "id": 4,
    "award": "健闘賞",
    "name": "おゆ",
    "title": "チャット",
    "desc": "websocketを使ったチャットです。画像の投稿などもできます。",
    "page": "https://salty-basin-17162.herokuapp.com/",
    "source": "https://github.com/oyusoboro09/chat"
  },
  {
    "category": "N高等学校",
    "id": 5,
    "award": "優秀賞",
    "name": "コケッコー",
    "title": "web小説ランキング保管庫(仮)",
    "desc": "web小説の小説ランキングの推移を見たくて作ってみました。",
    "page": "https://epic-heisenberg-ad6c04.netlify.app/",
    "source": "https://github.com/shou-kato/webnobel"
  },
  {
    "category": "N高等学校",
    "id": 6,
    "award": "健闘賞",
    "name": "キタムラ又の名をへのへのん",
    "title": "エモいチャット。",
    "desc": "ありそうでない感じのチャットを作ろうと思って作りました。コメントの削除やステージの選択機能など一部完成させられませんでしたが、一番新しいコメントを表示する機能やエモート、リアクションなどのどうしてもやりたかった部分は実装できたと思います。",
    "page": "https://emoichat-300700.web.app",
    "source": "https://github.com/henohenon/feeling"
  },
  {
    "category": "N高等学校",
    "id": 7,
    "award": "健闘賞",
    "name": "ゆういちさん",
    "title": "動画目次アプリ",
    "desc": "■タイトル\n「動画目次アプリ」\nアプリ名は仮です。\n\n■どんなアプリ?\n動画の目次を入れるアプリです。\n動画のあるワンシーンを取っておきたいとき、または人に見せたい時に使いたいと考えました。一から見るより要点だけ見たい人、忙しい人、神回だけ見たい人のために向けたアプリにしました。\nニコニコ動画対応の理由は、時間指定を共有しやすくしたいと思ったからです。\n\n■頑張ったところ\n・bootstrapを初めて使用したこと\n今まではCSSで見た目を整えてましたが、結構便利でした。cssを変えてみるとどんな見た目が変わるのかと調べていくのが楽しかったです。\n\n・動画の投稿\nniconicoの動画IDを埋め込み用URLに入れ込むために取得しようと思いましたが、splitを多用していくうちに、なんとか動くことができました。今でもsplitを使う以外の方法はないかなと考えることもあります\n\n・動画ID(sm9とか)の桁数の取得\n初めは数字8桁だけの仕様にしましたが、どんな動画でも入れたいと思い桁数を全て取得できるようsplitメソッドでうまく分割できるようにしました。",
    "page": "https://arcane-depths-59921.herokuapp.com/posts",
    "source": "https://github.com/yuichisan171/douga-mokuji"
  },
  {
    "category": "N高等学校",
    "id": 8,
    "award": "健闘賞",
    "name": "take",
    "title": "Easy アンケート",
    "desc": "＜動機＞\n自分の知りたいことや皆の意見を聞きたい時などに気軽に質問できるアプリを作りたいと思って制作しました。\n\n＜機能>\nより多くの人にアプリを使ってもらうためにpassport-google-oauthを使ってGoogleアカウントでログインできるようにしました。\nアンケートをするといっても大まかに聞きたい場合や、皆の意見を詳しく聞きたい場合などあると思いまして、ユーザーが投票してそれがグラフとして表示される「選択式」とユーザーが文章で自由に答えられる「文章式」と２つのタイプを作りました。またアンケートの内容によっては公開しづらいものもあるかと思いましてアンケート結果を公開するかしないかをアンケート作成者が決められるようにしました。（OPEN式・CLOSE式）これらによってアンケート作成者がいろいろな形で声を聞けるようにすることを目指しました。\n回答者側もただ答えるだけでなく自分の意見を共有したり、他者の意見を聞いたりできるようにしたいと思い「チャットルーム」を作成しました。\n「選択式」のアンケートで表示されるグラフでは当初はおしゃれなグラフにしたいと思いCanvas.jsを使う予定でしたが、グラフをすぐにダウンロードできるなど機能が豊富なplotly.jsを使うようにしました。\n危険な投稿などをすぐに削除できるように管理人機能も作りました。\n\n＜頑張ったところ＞\nアプリの性質上データベースにデータを保存する機会が多かったのですが、数値を更新する時などにとてもたくさんのバグが生まれてしまい、デバッグにかなりの時間を要して頑張りました。結果、バグはほとんど直すことができたのですが、時間がかかってしまったのでテストはほとんど作ることができませんでした。",
    "page": "https://ancient-reaches-07414.herokuapp.com/",
    "source": "https://github.com/Takeharu7-51/Easy-Questionnaire"
  },
  {
    "category": "N高等学校",
    "id": 9,
    "award": "健闘賞",
    "name": "suis",
    "title": "えくすたーなるとぅいったー",
    "desc": "（最初に。\n審査期間中に仮にAPIキーが切れてログインや検索が上手くいかなくなったときは連絡もらえると嬉しいです。キーを発行し直します。）\n\nGitHubのREADMEにも詳しく書いてあるのでここでは簡単に。\nツイッターの場合画像は押さなとすべて見れないことが場合があり、文章と同時に見れない。\n再度みたいツイートがある場合はもう一回検索するか、自分のいいね欄から遡る必要がある。\n誤爆でいいねやフォローを押してしまって後々フォローしなくていい人からフォローバックされて「よくわからいけどFFになってしまった」というのが嫌だった。\nあとこんなこと思うのは自分だけだろうと思っていたので個人用みたいなところがあるかもしれません。\nこれらがツイッターを使う上で面倒だと思っていたので今回このアプリケーションを作成しました。\n\n最低限のレスポンシブしか対応していないのですが、ツイッターの機能を使用しているため見やすさを重視しました（特にパソコン）。\n提供されているAPIを使って作成したためプログラムのコード自体は皆さんよりは少なくなってしまっていると思います。表示を重視したためpugは自分なりに書いたつもりではあります笑\nいいねへの保存の時にはスムーズにいくようにAJAX？（目に見える動作はありませんが）を使っていて、入門コース四章とは逆で、作成していて面白かったです。削除時は同じ普通の削除APIを作成しました。\n終盤の方にCSRF対策を実装したのですが、ただ教材をまねただけではうまくいかず。検索フォームは全ページ共通でlauout.pugで実装しているので最初に呼び出されるindex.jsでCSRF対策を実装しなければなりませんでした。今回は機能の都合上すべてのres.renderでCSRFプロパティを実装していますが、やみくもにすべてに実装したのではなく自分で考えて実装できたので、ここはとても嬉しいポイントでした。\n本当に簡単ではありますがデザイン面ではbootstrapの色、cssの色の統一が個人的に好きなポイントです。何気に最後に実装したトップに戻る矢印がお気に入りです笑\n\n個人用に作っていたので終盤に気付いたのですが、複数のアカウントで同じツイートをお気に入り保存しようとしたら最初に保存できたアカウント以外弾かれるような、webサービスでは欠陥なことが起きてしまっていました笑 アラートは本来同じアカウント内で出すものだったのですが笑\nデータベースまわりが上手くできていないと思うのですが、できればそこのフィードバックももらえたらなと思います。",
    "page": "https://morning-reaches-66777.herokuapp.com/",
    "source": "https://github.com/suissan/proCon2020-winter"
  },
  {
    "category": "N高等学校",
    "id": 10,
    "award": "健闘賞",
    "name": "dorian",
    "title": "Auxilium",
    "desc": "学習していくときに、記録を付けるだけじゃなくて学習の予定や、学習した記録を色々なグラフで見られたらいいなと思い、制作に至りました。\nしかし、DB操作やチャート操作のライブラリを扱いこなすには時間が足りませんでした。\n機能は、記録・教材・科目・目標を投稿・編集・削除・閲覧できます。\nなるたけきれいなデザインになるよう頑張りました。",
    "page": "https://morning-journey-74974.herokuapp.com/",
    "source": "https://github.com/adominee/auxilium"
  },
  {
    "category": "N高等学校",
    "id": 11,
    "award": "健闘賞",
    "name": "urn2021",
    "title": "秘密の匿名掲示板",
    "desc": "N予備校プログラミング入門コースを途中までやった際の成果です。\nゲストユーザー　ログイン情報\nユーザー名：guest1\nパスワード：1234",
    "page": "http://207.148.90.21:8000/posts",
    "source": "https://github.com/urn2021/webapp"
  },
  {
    "category": "N中等部",
    "id": 12,
    "award": "最優秀賞",
    "name": "Yuba",
    "title": "ぴくせるや",
    "desc": "PHPを初めて7日で仕上げました。いらすとやさんを参考にし、ドット絵を紹介できる場所として開発しました。経験が浅く 実装できなかったものもあり、少し悔しいですが、来年リベンジしようと思っています。\n 2/3が終わるまであと10分ぐらいのところで スタイルシートがおかしくなってしまいましたが、一応応募しました。",
    "page": "https://lit-fortress-24137.herokuapp.com/",
    "source": "https://github.com/Tuva1991/pixelya"
  },
  {
    "category": "N予備校",
    "id": 13,
    "award": "健闘賞",
    "name": "shilatty（しらってぃー）",
    "title": "パワースポット掲示板",
    "desc": "投稿者のハンドルネームから、パワースポットを診断し自動で投稿する掲示板です。\n夏のコンテストの作品のパワースポット診断の結果を掲示板に投稿するようにしました。",
    "page": "https://radiant-caverns-32702.herokuapp.com/posts",
    "source": "https://github.com/shilatty/webappcontest2020w"
  },
  {
    "category": "N予備校",
    "id": 14,
    "award": "健闘賞",
    "name": "ポッポ",
    "title": "イベント管理くん",
    "desc": "イベントの作成・申し込みができるサービスです\n\n4章の予定調整くんを改造して作りました。データモデルも含め、色々な部分を変えたので、結構大変でした。",
    "page": "https://desolate-eyrie-12870.herokuapp.com/",
    "source": "https://github.com/akapochi/event-management-new"
  },
  {
    "category": "N予備校",
    "id": 15,
    "award": "健闘賞",
    "name": "sabasaikyouno",
    "title": "給料計算",
    "desc": "給料計算アプリです。\n(設定)\n名前: ピカルス\n年齢: 19歳\n時給: 850円(日祝、残業代...時給1.25倍!!!)",
    "page": "https://fierce-tundra-76379.herokuapp.com/salaryLists",
    "source": "https://github.com/sabasaikyouno/SalaryCalc"
  },
  {
    "category": "N予備校",
    "id": 16,
    "award": "健闘賞",
    "name": "hamuyashiki",
    "title": "家族の連絡板",
    "desc": "夏のコンテストに提出した「献立調整アプリ」をクライアントサーバーシステムにしました。献立アンケートに答えると集計結果が連絡板に自動投稿されます。自動投稿には、通常の投稿と区別するためのイラストが付与されます。また、連絡板の通常の投稿は、宛先として指定されたユーザーだけが閲覧できるようにしました。",
    "page": "https://evening-citadel-86277.herokuapp.com/top",
    "source": "https://github.com/hamuyashiki/family-comms-board"
  },
  {
    "category": "N予備校",
    "id": 17,
    "award": "健闘賞",
    "name": "HappyK",
    "title": "なんでも伝言板",
    "desc": "昔はどの駅にもあった、素朴な「伝言板」の黒板をイメージしたものです。\n第3章を振り返りながらの作成で、コードの内容は「秘密の匿名掲示板」そのものです(改行の機能はありません)。\n\n・自作のfaviconも付けてみたのですが、GitHubに載せてから、いろいろな動きに支障が出て、faviconは取りやめました。\n・今回、cssは別ファイルにしてみましたが、読み込んでもらえず、\n結局pugにcssもJavaScriptもずらずらっと入れてしまいました。",
    "page": "https://lit-earth-58334.herokuapp.com/posts",
    "source": "https://github.com/HappyKumamoto/DenGonBan"
  },
  {
    "category": "N予備校",
    "id": 18,
    "award": "技能特別賞",
    "name": "t-noko",
    "title": "パート決めヘルパー",
    "desc": "「パート決めヘルパー」は、管楽器アンサンブルや合奏で複数の曲を演奏する際の、パート決めを手助けするアプリです。\nメンバー、曲、曲のパート構成を入力すると、ランダムにパート決めをします。\nメンバーよりもパート数が少ない曲でも、降り番(そのメンバーが演奏しない曲)が平等になるよう割り振ります。\n\n＜こんな時に便利＞\n※パート内アンサンブルで、複数の曲を色々なパート割で演奏したい\n※パート構成が異なる複数の曲を演奏するので、降り番も含めてパートを決めたい",
    "page": "https://protected-brushlands-21043.herokuapp.com/",
    "source": "https://github.com/t-noko-SA/assign-your-part"
  },
  {
    "category": "N予備校",
    "id": 19,
    "award": "デザイン特別賞",
    "name": "Jona",
    "title": "Chill Box",
    "desc": "自分の好きな音楽を記録しておくウェブサイトです。\n主な特色は、曲にcomfortableとdarkの2つ(だけ！)の属性をつけられることと、レコメンデーション機能を実装したところです。",
    "page": "https://polar-hollows-50850.herokuapp.com/",
    "source": "https://github.com/jonathanjoster/ChillBox"
  },
  {
    "category": "N予備校",
    "id": 20,
    "award": "最優秀賞",
    "name": "Manten",
    "title": "強制!!１分間エクササイズ",
    "desc": "Chrome拡張機能と連携し毎時0分に自動でサイトを開き運動を促すことで、長時間デスクに座りっぱなしでいることを防ぐ。1分間の運動を終えたあとは約20秒間ほかの参加者とライン風のリアルタイムコミュニケーションができる。過疎時に寂しくないようNPCも実装した。",
    "page": "https://rocky-basin-37839.herokuapp.com",
    "source": "https://github.com/manten120/one-minute-exercise"
  },
  {
    "category": "N予備校",
    "id": 21,
    "award": "健闘賞",
    "name": "sumup",
    "title": "おすすめ映画アプリ",
    "desc": "映画の感想を共有できるアプリです。\nネタバレありとネタバレなしの感想を投稿でき\n視聴済みの人だけがネタバレあり感想を読めます。",
    "page": "https://vast-ridge-19286.herokuapp.com/",
    "source": "https://github.com/sumup7/recommend-movie"
  },
  {
    "category": "N予備校",
    "id": 22,
    "award": "健闘賞",
    "name": "duna0323",
    "title": "予定調整くん（習作）",
    "desc": "冬の過去作品を見て、私もオリジナルの作品を生み出したかったのですが、実力が伴わず、習った作品のまま提出します。私にとっては、herokuで動くところで感激でした。",
    "page": "https://obscure-plains-02777.herokuapp.com/",
    "source": "https://github.com/duna0323/schedule-arranger"
  },
  {
    "category": "N予備校",
    "id": 23,
    "award": "健闘賞",
    "name": "夏梅",
    "title": "お買いものリスト",
    "desc": "手打ちで教科書通りやったところ完璧に詰まってしまい全く改変できていないのですが、とりあえず応募フォームが壊れているってお話があったので、出すだけ出してみようと思い試しに投稿してみます。\n（今更遅いですが、必死に改変します…。）\n\nまた、何故このお買い物リストを作ろうと思ったのかですが、いつも買い物をするときにだいたい雰囲気でお買い物をして買い忘れをしてしまうのです。\nまた、家族と同じもの買ってしまうこともよくあるのでコロナ禍で効率的に漏れなくお買い物をしたいので作ってみました。\n\nなお、壊れているところなのですが\n・〇✕ボタン（出欠ボタンの改変）が押せない\n・ログインして「リスト作成」を押すと404になる（予定作成）のところになります。\n後日改変出来たところはREAD MEを作成し書き込もうと思っています。",
    "page": "https://ancient-falls-60994.herokuapp.com/",
    "source": "https://github.com/natuume/shopping_list"
  },
  {
    "category": "N予備校",
    "id": 24,
    "award": "健闘賞",
    "name": "Hanabi",
    "title": "LUCKY ANIMAL",
    "desc": "ボタンをクリックすると、今日のラッキーアニマルがランダムで表示されます。",
    "page": "https://sheltered-lowlands-58180.herokuapp.com/",
    "source": "https://github.com/hanabi7654321/animalApp"
  },
  {
    "category": "N予備校",
    "id": 25,
    "award": "健闘賞",
    "name": "しーた",
    "title": "展示写（舎）",
    "desc": "好きな画像を投稿して、閲覧できるサービスです。\n画像を閲覧するページで、大きく画像が見れるようにしました。\nGitHubアカウントでログインして、投稿や閲覧ができます。\n対応ファイル形式はJPEG形式です。",
    "page": "https://polar-earth-39625.herokuapp.com/",
    "source": "https://github.com/theata-prog/ewindow/tree/master"
  },
  {
    "category": "N予備校",
    "id": 26,
    "award": "健闘賞",
    "name": "りりーらいぶ",
    "title": "コラムくん",
    "desc": "twitterでログインできるコラムなどの文章の掲示板です。\n管理人がコンテンツの承認、非承認を選択でき\n(承認ページへのリンクがTOPページに表示されます。)\n承認された記事は公開される仕様で考えています。\n記事は投稿後も変更できる想定です。\n第三章、四章で学んだ機能をベースに作成してみました。\n今後もこの機能をベースに追加機能を加えて行きたいと思います。",
    "page": "https://peaceful-reef-52964.herokuapp.com/",
    "source": "https://github.com/lilylive/column_database"
  }
]