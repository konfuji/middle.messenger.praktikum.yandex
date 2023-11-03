export default `
<div class="profile">
    <div class="profile__pic-container">
        <svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36.5" r="36" fill="#EDEDED"/>
        </svg>
        {{{changePicLink}}}
    </div>
    <ul class="profile__fields">
        {{#each fields}}
            <li class="profile__field">
                <div class="profile__field-title">{{this.title}}</div>
                <div class="profile__field-value">{{this.value}}</div>
            </li>
        {{/each}}
    </ul>
    <ul class="profile__links">
        {{#each links}}
            <li class="profile__link">{{{this}}}</li>
        {{/each}}
    </ul>
</div>
`;