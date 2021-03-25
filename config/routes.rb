Rails.application.routes.draw do
  root to: 'home#index'
  get    '/login', to: "sessions#new"
  post   '/login',   to: "sessions#create"
  delete '/logout',  to: "sessions#destroy"
  resource :users, only: %i[new create show update destroy]
  resources :missions, only: %i[new create update destroy] #do
    #member do
      #get 'registration'
    #end
  #end
  resources :sessions, only: %i[new create destroy]
  
end
