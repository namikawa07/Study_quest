class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to login_url
    else
      render :new
    end
  end
end
