function getTextPolygonFeatureStyle(feature) {

    var properties = feature.getProperties();
    var text = properties['text'];
    var textColor = properties['textColor'];
    var color = properties['color'];

    return new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: color
        }),
        text: new ol.style.Text({
            textAlign: 'center',
            font: 'Arial',
            text: text,
            fill: new ol.style.Fill({color: textColor}),
            placement: 'point'
        })
    });


}



function getIconFeatureStyle(feature) {
    var url = baseUrl + feature.getProperties()['icon-name'];
    return new ol.style.Style({
        image: new ol.style.Icon(({
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: url
        })),
        zIndex: 0
    });

}

var objectsStyleFunc = function (feature, extentInfo) {

    var featureType = feature.getProperties()['type'];
    switch(featureType) {

        case 'icon':
            return getIconFeatureStyle(feature);

        case 'grass':
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgb(195, 223, 134)'
                })
            });

        case 'road':
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgb(214, 214, 194)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#9EA6A8',
                    width: 3
                })
            });

        case 'boundary':
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgb(195, 223, 134)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgb(108, 141, 37)',
                    width: 3
                })
            });

        case 'other_polygon':
            return getTextPolygonFeatureStyle(feature);
    }

};