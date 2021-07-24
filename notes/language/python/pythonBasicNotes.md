# Python Basic Notes

[[toc]]

## Python Basics

### Basic Types

#### Tuples

tuples in python are immutable

### Basic Control Statement

#### For Loop

```python
for i in range(3): # goes from i = 0 to i = 2
  x += 1

for i in [0, 1, 2]:
  x += 1
```

#### While Loop

```python
while x > 0:
  x -= 1
```

### Functions

```python
def join_name(first_name, last_name):
  joined_name = first_name + " " + last_name
  return joined_name
```

### Classes

```python
class Pet(object):
  def __init__(self, species, color, name):
    self.species = species
    self.color = color
    self.name = name

  def __str__(self):
    return "{0} {1} named {2}.".format(self.color, self.species, self.name)

  def change_name(self, new_name):
    self.name = new_name

my_dog = Pet(species="dog", color="orange", name="Guises")
print(my_dog)
print(my_dog.name)
# => output:
# orange dog named Guises.
# Guises
```

## NumPy Basics

```python
import numpy as np

np.random.seed(seed=1234)
```

### Numpy Array Creation

```python
x = np.array(6)
x.ndim
x.shape
x.size
x.dtype
```

```python
np.zeros((2, 2))
np.ones((2, 2))
np.eye((2))
np.random.random.((2, 2))
```

### Numpy Indexing

```python
x = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
x[:, 1]    # [2, 6, 10]
x[0, :]    # [1, 2, 3, 4]
x[:3, 1:3] # [[2, 3], [6, 7], [10, 11]]
x[[0, 1, 2], [0, 2, 1]] # [1, 7, 10]
```

```python
# Boolean array indexing
x = np.array([[1,2], [3, 4], [5, 6]])
print ("x:\n", x)
print ("x > 2:\n", x > 2)
print ("x[x > 2]:\n", x[x > 2])
# x:
#  [[1 2]
#  [3 4]
#  [5 6]]
# x > 2:
#  [[False False]
#  [ True  True]
#  [ True  True]]
# x[x > 2]:
#  [3 4 5 6]
```

### Numpy Matrix Operations

- math: `x+y`/`x-y`/`x*y` `np.add/subtract/multiply`
- dot product: `a.dot(b)`
- sum: `np.sum(x)`
- column sum: `np.sum(x, axis=0)`
- row sum: `np.sum(x, axis=1)`
- transposing: `x.T`
- reshape: `np.reshape(x, (2, 3))`

## CLI Application

### Basic CLI

```python
import click

from caesar_encryption import encrypt

@click.command()
@click.option(
    '--input_file',
    type=click.File('r'),
    help='File in which there is the text you want to encrypt/decrypt.'
         'If not provided, a prompt will allow you to type the input text.',
)
@click.option(
    '--output_file',
    type=click.File('w'),
    help='File in which the encrypted / decrypted text will be written.'
         'If not provided, the output text will just be printed.',
)
@click.option(
    '--decrypt/--encrypt',
    '-d/-e',
    help='Whether you want to encrypt the input text or decrypt it.'
)
@click.option(
    '--key',
    '-k',
    default=1,
    help='The numeric key to use for the caesar encryption / decryption.'
)
def caesar(input_file, output_file, decrypt, key):
    if input_file:
        text = input_file.read()
    else:
        text = click.prompt('Enter a text', hide_input=not decrypt)
    if decrypt:
        key = -key
    cypherText = encrypt(text, key)
    if output_file:
        output_file.write(cypherText)
    else:
        click.echo(cypherText)

if __name__ == '__main__':
    caesar()
```

### Progress Bar

