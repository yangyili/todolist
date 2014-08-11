$(document).ready(function(){
    TodoList.init();
});
var TodoList = function() {
   var ENTER_KEY = 13;

    function init_work_style() {
        var $list_li = $('#todo-list li');
        var completed_length = 0;
        var all_work_length = 0;
        $list_li.each(function (item) {
            if ($(this).hasClass('completed')) {
                $(this).find('.toggle').prop('checked', true);
                completed_length += 1;
            }
        });
    }

    function bind_keyup_for_add_item() {
        $('#new-todo').on('keyup', function(event){
            if (event.keyCode == ENTER_KEY) {
                add_work();
            }
        });
    }

    function bind_click_for_destroy_item() {
        $('#todo-list').find('.destroy').bind('click', function() {
            destroy_work();
        })
    }

    function bind_click_for_checked_item() {
        $('#todo-list').find('.toggle').bind('click', function () {
            checked_work();
        })
    }

    function bind_click_for_select_all() {
        $('#toggle-all').bind('click', function () {
            select_all_item();
        })
    }

    function bind_click_for_filter() {
        $('#filters li').bind('click', function () {
            filter_work();
        });
    }

    function bind_click_for_destroy_all_work() {
        $('#clear-completed').bind('click', function () {
            clear_all_work();
        });
    }

    function add_work() {
        console.log('add');
    }

    function destroy_work() {
        console.log('destroy');
    }

    function checked_work() {
        console.log('checked');
    }

    function select_all_item() {
        console.log('select all');
    }

    function filter_work() {
        console.log('filter');
    }

    function clear_all_work() {
        console.log('clear all work');
    }

   return {
       init: function () {
           init_work_style();
           bind_keyup_for_add_item();
           bind_click_for_destroy_item();
           bind_click_for_checked_item();
           bind_click_for_select_all();
           bind_click_for_filter();
           bind_click_for_destroy_all_work();
       }
   };
}();