class SessionsController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  skip_before_action :test_login_limit

  def new
    @user = User.new
  end

  def create
    @user = login(params[:email], params[:password])
    if @user
      flash[:success] = t('sessions.create.Success')
      redirect_to users_path
    else
      flash.now[:danger] = t('sessions.create.Not_success')
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path
  end
end
