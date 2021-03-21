Rails.application.routes.draw do
  get 'login' => 'users#new'
  post 'login' => 'users#create'
  resources :users, only: %i[index]
end
