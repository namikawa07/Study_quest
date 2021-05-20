class OauthsController < ApplicationController
  skip_before_action :require_login

  def oauth
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    if (@user = login_from(provider))
      flash[:success] = "#{provider.titleize}でログインしました"
    else
      @user = create_from(provider)
      reset_session
      auto_login(@user)
      flash[:success] = "#{provider.titleize}でログインしました"
    end
    redirect_to users_path
  end
end
