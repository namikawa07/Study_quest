Rails.application.routes.draw do
  get 'oauths/oauth'
  get 'oauths/callback'
  root to: 'home#index'
  get    '/privacy', to: "home#privacy"
  get    '/login', to: "sessions#new"
  post   '/login',   to: "sessions#create"
  delete '/logout',  to: "sessions#destroy"
  post "oauth/callback", to: "oauths#callback"
  get "oauth/callback", to: "oauths#callback"
  get "oauth/:provider", to: "oauths#oauth", as: :auth_at_provider
  resource :users, only: %i[new create edit show update destroy]
  resources :missions, only: %i[new create update destroy] do
    member do
      post 'status_change'
      post 'registration'
      post 'finish'
    end
    resources :schedules, only: %i[new create update destroy]
    resources :tasks, only: %i[index create update destroy] do
      resources :notes, only: %i[index create update destroy]
      member do
        post 'attack'
      end
      collection do
        post 'finish'
      end
    end
    
  end
  resources :sessions, only: %i[new create destroy]
  resources :password_resets
  resources :contacts
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
