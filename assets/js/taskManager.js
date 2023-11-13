document.addEventListener("DOMContentLoaded", function (event) {
    let container = document.getElementById("ToDo");
    
});

function EditTitle () {
    let title = document.getElementById('title');
    title.removeAttribute('readonly');
    
    let iconedit = document.getElementById('icon-edit');
    iconedit.style.display = "none";

    let iconsave = document.getElementById('icon-save');
    iconsave.style.display = "block";
}