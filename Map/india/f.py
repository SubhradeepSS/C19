from sys import argv
from os.path import exists
import simplejson as json 

script, in_file, out_file = argv

data = json.load(open(in_file))

geojson = {key:{"lat":val[0], "long":val[1]} for key,val in data.items()}


output = open(out_file, 'w')
json.dump(geojson, output)

#print (geojson)