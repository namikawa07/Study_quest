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
    @mission = current_user.missions.find(params[:id])
    if @mission.update(mission_params)
      flash[:success] = t('missions.update.Success')
      redirect_to users_path
    else
      flash[:danger] = t('missions.update.Not_success')
      redirect_to users_path
    end
  end

  def destroy
  end

  #def registration
    #@mission = Mission.find(params[:id])
    #@missions = current_user.missions
    #@reg_missions = @missions.find_by(registration: registration)
    #unless @reg_missions
      #@mission.registration = :registration
      #flash[:success] = #{ @mission.title } + t('missions.registration.Success')
      #redirect_to users_path
    #else
      #flash[:danger] = t('missions.registration.Not_success')
      #redirect_to users_path
    #end
  #end

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
      render :new
    end
  end
end
