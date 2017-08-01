import re
import json
import urllib

# Open the file
f = open("allHTML.txt")
filename = f.read()

# Grab all links
urls = re.findall(r'<a[^>]* href="/kata/([^"]*)"', filename) # original

# At this point, we have a list with all the urls to the programming questions

# Now make it so that we only have one link to each problem

links = set()

for u in urls:
  links.add('https://www.codewars.com/api/v1/code-challenges/' + u.split('/')[0])

# links now has all the urls to the JSON data for each coding challenge
# Now, let's actually grab the JSON data and put it into a JSON file
print len(links)

"""
for l in links:
  url = l
  response = urllib.urlopen(l)
  data = json.loads(response.read())
  # write JSON data to file
  with open('working.json', 'a') as outfile:
    json.dump(data, outfile, indent = 0)
"""

# Because of Chrome's security policies which prevent loading a local JSON file,
# we will instead write each of the links onto a line of a text file

outFile = open("links.txt", 'w')
for l in links:
  print >>outFile, l
outFile.close()
