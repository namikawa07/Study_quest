class MissionsController < ApplicationController
  before_action :set_mission, only: %i[update destroy registration finish status_change]
  def new
    @mission = Mission.new
  end

  def create
    @mission = Mission.new(mission_params)
    @mission.status = :draft if params[:draft]
    if @mission.save
      flash[:success] = t("missions.create.Success")
      render js: "window.location = '#{users_path}'"
    else
      @status = 'fail'
    end
  end

  def update
    if @mission.update(mission_params)
      flash[:success] = t('missions.update.Success')
      render js: "window.location = '#{users_path}'"
    else
      @status = 'fail'
    end
  end

  def destroy
    @mission.destroy!
    flash[:success] = t('missions.destroy.Success')
    redirect_to users_path
  end

  def registration
    @mission.change_registration
    if @mission.save
      flash[:success] = t('missions.registration.Success') if @mission.registration == 'registration'
      flash[:success] = t('missions.not_registration.Success') if @mission.registration == 'not_registration'
      render js: "window.location = '#{users_path}'"
    else
      @status = 'fail'
    end
  end

  def finish
    @mission.change_finish_mission
    if @mission.save
      flash[:success] = t("missions.#{@mission.status}.Success")
    else
      flash[:danger] = t("missions.#{@mission.status}.Not_success")
    end
    redirect_to users_path
  end

  def status_change
    @mission.change_draft_or_publish
    @mission.save!
    if @mission.status == 'draft'
      flash[:success] = t('missions.update.publishSuccess')
    else
      flash[:success] = t('missions.update.draftSuccess')
    end
    redirect_to users_path
  end

  private

  def mission_params
    params.require(:mission).permit(:title, :start_date, :end_date, :memo, :status, :registration).merge(user_id: current_user.id)
  end

  def set_mission
    @mission = current_user.missions.find(params[:id])
  end
end
