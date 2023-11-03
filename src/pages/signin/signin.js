import Handlebars from "handlebars";
import template from "./signin.tmpl.js"
import "./signin.css"

import button from "../../components/button/button.js";
import input from "../../components/input/input.js";
import link from "../../components/link/link.js";

export default (props = {}) => {
    props.inputEmail = input({name: "email", placeholder: "Email"});
    props.inputLogin = input({name: "login", placeholder: "Логин"});
    props.inputFirstName = input({name: "first_name", placeholder: "Имя"});
    props.inputSecondName = input({name: "second_name", placeholder: "Фамилия"});
    props.inputPhone = input({name: "phone", placeholder: "Телефон"});
    props.inputPassword = input({name: "password", placeholder: "Пароль"});
    props.inputRepeatPassword = input({name: "repeat_password", placeholder: "Пароль (ещё раз)"});

    props.buttonLogin = button({text: "Зарегистрироваться", type: "submit"});

    props.registrationLink = link({href: "/", text: "Войти"});

    return Handlebars.compile(template)(props);
}
