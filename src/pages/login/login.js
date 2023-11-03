import Handlebars from "handlebars";
import template from "./login.tmpl.js"
import "./login.css"

import button from "../../components/button/button.js";
import input from "../../components/input/input.js";
import link from "../../components/link/link.js";

export default (props = {}) => {
    props.inputLogin = input({name: "login", placeholder: "Логин"});
    props.inputPassword = input({name: "password", placeholder: "Пароль"});

    props.buttonLogin = button({text: "Войти", type: "submit"});

    props.registrationLink = link({href: "/signin", text: "Зарегистрироваться"});

    return Handlebars.compile(template)(props);
}
