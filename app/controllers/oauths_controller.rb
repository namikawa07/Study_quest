class OauthsController < ApplicationController
  skip_before_action :require_login

  def oauth
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    unless (@user = login_from(provider))
      @user = create_from(provider)
      reset_session
      auto_login(@user)
    end
    flash[:success] = "#{provider.titleize}でログインしました"
    redirect_to users_path
  end
end
