"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTemplate = void 0;
const htmlTemplate = (user_name, link) => {
    return `
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<body style="padding-right:7px;padding-left:7px;">

<div>
<h1>Hi, ${user_name}</h1>
</div>

<div style="margin-top: 10px;">
<p> You have been invited to collaborate on a 
document click this link to perticipate</p>
</div>


<div style="margin-top: 5px;"><p>${link}</p></div>

</body>

</html>`;
};
exports.htmlTemplate = htmlTemplate;
//# sourceMappingURL=emailTemplate.js.map