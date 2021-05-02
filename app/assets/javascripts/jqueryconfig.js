$(function(){
  $('#signup_form').validate({
    rules: {
      "user[name]": {
        required: true,
      },
      "user[email]": {
        required: true,
        email: true,
      },
      "user[password]": {
        required: true,
        minlength: 3,
      },
      "user[password_confirmation]": {
        required: true,
        equalTo: "#user_password",
      },
    },
    messages: {
      "user[name]": {
        required: '名前を入力して下さい',
      },
      "user[email]": {
        required: 'メールアドレスを入力して下さい',
        email: 'メールアドレスの形式で入力してください',
      },
      "user[password]": {
        required: 'パスワードを入力して下さい',
        minlength: 'パスワードは3文字以上で入力してください',
      },
      "user[password_confirmation]": {
        required: '確認用パスワードを入力して下さい',
        equalTo: '確認用パスワードがパスワードと一致しません',
      },
    },
  })
})




$(function(){
  $('#profile_form').validate({
    rules: {
      "user[name]": {
        required: true,
      },
      "user[email]": {
        required: true,
        email: true,
      },
      "user[password]": {
        required: true,
        minlength: 3,
      },
      "user[password_confirmation]": {
        required: true,
        equalTo: "#user_password",
      },
    },
    messages: {
      "user[name]": {
        required: '名前を入力して下さい',
      },
      "user[email]": {
        required: 'メールアドレスを入力して下さい',
        email: 'メールアドレスの形式で入力してください',
      },
      "user[password]": {
        required: 'パスワードを入力して下さい',
        minlength: 'パスワードは3文字以上で入力してください',
      },
      "user[password_confirmation]": {
        required: '確認用パスワードを入力して下さい',
        equalTo: '確認用パスワードがパスワードと一致しません',
      },
    },
  })
})




$(function(){
  $('#new_mission_form').validate({
    rules: {
      "mission[title]": {
        required: true,
        maxlength: 100,
      },
      "mission[start_date]": {
        required: true,
      },
      "mission[end_date]": {
        required: true,
      },
      "mission[memo]": {
        maxlength: 400,
      },
    },
    messages: {
      "mission[title]": {
        required: 'タイトルを入力して下さい',
        maxlength: 'Mission名は最大で100字までです'
      },
      "mission[start_date]": {
        required: 'Start dateを入力して下さい',
      },
      "mission[end_date]": {
        required: 'End dateを入力して下さい',
      },
      "mission[memo]": {
        maxlength: 'メモは最大で400字までです',
      },
    },
  })
})


$(function(){
  $('.missions_form').each(function(){
  $(this).validate({
    rules: {
      "mission[title]": {
        required: true,
        maxlength: 40,
      },
      "mission[start_date]": {
        required: true,
      },
      "mission[end_date]": {
        required: true,
      },
      "mission[memo]": {
        maxlength: 400,
      },
    },
    messages: {
      "mission[title]": {
        required: 'タイトルを入力して下さい',
        maxlength: 'Mission名は最大で40字までです'
      },
      "mission[start_date]": {
        required: 'Start dateを入力して下さい',
      },
      "mission[end_date]": {
        required: 'End dateを入力して下さい',
      },
      "mission[memo]": {
        maxlength: 'メモは最大で400字までです',
      },
    },
  })
  })
})



$(function(){
  $('.tasks_form').each(function(){
  $(this).validate({
    rules: {
      "task[title]": {
        required: true,
        maxlength: 40,
      },
      "task[start_date]": {
        required: true,
      },
      "task[end_date]": {
        required: true,
      },
      "task[detail]": {
        maxlength: 200,
      },
    },
    messages: {
      "task[title]": {
        required: 'タイトルを入力して下さい',
        maxlength: 'task名は最大で40字までです'
      },
      "task[start_date]": {
        required: '開始日を入力して下さい',
      },
      "task[end_date]": {
        required: '終了日を入力して下さい',
      },
      "task[detail]": {
        maxlength: '詳細は最大で200字までです',
      },
    },
  })
  })
})


$(function(){
  $('.schedules_form').each(function(){
  $(this).validate({
    rules: {
      "schedule[title]": {
        required: true,
        maxlength: 40,
      },
      "schedule[start_date]": {
        required: true,
      },
      "schedule[end_date]": {
        required: true,
      },
    },
    messages: {
      "schedule[title]": {
        required: 'タイトルを入力して下さい',
        maxlength: 'schedule名は最大で40字までです'
      },
      "schedule[start_date]": {
        required: 'Start dateを入力して下さい',
      },
      "schedule[end_date]": {
        required: 'End dateを入力して下さい',
      },
    },
  })
  })
})

$(function(){
  $('#task_create_form').validate({
    rules: {
      "task[title]": {
        required: true,
        maxlength: 40,
      },
      "task[start_date]": {
        required: true,
      },
      "task[end_date]": {
        required: true,
      },
      "task[detail]": {
        maxlength: 200,
      },
    },
    messages: {
      "task[title]": {
        required: 'タイトルを入力して下さい',
        maxlength: 'task名は最大で40字までです',
      },
      "task[start_date]": {
        required: '開始日を入力して下さい',
      },
      "task[end_date]": {
        required: '終了日を入力して下さい',
      },
      "task[detail]": {
        maxlength: '詳細は最大で200字までです',
      },
    },
  })
})


$(function(){
  $('#note_create_form').validate({
    rules: {
      "note[title]": {
        required: true,
      },
    },
    messages: {
      "note[title]": {
        required: 'タイトルを入力して下さい',
      },
    },
  })
})


$(function(){
  $('.notes_form').each(function(){
  $(this).validate({
    rules: {
      "note[title]": {
        required: true,
      },
    },
    messages: {
      "note[title]": {
        required: 'タイトルを入力して下さい',
      },
    },
  })
  })
})

$(function(){
  $('#password_reset_form').validate({
    rules: {
      "user[email]": {
        required: true,
        email: true,
      },
      "user[password]": {
        required: true,
        minlength: 3,
      },
      "user[password_confirmation]": {
        required: true,
        equalTo: "#reset_password",
      },
    },
    messages: {
      "user[email]": {
        required: 'メールアドレスを入力して下さい',
        email: 'メールアドレスの形式で入力してください',
      },
      "user[password]": {
        required: 'パスワードを入力して下さい',
        minlength: 'パスワードは3文字以上で入力してください',
      },
      "user[password_confirmation]": {
        required: '確認用パスワードを入力して下さい',
        equalTo: '確認用パスワードがパスワードと一致しません',
      },
    },
  })
})
