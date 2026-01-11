//Assignment 3: Application Settings Controller 
//--------------------------------------------- 
//Scenario : A web app stores user preferences as settings. 
//Test data:  
      //const settings = { 
     // theme: "light", 
     // notifications: true, 
     // autoSave: false, 
     // language: "en" 
     // };

//Tasks : 
 // 1.Toggle theme between "light" and "dark" 
 // 2. Turn autoSave to true 
 // 3. Remove the notifications setting 
 // 4. Freeze the settings object so it cannot be modified

// Test data
const settings = {
  theme: "light",
  notifications: true,
  autoSave: false,
  language: "en"
};

// 1. Toggle theme between "light" and "dark"
settings.theme = (settings.theme === "light") ? "dark" : "light";
console.log("Theme after toggle:", settings.theme);

// 2. Turn autoSave to true
settings.autoSave = true;
console.log("AutoSave enabled:", settings.autoSave);

// 3. Remove the notifications setting
delete settings.notifications;
console.log( settings);

// 4. Freeze the settings object so it cannot be modified
Object.freeze(settings);
console.log("Settings object is now frozen.");

// Attempt to modify after freeze (will not work)
settings.language = "fr";     
settings.newSetting = "test";  
console.log(settings);
