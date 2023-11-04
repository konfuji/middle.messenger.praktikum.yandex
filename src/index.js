import "./app.css";

// Import pages
import login from "./pages/login/login.js";
import signin from "./pages/signin/signin.js";
import profile from "./pages/profile/profile.js";
import profileEdit from "./pages/profileEdit/profileEdit.js";
import chats from "./pages/chats/chats.js";
import error from "./pages/error/error.js";

document.addEventListener("DOMContentLoaded", () => {
    const routes = {
        "/": login,
        "/signin": signin,
        "/profile": profile,
        "/profile-edit": profileEdit,
        "/chats": chats,
        "/500": error
    };
    const pathname = window.location.pathname;
    const root = document.querySelector("#app");

    try {
        if (routes[pathname] !== undefined) {
                root.innerHTML = routes[pathname]();
        } else {
            root.innerHTML = error({code: 404, title: "Такой страницы не существует"});
        }
    } catch (err) {
        console.log(err);
        root.innerHTML = error();
    }
});
