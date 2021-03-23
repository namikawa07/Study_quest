class MissionsController < ApplicationController
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
  end

  def destroy
  end

  private
  
  def mission_params
    params.require(:mission).permit(:title, :start_date, :end_date, :memo, :status, :registration, :user_id)
  end
  
  def mission_create(status)
    if @mission.save
      flash[:success] = t('missions.create.Success_' + status )
      redirect_to users_path
    else
      flash.now[:danger] = t('missions.create.Not_success_' + status )
      render :new
    end
  end
end
