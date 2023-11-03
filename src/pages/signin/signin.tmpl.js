export default `
<div class="popup__container">
    <div class="popup">
        <div class="popup__header">
            <div class="popup__title">Регистрация</div>
        </div>
        <div class="popup__body">
            <form class="login-form">
                {{{inputEmail}}}
                {{{inputLogin}}}
                {{{inputFirstName}}}
                {{{inputSecondName}}}
                {{{inputPhone}}}
                {{{inputPassword}}}
                {{{inputRepeatPassword}}}
                <div class="login-form__button-container">
                    {{{buttonLogin}}}
                </div>
            </form>
            {{{registrationLink}}}
        </div>
    </div>
</div>
`;