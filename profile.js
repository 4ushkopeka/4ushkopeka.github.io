function ShowInfo(){
    let perinfo = document.querySelector("body > section > section.skills > section.personalsec");
    let extrainfo = document.querySelector("body > section > section.skills > section.extracurricular");
    let personalbtn = document.querySelector("body > section > section.buttons > button.personal");
    let extrabtn = document.querySelector("body > section > section.buttons > button.extracurr");
personalbtn.addEventListener("click", () => {
if(perinfo.style.display==="none"){
    perinfo.style.display = "block";
    personalbtn.textContent="Hide Personal";
}
else{
    perinfo.style.display="none";
    personalbtn.textContent="Personal";
}
});
extrabtn.addEventListener("click", () => {
    if(extrainfo.style.display==="none"){
        extrainfo.style.display = "block";
        extrabtn.textContent="Hide Extras";
    }
    else{
        extrainfo.style.display="none";
        extrabtn.textContent="Extracurricular";
    }
    });
}