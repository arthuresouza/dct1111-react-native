//<!-- Código que adiciona os eventos -->    
document.addEventListener("DOMContentLoaded", () => {
    const viewModel = new ContactViewModel();
    new ContactView(viewModel);
});