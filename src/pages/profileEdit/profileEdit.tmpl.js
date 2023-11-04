export default `
<div class="profile-edit">
    <form class="profile-edit__form">
        {{#each fields}}
            <div class="profile-edit__field">
                <label for="{{this.for}}" class="profile-edit__field-label">{{this.label}}</label>
                {{{this.input}}}
            </div>
        {{/each}}
        <div class="profile-edit__button-container">
            {{{button}}}
        </div>
    </form>
</div>
`;
