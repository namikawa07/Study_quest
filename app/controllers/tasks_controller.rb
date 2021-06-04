class TasksController < ApplicationController
  before_action :set_mission
  before_action :set_task, only: %i[update destroy attack]
  before_action :today_tasks, only: %i[index create finish attack]
  skip_before_action :test_login_limit

  def index
    @task = Task.new
    @all_tasks = @my_tasks.includes(:mission).page(params[:all_tasks]).per(15)
    @search_task = @my_tasks.includes(:mission).ransack(params[:q])
    @search_tasks = @search_task.result
    @pasttasks = @my_tasks.includes(:mission).where(task_date: 'past_task')
    first_task
    last_task
    status_task
    task_shedule
  end

  def create
    @task = Task.new(task_params)
    @task.setting_cheracter
    @task.change_task_date
    if @task.save && @tasks.count < 10
      @tasks_last_number = @tasks.count
      if @task.task_date == 'today_task'
        @status = 'success'
      else
        flash[:success] = t('tasks.create.Success')
        render js: "window.location = '#{mission_tasks_path(@mission)}'"
      end
    else
      @status = 'fail'
    end
  end

  def update
    @task.attributes = task_params
    @task.change_task_date
    if @task.save
      flash[:success] = t('tasks.update.Success')
      render js: "window.location = '#{mission_tasks_path(@mission)}'"
    else
      @status = 'fail'
    end
  end

  def destroy
    @task.destroy!
    flash[:success] = t('tasks.destroy.Success')
    redirect_to mission_tasks_path(@mission)
  end

  def finish
    @today_finish_tasks = @tasks.finish_tasks(params[:finish])
    next_tasks = @my_tasks.next_tasks_change_today_tasks(params[:finish])
    @finish_untouch_tasks = @today_finish_tasks.where(status: 'untouch')
    @finish_untouch_tasks.update_all(status: 'incomplete') if @finish_untouch_tasks.present?
    if @today_finish_tasks.update_all(task_date: 'past_task')
      next_tasks.update_all(task_date: 'today_task') if next_tasks.present?
      flash[:success] = t('tasks.finish.Success')
      redirect_to mission_tasks_path(@mission)
    else
      flash.now[:danger] = t('tasks.finish.Not_success')
      render :index
    end
  end

  def attack
    @attack_task = @task
    @character_attack = "chara-attack#{rand(6)}"
    @attack_task.change_status_attack_task
    @attack_task.save!
    respond_to do |format|
      format.js { @status = 'success' }
      format.html { redirect_to mission_tasks_path(@mission) }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :detail, :status, :task_date, :start_date, :end_date, :character).merge(mission_id: params[:mission_id])
  end

  def set_mission
    @mission = current_user.missions.find(params[:mission_id])
    @my_tasks = @mission.tasks
  end

  def set_task
    @task = @my_tasks.find(params[:id])
  end

  def today_tasks
    @tasks = @my_tasks.includes(:mission).where(task_date: 'today_task')
  end

  def status_task
    if @my_tasks.count != 0
      @untouch_per = (@my_tasks.task_status('untouch').count * 100.0 / @my_tasks.count).round
      @complete_per = (@my_tasks.task_status('complete').count * 100.0 / @my_tasks.count).round
      @incomplete_per = (@my_tasks.task_status('incomplete').count * 100.0 / @my_tasks.count).round
    else
      @untouch_per = @complete_per = @incomplete_per = 0
    end
  end

  def first_task
    first_task = @my_tasks.order(start_date: 'ASC').first
    return if first_task.blank?

    past_date_array = ((first_task.start_date.to_date)..Date.today).to_a.reverse
    @past_page_date = Kaminari.paginate_array(past_date_array).page(params[:page_past_date]).per(3)
  end

  def last_task
    last_task = @my_tasks.order(end_date: 'ASC').last
    return if last_task.blank?

    future_date_array = (Date.tomorrow..(last_task.end_date.to_date)).to_a
    @future_page_date = Kaminari.paginate_array(future_date_array).page(params[:page_future_date]).per(3)
  end

  def task_shedule
    return if @all_tasks.blank?

    @future_date_tasks = @future_page_date.map do |date|
      [date, @my_tasks.task_group(date)]
    end
    @past_date_tasks = @past_page_date.map do |date|
      [date, @my_tasks.task_group(date)]
    end
  end
end
