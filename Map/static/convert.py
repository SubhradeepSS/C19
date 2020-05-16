from sys import argv
from os.path import exists
import simplejson as json 

script, in_file, out_file = argv

data = json.load(open(in_file))

geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d["longitude"], d["latitude"]],
            },
        "properties" : {
                'description':
                 f'<h1>{d["name"]},{d["country"]}</h1><div><strong>Infected</strong>: {d["infected"]}<br><strong>Recovered</strong>: {d["recovered"]}<br><strong>Death</strong>: {d["dead"]}<br><strong>Active</strong>: {d["sick"]}<br></div>',
                'icon': 'theatre'
                },
     } for d in data]
}


output = open(out_file, 'w')
json.dump(geojson, output)

#print (geojson)