
console.log("Connected");

const IPelement = document.querySelector(".searchContainer input");
const button = document.querySelector(".searchContainer button");
const form = document.querySelector("form");
const details = document.querySelector("#details");

const IPDetails = document.querySelector("#IPDetails h4");
const LocDetails = document.querySelector("#LocDetails h4");
const TZDetails = document.querySelector("#TZDetails h4");
const ISPDetails = document.querySelector("#ISPDetails h4");



IPelement.addEventListener("change", (event) => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        axios.get(`https://ipapi.co/${event.target.value}/json/`)
            .then((res) => {
                console.log(res);
                let lat = res.data.latitude;
                let lon = res.data.longitude;

                IPDetails.textContent = res.data.ip;
                LocDetails.textContent = `${res.data.city}, ${res.data.country}`;
                TZDetails.textContent = res.data.timezone;
                ISPDetails.textContent = res.data.org;

                const map = L.map('map', {
                    center: [lat + 0.05, lon],
                    zoom: 11,
                    zoomControl: false
                });

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 15,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                let myIcon = L.icon({
                    iconUrl: 'https://static.vecteezy.com/system/resources/previews/010/157/991/original/pin-location-icon-sign-symbol-design-free-png.png',
                    iconSize: [22, 32],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76]
                });

                L.marker([lat, lon], { icon: myIcon }).addTo(map);
            })
        event.target.value = "";
    });
});





















