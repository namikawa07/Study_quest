Rails.application.routes.draw do
  root to: 'home#index'
  get    '/privacy', to: "home#privacy"
  get    '/login', to: "sessions#new"
  post   '/login',   to: "sessions#create"
  delete '/logout',  to: "sessions#destroy"
  resource :users, only: %i[new create edit show update destroy]
  resources :missions, only: %i[new create update destroy] do
    member do
      post 'registration'
      post 'finish'
    end
    resources :schedules, only: %i[new create update destroy]
    resources :tasks, only: %i[index create update destroy] do
      member do
        post 'attack'
        post 'remake'
      end
      collection do
        post 'finish'
      end
    end
    
  end
  resources :sessions, only: %i[new create destroy]
end
