class MissionsController < ApplicationController
  before_action :set_mission, only: %i[update destroy registration finish]
  def new
    @mission = Mission.new
  end

  def create
    @mission = Mission.new(mission_params)
    @mission.user_id = current_user.id
    if params[:publish]
      mission_create('publish')
    else
      @mission.status = :draft
      mission_create('draft')
    end
  end

  def update
    if @mission.update(mission_params)
      flash[:success] = t('missions.update.Success')
      redirect_to users_path
    else
      flash.now[:danger] = t('missions.update.Not_success')
      redirect_to users_path
    end
  end

  def destroy
    @mission.destroy!
    flash[:success] = t('missions.destroy.Success')
    redirect_to users_path
  end

  def registration
    my_mission = current_user.missions.find_by(registration: "registration")
    @mission.registration = "registration"
    if my_mission.blank? && @mission.update(mission_params)
      flash[:success] = t('missions.registration.Success')
      redirect_to users_path
    else
      flash[:danger] = t('missions.registration.Not_success')
      redirect_to users_path
    end
  end

  def finish
    if @mission.status == "incomplete"
      @mission.status = "complete"
    elsif @mission.status == "complete"
      @mission.status = "incomplete"
    end
    if @mission.save
      flash[:success] = t('missions.finish.Success')
      redirect_to users_path
    else
      flash[:danger] = t('missions.finish.Not_success')
      redirect_to users_path
    end
  end

  private
  
  def mission_params
    params.require(:mission).permit(:title, :start_date, :end_date, :memo, :status, :registration)
  end
  
  def mission_create(status)
    if @mission.save
      flash[:success] = t('missions.create.Success_' + status )
      redirect_to users_path
    else
      flash.now[:danger] = t('missions.create.Not_success_' + status )
      redirect_to users_path
    end
  end
  
  def set_mission
    @mission = current_user.missions.find(params[:id])
  end
end
