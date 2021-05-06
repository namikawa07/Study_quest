class MissionsController < ApplicationController
  before_action :set_mission, only: %i[update destroy registration finish status_change]
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
    respond_to do |format|
      if @mission.update(mission_params)
        flash[:success] = t('missions.update.Success')
        format.html { redirect_to users_path }
        format.js { render js: "window.location = '#{users_path}'" }
      else
        format.html { redirect_to users_path }
        format.json { render json: @mission.errors, status: :unprocessable_entity }
        format.js { @status = 'fail' }
      end
    end
  end

  def destroy
    @mission.destroy!
    flash[:success] = t('missions.destroy.Success')
    redirect_to users_path
  end

  def registration
    respond_to do |format|
      if @mission.registration == 'not_registration'
        @mission.registration = 'registration'
        if my_mission.blank? && @mission.save
          flash[:success] = t('missions.registration.Success')
          format.html { redirect_to users_path }
          format.js { render js: "window.location = '#{users_path}'" }
        else
          flash[:danger] = t('missions.registration.Not_success')
          format.html { redirect_to users_path }
          format.json { render json: @mission.errors, status: :unprocessable_entity }
          format.js { @status = 'fail' }
        end
      else
        @mission.registration = 'not_registration'
        if @mission.save
          flash[:success] = t('missions.not_registration.Success')
          format.html { redirect_to users_path }
          format.js { render js: "window.location = '#{users_path}'" }
        else
          flash.now[:danger] = t('missions.not_registration.Not_success')
          format.html { redirect_to users_path }
          format.json { render json: @mission.errors, status: :unprocessable_entity }
          format.js { @status = 'fail' }
        end
      end
    end
  end

  def finish
    if @mission.status == 'incomplete'
      @mission.status = 'complete'
    elsif @mission.status == 'complete'
      @mission.status = 'incomplete'
    end
    if @mission.save
      flash[:success] = t('missions.finish.Success')
    else
      flash[:danger] = t('missions.finish.Not_success')
    end
    redirect_to users_path
  end

  def status_change
    if @mission.status == 'publish' || @mission.status == 'incomplete'
      @mission.status = 'draft'
      @mission.save!
      flash[:success] = t('missions.update.publishSuccess')
    elsif @mission.status == 'draft'
      @mission.status = if @mission.end_date >= Date.today
                          'publish'
                        else
                          'incomplete'
                        end
      @mission.save!
      flash[:success] = t('missions.update.draftSuccess')
    end
    redirect_to users_path
  end

  private

  def mission_params
    params.require(:mission).permit(:title, :start_date, :end_date, :memo, :status, :registration)
  end

  def mission_create(status)
    respond_to do |format|
      if @mission.save
        flash[:success] = t('missions.create.Success_' + status)
        format.html { redirect_to users_path }
        format.js { render js: "window.location = '#{users_path}'" }
      else
        flash[:danger] = t('missions.create.Not_success_' + status)
        format.html { redirect_to users_path }
        format.json { render json: @mission.errors, status: :unprocessable_entity }
        format.js { @status = 'fail' }
      end
    end
  end

  def set_mission
    @mission = current_user.missions.find(params[:id])
  end
end
