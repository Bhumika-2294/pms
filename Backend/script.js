const container = document.querySelector(".container");
const slots = document.querySelectorAll(".row .slot:not(.sold)"); // Fixed selector
const count = document.getElementById("count");
const total = document.getElementById("total");
const parkingSelect = document.getElementById("parking");

populateUI();

let ticketPrice = +parkingSelect.value; // Fixed nodeValue to value

function setparkingData(parkingIndex, parkingPrice) {
    localStorage.setItem("selectedparkingIndex", parkingIndex);
    localStorage.setItem("selectedparkingPrice", parkingPrice);
}

function updateSelectedCount() {
    const selectedSlots = document.querySelectorAll('.row .slot.selected'); // Fixed selector

    const selectedSlotsCount = selectedSlots.length; // Removed space between selectedSlots and Count

    count.innerText = selectedSlotsCount;

    total.innerText = selectedSlotsCount * ticketPrice;

    setparkingData(parkingSelect.selectedIndex, parkingSelect.value);
}

function populateUI() {
    const selectedSlots = JSON.parse(localStorage.getItem("selectedSlots"));
    if (selectedSlots !== null && selectedSlots.length > 0) { // Fixed condition
        selectedSlots.forEach(index => {
            slots[index].classList.add("selected");
        });
    }

    const selectedparkingIndex = localStorage.getItem("selectedparkingIndex");
    if (selectedparkingIndex !== null) {
        parkingSelect.selectedIndex = selectedparkingIndex;
    }
}

parkingSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setparkingData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("slot") && !e.target.classList.contains("sold")) {
        e.target.classList.toggle("selected"); // Fixed syntax and logic issue
        updateSelectedCount(); // Removed unnecessary colon and void
    }
});

updateSelectedCount();
