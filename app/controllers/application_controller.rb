class ApplicationController < ActionController::Base
  before_action :require_login
  before_action :my_mission
  
  def my_mission
    @my_mission = current_user.missions.find_by(registration: "registration")
  end
  
  protected
  
  def not_authenticated
    flash[:notice] = t('application.not_authenticated.require_login')
    redirect_to login_path
  end
end
