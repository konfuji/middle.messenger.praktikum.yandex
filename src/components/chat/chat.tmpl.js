export default `
<div class="chat">
    <div class="chat__pic-container">
        <div class="chat__pic">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#EDEDED"/>
            </svg>
        </div>
    </div>
    <div class="chat__preview-container">
        <div class="chat__preview-row">
            <div class="chat__title">{{title}}</div>
            <div class="chat__timestamp">{{timestamp}}</div>
        </div>
        <div class="chat__preview-row">
            <div class="chat__lastMessage">{{breaklines lastMessage}}</div>
            {{#if unreadCount}}
            <div class="chat__unreadCount">{{unreadCount}}</div>
            {{/if}}
        </div>
    </div>
</div>
`;