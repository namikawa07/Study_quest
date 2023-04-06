# config valid only for current version of Capistrano
# capistranoのバージョンを記載。固定のバージョンを利用し続け、バージョン変更によるトラブルを防止する
lock '3.16.0'

# Capistranoのログの表示に利用する
set :application, 'Study_quest'
set :deploy_to, '/var/www/Study_quest'

# どのリポジトリからアプリをpullするかを指定する
set :repo_url,  'git@github.com:namikawa07/Study_quest.git'

set :branch, 'main'

# バージョンが変わっても共通で参照するディレクトリを指定
set :linked_dirs,
    fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system',
                                 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.6.9' # カリキュラム通りに進めた場合、2.5.1か2.3.1です

# どの公開鍵を利用してデプロイするか
set :ssh_options, auth_methods: ['publickey'],
                  keys: ['~/.ssh/TaskQuest_key_pair.pem']

# プロセス番号を記載したファイルの場所
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの場所
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# デプロイ処理が終わった後、Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end
