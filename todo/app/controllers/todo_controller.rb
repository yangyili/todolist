class TodoController < ApplicationController
  def list
    @lists = TaskList.all_list
  end
end
