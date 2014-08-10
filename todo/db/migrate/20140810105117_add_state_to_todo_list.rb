class AddStateToTodoList < ActiveRecord::Migration
  def change
    add_column :task_lists, :state, :integer, :default => 0
  end
end
