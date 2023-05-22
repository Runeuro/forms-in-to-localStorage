window.onload = function () {

    let input_fn = $('.fn-input');
    let input_pw = $('.input_pw');
    let input_yun = $('.yu-name');
    let errorChk = $('.error-input-chk');
    let inputs = document.getElementsByClassName('main-input-text');
    let button = document.getElementById("button");
    let checkbox = $('#checkbox');
    let linkAlready = document.getElementsByClassName('link')[0];

    function replaceForm() {
        document.querySelector('.main-left-title').innerHTML = "Log in to the system";
        document.querySelector('.toRemove1').remove();
        document.querySelector('.toRemove2').remove();
        document.querySelector('.toRemove3').remove();
        document.querySelector('.toRemove4').remove();
        button.innerText = "Sign In";
        linkAlready.innerHTML = "Registration";
        linkAlready.addEventListener('click', null);
        linkAlready.onclick = function (e) {
            window.location.reload()
        };
        button.onclick = function (e) {
            let hasError = false;
            input_yun.css({'border':'1px solid #FFFFFBFF',
                'border-bottom':'1px solid #C6C6C4'});
            input_pw.css({'border':'1px solid #FFFFFBFF',
                'border-bottom':'1px solid #C6C6C4'});
            let erPasLogin = $('#erPasLogin').hide();
            // let erInLogin = $('#erInLogin').hide();
            $('.error-input').hide();
            if (!input_yun.val().match(/^[А-Яа-яA-Za-z0-9-_]+$/)) {
                input_yun.next().show();
                hasError = true;
                input_yun.css({'border':'1px solid red',
                    'border-bottom':'1px solid red'});
                e.preventDefault();
            }
            if (!input_pw.val()) {
            // if (!input_pw.val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                erPasLogin.show();
                hasError = true;
                input_pw.css({'border':'1px solid red',
                    'border-bottom':'1px solid red'});
                e.preventDefault();
            }
            if (hasError === false) {
                let clients = localStorage.getItem('clients');
                let clientsArray = JSON.parse(clients);
                let username = input_yun.val();
                let password = input_pw.val();
                let user = {};
                user= clientsArray.find(item => item.username === username);


                if (user === undefined || user.username !== username) {
                    let erIn = document.getElementById("erIn").innerHTML = "Такой пользователь не зарегестрирован";
                    input_yun.next().show();
                    hasError = true;
                    input_yun.css({
                        'border': '1px solid red',
                        'border-bottom': '1px solid red'
                    });
                    e.preventDefault();
                    return;
                }

                if (user.password !== password) {
                    let erPas = document.getElementById("erPas").innerHTML = "Неверный пароль";
                    input_pw.next().show();
                    hasError = true;
                    input_pw.css({'border':'1px solid red',
                        'border-bottom':'1px solid red'});
                    e.preventDefault();
                    return;
                }

                if (hasError === false) {
                    document.querySelector('.main-left-title').innerHTML = 'Welcome, ' + user.fullName;
                    $('.main-left').addClass('littleBet');
                    button.innerText = "Exit";
                    button.onclick = function (e) { window.location.reload() };
                    document.querySelector('.toRemove9').remove();
                    document.querySelector('.toRemove8').remove();
                    document.querySelector('.toRemove7').remove();
                    linkAlready.remove();
                }
            }
        }
    }

    function createModal() {
        $('.error-input').hide();
        input_yun.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        input_pw.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        let newDivBg = document.createElement('div');
        document.body.appendChild(newDivBg);
        newDivBg.classList.add('grayBg');
        let newDivWindow = document.createElement('div');
        newDivBg.appendChild(newDivWindow);
        newDivWindow.classList.add('little-body');
        newDivWindow.innerHTML = "<span class='modal-txt'>На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию</span>";
        let newDivWindowButton = document.createElement('div');
        newDivWindow.appendChild(newDivWindowButton);
        newDivWindowButton.innerHTML = "<button id=\"modal-button\" class=\"modal-button\" type=\"submit\">ОК</button>";
        let littleButton = document.getElementById('modal-button');
        littleButton.onclick = () => {
            newDivBg.remove();
            replaceForm();
        }

    }

    linkAlready.addEventListener('click', replaceForm);
    button.onclick = function (e) {
        let input_eMail = $('.email-input');
        let input_rpw = $('.input_rpw');
        errorChk.hide();
        $('.error-input').hide();
        let hasError = false;

        input_fn.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        input_yun.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        input_eMail.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        input_pw.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});
        input_rpw.css({'border':'1px solid #FFFFFBFF',
            'border-bottom':'1px solid #C6C6C4'});

        if (!input_fn.val().match(/^[А-Яа-яA-Za-z\s]+$/)) {
            input_fn.next().show();
            hasError = true;
            input_fn.css({'border':'1px solid red',
                'border-bottom':'1px solid red'});
            // alert('Заполните поле Full Name');
            e.preventDefault();
        }
        if (!input_yun.val().match(/^[А-Яа-яA-Za-z0-9-_]+$/)) {
            input_yun.next().show();
            hasError = true;
            input_yun.css({'border':'1px solid red',
                'border-bottom':'1px solid red'});
            // alert('Заполните поле Your username');
            e.preventDefault();
        }
        if (!input_eMail.val().match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            input_eMail.next().show();
            hasError = true;
            input_eMail.css({'border':'1px solid red',
                'border-bottom':'1px solid red'});
            // alert('Заполните поле E-mail');
            e.preventDefault();
        }
        if (!input_pw.val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            input_pw.next().show();
            hasError = true;
            input_pw.css({'border':'1px solid red',
                'border-bottom':'1px solid red'});
            e.preventDefault();
        }
        if (input_pw.val() !== input_rpw.val()) {
            input_rpw.next().show();
            hasError = true;
            input_rpw.css({'border':'1px solid red',
                'border-bottom':'1px solid red'});
            e.preventDefault();
        }
        if (checkbox.prop("checked") !== true) {
            errorChk.show();
            hasError = true;
            e.preventDefault();
        }

        if (hasError === false) {
            let person = {};
            person.fullName = input_fn.val();
            person.username = input_yun.val();
            person.eMail = input_eMail.val();
            person.password = input_pw.val();

            let clients = localStorage.getItem('clients');
            let clientsArray =[];

            if (clients) {
                clientsArray = JSON.parse(clients);
            } else {
                clientsArray.push(person);
            }


            clientsArray.push(person);
            localStorage.setItem('clients', JSON.stringify(clientsArray));


            e.preventDefault();
            input_fn.val("");
            input_yun.val("");
            input_yun.val("");
            input_pw.val("");
            input_rpw.val("");
            input_eMail.val("");
            checkbox.checked = false;
            createModal();
        }
    }
}