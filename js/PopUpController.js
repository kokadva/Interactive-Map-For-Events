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

map.addOverlay(overlay);

var clickCoordinates = null;

map.on('singleclick', function(evt) {
    clickCoordinates = evt.coordinate;
});


var selectInteraction = new ol.interaction.Select({
    wrapX: false,
    layers: [
        openairObjectsLayer
    ]
});

selectInteraction.on('select', function (e) {
    content.innerHTML = '<p>' + e.selected[0].getProperties()['type'] + '</p>';
    overlay.setPosition(clickCoordinates);
    selectInteraction.getFeatures().clear();
});

map.addInteraction(selectInteraction);