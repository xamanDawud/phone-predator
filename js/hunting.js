let loadPhoneData = async(search) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    let res = await fetch(url);
    let data = await res.json();
    getPhones(data.data);
};

let getPhones = (phoneData) => {
    let section = document.getElementById("display-phone");
    section.innerHTML = "";
    let noPhone = document.getElementById("no-phone-status");
    if (phoneData.length === 0) {
        noPhone.classList.remove("d-none");
        loaderStop();
    } else {
        noPhone.classList.add("d-none");
    }
    // phoneData = phoneData.slice(0, 5);
    phoneData.forEach((phone) => {
        let div = document.createElement("div");
        div.innerHTML = `
                    <div class="card p-3">
                        <img src="${phone.image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">
                                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                    </div>
            `;
        div.classList.add("col");
        section.appendChild(div);
        loaderStop();
    });
};

document.getElementById("btn").addEventListener("click", function() {
    let inputField = document.getElementById("search-input");
    let inputFieldValue = inputField.value;
    loadPhoneData(inputFieldValue);
    inputField.value = "";
    // load Start
    loader();
});

function loader() {
    let loaderSection = document.getElementById("spinners");
    loaderSection.classList.remove("d-none");
}

function loaderStop() {
    let loaderSection = document.getElementById("spinners");
    loaderSection.classList.add("d-none");
}