class SchedulesController < ApplicationController
  before_action :set_mission
  before_action :set_schedule, only: %i[update destroy]
  def new
    @schedule = Schedule.new
  end

  def create
    @schedule = Schedule.new(schedule_params)
    @schedule.mission_id = @mission.id
    if params[:publish]
      schedule_create('publish')
    elsif params[:draft]
      @schedule.status = 'draft'
      mission_create('draft')
    end
  end

  def update
    respond_to do |format|
      if @schedule.update(schedule_params)
        flash[:success] = t('schedules.update.Success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.js { render js: "window.location = '#{mission_tasks_path(@mission)}'" }
      else
        flash[:danger] = t('schedules.update.Not_success')
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
        format.js { @status = "fail" }
      end
    end
  end

  def destroy
    @schedule.destroy!
    flash[:success] = t('schedules.destroy.Success')
    redirect_to mission_tasks_path(@mission)
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_date, :end_date, :status)
  end

  def set_mission
    @mission = current_user.missions.find(params[:mission_id])
  end

  def set_schedule
    @schedule = @mission.schedules.find(params[:id])
  end

  def schedule_create(status)
    if @schedule.save
      flash[:success] = t('schedules.create.Success_' + status )
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('missions.create.Not_success_' + status )
      render :new
    end
  end
end
