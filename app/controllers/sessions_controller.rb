class SessionsController < ApplicationController
  skip_before_action :require_login

  def new
    @user = User.new
  end

  def create
    @user = login(params[:email], params[:password], params[:password_confirmation])
    if @user
      redirect_to @user
    else
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path
  end
end