```python
import click
import enchant

from tqdm import tqdm

from caesar_encryption import encrypt

@click.command()
@click.option(
    '--input_file',
    type=click.File('r'),
    required=True,
)
@click.option(
    '--output_file',
    type=click.File('w'),
    required=True,
)
def caesar_breaker(input_file, output_file):
    cypherText = input_file.read()
    english_dictionary = enchant.Dict("en_US")
    best_number_of_english_words = 0
    for key in tqdm(range(26)):
        plaintext = encrypt(cypherText, -key)
        number_of_english_words = 0
        for word in plaintext.split(' '):
            if word and english_dictionary.check(word):
                number_of_english_words += 1
        if number_of_english_words > best_number_of_english_words:
            best_number_of_english_words = number_of_english_words
            best_plaintext = plaintext
            best_key = key
    click.echo(f'The most likely encryption key is {best_key}. It gives the
    following plaintext:\n\n{best_plaintext[:1000]}...')
    output_file.write(best_plaintext)

if __name__ == '__main__':
    caesar_breaker()
```

## Process Data Files

### CSV File

```python
import csv

filename = "my_data.csv"

fields = []
rows = []

# Reading csv file
with open(filename, 'r') as csvFile:
    # Creating a csv reader object
    csvReader = csv.reader(csvFile)

    # Extracting field names in the first row
    fields = csvReader.next()

    # Extracting each data row one by one
    for row in csvReader:
        rows.append(row)

# Printing out the first 5 rows
for row in rows[:5]:
    print(row)
```

```python
import csv

# Field names
fields = ['Name', 'Goals', 'Assists', 'Shots']

# Rows of data in the csv file
rows = [ ['Emily', '12', '18', '112'],
         ['Katie', '8', '24', '96'],
         ['John', '16', '9', '101'],
         ['Mike', '3', '14', '82']]

filename = "soccer.csv"

# Writing to csv file
with open(filename, 'w+') as csvFile:
    # Creating a csv writer object
    csvWriter = csv.writer(csvFile)

    # Writing the fields
    csvWriter.writerow(fields)

    # Writing the data rows
    csvWriter.writerows(rows)
```

```python
import pandas as pd

filename = "my_data.csv"

# Read in the data
data = pd.read_csv(filename)

# Print the first 5 rows
print(data.head(5))

# Write the data to file
data.to_csv("new_data.csv", sep=",", index=False)
```

### JSON File

```python
import json
import pandas as pd

# Read the data from file
# We now have a Python dictionary
with open('data.json') as f:
    data_listOfDict = json.load(f)

# We can do the same thing with pandas
data_df = pd.read_json('data.json', orient='records')

# We can write a dictionary to JSON like so
# Use 'indent' and 'sort_keys' to make the JSON
# file look nice
with open('new_data.json', 'w+') as json_file:
    json.dump(data_listOfDict, json_file, indent=4, sort_keys=True)

# And again the same thing with pandas
export = data_df.to_json('new_data.json', orient='records')
```

### XML File

```python
import xml.etree.ElementTree as ET
import xmltodict
import json

tree = ET.parse('output.xml')
xml_data = tree.getroot()

xmlStr = ET.tostring(xml_data, encoding='utf8', method='xml')


data_dict = dict(xmltodict.parse(xmlStr))

print(data_dict)

with open('new_data_2.json', 'w+') as json_file:
    json.dump(data_dict, json_file, indent=4, sort_keys=True)
```

### Plain Text File

```python
import numpy as np
x, y = np.loadtxt('input.dat', delimiter=',', unpack=True)
```

### Converter

```python
import pandas as pd
from dicttoxml import dicttoxml
import json

# Building our dataframe
data = {'Name': ['Emily', 'Katie', 'John', 'Mike'],
        'Goals': [12, 8, 16, 3],
        'Assists': [18, 24, 9, 14],
        'Shots': [112, 96, 101, 82]
        }

df = pd.DataFrame(data, columns=data.keys())

# Converting the dataframe to a dictionary
# Then save it to file
data_dict = df.to_dict(orient="records")
with open('output.json', "w+") as f:
    json.dump(data_dict, f, indent=4)

# Converting the dataframe to XML
# Then save it to file
xml_data = dicttoxml(data_dict).decode()
with open("output.xml", "w+") as f:
    f.write(xml_data)
```

```python
import json
import pandas as pd
import csv

# Read the data from file
# We now have a Python dictionary
with open('data.json') as f:
    data_listOfDict = json.load(f)

# Writing a list of dicts to CSV
keys = data_listOfDict[0].keys()
with open('saved_data.csv', 'wb') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(data_listOfDict)
```

