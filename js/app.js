document.addEventListener("DOMContentLoaded", function () {

    getSatelliteImagery();

});

function getSatelliteImagery() {

    let polygon = {
        "name": "Polygon Schouwen-Duiveland",
        "geo_json": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [3.685345, 51.687754], [3.688882, 51.692321], [3.702759, 51.695959], [3.711433, 51.694808], [3.7138, 51.690147], [3.710576, 51.687858], [3.714089, 51.681564], [3.702603, 51.66984], [3.689831, 51.676309], [3.685345, 51.687754]
                    ]
                ]
            }
        }
    };

    let startDate = '1514764800';
    let endDate = '1546300800';

    let resMin = '2000px';
    let resMax = '4000px';

    let polygonApi = 'http://api.agromonitoring.com/agro/1.0/polygons?appid=939760b5a6397a0cad669993798cf61e';
    let agroApi = 'http://api.agromonitoring.com/agro/1.0/image/search?start=' + startDate + '&end=' + endDate + '&polyid=5c9cd168c70805000ec710be&appid=939760b5a6397a0cad669993798cf61e&resolution_min=' + resMin + '&resolution_max=' + resMax + '';

    fetch(polygonApi, {

        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(polygon)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetch(agroApi)
                .then(response => response.json())
                .then(data => {
                    for(i = 0; i < data.length; i++){
                        console.log(data[i].image.ndvi);
                    }
                    // let map = document.createElement('div');
                    // map.className = 'map';
                    // map.style.backgroundImage = "url('"+data[5].image.truecolor+"')";
                    // document.body.appendChild(map);
                    // let link = data[5].tile.truecolor;
                    //
                    // L.tileLayer("http://api.agromonitoring.com/tile/1.0/{z}/{x}/{y}/0005b590f00/5c9cd168c70805000ec710be?appid=939760b5a6397a0cad669993798cf61e&polyid=5c9cd168c70805000ec710be", {
                    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                    // }).addTo(map);
                    // for (i = 0; i < data.length; i++) {
                    //     // console.log(data[i]);
                    // }
                    // var map = new ol.Map({
                    //     target: 'map',
                    //     layers: [
                    //         new ol.layer.Tile({
                    //             source: new ol.source.OSM({
                    //                 url: link
                    //             }),
                    //         })
                    //     ],
                    //     view: new ol.View({
                    //         center: ol.proj.fromLonLat([37.41, 8.82]),
                    //         zoom: 4
                    //     })
                    // });
                })

        });

}