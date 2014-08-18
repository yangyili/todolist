class TodoController < ApplicationController
  def list
    @lists = TaskList.all_list.order(:id).reverse_order
  end

  def add_work
    TaskList.add_work(params[:name])
    redirect_to :list
  end

  def update_work
    TaskList.update_work(params[:id])
    render :text => 'ok'
  end

  def update_all_work
    TaskList.update_all_work(params[:state])
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
end