## Matplotlib Usage

```bash
pip3 install matplotlib
pip3 install ggplot
```

### Plot Type

- bar plot
- line plot
- scatter plot
- pie plot
- stack plot
- histogram plot
- interval plot
- box plot
- KDE plot
- candlestick_ohlc plot

### Basic Usage

```python
import matplotlib.pyplot as plt

fig = plt.figure()
ax = plt.subplot2grid((1, 1), (0, 0))

ax.fill_between(x, y, y[0],where=(y > y[0]), facecolor='g', alpha=0.5)

ax.grid(True)
ax.xaxis.label.set_color('c') ax.yaxis.label.set_color('r') ax.set_yticks([0,25,50,75])
ax.xaxis.get_ticklabels()

ax.spines['left'].set_color('c') ax.spines['right'].set_visible(False)
ax.spines['top'].set_visible(False) ax.spines['left'].set_linewidth(5)
ax.tick_params(axis='x', colors='#f06215')
ax.axhline(20, color='k', linewidth=5)

ax.text(x, y, 'text')
ax.annotate(
  'Bad News!',
  xytext=(0.8, 0.9),
  textcoords='axes fraction',
  arrowprops = dict(facecolor='grey', color='grey')
)

plt.plot(x, y, label='label', color='red', linewidth=5)
plt.bar(x, y, label='label', color='#111')
plt.scatter(x, y, label='label', marker='*', size=100)
plt.stackplot(x, y1, y2, ..., yn, colors=[])
plt.pie(slices, labels=[], colors=[], startangle=90, explode=(), autopct='%1.1f%%')
plt.hist(data, bins=10, histtype='bar', rwidth=0.8)

plt.xlabel('xlabel')
plt.ylabel('ylabel')
plt.title('title')
plt.legend()
plt.subplots_adjust()
plt.show()
```

## Plot Style

```python
from matplotlib import style
print(plt.style.available)
print(plt.__file__)
style.use('ggplot')
style.use('fivethirtyeight')
plt.style.use('mystylesheet.mplrc')
```

## Plot Axis Tick

```python
ax3.xaxis.set_major_formatter(mDates.DateFormatter('%Y-%m-%d'))
ax3.xaxis.set_major_locator(mTicker.MaxNLocator(10))
ax1.yaxis.set_major_locator(mTicker.MaxNLocator(nbins=5, prune='lower'))

for label in ax3.xaxis.get_ticklabels():
    label.set_rotation(45)

plt.setp(ax1.get_xticklabels(), visible=False)
plt.setp(ax2.get_xticklabels(), visible=False)
```

## Plot Legend

up middle legend

```python
ax.legend()
leg = ax.legend(loc=9, ncol=2,prop={'size':11})
leg.get_frame().set_alpha(0.4)
```

## Subplot

tall and width for grid template

```python
fig = plt.figure()
ax1 = fig.add_subplot(221)
ax2 = fig.add_subplot(222)
ax3 = fig.add_subplot(212)

ax1 = plt.subplot2grid((6,1), (0,0), rowspan=1, colspan=1)
ax2 = plt.subplot2grid((6,1), (1,0), rowspan=4, colspan=1)
ax3 = plt.subplot2grid((6,1), (5,0), rowspan=1, colspan=1)
```

### Double y-axis

```python
ax2v = ax2.twinx()
```

## 3D Plot

```python
from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
from matplotlib import style

style.use('ggplot')

fig = plt.figure()
ax1 = fig.add_subplot(111, projection='3d')

x = [1,2,3,4,5,6,7,8,9,10]
y = [5,6,7,8,2,5,6,3,7,2]
z = [1,2,6,3,2,7,3,3,7,2]

x2 = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
y2 = [-5,-6,-7,-8,-2,-5,-6,-3,-7,-2]
z2 = [1,2,6,3,2,7,3,3,7,2]

ax1.scatter(x, y, z, c='g', marker='o')
ax1.scatter(x2, y2, z2, c ='r', marker='o')

ax1.set_xlabel('x axis')
ax1.set_ylabel('y axis')
ax1.set_zlabel('z axis')

plt.show()
```

