class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create testlogin]
  skip_before_action :test_login_limit, only: %i[new create testlogin]
  before_action :set_search_missions, only: %i[show]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
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

  def testlogin
    @testuser = User.new(name: '体験版テストユーザー', email: "#{@test_email}@example.com", password: 'TaskQuest_test_user', password_confirmation: 'TaskQuest_test_user')
    @testuser.icon.attach(io: File.open('#{Rails.root}/public/images/partner-info.png'), filename: 'partner-info.png', content_type: 'image/png')
    @testuser.save!
    auto_login(@testuser)
    @testmission = Mission.new(title: '体験版テストミッション', start_date: Date.today, end_date: Date.tomorrow, user_id: @testuser.id)
    @testmission.save!
    flash[:success] = t('users.testlogin.Success')
    redirect_to mission_tasks_path(@testmission.id)
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
