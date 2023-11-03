export default `
<div class="popup__container">
    <div class="popup">
        <div class="popup__header">
            <div class="popup__title">Вход</div>
        </div>
        <div class="popup__body">
            <form class="login-form">
                {{{inputLogin}}}
                {{{inputPassword}}}
                <div class="login-form__button-container">
                    {{{buttonLogin}}}
                </div>
            </form>
            {{{registrationLink}}}
        </div>
    </div>
</div>
`;