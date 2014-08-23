class TaskList < ActiveRecord::Base
  Completed = 1

  def self.all_list
    all
  end

  def self.add_work(work_name)
    create(name: work_name)
  end

  def self.update_work(id)
    work = find(id)
    update_state = work.state == 0 ? 1 : 0
    work.update_attributes(:state => update_state)
  end

  def self.update_all_work(state)
    update_all("state = #{state}")
  end

  def self.update_work_name(id, name)
    work = find(id)
    work.update_attributes(:name => name) if work.present?
  end

  def self.delete_work(id)
    work = find(id)
    work.destroy if work.present?
  end

  def self.delete_completed_work
    works = where(:state => 1)
    works.each { |work| work.destroy if work.present?}
  end
end
