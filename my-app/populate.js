
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2t6eWx4Z295MDFrczNpbTkxc3N0dGtlaiJ9.SZjeDoboYp2Dvp0UQVeHZg';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 12,
        center: [-122.4473, 37.7535]
    });

    map.on('load', () => {
        // Add the vector tileset as a source.
        map.addSource('ethnicity', {
            type: 'vector',
            url: 'mapbox://examples.8fgz4egr'
        });
        map.addLayer({
            'id': 'population',
            'type': 'circle',
            'source': 'ethnicity',
            'source-layer': 'sf2010',
            'paint': {
                // Make circles larger as the user zooms from z12 to z22.
                'circle-radius': {
                    'base': 1.75,
                    'stops': [
                        [12, 2],
                        [22, 180]
                    ]
                },
                // Color circles by ethnicity, using a `match` expression.
                'circle-color': [
                    'match',
                    ['get', 'ethnicity'],
                    'White',
                    '#fbb03b',
                    'Black',
                    '#223b53',
                    'Hispanic',
                    '#e55e5e',
                    'Asian',
                    '#3bb2d0',
                    /* other */ '#ccc'
                ]
            }
        });
    });
