mapboxgl.accessToken = 'pk.eyJ1IjoicmVhcGVyMjciLCJhIjoiY2x1Y3IwbmhwMHNqNTJwcGd6eHF4bGs5dyJ9.KWE1Q5JPaPh3KsJpcxzXzg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [66.91869, 32.16683],
    zoom: 3.7,
});

// console.log(campgrounds)


// map.on('load', function () {
//     map.addSource('campgrounds', {
//         type: 'geojson',
//         data: campgrounds,
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'campgrounds',
//         filter: ['has', 'point_count'],
//         paint: {
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#00BCD4',
//                 10,
//                 '#2196F3',
//                 30,
//                 '#3F51B5'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 10,
//                 20,
//                 30,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'campgrounds',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': '{point_count_abbreviated}',
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'campgrounds',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         }
//     });

//     map.on('click', 'clusters', function (e) {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('campgrounds').getClusterExpansionZoom(
//             clusterId,
//             function (err, zoom) {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });

//     map.on('click', 'unclustered-point', function (e) {
//         const { popUpMarkup } = e.features[0].properties;
//         const coordinates = e.features[0].geometry.coordinates.slice();

//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(popUpMarkup)
//             .addTo(map);
//     });

//     map.on('mouseenter', 'clusters', function () {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', function () {
//         map.getCanvas().style.cursor = '';
//     });
// });

// map.on('load', () => {
//     // Add a new source from our GeoJSON data and
//     // set the 'cluster' option to true. GL-JS will
//     // add the point_count property to your source data.
//     map.addSource('earthquakes', {
//         type: 'geojson',
//         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
//         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
//         data: '/campgrounds.geojson',
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         paint: {
//             // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
//             // with three steps to implement three types of circles:
//             //   * Blue, 20px circles when point count is less than 100
//             //   * Yellow, 30px circles when point count is between 100 and 750
//             //   * Pink, 40px circles when point count is greater than or equal to 750
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#51bbd6',
//                 100,
//                 '#f1f075',
//                 750,
//                 '#f28cb1'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 20,
//                 100,
//                 30,
//                 750,
//                 40
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': ['get', 'point_count_abbreviated'],
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         }
//     });

