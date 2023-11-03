import Handlebars from "handlebars";
import template from "./profileEdit.tmpl.js"
import "./profileEdit.css"

import popup from "../../components/popup/popup.js";
import input from "../../components/input/input.js";
import button from "../../components/button/button.js";

export default (props = {}) => {
    props.fields = [
        {label: "Почта", for: "email", input: input({name: "email", value: "konfuji@yandex.ru"})},
        {label: "Логин", for: "login", input: input({name: "login", value: "konfuji"})},
        {label: "Имя", for: "first_name", input: input({name: "first_name", value: "Александр"})},
        {label: "Фамилия", for: "second_name", input: input({name: "second_name", value: "Привалов"})},
        {label: "Имя в чате", for: "display_name", input: input({name: "display_name", value: "Александр П."})},
        {label: "Телефон", for: "phone", input: input({name: "phone", value: "03"})},
    ];

    props.button = button({text: "Сохранить"})

    const popupProps = {
        title: "Изменить данные",
        body: Handlebars.compile(template)(props)
    };

    return popup(popupProps);
}