class TasksController < ApplicationController
  before_action :set_mission
  before_action :today_tasks, only: %i[index create finish attack]
  before_action :due_to_task, only: %i[index]
  before_action :due_to_mission, only: %i[index]
  before_action :first_task, only: %i[index]
  before_action :last_task, only: %i[index]
  
  def index
    @task = Task.new
    @all_tasks = @mission.tasks.includes(:mission).page(params[:all_tasks]).per(15)
    @search_task = @mission.tasks.includes(:mission).ransack(params[:q])
    @search_tasks = @search_task.result
    past_tasks
    status_task
    if @all_tasks.present?
      @future_date_tasks = @future_page_date.map { |date| [date,@mission.tasks.where(start_date: date).or(@mission.tasks.where(end_date: date.to_date)).or(@mission.tasks.where("start_date <= ?", date).where("end_date >= ?", date))]}
      @past_date_tasks = @past_page_date.map { |date| [date,@mission.tasks.where(start_date: date).or(@mission.tasks.where(end_date: date.to_date)).or(@mission.tasks.where("start_date <= ?", date).where("end_date >= ?", date))]}
    end


    #binding.pry
  end

  def create
    @task = Task.new(task_params)
    @task.mission_id = @mission.id
    @task.character = "enemy#{rand(15)}"
    if @task.start_date > Date.today
      @task.task_date = "future_task"
    end
    dates = (@task.start_date.to_date)..(@task.end_date.to_date)
    due_to = dates.to_a
    same_date_tasks = due_to.map { |date| [date,@mission.tasks.where(start_date: date).or(@mission.tasks.where(end_date: date.to_date)).or(@mission.tasks.where("start_date <= ?", date).where("end_date >= ?", date))]}
    error_date_tasks = same_date_tasks.select { |k, v| v.count >= 10 }
    if error_date_tasks.present?
      error_date = error_date_tasks.transpose[0]
      @error_dates = error_date.map{|date| l date}
    end
    respond_to do |format|
      if @task.task_date == 'today_task' && @tasks.count >= 10
        flash.now[:danger] = t('tasks.create.Not_success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.json { render json: @task.errors, status: :unprocessable_entity }
        format.js { @status = "fail_today_task" }
      else
        if error_date_tasks.blank? && @task.save
          @tasks_last_number = @tasks.count
          flash[:success] = t('tasks.create.Success')
          format.html { redirect_to mission_tasks_path(@mission) }
          if @task.task_date == 'today_task'
            format.js { @status = "success" }
          else
            format.js { render js: "window.location = '#{mission_tasks_path(@mission)}'" }
          end
        else
          flash.now[:danger] = t('tasks.create.Not_success')
          format.html { redirect_to mission_tasks_path(@mission) }
          format.json { render json: @task.errors, status: :unprocessable_entity }
          format.js { @status = "fail" }
        end
      end
    end
  end
  
  def update
    @task = @mission.tasks.find(params[:id])
    @task.attributes = task_params
    @task.task_date = if @task.start_date > Date.today
                        "future_task"
                      elsif @task.end_date < Date.today
                        "past_task"
                      else
                        "today_task"
                      end
    dates = (@task.start_date.to_date)..(@task.end_date.to_date)
    due_to = dates.to_a
    same_date_tasks = due_to.map { |date| [date,@mission.tasks.where(start_date: date).or(@mission.tasks.where(end_date: date.to_date)).or(@mission.tasks.where("start_date <= ?", date).where("end_date >= ?", date))]}
    error_date_tasks = same_date_tasks.select { |k, v| v.count >= 10 }
    if error_date_tasks.present?
      error_date = error_date_tasks.transpose[0]
      @error_dates = error_date.map{|date| l date}
      @update_error_dates = due_to.map{|date| l date}.select { |n| n == @error_dates.join }
    end
    respond_to do |format|
      if  @update_error_dates.blank? && @task.save
        flash[:success] = t('tasks.update.Success')
        format.html { redirect_to mission_tasks_path(@mission) }
        format.js { render js: "window.location = '#{mission_tasks_path(@mission)}'" }
      else
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
    if params[:finish_yesterday]
      @today_finish_tasks = @tasks.where("end_date <= ?", Date.yesterday)
      next_tasks = @mission.tasks.where(task_date: "future_task").where(start_date: Date.today)
    else
      @today_finish_tasks = @tasks.where("end_date <= ?", Date.today)
      next_tasks = @mission.tasks.where(task_date: "future_task").where(start_date: Date.tomorrow)
    end
    @finish_untouch_tasks = @today_finish_tasks.where(status: "untouch")
    @finish_untouch_tasks.update_all(status: "incomplete") if @finish_untouch_tasks.present?
    if @today_finish_tasks.update_all(task_date: "past_task")
      next_tasks.update_all(task_date: "today_task") if next_tasks.present?
      flash[:success] = t('tasks.finish.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('tasks.finish.Not_success')
      render :index
    end
  end
  
  def attack
    @attack_task = @mission.tasks.find(params[:id])
    @character_attack = "chara-attack#{rand(6)}"
    respond_to do |format|
      if @attack_task.status == "untouch" || @attack_task.status == "incomplete"
        @attack_task.status = "complete"
      elsif @attack_task.status == "complete"
        @attack_task.status = "untouch"
      end
      @attack_task.save!
      format.html { redirect_to mission_tasks_path(@mission) }
      format.js { @status = "success" }
    end
  end
  
  private
  
  def task_params
    params.require(:task).permit(:title, :detail, :status, :task_date, :start_date, :end_date, :character)
  end
  
  def set_mission
    @mission = current_user.missions.find(params[:mission_id])
  end

  def today_tasks
    @tasks = @mission.tasks.includes(:mission).where(task_date: "today_task")
  end
  
  def past_tasks
    @pasttasks = @mission.tasks.includes(:mission).where(task_date: "past_task")
  end

  def due_to_task
    due_to_first_tasks = @mission.tasks.order(start_date: "ASC")
    @first_task = due_to_first_tasks.first
    due_to_last_tasks = @mission.tasks.order(end_date: "ASC")
    @last_task = due_to_last_tasks.last
  end

  def status_task
    @untouch_task_count = @mission.tasks.where(status: 'untouch').count
    untouch_task_count_percent = @untouch_task_count*100.0
    about_untouch_per = untouch_task_count_percent/(@all_tasks.count)
    if @all_tasks.count != 0
      @untouch_per = about_untouch_per.round
    else
      @untouch_per = 0
    end
    
    @complete_task_count = @mission.tasks.where(status: 'complete').count
    complete_task_count_percent = @complete_task_count*100.0
    about_complete_per = complete_task_count_percent/(@all_tasks.count)
    if @all_tasks.count != 0
      @complete_per = about_complete_per.round
    else
      @untouch_per = 0
    end
    
    @incomplete_task_count = @mission.tasks.where(status: 'incomplete').count
    incomplete_task_count_percent = @incomplete_task_count*100.0
    about_incomplete_per = incomplete_task_count_percent/(@all_tasks.count)
    if @all_tasks.count != 0
      @incomplete_per = about_incomplete_per.round
    else
      @untouch_per = 0
    end
  end

  def due_to_mission
    @until_today_mission_count = (@mission.start_date..Date.today).to_a.count
    @due_to_mission_count = (@mission.start_date..@mission.end_date).to_a.count
    mission_date_count =(@mission.start_date..Date.today).to_a.count*100.0 / (@mission.start_date..@mission.end_date).to_a.count
    @mission_date_per = mission_date_count.round
  end

  def first_task
    if @first_task.present?
      @past_date = ((@first_task.start_date.to_date)..Date.today)
      @past_date_array = @past_date.to_a.reverse
      @past_page_date = Kaminari.paginate_array(@past_date_array).page(params[:page_past_date]).per(3)
    end
  end

  def last_task
    if @last_task.present?
      @future_date = (Date.tomorrow..(@last_task.end_date.to_date))
      @future_date_array = @future_date.to_a
      @future_page_date = Kaminari.paginate_array(@future_date_array).page(params[:page_future_date]).per(3)
    end
  end

end
