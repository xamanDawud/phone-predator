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
        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Show Details
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
        `;
        div.classList.add("col");
        section.appendChild(div);
        loaderStop();
    });
};

document
    .getElementById("search-input")
    .addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchResult();
        }
    });

document.getElementById("btn").addEventListener("click", function() {
    searchResult();
});

function searchResult() {
    let inputField = document.getElementById("search-input");
    let inputFieldValue = inputField.value;
    loadPhoneData(inputFieldValue);
    inputField.value = "";
    // load Start
    loader();
}

function loader() {
    let loaderSection = document.getElementById("spinners");
    loaderSection.classList.remove("d-none");
}

function loaderStop() {
    let loaderSection = document.getElementById("spinners");
    loaderSection.classList.add("d-none");
}