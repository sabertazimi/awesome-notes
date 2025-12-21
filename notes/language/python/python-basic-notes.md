---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Language, Python]
---

# Python Basic Notes

## Python Installation

### Anaconda

```bash
echo ". ~/anaconda3/etc/profile.d/conda.sh" >> ~/.bashrc
```

```bash
conda env list
conda activate base
```

## String

```python
message = " Hello, python world! "

print(message)
print(message.strip())
print(message.lstrip())
print(message.rstrip())
print(message.upper())
print(message.lower())
print(message.title())
print(message.removeprefix(" Hello"))
print(message.removesuffix(" world! "))
```

## List

```python
my_list.append(element)
my_list.remove(element) # Remove the first occurrence of the element

my_list.insert(index, element)
del my_list[index]
my_list.pop()
my_list.pop(index)

my_list.sort()
my_list.sort(reverse=True)
sorted_list = sorted(my_list)
my_list.reverse()

len(my_list)
min(digits_list)
max(digits_list)
sum(digits_list)

my_list[1:3] # [1, 3)
my_list[:3] # [0, 3)
my_list[3:] # [3, end)
my_list[-3:] # last 3 elements
my_list[:] # all elements

original_list = my_list
copy_list = my_list[:]
```

### Range

```python
for i in range(3): # 0, 1, 2
  print(i)

for i in range(1, 3): # 1, 2
  print(i)

even_numbers = list(range(2, 11, 2))
print(even_numbers) # [2, 4, 6, 8, 10]
```

### List Comprehension

列表解析/列表推导式:

```python
squares = [value**2 for value in range(1, 11)]
print(squares) # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

## Tuple

Tuple in python are immutable.

## Dictionary

```python
for key, value in my_dict.items(): # my_dict.keys() / my_dict.values()
  print(key, value)
```

## Control Flow Statement

Special condition:

- `and`.
- `or`.
- `in`.
- `not in`.

## Function

### Default Parameter

```python
def describe_pet(pet_name, animal_type='dog'):
    """显示宠物的信息"""
    print(f"I have a {animal_type}.")
    print(f"My {animal_type}'s name is {pet_name.title()}.")

# 一条名为 Willie 的小狗
describe_pet('willie')
describe_pet(pet_name='willie')

# 一只名为 Harry 的仓鼠
describe_pet('harry', 'hamster')
describe_pet(pet_name='harry', animal_type='hamster')
describe_pet(animal_type='hamster', pet_name='harry')
```

### Rest Parameter

```python
def make_pizza(size, *toppings):
    """概述要制作的比萨"""
    print(f"Making a {size}-inch pizza with the following toppings:")

    for topping in toppings:
        print(f"- {topping}")

make_pizza(16, 'pepperoni')
 make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')

```

```python
def build_profile(first, last, **user_info):
    """创建一个字典，其中包含我们知道的有关用户的一切"""
    user_info['first_name'] = first
    user_info['last_name'] = last
    return user_info

user_profile = build_profile('albert', 'einstein', location='princeton', field='physics')
# {'location': 'princeton', 'field': 'physics',
# 'first_name': 'albert', 'last_name': 'einstein'}
```

## Class

```python
class Pet(Animal):
  def __init__(self, species, color, name):
    super().__init__(species, color)
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

## Exception

```python
try:
  answer = int(first_number) / int(second_number)
except ZeroDivisionError:
  print("You can't divide by 0!")
else:
  print(answer)
```

## Module

```python
import module_name
import module_name as mn
from module_name import function_name, ClassName
from module_name import long_long_name as lln
from module_name import *
```

## File

### Text File

Standard library:

```python
from pathlib import Path

path = Path('alice.txt')

try:
  contents = path.read_text(encoding='utf-8').rstrip()
except FileNotFoundError:
  print(f"Sorry, the file {path} does not exist.")
else:
  words = contents.split()
  num_words = len(words)
  print(f"The file {path} has about {num_words} words.")

  lines = contents.splitlines()
  path.write_text(lines)
```

Numpy:

