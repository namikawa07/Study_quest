class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user)
      flash[:success] = t('users.create.Success')
      redirect_to users_path
    else
      flash.now[:danger] = t('users.create.Not_success')
      render :new
    end
  end

  def show
    @user = User.find(current_user.id)
    @missions = @user.missions
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      flash[:success] = t('users.update.Success')
    else
      flash[:danger] = t('users.update.Not_success')
    end
    redirect_to users_path
  end
  
  def destroy
    current_user.destroy!
    flash[:success] = t('users.destroy.Success')
    redirect_to root_path
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :icon)
  end
end
