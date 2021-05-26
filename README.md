# Task_Quest（タスククエスト）

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/namikawa07/Study_quest)](https://github.com/namikawa07/Study_quest/releases)
[![Rails](https://img.shields.io/badge/Rails-v5.2.4.5-%23a72332)](https://rubygems.org/gems/rails/versions/5.2.4.5)
[![CircleCI](https://circleci.com/gh/namikawa07/Study_quest.svg?style=shield)](https://circleci.com/gh/namikawa07/Study_quest)


### **https://www.taskquest-app.com**

## サービス概要

**タスククエストで日々のタスクを楽しく管理しよう！**

タスク管理ができない人や
日々のタスクに追われている人が
まるでゲームをプレイするように楽しくタスク管理ができるサービスです。

[プロダクトについて](/README_product.md)

### サービスを作った思い
日々プログラミングの勉強をしている際に今日小野なうタスク管理を行っていたが、マンネリ化したりめんどくさくなりタスクがこなせない日が続いた。そんな中毎日行う単純なタスクにマンネリ化している人は多いのではないかと思い、単調化しているタスク管理の中にゲームの要素を織り込み視覚的楽しさを追加すればタスク管理自体が楽しくなり、タスクもまたこなせるようになるのではないかと思い作成しました。またサービスとしてもしっかりと昨日するように管理しやすいタスク画面、ジャンルによってタスクを分けることができるミッション機能、各タスクにノート機能を搭載しタスク画面からすぐ見れるようにするなど視覚だけでなくサービスとしてもしっかりと成り立つような配慮をしました。

## 使用画面と機能紹介


| トップページ                                                         | Guide画面                                                                                              |
| :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/31cabb83418864d33e3d64445aea0d75.jpg"> | <img src="https://i.gyazo.com/320d1372cea445882339f9cc589c4821.png">                                   |
| トップ画面です。<br>タイトル下のLoginかSignupでサービスの新規登録またはログインを行います。              | このサービスの主な使い方を説明しています。 |

<br>

| Help画面                                                                                                                 | 新規登録ページ                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/c883e0fee903081f0e7a1c17ca5c6fe3.png">                                                | <img src="https://i.gyazo.com/96c3a346007c46a0a1b14caef06f6cb8.png">                                                        |
| お問い合わせフォームです。<br>送信すると管理者に直接届くようになっています。　 | 新規登録画面です。<br>ユーザー名・メールアドレス・パスワード・確認用パスワードを入力しログインします。|

<br>

| ログインページ                                                                | パスワードリセット機能（ログインページ）                                    |
| :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/2220ec46b9acf764997249cfc062e75a.png">                             | <img src="https://i.gyazo.com/ee8d9b1e316c6d2979af2bec1f62acd6.png">    |
| ログインページです。メールアドレスとパスワードを入力しサービスを開始してください。<br>またTwitterログイン機能も実装されています。 | パスワードを忘れてしまった場合はパスワードリセット機能でパスワードをリセットしてください。メールアドレスを記入するとパスワードリセットのメールが送られます |

<br>

| ユーザーページ（MyPage）                                                                                                 | プロフィール編集                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/98d34270a5c3545f192a227e7656f09e.png">                                                                    | <img src="https://i.gyazo.com/f0abfaec0d9ac1df37129cb2cd8fb5ca.png"> |
| アカウント情報が記載されています。名前・メールアドレス・アイコンが表示されています。 | プロフィール編集画面です。名前・メールアドレス・アイコンを編集できます。     |

<br>

| ユーザーページ2（Missions）                                                                                                 | Mission編集                                                |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/4740202f2feca1dc3fc6d69dcff1fc96.png">                                                                    | <img src="https://i.gyazo.com/2961c08ff011570a18ca0a38a011a227.png"> |
| ミッションの一覧が表示されています。ミッション名をクリックするとタスク画面に移動します   | ミッションの編集画面です。ミッション名・開始日・終了日・メモを編集できます。     |

<br>

| Mission作成ページ                                                          | タスク実行画面                                                           |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/12fc8ac9d5cc671c8d38a3acdc877d29.png">       | <img src="https://i.gyazo.com/42dd6739468e31354fb2d92ad7a23585.png"> |
| ミッションを作成できます。<br>開始日と終了日の期間だけタスクが作成できるようになります。<br>またミッションは下書きの状態か実行中の状態かを洗濯することができます。下書きの場合はタスク管理はできません | タスクの管理ができます。|

<br>

| タスク実行画面（タスク作成時）                                                   | 今日のタスク画面                                                          |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/2712cfb8bde92954f323267f73f12ec5.png">       | <img src="https://i.gyazo.com/49baef57a1302281ecdaea59878a6df0.png"> |
|「 タスク作成」からタスクを作成します。作成したタスクが今日行うタスクの場合的キャラクターが出現します。 | 今日の達成するべきタスクが表示されます                       |

<br>

| スケジュール画面                                                           | スケジュール画面（ノート公開時）                                                       |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/df42e816245988f597b9400beba0f2c8.png">       | <img src="https://i.gyazo.com/683aa117819cb686d80bab9a18b896dd.png"> |
| いつタスクを実行するかがわかるようになっています。 | Notesを押すことでそのタスクで作成したノートが表示されます。                       |

<br>

| タスク編集                                                            | インフォメーション画面                                                    |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/aadc8d389fb868cc4c013aae15486c72.png">       | <img src="https://i.gyazo.com/3b5ba1d0f87f06e75fcf40b4cb40bbc4.png"> |
| タスクの編集ができます。 |  ミッション終了日までどのくらいの割合日数が進んだかや達成したタスク・未達成のタスクなどの割合が表示されます。                    |

<br>

| ノート機能                                                              | ノート編集                                                           |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| <img src="https://i.gyazo.com/a8b1f4309bc9872ad5265b809824c9f3.png">       | <img src="https://i.gyazo.com/b603737864814898adc029f2e0b7a2ef.png"> |
| 各タスクに紐づいたノートを作成することができます。 | ノートを編集することができます。                     |

<br>



## 使用技術

### バックエンド

- Ruby 2.6.4
- Rails 5.2.4.5
- Rspec 4.0.1
- Twitter API（外部API）

#### 機能における主要なGem

- Sorcery（ログイン)
- Twitter（TwitterAPI OAuth）
- kaminari（ページネーション）
- gretel（パンくずリスト）
- ransack（検索）
- Active Storage（画像アップロード）
- Action Mailer（メール送受信）

#### ER図
スクショは後で挿入
https://drive.google.com/file/d/1cBd3F05dgtk3CXOrZmcywasDac0TIn5c/view?usp=sharing

### フロントエンド

- javascript
- sass 3.7.4
- jQuery Validation Plugin
- Ajax

### インフラストラクチャー

- Docker
- CircleCI
- Nginx
- Unicorn
- AWS
  - VPC
  - EC2
    - Amazon Linux 2
  - S3
  - ALB
  - Route53
  - ACM
  
#### インフラ構成図

## 環境構築手順

```
$ git clone git@github.com:namikawa07/Study_quest.git
```
・事前に準備しておくこと
管理者から`master.key`を取得して'config'配下に配置してください

```
$ docker-compose build
$ docker-compose up
$ docker-compose run app bundle exec db:create db:migrate
```

`http://localhost:3000/`にアクセスして開発を行ってください

### テスト実行
```
$ docker-compose run app bundle exec rspec
```

### Rubocop実行
```
$ docker-compose run app rubocop
```