```python
import numpy as np
x, y = np.loadtxt('input.dat', delimiter=',', unpack=True)
```

### JSON File

```python
 from pathlib import Path
import json
import pandas as pd

path = Path('data.json')
contents = path.read_text()
data_listOfDict = json.loads(contents)

# We can do the same thing with pandas
data_df = pd.read_json('data.json', orient='records')

# We can write a dictionary to JSON like so
# Use 'indent' and 'sort_keys' to make the JSON
# file look nice
path = Path('new_data.json')
contents = json.dump(data_listOfDict, indent=4, sort_keys=True)
path.write_text(contents)

# And again the same thing with pandas
export = data_df.to_json('new_data.json', orient='records')
```

### CSV File

```python
from pathlib import Path
import csv

path = Path('weather_data/sitka_weather_07-2021_simple.csv')
lines = path.read_text().splitlines()
reader = csv.reader(lines)
header_row = next(reader)

for index, column_header in enumerate(header_row):
  print(index, column_header)

highs = []
for row in reader:
  high = int(row[4])
  highs.append(high)
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

## NumPy

```python
import numpy as np

np.random.seed(seed=1234)
```

### NumPy Array Creation

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

### NumPy Indexing

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

### NumPy Matrix Operations

- math: `x+y`/`x-y`/`x*y` `np.add/subtract/multiply`
- dot product: `a.dot(b)`
- sum: `np.sum(x)`
- column sum: `np.sum(x, axis=0)`
- row sum: `np.sum(x, axis=1)`
- transposing: `x.T`
- reshape: `np.reshape(x, (2, 3))`

## Matplotlib

```bash
pip3 install matplotlib
pip3 install ggplot
```

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

### Plot Type

- `bar` plot.
- `line` plot.
- `scatter` plot.
- `pie` plot.
- `stack` plot.
- `histogram` plot.
- `interval` plot.
- `box` plot.
- `KDE` plot.
- `candlestick_ohlc` plot.

### Plot Style

```python
from matplotlib import style
print(plt.style.available)
print(plt.__file__)
style.use('ggplot')
style.use('fivethirtyeight')
plt.style.use('mystylesheet.mplrc')
```

### Plot Axis Tick

```python
ax3.xaxis.set_major_formatter(mDates.DateFormatter('%Y-%m-%d'))
ax3.xaxis.set_major_locator(mTicker.MaxNLocator(10))
ax1.yaxis.set_major_locator(mTicker.MaxNLocator(nbins=5, prune='lower'))

for label in ax3.xaxis.get_ticklabels():
    label.set_rotation(45)

plt.setp(ax1.get_xticklabels(), visible=False)
plt.setp(ax2.get_xticklabels(), visible=False)
```

### Plot Legend

Up middle legend:

```python
ax.legend()
leg = ax.legend(loc=9, ncol=2,prop={'size':11})
leg.get_frame().set_alpha(0.4)
```

### Subplot

Tall and width for grid template:

```python
fig = plt.figure()
ax1 = fig.add_subplot(221)
ax2 = fig.add_subplot(222)
ax3 = fig.add_subplot(212)

ax1 = plt.subplot2grid((6,1), (0,0), rowspan=1, colspan=1)
ax2 = plt.subplot2grid((6,1), (1,0), rowspan=4, colspan=1)
ax3 = plt.subplot2grid((6,1), (5,0), rowspan=1, colspan=1)
```

Double y-axis:

```python
ax2v = ax2.twinx()
```

### 3D Plot

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

### Paper Figures Plot

[Matplotlib for Papers](https://github.com/jbmouret/matplotlib_for_papers):

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

## CLI Application

### Basic Input

- `input(prompt)`: read a line from the user.

### Click CLI

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

## Testing

```python
import pytest
from survey import AnonymousSurvey

@pytest.fixture
def language_survey():
  """一个可供所有测试函数使用的 AnonymousSurvey 实例"""
  question = "What language did you first learn to speak?"
  language_survey = AnonymousSurvey(question)
  return language_survey

