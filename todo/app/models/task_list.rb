class TaskList < ActiveRecord::Base
  Completed = 1

  def self.all_list
    all
  end
end
