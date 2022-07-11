import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


let onlineUsers = 0;
window.Echo.join(`online`)

    .here((users) => {
        let userId = $('meta[name=user-id]').attr('content')
        onlineUsers = users.length;
        if (users.length > 1) {
            $('#no-online-users').css('display', 'none');
        }
        users.forEach(function (user) {

            if (user.id == userId) {
                return;
            }

            $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="mr-2 icon icon-circle text-success"></span>${user.name}</li>`);
        })
    })
    .joining((user) => {
        onlineUsers++;
        $('#no-online-users').css('display', 'none');
        $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="mr-2 icon icon-circle text-success"></span>${user.name}</li>`);
    })
    .leaving((user) => {
        onlineUsers--;

        if (onlineUsers == 1) {
            $('#no-online-users').css('display', 'block');
        }
        $('#user-' + user.id).remove();
    });

$('#text-chat').keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();

        let body = $(this).val();
        let url = $(this).data('url');
        let username =$('meta[name=username]').attr('content');

        $(this).val('');
        $('#chat').append(`
        <div class="mt-4 w-50 text-white p-3 rounded  float-right bg-primary">
                                <p>${username}</p>
                                    <p>${body}</p>
                                </div>
                                <div class="clearfix"></div>
        `)
        $("#chat").animate({scrollTop: 20000000}, "slow");
        let data = {
            '_token': $('meta[name=csrf-token]').attr('content'),
            body: body
        }

        $.ajax({
            url: url,
            method: 'POST',
            data: data
        })
    }
});


window.Echo.channel('chat-group')
    .listen('MessageDelivered', (e) => {


        //console.log(e.message.body);
        $('#chat').append(`
        <div class="mt-4 w-50 text-white p-3 rounded  float-left bg-dark">
                                    <p>${e.message.user.name}</p>
                                    <p>${e.message.body}</p>
                                </div>
                                <div class="clearfix"></div>
        `)
        $("#chat").animate({scrollTop: 20000000}, "slow");
    });

