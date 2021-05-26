class ApplicationController < ActionController::Base
  before_action :require_login
  before_action :my_mission
  before_action :test_login_email
  before_action :test_login_limit

  def my_mission
    @my_mission = current_user.missions.find_by(registration: 'registration') if current_user.present?
  end

  def test_login_email
    @test_email = SecureRandom.alphanumeric(20)
  end

  def test_login_limit
    return unless current_user.present? && current_user.name == 'テストユーザー'

    @mission = current_user.missions.first
    flash[:danger] = t('application.test_login_limit.require_login')
    redirect_to mission_tasks_path(@mission.id, current_user.id)
  end

  protected

  def not_authenticated
    flash[:notice] = t('application.not_authenticated.require_login')
    redirect_to login_path
  end
end
