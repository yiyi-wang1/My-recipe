Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, default: {format: :json} do
    namespace :v1 do
      get 'meals/top5', to: 'meals#top5'
      get "search/:keyword", to: 'search#search'
      get "users/:id/favourited", to: 'users#favourited'
      patch 'users/:id/update_password', to: 'users#update_password'
      patch 'users/:id/update_profile_image', to: 'users#update_profile_image'

      resources :meals, only: [:index, :show, :create, :update, :destroy] do
        resources :comments, only: [:create, :destroy]
        resources :favourites, shallow: true, only: [:create, :destroy]
      end
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create] do
        get :current, on: :collection
      end
      resources :categories, only: [:show]
    end
  end

end
