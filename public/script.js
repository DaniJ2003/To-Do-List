
const divs = document.getElementById("box");
// console.log(divs);
divs.addEventListener("click", (evt) => {
    const itemSelected = evt.target;
    if(itemSelected.id == "edit") {
        const inpField = itemSelected.parentElement.parentElement.children[2].children[0];
        console.log(inpField);
        inpField.classList.add("clicked");
        inpField.focus();
        inpField.disabled = false;
    }
})


divs.addEventListener("mouseover", (evt) => {
    const itemSelected = evt.target;
    if(itemSelected.id == 'edit' || itemSelected.id == 'delete') {
        itemSelected.classList.add("fa-bounce");
        itemSelected.addEventListener("mouseout", (evt) => {
            itemSelected.classList.remove("fa-bounce");
        })
    }
})