def test_store_single_response(language_survey):
  """测试单个答案会被妥善地存储"""
  language_survey.store_response("English")
  assert "English" in language_survey.responses

def test_store_three_responses(language_survey):
  """测试三个答案会被妥善地存储"""
  responses = ["English", "Spanish", "Mandarin"]

  for response in responses:
    language_survey.store_response(response)

  for response in responses:
    assert response in language_survey.responses
```

## UV

### UV Mirrors

```bash
# Python mirror
export UV_PYTHON_INSTALL_MIRROR="https://gh-proxy.com/github.com/indygreg/python-build-standalone/releases/download"
# PyPI mirror
export UV_DEFAULT_INDEX="http://mirrors.aliyun.com/pypi/simple"
```

```bash
uv pip install 3.13.2
uv python list
uvx python@3.13.2 -c "print('hello world')"
```

### UV Packages

Install packages:

```bash
uv pip install requests
uv pip install --system pandas
uv pip list
uv pip list --outdated
```

### UV Dependencies

Manage dependencies:

```bash
uv init hello-world # 初始化项目
uv add 'requests==2.31.0' # 增加依赖
uv lock --upgrade-package requests # 更新项目依赖
uv remove requests # 删除项目依赖

uv sync
uv tree --outdated
uv tree --depth 2
uv run main.py
```

### UV Toolchain

Toolchain execution:

```bash
uv tool install black
uv tool run black ./myfile.py

uvx pycowsay 'hello world!'
uvx ruff format ./myscript.py
uvx python@3.13.2 -c "print('hello world')"
```

### UV Virtual Environment

Manage virtual environments:

```bash
# 创建并激活虚拟环境
uv venv
source .venv/bin/activate

# 退出虚拟环境
deactivate

# 强制安装基础包（如 pip, setuptools, wheel）
uv venv --seed
```

### UV Script

Run standalone scripts:

```bash
uv init --script example.py --python 3.13
uv add --index "http://mirrors.aliyun.com/pypi/simple" --script example.py 'requests<3' 'rich'
uv run example.py
```

### UV Project

```toml
[project]
name = "project"
version = "0.1.0"
requires-python = ">=3.12.0"
dependencies = [ "torch>=2.6.0" ]

[tool.uv.sources]
torch = [
  { index = "pytorch-cpu", marker = "sys_platform != 'linux'" },
  { index = "pytorch-cu124", marker = "sys_platform == 'linux'" },
]

[[tool.uv.index]]
name = "pytorch-cpu"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
explicit = true

[[tool.uv.index]]
name = "pytorch-cu124"
url = "https://mirror.sjtu.edu.cn/pytorch-wheels/cu124"
explicit = true
```

### UV Workspace

Monorepo support:

```toml
[project]
name = "albatross"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
  "bird-feeder",
  "tqdm>=4,<5",
]

[tool.uv.sources]
bird-feeder = { workspace = true }

[tool.uv.workspace]
members = [ "packages/*" ]
exclude = [ "packages/seeds" ]
```

```bash
albatross
├── packages
│   ├── bird-feeder
│   │   ├── pyproject.toml
│   │   └── src
│   │       └── bird_feeder
│   │           ├── __init__.py
│   │           └── foo.py
│   └── seeds
│       ├── pyproject.toml
│       └── src
│           └── seeds
│               ├── __init__.py
│               └── bar.py
├── pyproject.toml
├── README.md
├── uv.lock
└── src
    └── albatross
        └── main.py
```

```bash
uv run --package bird-feeder
```

### UV Caching

```bash
uv cache dir
uv cache clean
uv cache prune
```

### UV Dockfile

```Dockerfile
FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
ENV UV_SYSTEM_PYTHON=1

# Copy the project into the image
ADD . /app

WORKDIR /app

# Install dependencies
RUN uv sync --locked

# Install requirements
COPY requirements.txt .
RUN uv pip install -r requirements.txt

CMD ["uv", "run", "my_app"]
```

## Awesome Library

### Debugging and Testing

- [PySnooper](https://github.com/cool-RR/PySnooper)
