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
    incomplete_mission = current_user.missions.where("end_date < ?", Date.today).where(status: "publish")
    if incomplete_mission.present?
      incomplete_mission.update_all(status: "incomplete")
    end
    @missions = @user.missions
  end

  def update
    @missions = current_user.missions
    @user = User.find(current_user.id)
    if @user.update(user_params)
      flash[:success] = t('users.update.Success')
      redirect_to users_path
    else
      flash[:danger] = t('users.update.Not_success')
      redirect_to users_path
    end
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
