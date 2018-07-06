const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');


var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});


closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};


map.on('singleclick', function(evt) {
    const coordinate = evt.coordinate;
    const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
        '</code>';
    overlay.setPosition(coordinate);
});

map.addOverlay(overlay);