```python
from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import style
style.use('ggplot')

fig = plt.figure()
ax1 = fig.add_subplot(111, projection='3d')

x3 = [1,2,3,4,5,6,7,8,9,10]
y3 = [5,6,7,8,2,5,6,3,7,2]
z3 = np.zeros(10)

dx = np.ones(10)
dy = np.ones(10)
dz = [1,2,3,4,5,6,7,8,9,10]

ax1.bar3d(x3, y3, z3, dx, dy, dz)


ax1.set_xlabel('x axis')
ax1.set_ylabel('y axis')
ax1.set_zlabel('z axis')

plt.show()
```

## Paper Figures Config

```python
import matplotlib.pyplot as plt
import matplotlib

def latexify(fig_width=None, fig_height=None, columns=1):
    '''Set up matplotlib RC params for LaTeX plotting.
    Call this before plotting a figure.

    Parameters
    ----------
    fig_width : float, optional, inches
    fig_height : float,  optional, inches
    columns : {1, 2}
    '''

    # code adapted from http://www.scipy.org/Cookbook/Matplotlib/LaTeX_Examples

    # Width and max height in inches for IEEE journals taken from
    # computer.org/cms/Computer.org/Journal%20templates/transactions_art_guide.pdf

    assert(columns in [1,2])

    if fig_width is None:
        fig_width = 3.39 if columns==1 else 6.9 # width in inches

    if fig_height is None:
        golden_mean = (sqrt(5)-1.0)/2.0    # Aesthetic ratio
        fig_height = fig_width*golden_mean # height in inches

    MAX_HEIGHT_INCHES = 8.0
    if fig_height > MAX_HEIGHT_INCHES:
        print("WARNING: fig_height too large:" + fig_height +
              "so will reduce to" + MAX_HEIGHT_INCHES + "inches.")
        fig_height = MAX_HEIGHT_INCHES

    params = {'backend': 'ps',
              'text.latex.preamble': ['\usepackage{gensymb}'],
              'axes.labelsize': 8, # fontsize for x and y labels (was 10)
              'axes.titlesize': 8,
              'text.fontsize': 8, # was 10
              'legend.fontsize': 8, # was 10
              'xtick.labelsize': 8,
              'ytick.labelsize': 8,
              'text.usetex': True,
              'figure.figsize': [fig_width,fig_height],
              'font.family': 'serif'
    }

    matplotlib.rcParams.update(params)


def format_axes(ax):

    for spine in ['top', 'right']:
        ax.spines[spine].set_visible(False)

    for spine in ['left', 'bottom']:
        ax.spines[spine].set_color(SPINE_COLOR)
        ax.spines[spine].set_linewidth(0.5)

    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')

    for axis in [ax.xaxis, ax.yaxis]:
        axis.set_tick_params(direction='out', color=SPINE_COLOR)

    return ax

latexify()
ax.set_xlabel("X label")
ax.set_ylabel("Y label")
ax.set_title("Title")
plt.tight_layout()
format_axes(ax)
plt.savefig("figure.pdf")
```

```python
import numpy as np
import matplotlib as mpl
mpl.use('pdf')
import matplotlib.pyplot as plt

plt.rc('font', family='serif', serif='Times')
plt.rc('text', usetex=True)
plt.rc('xtick', labelsize=8)
plt.rc('ytick', labelsize=8)
plt.rc('axes', labelsize=8)

# width as measured in ink scape
width = 3.487
height = width / 1.618

fig, ax = plt.subplots()
fig.subplots_adjust(left=.15, bottom=.16, right=.99, top=.97)

x = np.arange(0.0, 3*np.pi , 0.1)
plt.plot(x, np.sin(x))

ax.set_ylabel('Some Metric (in unit)')
ax.set_xlabel('Something (in unit)')
ax.set_xlim(0, 3*np.pi)

fig.set_size_inches(width, height)
fig.savefig('plot.pdf')
```

## Paper Standard

- [Matplotlib for Papers](https://github.com/jbmouret/matplotlib_for_papers)

## Awesome Library

### Debugging and Testing

- [PySnooper](https://github.com/cool-RR/PySnooper)
