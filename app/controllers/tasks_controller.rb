class TasksController < ApplicationController
  before_action :set_mission
  before_action :today_tasks, only: %i[index create]
  before_action :set_search_tasks, only: %i[index]
  
  def index
    @task = Task.new
    @all_tasks = @mission.tasks
    past_tasks
    same_created_tasks
    @search_tasks = @search_task.result
  end

  def create
    @task = Task.new(task_params)
    @task.mission_id = @mission.id
    if @task.start_date.to_date > Date.today
        binding.pry
      @task.task_date = "future_task"
    end
    respond_to do |format|
      if @task.save
        flash[:success] = t('tasks.create.Success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.js { render js: "window.location = '#{mission_tasks_path(@mission)}'" }
      else
        flash.now[:danger] = t('tasks.create.Not_success')
        format.html { redirect_to users_path }
        format.json { render json: @task.errors, status: :unprocessable_entity }
        format.js { @status = "fail" }
      end
    end
  end
  
  def update
    @task = @mission.tasks.find(params[:id])
    if @task.start_date > Date.today
      @task.task_date = "future_task"
    end
    respond_to do |format|
      if @task.update(task_params)
        flash[:success] = t('tasks.update.Success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.js { render js: "window.location = '#{mission_tasks_path(@mission)}'" }
      else
      binding.pry
        flash.now[:danger] = t('tasks.update.Not_success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.json { render json: @task.errors, status: :unprocessable_entity }
        format.js { @status = "fail" }
      end
    end
  end
  
  def destroy
    @task = @mission.tasks.find(params[:id])
    @task.destroy!
    flash[:success] = t('tasks.destroy.Success')
    redirect_to mission_tasks_path(@mission)
  end
  
  def finish
    @today_finish_tasks = @mission.tasks.where(task_date: "today_task").where("end_date >= ?", Date.today)
    @finish_untouch_tasks = @today_finish_tasks.where(status: "untouch")
    @finish_untouch_tasks.update_all(status: "incomplete") if @finish_untouch_tasks.present?
    if @today_finish_tasks.update_all(task_date: "past_task")
      tomorrow_tasks = @mission.tasks.where(task_date: "future_task").where(start_date: Date.today)
      tomorrow_tasks.update_all(task_date: "today_task") if tomorrow_tasks.present?
      flash[:success] = t('tasks.finish.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('tasks.finish.Not_success')
      render :index
    end
  end
  
  def attack
    task = @mission.tasks.find(params[:id])
    if task.status == "untouch"
      task.status = "complete"
    elsif task.status == "complete"
      task.status = "untouch"
    end
    task.update!(task_params)
    render :index
  end

  def remake
    @task = @mission.tasks.find(params[:id])
    @remake_task = Task.new(title: @task.title, detail: @task.detail)
    @remake_task.mission_id = @mission.id
    binding.pry
    if @remake_task.save
        binding.pry
      flash[:success] = t('tasks.remake.Success')
      redirect_to mission_tasks_path(@mission)
    else
    binding.pry
      flash.now[:danger] = t('tasks.remake.Not_success')
      render :index
    end
  end
  
  private
  
  def task_params
    params.require(:task).permit(:title, :detail, :status, :task_date, :start_date, :end_date)
  end
  
  def set_mission
    @mission = Mission.find(params[:mission_id])
  end

  def today_tasks
    @tasks = @mission.tasks.where(task_date: "today_task")
    @task_groups = @tasks.each_slice(5).to_a
  end
  
  def past_tasks
    @pasttasks = @mission.tasks.where(task_date: "past_task")
  end

  def same_created_tasks
    @same_tasks = @mission.tasks.order(start_date: :desc).page(params[:same_task]).per(15)
    @same_created_tasks = @same_tasks.group_by{|task| task.start_date.to_date}
  end

  def set_search_tasks
    mission = current_user.missions.find(params[:mission_id])
    @search_task = mission.tasks.ransack(params[:q])
  end
end