//     // inspect a cluster on click
//     map.on('click', 'clusters', (e) => {
//         console.log('clicked on cluster')
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('earthquakes').getClusterExpansionZoom(
//             clusterId,
//             (err, zoom) => {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });

//     // When a click event occurs on a feature in
//     // the unclustered-point layer, open a popup at
//     // the location of the feature, with
//     // description HTML from its properties.
//     map.on('click', 'unclustered-point', (e) => {
//         console.log('clicked on unclustered point')
//         const coordinates = e.features[0].geometry.coordinates.slice();
//         const title = e.features[0].properties.title;
//         const description = e.features[0].properties.description;

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(`<h3>${title}</h3><p>${description}</p>`)
//             .addTo(map);
//     });


//     map.on('mouseenter', 'clusters', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', () => {
//         map.getCanvas().style.cursor = '';
//     });
// });



// map.on('load', () => {
//     map.addSource('campsites', {
//         type: 'geojson',
//         data: '/campgrounds.geojson',
//     });

//     // Add circle layer for campsite locations
//     map.addLayer({
//         'id': 'campsite-circles',
//         'type': 'circle',
//         'source': 'campsites',
//         'paint': {
//             'circle-color': '#4264fb',
//             'circle-radius': 6,
//             'circle-stroke-width': 2,
//             'circle-stroke-color': '#ffffff'
//         }
//     });

//     // Create a popup, but don't add it to the map yet.
//     const popup = new mapboxgl.Popup({
//         closeButton: false,
//         closeOnClick: false
//     });

//     // Show popup on hover
//     map.on('mouseenter', 'campsite-circles', (e) => {
//         const coordinates = e.features[0].geometry.coordinates.slice();
//         const title = e.features[0].properties.title;
//         const description = e.features[0].properties.description;

//         popup.setLngLat(coordinates)
//             .setHTML(`<h3>${title}</h3><p>${description}</p>`)
//             .addTo(map);
//     });

//     // Hide popup on mouse leave
//     map.on('mouseleave', 'campsite-circles', () => {
//         popup.remove();
//     });

//     map.on('click', (e) => {
//         console.log('Map clicked:', e.lngLat);
//     });
// });


// campgroundData.forEach(campground => {
//     new mapboxgl.Marker()
//         .setLngLat(campground.geometry.coordinates)
//         .setPopup(
//             new mapboxgl.Popup({ offset: 25 })
//                 .setHTML(
//                     `<h3>${campground.title}</h3><p>${campground.location}</p>`
//                 )
//         )
//         .addTo(map);
// });

// map.on('load', () => {
//     map.addSource('earthquakes', {
//         type: 'geojson',
//         data: '/campgrounds.geojson',
//         cluster: true,
//         clusterMaxZoom: 14,
//         clusterRadius: 40
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         paint: {
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#80ed99',
//                 3,
//                 '#758bfd',
//                 7,
//                 '#e63946',
//                 15,
//                 '#fb6f92',
//                 20,
//                 '#ffc300'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 40,
//                 19,
//                 100,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': ['get', 'point_count_abbreviated'],
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     // Add default markers for unclustered points
//     campgrounds.features.forEach((campground) => {
//         // Create a new Marker for each campground and add it to the map
//         const marker = new mapboxgl.Marker()
//             .setLngLat(campground.geometry.coordinates) // Set the campground's coordinates
//             .setPopup(new mapboxgl.Popup().setHTML(`<strong>${campground.properties.title}</strong><br>${campground.properties.description}`))
//             .addTo(map);
//     });


// map.on('click', 'clusters', (e) => {
//     const features = map.queryRenderedFeatures(e.point, {
//         layers: ['clusters']
//     });
//     const clusterId = features[0].properties.cluster_id;
//     map.getSource('earthquakes').getClusterExpansionZoom(
//         clusterId,
//         (err, zoom) => {
//             if (err) return;

//             map.easeTo({
//                 center: features[0].geometry.coordinates,
//                 zoom: zoom
//             });
//         }
//     );
// });


// map.on('click', 'unclustered-point', (e) => {
//     const { title, description } = e.features[0].properties;
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }

//     new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML(
//             `<strong>${title}</strong><br>${description}`
//         )
//         .addTo(map);
// });


// map.on('mouseenter', 'clusters', () => {
//     map.getCanvas().style.cursor = 'pointer';
// });
// map.on('mouseleave', 'clusters', () => {
//     map.getCanvas().style.cursor = '';
// });
// });


// map.on('load', () => {
//     map.addSource('earthquakes', {
//         type: 'geojson',
//         data: '/campgrounds.geojson',
//         cluster: true,
//         clusterMaxZoom: 14,
//         clusterRadius: 40
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         paint: {
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#80ed99',
//                 3,
//                 '#758bfd',
//                 7,
//                 '#e63946',
//                 15,
//                 '#fb6f92',
//                 20,
//                 '#ffc300'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 40,
//                 19,
//                 100,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': ['get', 'point_count_abbreviated'],
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         }
//     });

//     campgrounds.features.forEach((campground) => {
//         const marker = new mapboxgl.Marker()
//             .setLngLat(campground.geometry.coordinates)
//             .setPopup(new mapboxgl.Popup().setHTML(`<strong>${campground.properties.title}</strong><br>${campground.properties.description}`))
//             .addTo(map);
//     });

//     map.on('click', 'clusters', (e) => {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('earthquakes').getClusterExpansionZoom(
//             clusterId,
//             (err, zoom) => {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });


//     map.on('click', 'unclustered-point', (e) => {
//         const { title, description } = e.features[0].properties;
//         const coordinates = e.features[0].geometry.coordinates.slice();

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(`<strong>${title}</strong><br>${description}`)
//             .addTo(map);
//     });

//     map.on('mouseenter', 'clusters', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });

//     map.on('mouseleave', 'clusters', () => {
//         map.getCanvas().style.cursor = '';
//     });
// });




map.on('load', () => {
    map.addSource('earthquakes', {
        type: 'geojson',
        data: '/campgrounds.geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 40
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#80ed99',
                3,
                '#758bfd',
                7,
                '#e63946',
                15,
                '#fb6f92',
                20,
                '#ffc300'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                40,
                19,
                100,
                25
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    // Add default markers for unclustered points
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addLayer({
                id: 'unclustered-point',
                type: 'symbol',
                source: 'earthquakes',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': 'custom-marker', // Use the custom marker icon
                    'icon-size': 0.5,
                    'icon-allow-overlap': true,
                    // 'text-field': ['get', 'title'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-anchor': 'top'
                },
                paint: {
                    'text-color': '#000000'
                }
            });
        }
    );

    map.on('click', 'clusters', (e) => {
        // Cluster click event handling
    });

    map.on('click', 'unclustered-point', (e) => {
        const { title, description } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${title}</strong><br>${description}`)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});

// let page = 1; // Initial page number
// let loading = false; // Flag to prevent multiple simultaneous requests

// // Function to fetch more campgrounds
// function fetchMoreCampgrounds() {
//     if (!loading) {
//         loading = true;
//         const url = `/campgrounds?page=${page + 1}`; // API endpoint to fetch next page
//         fetch(url)
//             .then(response => response.text())
//             .then(html => {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(html, 'text/html');
//                 const newCampgrounds = doc.getElementById('campgrounds-container').innerHTML;
//                 document.getElementById('infinite-scroll-placeholder').insertAdjacentHTML('beforebegin', newCampgrounds);
//                 page++;
//                 loading = false;
//             })
//             .catch(error => {
//                 console.error('Error fetching more campgrounds:', error);
//                 loading = false;
//             });
//     }
// }

// // Event listener for scroll
// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 100) {
//         fetchMoreCampgrounds();
//     }
// });



// map.on('load', () => {
//     // Add a new source from our GeoJSON data and
//     // set the 'cluster' option to true. GL-JS will
//     // add the point_count property to your source data.
//     map.addSource('earthquakes', {
//         type: 'geojson',
//         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
//         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
//         data: '/campgrounds.geojson',
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 40 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         paint: {
//             // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
//             // with three steps to implement three types of circles:
//             //   * Blue, 20px circles when point count is less than 100
//             //   * Yellow, 30px circles when point count is between 100 and 750
//             //   * Pink, 40px circles when point count is greater than or equal to 750
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#80ed99',
//                 3,
//                 '#758bfd',
//                 7,
//                 '#e63946',
//                 15,
//                 '#fb6f92',
//                 20,
//                 '#ffc300'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 40,
//                 19,
//                 100,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'earthquakes',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': ['get', 'point_count_abbreviated'],
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'earthquakes',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         },
//         interactive: true
//     });

//     // inspect a cluster on click
//     map.on('click', 'clusters', (e) => {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('earthquakes').getClusterExpansionZoom(
//             clusterId,
//             (err, zoom) => {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });

//     // When a click event occurs on a feature in
//     // the unclustered-point layer, open a popup at
//     // the location of the feature, with
//     // description HTML from its properties.
//     map.on('click', 'unclustered-point', (e) => {
//         const { title, description } = e.features[0].properties;
//         const coordinates = e.features[0].geometry.coordinates.slice();

//         // Ensure that if the map is zoomed out such that
//         // multiple copies of the feature are visible, the
//         // popup appears over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//                 `<strong>${title}</strong><br>${description}`
//             )
//             .addTo(map);
//     });


//     map.on('mouseenter', 'clusters', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', () => {
//         map.getCanvas().style.cursor = '';
//     });
// });





// map.on('load', function () {
//     // Add a new source from our GeoJSON data and
//     // set the 'cluster' option to true. GL-JS will
//     // add the point_count property to your source data.
//     map.addSource('campground', {
//         type: 'geojson',
//         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
//         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
//         data: campground,
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'campground',
//         filter: ['has', 'point_count'],
//         paint: {
//             // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
//             // with three steps to implement three types of circles:
//             //   * Blue, 20px circles when point count is less than 100
//             //   * Yellow, 30px circles when point count is between 100 and 750
//             //   * Pink, 40px circles when point count is greater than or equal to 750
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#00BCD4',
//                 10,
//                 '#2196F3',
//                 30,
//                 '#3F51B5'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 10,
//                 20,
//                 30,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'campground',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': '{point_count_abbreviated}',
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'campground',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         }
//     });

//     // inspect a cluster on click
//     map.on('click', 'clusters', function (e) {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('campground').getClusterExpansionZoom(
//             clusterId,
//             function (err, zoom) {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });

//     // When a click event occurs on a feature in
//     // the unclustered-point layer, open a popup at
//     // the location of the feature, with
//     // description HTML from its properties.
//     map.on('click', 'unclustered-point', function (e) {
//         const { popUpMarkup } = e.features[0].properties;
//         const coordinates = e.features[0].geometry.coordinates.slice();

//         // Ensure that if the map is zoomed out such that
//         // multiple copies of the feature are visible, the
//         // popup appears over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(popUpMarkup)
//             .addTo(map);
//     });

//     map.on('mouseenter', 'clusters', function () {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', function () {
//         map.getCanvas().style.cursor = '';
//     });
// });