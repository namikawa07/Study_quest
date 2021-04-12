crumb :root do
  link "Top", root_path
end

crumb :login do
  link "Login", login_path
  parent :root
end

crumb :new_users do
  link "Signup", new_users_path
  parent :root
end

crumb :privacy do
  link "Privacy", privacy_path
  parent :root
end

crumb :users do
  link "My page", users_path
end

crumb :new_mission do
  link "New mission", new_mission_path
  parent :users
end

crumb :mission_tasks do |mission|
  link "Task play", mission_tasks_path(mission)
  parent :users
end

crumb :new_mission_schedule do |mission|
  link "New schedule", new_mission_schedule_path(mission)
  parent :mission_tasks, mission
end

crumb :mission_task_notes do |mission, task|
  link "Note", mission_task_notes_path(mission, task)
  parent :mission_tasks, mission
end

# crumb :projects do
#   link "Projects", projects_path
# end

# crumb :project do |project|
#   link project.name, project_path(project)
#   parent :projects
# end

# crumb :project_issues do |project|
#   link "Issues", project_issues_path(project)
#   parent :project, project
# end

# crumb :issue do |issue|
#   link issue.title, issue_path(issue)
#   parent :project_issues, issue.project
# end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).
