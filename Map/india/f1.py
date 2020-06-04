from sys import argv
from os.path import exists
import simplejson as json 

script, in_file, out_file = argv

data = json.load(open(in_file))

geojson = {}
geojson["state"]=[{"name":key,
"lati":data[key]["lat"],
"longi":data[key]["long"]} for key,_ in data.items()]

output = open(out_file, 'w')
json.dump(geojson, output)

#print (geojson)