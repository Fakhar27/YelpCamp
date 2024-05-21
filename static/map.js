mapboxgl.accessToken = 'pk.eyJ1IjoicmVhcGVyMjciLCJhIjoiY2x1Y3IwbmhwMHNqNTJwcGd6eHF4bGs5dyJ9.KWE1Q5JPaPh3KsJpcxzXzg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [longitude, latitude],
    zoom: 10
});

new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);