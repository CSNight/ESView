$(document).ready(function () {
    $(document).keydown(function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            $('#submit').click()
        }
    });
});

function validateForm() {
    var role = $("#role").val();
    var user = $("#username").val();
    var pwd = $("#pwd").val();
    var pwd_conf = $("#pwd_conf").val();
    if (pwd == pwd_conf) {
        var rest_signup = new RestQueryAjax(signup_callback);
        var data = {
            username: user,
            pwd: pwd,
            role: role
        };
        rest_signup.sign_up_REST(data);
    } else {
        $('#pwd').val('');
        $('#pwd_conf').val('');
        $("#info").html("Twice input don't same!");
    }

}

function signup_callback(res) {
    if (res.response.status == 300 && res.response.message == "db_error") {
        reset('Server invalid!');
    } else if (res.response.status == 403 && res.response.message == "user_exist") {
        reset('User already exist!');
    } else if (res.response.status == 200 && res.response.message == "success") {
        window.location.href = "main.html?role=" + res.response.element.role + "&uid=" + res.response.element.uid;
    }
}

function reset(error) {
    $("#code_img").click();
    $('#username').val('');
    $('#role').val('');
    $('#pwd').val('');
    $('#pwd_conf').val('');
    $('#code').val('');
    $('#info').html(error);
}