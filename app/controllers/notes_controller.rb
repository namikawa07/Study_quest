class NotesController < ApplicationController
  before_action :set_mission
  before_action :set_task
  before_action :set_search_notes, only: %i[index]

  def index
    @notes = @search_note.result.page(params[:page]).per(5)
    @note = Note.new
    
  end

  def create
    @note = Note.new(note_params)
    @note.task_id = @task.id
    if @note.save
      flash[:success] = t('notes.create.Success')
      redirect_to mission_task_notes_path(@mission, @task)
    else
      flash.now[:danger] = t('notes.create.Not_success')
      render :index
    end
  end

  def update
    @note = @task.notes.find(params[:id])
    respond_to do |format|
      if @note.update(note_params)
        flash[:success] = t('notes.update.Success')
        format.html { redirect_to mission_task_notes_path(@mission, @task) }
        format.js { render js: "window.location = '#{mission_task_notes_path(@mission, @task)}'" }
      else
        format.html { redirect_to mission_task_notes_path(@mission, @task) }
        format.json { render json: @note.errors, status: :unprocessable_entity }
        format.js { @status = "fail" }
      end
    end
  end

  def destroy
    note = @task.notes.find(params[:id])
    note.destroy!
    flash[:success] = t('notes.destroy.Success')
    redirect_to mission_task_notes_path(@mission, @task)
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

  def set_mission
    @mission = current_user.missions.find(params[:mission_id])
  end

  def set_task
    @task = @mission.tasks.find(params[:task_id])
  end
 
  def set_search_notes
    mission = current_user.missions.find(params[:mission_id])
    task = mission.tasks.find(params[:task_id])
    @search_note = task.notes.ransack(params[:q])
  end
end
