class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  before_action :set_search_missions, only: %i[show]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.icon = '/images/avatar2.png'
    respond_to do |format|
      if @user.save
        auto_login(@user)
        flash[:success] = t('users.create.Success')
        format.html { redirect_to users_path }
        format.js { render js: "window.location = '#{users_path}'" }
      else
        flash.now[:danger] = t('users.create.Not_success')
        format.json { render json: @user.errors, status: :unprocessable_entity }
        format.js { @status = 'fail' }
      end
    end
  end

  def show
    @user = User.find(current_user.id)
    incomplete_mission = current_user.missions.where('end_date < ?', Date.today).where(status: 'publish')
    incomplete_mission.update_all(status: 'incomplete') if incomplete_mission.present?
    @missions = @search_mission.result.page(params[:page]).per(16).order(id: 'DESC')
    @all_missions = @user.missions
  end

  def update
    @missions = current_user.missions
    @user = User.find(current_user.id)
    respond_to do |format|
      if @user.update(user_params)
        flash[:success] = t('users.update.Success')
        format.html { redirect_to users_path }
        format.js { render js: "window.location = '#{users_path}'" }
      else
        format.html { redirect_to users_path }
        format.json { render json: @user.errors, status: :unprocessable_entity }
        format.js { @status = 'fail' }
      end
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

  def set_search_missions
    @search_mission = current_user.missions.ransack(params[:q])
  end
end
