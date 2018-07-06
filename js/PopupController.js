
class PopupController {

    constructor(map, layers) {
        this.map = map;
        this.popupLayer = layers;
        this.container = document.getElementById('popup');
        this.content = document.getElementById('popup-content');
        this.closer = document.getElementById('popup-closer');
        this.overlay = this.initOverlay();
        this.initCloser();
        this.clickCoordinates = null;
        this.initClickCoordinatesOnChangeListener();
        this.selectInteraction = this.initSelectInteraction()
    }

    initOverlay() {
        var overlay = new ol.Overlay({
            element: this.container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        this.map.addOverlay(overlay);
        return overlay;
    }

    initCloser() {
        var self = this;
        this.closer.onclick = function () {
            self.overlay.setPosition(undefined);
            self.closer.blur();
            return false;
        };
    }

    initClickCoordinatesOnChangeListener() {
        var self = this;
        this.map.on('singleclick', function (evt) {
            self.clickCoordinates = evt.coordinate;
        });
    }

    initSelectInteraction() {
        var selectInteraction = new ol.interaction.Select({
            wrapX: false,
            layers: [
                this.popupLayer
            ]
        });

        var self = this;
        selectInteraction.on('select', function (e) {
            self.content.innerHTML = '<p>' + e.selected[0].getProperties()['type'] + '</p>';
            self.overlay.setPosition(self.clickCoordinates);
            selectInteraction.getFeatures().clear();
        });

        this.map.addInteraction(selectInteraction);
        return selectInteraction;
    }
}
