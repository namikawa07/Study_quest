class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  #before_action :current_user?, only: %i[show]
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    binding.pry
    if @user.save
      redirect_to @user
    else
      render :new
    end
  end

  def show
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
    #ここに成功のフラッシュメッセージ
      redirect_to user_path(current_user)
    else
    #ここに失敗のフラッシュメッセージ
      render :show
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :icon)
  end

  #認可機能の実装で削除可能
  def current_user?
    @user = User.find(params[:id])
    if current_user.id != @user.id
      redirect_to current_user
    end
  end
end
