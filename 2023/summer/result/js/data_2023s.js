const datas = [
  {
    "category": "N予備校部門",
    "id": 1,
    "award": "技術特別賞",
    "name": "アカネ",
    "title": "ランダムテキストジェネレーター",
    "desc": "半角文字 (数字、英字、記号) と 漢字 からランダムに文字列を生成して表示します",
    "page": "https://akanekwon172.github.io/random-text-gen/",
    "source": "https://github.com/akanekwon172/random-text-gen"
  },
  {
    "category": "N予備校部門",
    "id": 2,
    "award": "最優秀賞",
    "name": "あきこ",
    "title": "ショートカットクイズ",
    "desc": "windowsのショートカットを選択するクイズです。\n５問中何問正解するか表示します",
    "page": "https://saysaito.github.io/quiz/quiz.html",
    "source": "https://github.com/saysaito/quiz"
  },
  {
    "category": "N予備校部門",
    "id": 3,
    "award": "健闘賞",
    "name": "susuko1117",
    "title": "税込価格計算",
    "desc": "コードは良いところ診断を改良したものになりますので0から作成したものではありません。",
    "page": "https://susumu-1117.github.io/taxcount/tax.html",
    "source": "https://github.com/susumu-1117/taxcount"
  },
  {
    "category": "N/S高等学校部門",
    "id": 4,
    "award": "健闘賞",
    "name": "WTNB",
    "title": "日本語 英語タイピング練習",
    "desc": "制作の動機:タイピング練習をしていて複数のサイトを使用していたが、自分で文章を決められるようにしたいと思い制作した。\n機能:タイピングを正解すると正解した文字に色がつき、音が鳴るようにした。制限時間を自分で設定して遊べるようにした。日本語、英語のどちらも練習することができる。\nPR:一つのサイトで日本語と英語の両方を練習できるサイトです。\n頑張ったところ: 文字に色をつけるために一文字づつspanタグに入れるところ。結果を表示する時もonkeydownイベントが反応してしまい、ゲームが終わってもキー入力を受け付けてしまっているので、ページ遷移を利用した。ページ遷移した後に、ページ遷移する前で得た値を引き続き利用したかったのでWebStorageを使って値を利用できるようにした。",
    "page": "https://wtnb1225.github.io/typegame/",
    "source": "https://github.com/WTNB1225/typegame"
  },
  {
    "category": "N/S高等学校部門",
    "id": 5,
    "award": "アイデア特別賞",
    "name": "ある",
    "title": "百ます計算練習",
    "desc": "百ます計算の練習ができるアプリです。問題のテーブルの生成を頑張りました。",
    "page": "https://tsu3n.github.io/hyakumasu/",
    "source": "https://github.com/tsu3n/hyakumasu"
  },
  {
    "category": "N/S高等学校部門",
    "id": 6,
    "award": "健闘賞",
    "name": "TKG",
    "title": "シンプル電卓",
    "desc": "チェスを作ろうとしていたら時間も力も足りないことに気付きました\nその後夏休みに何を作るか考えていたら「そうだ、電卓を作ろう」\nと思ってとてもシンプルなものを作りました。\n機能についてですが、参考にした電卓には「(」「)」が無かったのでそれを追加することで計算の幅が広がったと思います。\n他にも実装したい機能などもありましたが時間が思ったよりも足りなく、出来ませんでした\nですが、アニメーションに関しては納得の行く出来まで試してみたので自信があり、頑張ったところでもあります。",
    "page": "https://tamago220.github.io/SimpleCalculator/",
    "source": "https://github.com/tamago220/SimpleCalculator"
  },
  {
    "category": "N/S高等学校部門",
    "id": 7,
    "award": "デザイン特別賞",
    "name": "さい",
    "title": "海に潜ろう",
    "desc": "深度別に魚を見られるWebページです。スクロールするだけで仕掛けが起こるものを作りたいと思い、制作しました。\n主な仕掛けに、陸から海へ入るような演出のパララックス効果や、画面の明るさが変化する機能、そしてカーソルとライトが同期する機能があります。これらを使って、海に潜った気持ちになれるように工夫しました。色んな所を照らして海の動物を観察してみてください。",
    "page": "https://saihuji.github.io/sea/sea.html",
    "source": "https://github.com/SaiHuji/sea"
  },
  {
    "category": "N/S高等学校部門",
    "id": 8,
    "award": "健闘賞",
    "name": "のりもち",
    "title": "PinP CPS Checker",
    "desc": "Picture-in-Pictureでゲーム中でも使えるCPS測定器(クリック速度計測器)です。\nDocument Picture-in-Picture APIという比較的新しいものを利用したアプリなので、chrome以外まともに動かなかったです！w（ﾁｸｾｳ）（Edgeは動きました！）",
    "page": "https://norimotti.github.io/cps-PinP-checker/",
    "source": "https://github.com/norimotti/cps-PinP-checker"
  },
  {
    "category": "N/S高等学校部門",
    "id": 9,
    "award": "健闘賞",
    "name": "にゅ",
    "title": "抽出くん",
    "desc": "【機能の説明】\n文字列中からひらがなのみ、カタカナのみ、漢字のみを抽出できるツールです。\n【制作の動機】\n出席簿からフリガナを手作業で抽出した経験があるのですが、かなりの量があり、しんどい思いをしました。もう二度とこんな作業をしたくない！という思いが、本ツールを作成する動機となりました。",
    "page": "https://newnsja.github.io/change/change.html",
    "source": "https://github.com/newNSja/change"
  },
  {
    "category": "N/S高等学校部門",
    "id": 10,
    "award": "優秀賞",
    "name": "X",
    "title": "支払いゲーム",
    "desc": "以前、スマートフォンで「脳力＋ 支払い技術検定」というゲームをプレイしていて、このようなゲームをWebアプリケーションとして実装したいと考え、今回の作品を作成しました。この支払いゲームは、ランダムに生成された小計に対して、プレイヤーが手持ちのお金を支払い、支払額と小計の差がお釣りとしてプレイヤーに支払われるものです。制限時間や最終的なスコアは、プレイヤーの支払い能力に左右されます。スコアの決定方法について、複数のパラメータを用意し、スコアを決定できるようにしました。また、レイアウトやデザインにも工夫を凝らし、プレイヤーが直感的にゲームの内容を理解できるようにしました。さらに、レスポンシブデザインも考慮しました。画面のクリックだけではなく、キーボードからの入力にも対応しており、Enterキーは支払いボタンのクリック、Spaceキーはゲームのスタートとストップ、バックスペースキーはモーダルウィンドウを閉じるときに対応させました。コードにコメントをつけたり、関数をできるだけ簡潔に書いたりするなど、読み手にわかりやすく伝わるように工夫しました。",
    "page": "https://nikolausbixler.github.io/payment_game/index.html",
    "source": "https://github.com/NikolausBixler/payment_game"
  },
  {
    "category": "N/S高等学校部門",
    "id": 11,
    "award": "最優秀賞",
    "name": "うどん",
    "title": "クイズビルダー",
    "desc": "インターネット上に公開されている、人気のクイズアプリ(Webアプリ)を使ってみて、自分で作ってみたいなと思い、制作を始めました。\n\n「クイズビルダー」には、その名前の通り、クイズを作成する機能と、クイズで遊ぶ機能が備わっています。\nまず、クイズ作成機能では、少しでも制作する人の負担を軽減するために、マルバツ(または2択)クイズであれば、一度選択肢を設定すれば、あとは問題文と正解を設定するだけで作成できるようにしました。また、一度作成したクイズを編集する機能と、続きからクイズ作成を開始できる下書き機能も実装しました。そして、自分で作成したクイズを、ほかの人が遊べるように、JSON形式でクイズを共有・読み込みができる機能も付けました。\n次に、クイズで遊ぶ機能では、正答率に合わせてメッセージと円グラフを変えて、全問正解の場合は紙吹雪を降らせるようにしました。また、クイズ中楽しめるように、カウントダウン矢タイマーの音、正解不正解の音などをつけたりしました。\n\nまた、全体的に、スマートフォンなどのモバイル端末でも、なるべく使いやすいアプリになるように製作しました。",
    "page": "https://udon-japanese.github.io/quiz-builder/",
    "source": "https://github.com/Udon-japanese/quiz-builder"
  },
  {
    "category": "N/S高等学校部門",
    "id": 12,
    "award": "健闘賞",
    "name": "Level222",
    "title": "Ice Tetris",
    "desc": "夏は暑いです。冷たいものががほしいです。そこで氷のテトリスを作りました。※ただし氷なので溶けます。\nJS以外使えないとのことで、型定義にJSDocを導入しましたが、コンパイルいらずでなかなか良かったです。\nアイデアを締め切り5日前くらいに思いついたため、エナドリ飲んで徹夜で作ったのが大変でした。",
    "page": "https://level222.github.io/ice-tetris/index.html",
    "source": "https://github.com/Level222/ice-tetris"
  },
  {
    "category": "N中等部部門",
    "id": 13,
    "award": "優秀賞",
    "name": "Tokuzoku",
    "title": "おしゃべりAIキャラクターメーカー",
    "desc": "AIで独自のキャラクターを作り、それらとの会話を楽しむことが可能です。これらのキャラクターは複数作成することができ、会話の履歴やキャラクターに関する情報はIndexedDBで継続的に保存されます。キャラクターの切り替えは非同期で、ページ内でスムーズに行われます。また、ユーザーインターフェースはスマートフォンにも最適化されるように頑張りました",
    "page": "https://tokuzou0829.github.io/character-maker/",
    "source": "https://github.com/tokuzou0829/character-maker"
  },
  {
    "category": "N中等部部門",
    "id": 14,
    "award": "健闘賞",
    "name": "marukun_",
    "title": "アニメ情報チェッカー",
    "desc": "ShangriLa Anime APIで取得した2014年からのアニメ情報をクールごとに確認できるwebアプリです。お気に入り登録、タイトルからアニメを検索などの機能もあります。\n\n過去に放送されたアニメ情報をクールごとにまとめて確認したい、ついでにお気に入りのアニメ情報もまとめて確認したい、と思い作成しました。\n\n工夫した点は、カード作成やクール番号の取得など頻出する処理を共通化して、メンテナンスしやすくした点です。\n\n著作権の問題があるため、アニメのキービジュアル等は仮の画像に置き換えています。",
    "page": "https://marukun712.github.io/anime-checker/index.html",
    "source": "https://github.com/marukun712/anime-checker/tree/master"
  },
  {
    "category": "N中等部部門",
    "id": 15,
    "award": "健闘賞",
    "name": "Nomi",
    "title": "NWeather",
    "desc": "制作の動機：友達へのプレゼントとして作りました | 機能：天気アプリ | 頑張ったところ: UIデザイン・APIの実装",
    "page": "https://rococo-frangipane-7bccfd.netlify.app/",
    "source": "https://github.com/naii377/nweather"
  },
  {
    "category": "N中等部部門",
    "id": 16,
    "award": "最優秀賞",
    "name": "さしみ",
    "title": "HIITtimer",
    "desc": "最近運動不足だなと思ったので、家に出なくても運動ができるアプリを作りました。基本的な機能はインターバルタイマーと同じですが、より運動の進捗をわかりやすくするために運動の残りの回数を表示したり、ピクトグラムを動かしたりして、視覚的にわかりやすく作りました。また、途中で別の運動をしたい時などのために細かく設定を変えられます。jsは頑張って書いたので見てほしいです。",
    "page": "https://sasimitetris.github.io/HIITtimer/index.html",
    "source": "https://github.com/sasimiTetris/HIITtimer"
  },
  {
    "category": "N中等部部門",
    "id": 17,
    "award": "健闘賞",
    "name": "こた",
    "title": "回るテトリス",
    "desc": "TETRISという文字の色を虹色にし、回転するところやテトリミノの制作操作方法の画像制作などを頑張りました制作の動機は、昔からあるゲームにしようということでテトリスを選びました。",
    "page": "https://kota022020.github.io/tetris2023/",
    "source": "https://github.com/kota022020/tetris2023"
  }
]