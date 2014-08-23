class TodoController < ApplicationController
  def works
    TaskList.all_list.pluck(:name)
  end

  def list
    @lists = TaskList.all_list.order(:id).reverse_order
  end

  def add_work
    TaskList.add_work(params[:name])
    redirect_to :list
  end

  def update_work_state
    TaskList.update_work(params[:id])
    render :text => 'ok'
  end

  def update_all_work_state
    TaskList.update_all_work(params[:state])
    render :text => 'ok'
  end

  def update_work_name
    TaskList.update_work_name(params[:id], params[:name])
    render :text => 'ok'
  end

  def delete_work
    TaskList.delete_work(params[:id])
    render :text => 'ok'
  end

  def delete_completed_work
    TaskList.delete_completed_work
    render :text => 'ok'
  end

  def upload_file
    redirect_to "/list"
  end
end

