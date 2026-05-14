//User interaction

//handling elements
    //read element
    let element=document.querySelector('h1')
    let btn=document.querySelector("button")
    //attach event handler
    btn.addEventListener('click',()=>{
        element.textContent="Hello..."
        element.style.color='red'
        element.style.fontsize='5rem'
    })

    //read all the elements
    let form=document.querySelector("form");
        let usernameInput=document.querySelector("#username");
        let passwordInput=document.querySelector("#password")
        let submitbutton=document.querySelector(".sb");
//add form submit 
    submitbutton.addEventListener("click",(e)=>{
        //auto stop page reading
        e.preventDefault();

        let username=usernameInput.value;
        let password=passwordInput.value;
        console.log({username,password})
    })

    //read button
    let createChildBtn=document.querySelector('.create-child');
    let parent=document.querySelector(".parent")

    createChildBtn.addEventListener('click',()=>{
        let newpara=document.createElement('p')
        newpara.textContent="new child"
        parent.appendChild(newpara);
    })