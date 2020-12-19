"use strict";

import { userProfile } from "./login.js";

const loginProfileName = document.getElementById("login-profile-name");
function SetProfileName(name) {
	console.log("from func", name.firstname, name);
	loginProfileName.textContent = `${name.firstname}`;
}
SetProfileName(userProfile);

console.log("userProfile sharedVar: ", userProfile, userProfile.firstname);
