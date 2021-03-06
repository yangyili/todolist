$(document).ready(function(){
    TodoList.init();
});
var TodoList = function() {
    var ENTER_KEY = 13;

    function init_work_style() {
        var $todo_list_li = $('#todo-list li');
        var $toggle_all_input = $('#toggle-all');
        var all_work_num = $todo_list_li.length;
        var completed_num = $('.completed').length;

        if (all_work_num == 0) {
            $toggle_all_input.hide();
        } else if (all_work_num > completed_num) {
            $toggle_all_input.show().removeProp('checked');
        } else if (all_work_num == completed_num) {
            $toggle_all_input.show().prop('checked', 'checked');
        }
    }

    function init_work_state() {
        var $todo_list_li = $('#todo-list li');
        $todo_list_li.each(function () {
            if ($(this).hasClass('completed')) {
                $(this).find('[type="checkbox"]').prop('checked', 'checked');
            } else {
                $(this).removeProp('checked');
            }
        });

    }

    function init_work_number() {
        var $todo_list_li = $('#todo-list li');
        var all_work_length = $todo_list_li.length;
        var active_work_length = $todo_list_li.not('.completed').length;
        var completed_work_length = all_work_length - active_work_length;
        $('#todo-count').find('strong').text(active_work_length);
        $('#clear-completed').text('Clear completed (' + completed_work_length + ')');
    }

    function bind_keyup_for_add_item() {
        $('#new-todo').unbind('keyup').on('keyup', function(event){
            if (event.keyCode == ENTER_KEY) {
                if (!is_work_repeat($(this).val().trim)) {
                    add_work(this);
                }
            }
        });
    }

    function bind_click_for_destroy_item() {
        $('#todo-list').find('.destroy').unbind('click').bind('click', function() {
            destroy_work($(this).parents('li').attr('item_id'));
        })
    }

    function bind_click_for_checked_item() {
        $('#todo-list').find('.toggle').unbind('click').bind('click', function () {
            checked_work($(this).parents('li').attr('item_id'));
        })
    }

    function bind_click_for_select_all() {
        $('#toggle-all').unbind('click').bind('click', function () {
            select_all_item();
        })
    }

    function bind_click_for_filter() {
        $('#filters li').find('a').not('.selected').unbind('click').bind('click', function () {
            filter_work($(this));
        });
    }

    function bind_click_for_destroy_all_work() {
        $('#clear-completed').unbind('click').bind('click', function () {
            clear_all_work();
        });
    }

    function bind_edit_work() {
        var $todolist_li = $('#todo-list li');
        $todolist_li.find('.view').unbind('dblclick').bind('dblclick', function () {
            $(this).parents('li').addClass('editing');
            $(this).next('.edit').val($(this).text().trim());
        });
        $todolist_li.find('.edit').unbind('keyup').bind('keyup', function (event) {
            if (event.keyCode == ENTER_KEY) {
                var work_id = $(this).parents('li').attr('item_id');
                $.ajax({
                    url: '/works/'+work_id+'/edit',
                    type: 'PUT',
                    data: {name: $(this).val().trim()},
                    success: function (data) {
                        if (data == 'ok') {
//                            $(this).parents('li').removeClass('editing');
                            window.location.reload();
                            console.log('edit success');
                        }
                    },
                    error: function () {
                        console.log('edit error');
                    }
                });
            }
        });
    }

    function add_work(el) {
        var work_name = $(el).val().trim();
        $.ajax({
            url: '/works/',
            type: 'POST',
            data: {name: work_name},
            success: handle_work_success,
            error: function() {
                console.log('add_work error');
            }
        });
    }

    function destroy_work(work_id) {
        $.ajax({
            url: '/works/'+work_id,
            type: 'DELETE',
            success: function(data) {
                if (data == 'ok') {
                    $('[item_id =' + work_id + ']').remove();
                    TodoList.init();
                }
            },
            error: function() {
                console.log('delete_work error');
            }
        });
    }

    function checked_work(work_id) {
        $('[item_id='+ work_id +']').toggleClass('completed');
        $.ajax({
            url: '/works/' + work_id,
            type: 'PUT',
            success: function (data) {
                if (data == 'ok') {
                    console.log('checked success');
                    TodoList.init();
                }
            },
            error: function() {
                console.log('checked error');
            }
        });
    }

    function select_all_item() {
        var $todo_list_li = $('#todo-list li');
        var all_work_num = $todo_list_li.length;
        var completed_num = $('.completed').length;
        if (all_work_num > completed_num) {
            var $not_completed = $todo_list_li.not('.completed');
            $not_completed.find('[type="checkbox"]').prop('checked', 'checked');
            $not_completed.toggleClass('completed');
            update_all_item_state(1);
            console.log('update state 1');
        } else if (all_work_num == completed_num) {
            console.log('update state 0');
            $todo_list_li.removeClass('completed');
            $todo_list_li.find('[type="checkbox"]').removeProp('checked');
            update_all_item_state(0);
        }
    }

    function filter_work($this) {
        var $todo_list_li = $('#todo-list li');
        $('#filters li').find('a').removeClass('selected');
        $this.addClass('selected');
        var state = $this.text().trim();
        $todo_list_li.addClass('none');
        if (state == 'All') {
            $todo_list_li.removeClass('none');
        } else if (state == 'Active') {
            $todo_list_li.not('.completed').removeClass('none');
        } else if (state == 'Completed') {
            $('.completed').removeClass('none');
        }
        TodoList.init();
    }

    function clear_all_work() {
        var $completed = $('.completed');
        $completed.remove();
        $.ajax({
            url: '/works/completed',
            type: 'POST',
            success: function (data) {
                if (data == 'ok') {
                    console.log('delete ok');
                    TodoList.init();
                }
            },
            error: function () {
                console.log('delete error');
            }
        });
        console.log('clear all work');
    }

    function handle_work_success(data) {
//        $('#todoapp').replaceWith($(data).find('#todoapp'));
        window.location.reload();
        TodoList.init();
    }

    function update_all_item_state(state) {
        $.ajax({
            url: '/works/state',
            type: 'POST',
            data: {state: state},
            success: function (data) {
                if (data == 'ok') {
                    TodoList.init();
                }
            },
            error: function () {
                console.log('update_all error');
            }
        });
    }

    function is_work_repeat(work) {
        $.ajax({
            url: '/works',
            type: 'GET',
            success: function (data) {
                data.each(function (item) {
                    return item == work;
                });
            }
        })
    }


    return {
       init: function () {
           init_work_state();
           init_work_style();
           init_work_number();
           bind_keyup_for_add_item();
           bind_click_for_destroy_item();
           bind_click_for_checked_item();
           bind_click_for_select_all();
           bind_click_for_filter();
           bind_click_for_destroy_all_work();
           bind_edit_work();
       }
    };
}();