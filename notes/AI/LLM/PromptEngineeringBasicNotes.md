---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [AI, LLM, PromptEngineering]
---

# Prompt Engineering Basic Notes

<!-- markdownlint-disable MD013 -->

## Design Principles

26 guiding principles designed to streamline process of querying and prompting LLMs:

- 直接性: 无需对 LLM 使用礼貌用语, 直接了当.
- 目标受众: 在提示中集成预期受众, 例如领域专家.
- 任务分解: 将复杂任务分解为一系列简单提示.
- 肯定指令: 使用肯定指令, 避免使用否定语言.
- 概念解释: 使用简单术语解释特定主题, e.g 对11岁孩子或领域初学者解释.
- 激励提示: 添加激励性语句, 如 `I'm going to tip $xxx for a better solution!`.
- 少样本提示 (示例驱动提示).
- 格式化: 使用特定的格式, 如以 `###Instruction###`/`###Question###`/`###Example###` 开始.
- 任务指派: 使用短语 `Your task is` 和 `You MUST`.
- 惩罚提示: 使用短语 `You will be penalized`.
- 自然回答: 使用短语 `Answer a question given in a natural, human-like manner`.
- 逐步思考: 使用短语 `think step by step`.
- 避免偏见: 确保答案无偏见, 不依赖于刻板印象.
- 模型询问细节: 允许模型通过提问来获取精确细节和要求.
- 教学和测试:
  `Teach me any [theorem/topic/rule name] and include a test at the end`,
  `and let me know if my answers are correct after I respond`,
  `without providing the answers beforehand`.
- 角色分配: 为大型语言模型分配角色.
- 使用分隔符.
- 重复特定词汇: 在提示中多次重复特定单词或短语.
- 思维链与少样本结合.
- 输出引导: 使用预期输出的开始作为提示的结尾.
- 详细写作: 写详细文章时, 添加所有必要信息.
- 文本修正: 改进用户语法和词汇, 同时保持原文风格.
- 复杂编码提示: 生成跨多个文件的代码时, 创建一个脚本.
- 文本初始化: 使用特定单词, 短语或句子开始或继续文本.
- 明确要求: 清晰陈述模型必须遵循的要求.
- 文本相似性: 写类似于提供样本的文本时, 使用相同的语言风格.

## In-Context Learning Prompting

Given examples, generate output:

[![In-Context Learning](./figures/InContextLearning.png)](https://nips.cc/virtual/2023/76728)

## Chain-of-Thought Prompting

[CoT prompting](https://nips.cc/virtual/2022/54087) elicits reasoning in LLMs:
a series of intermediate reasoning steps
significantly improves ability of LLMs to perform complex reasoning.

Few shot CoT:

```markdown
Q: Roger has 5 tennis balls.
He buys 2 more cans of tennis balls.
Each can has 3 tennis balls.
How many tennis balls does he have now?

A: Roger started with 5 balls.
2 cans of 3 tennis balls each is 6 tennis balls.
5 + 6 = 11. The answer is 11.

Q: The cafeteria had 23 apples.
If they used 20 to make lunch and bought 6 more,
how many apples do they have?

A:

---

(Output) The cafeteria had 23 apples originally.
They used 20 to make lunch. So they had 23 - 20 = 3.
They bought 6 more apples, so they have 3 + 6 = 9. The answer is 9.
```

Zero shot CoT:

```markdown
Q: A juggler can juggle 16 balls.
Half of the balls are golf balls,
and half of the golf balls are blue.
How many blue golf balls are there?

A: Let's think step by step.

---

(Output) There are 16 balls in total.
Half of the balls are golf balls.
That means that there are 8 golf balls.
Half of the golf balls are blue.
That means that there are 4 blue golf balls.
```

## Task Planning Prompting

将复杂任务拆解成多个子任务, 并不断修正错误:

- [Re3](https://aclanthology.org/2022.emnlp-main.296):
  recursive re-prompting and revision.
- [ReAct](https://iclr.cc/virtual/2023/11003):
  reasoning and acting (thought-act-observation).
- [ToT](https://nips.cc/virtual/2023/73874):
  tree of thoughts.
- [GoT](https://ojs.aaai.org/index.php/AAAI/article/view/29720):
  graph of thoughts.

```markdown
How to make a simple but delicious dish called "Scrambled eggs with tomatoes".
Let's break down this problem.
```

```markdown
Give me a solution to accelerate decoding speed of LLMs during inference?
Let's break down this problem and give me the solution with code format.
```

```markdown
<!-- ReAct -->

问题 科罗拉多造山带东部区域延伸到的区域的海拔范围是多少?
思考 1 我需要搜索科罗拉多造山带, 找到科罗拉多造山带东段延伸的区域, 然后找到该区域的海拔范围.
操作 1 搜索 [科罗拉多造山带]
观察 1 科罗拉多造山带是科罗拉多及其周边地区造山运动的一段.
思考 2 它没有提到东部地区. 所以我需要查一下东部地区.
操作 2 查找 [东部地区]
观察 2 (结果 1 / 1) 东部区域延伸至高平原, 称为中原造山带.
思考 3 科罗拉多造山运动的东部区域延伸到高平原. 所以我需要搜索高平原, 找到它的海拔范围.
操作 3 搜索 [高平原]
观察 3 高平原指的是两个截然不同的陆地区域之一.
思考 4 我需要搜索高平原 (美国)
操作 4 搜索 [高平原 (美国)]
观察 4 高平原是大平原的一个分区. 从东到西, 高平原的海拔从 1800 到 7000 英尺 (550 到 2130 米) 不等.
思考 5 高平原海拔高度从 1800 到 7000 英尺, 所以答案是 1800 到 7000 英尺.
操作 5 结束 [1800 到 7000 英尺]
...
```

```markdown
<!-- Tree of thoughts -->

假设三位不同的专家来回答这个问题.
所有专家都写下他们思考这个问题的第一个步骤, 然后与大家分享.
然后, 所有专家都写下他们思考的下一个步骤并分享.
以此类推, 直到所有专家写完他们思考的所有步骤.
只要大家发现有专家的步骤出错了, 就让这位专家离开.
请问:
```

![Task Planning](./figures/TaskPlanning.png 'Task Planning')

## Program-aided Prompting

[Program-aided prompting](https://proceedings.mlr.press/v202/gao23f.html)
make LLMs output code,
then offloads solution step to programmatic runtime such as `Python interpreter`:

```python
import openai
from datetime import datetime
from dateutil.relativedelta import relativedelta
import os
from langchain.llms import OpenAI
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
llm = OpenAI(model_name='text-davinci-003', temperature=0)

question = """
Today is 27 February 2023.
I was born exactly 25 years ago. What is the date I was born in MM/DD/YYYY?
""".strip() + '\n'

DATE_UNDERSTANDING_PROMPT = """
# Q: 2015 is coming in 36 hours. What is the date one week from today in MM/DD/YYYY?
# If 2015 is coming in 36 hours, then today is 36 hours before.
today = datetime(2015, 1, 1) - relativedelta(hours=36)
# One week from today,
one_week_from_today = today + relativedelta(weeks=1)
# The answer formatted with %m/%d/%Y is
one_week_from_today.strftime('%m/%d/%Y')
# Q: Jane was born on the last day of February in 2001.
# Today is her 16-year-old birthday. What is the date yesterday in MM/DD/YYYY?
# If Jane was born on the last day of February in 2001
# and today is her 16-year-old birthday, then today is 16 years later.
today = datetime(2001, 2, 28) + relativedelta(years=16)
# Yesterday,
yesterday = today - relativedelta(days=1)
# The answer formatted with %m/%d/%Y is
yesterday.strftime('%m/%d/%Y')
# Q: {question}
""".strip() + '\n'

"""
llm_out:
# If today is 27 February 2023 and I was born exactly 25 years ago,
# then I was born 25 years before.
today = datetime(2023, 2, 27)
# I was born 25 years before,
born = today - relativedelta(years=25)
# The answer formatted with %m/%d/%Y is
born.strftime('%m/%d/%Y')
"""
llm_out = llm(DATE_UNDERSTANDING_PROMPT.format(question=question))
exec(llm_out)
print(born)
```

## Machine Prompting

利用机器生成 prompts:

- Soft prompt:
  将向量作为输入, 与文字合并成一个完整的 prompt,
  作用类似于 BERT adapter.
- Reinforcement learning prompting:
  通过强化学习训练一个模型, 负责生成 prompts.
- [LLM prompting](https://iclr.cc/virtual/2023/10850):
  通过 LLM 自身生成 prompts.

[![Automatic Prompting Engineer](./figures/AutomaticPromptEngineer.png)](https://github.com/keirp/automatic_prompt_engineer)

- LLMs collaboration:
  - Utilize multiple LLMs, each with different strengths.
  - [EoT](https://aclanthology.org/2023.emnlp-main.936):
    exchange-of-thought, encourage divergent thinking
    through cross-model communication and multi-agent debate.

## Retrieval-Augmented Generation

检索增强生成, 通常称为 RAG (Retrieval-Augmented Generation),
是一种强大的聊天机器人的设计模式.
其中, 检索系统实时获取与查询相关的经过验证的源 / 文档,
并将其输入生成模型 (例如 GPT-4) 以生成响应.

Context is everything when it comes to getting the most out of an AI tool.
To improve the relevance and quality of a generative AI output,
you need to [improve the relevance and quality of the input](https://github.blog/2024-04-04-what-is-retrieval-augmented-generation-and-what-does-it-do-for-generative-ai).

> [Quality in, quality out.](https://github.blog/2024-04-04-what-is-retrieval-augmented-generation-and-what-does-it-do-for-generative-ai)

![Retrieval-Augmented Generation](./figures/RetrievalAugmentedGeneration.png 'Retrieval-Augmented Generation')

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from google.colab import userdata

# Load document
document_url = "https://arxiv.org/pdf/2312.10997.pdf"
loader = PyPDFLoader(document_url)
pages = loader.load()

# Split document into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=40,
    length_function=len,
    is_separator_regex=False,
)
chunks = text_splitter.split_documents(pages)

# Create embeddings from chunks
model_name = "BAAI/bge-small-en"
model_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
bge_embeddings = HuggingFaceBgeEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs
)

chunk_texts = list(map(lambda d: d.page_content, chunks))
embeddings = bge_embeddings.embed_documents(chunk_texts)

# Store embeddings
text_embedding_pairs = zip(chunk_texts, embeddings)
db = FAISS.from_embeddings(text_embedding_pairs, bge_embeddings)

# Search database for similar contexts
query = "Which are the drawbacks of Naive RAG?"

contexts = db.similarity_search(query, k=5)

# Chat with model
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """You are an expert at answering questions
            based on a context extracted from a document.
            The context extracted from the document is: {context}""",
        ),
        ("human", "{question}"),
    ]
)

api_key = userdata.get("ANTHROPIC_API_KEY")
model = ChatAnthropic(model="claude-3-haiku-20240307", api_key=api_key)

chain = prompt | model

response = chain.invoke(
    {
        "context": "\n\n".join(list(map(lambda c: c.page_content, contexts))),
        "question": query,
    }
)

print(response.content)
```

## Prompt Compression

```markdown
Compress the given text to short expressions,
and such that you (GPT-4) can reconstruct it as close as possible to the original.
Unlike the usual text compression,
I need you to comply with the 5 conditions below:

1. You can ONLY remove unimportant words.
2. Do not reorder the original words.
3. Do not change the original words.
4. Do not use abbreviations or emojis.
5. Do not add new words or symbols.

Compress the origin aggressively by removing words only.
Compress the origin as short as you can,
while retaining as much information as possible.
If you understand, please compress the following text: {text to compress}
The compressed text is:
```

## Image Prompts

Themes:

- Realistic, Realism, Surreal, Surrealism, Unrealistic.
- Science fiction, Dreamy, Dreampunk, Otherworldly, Abstraction.
- Fantasy, Dark fantasy, Illusion, Retro, Vintage.
- Cyberpunk, Rustic, Historic, Futuristic, Sci-fi.
- Cartoon, Marvel comics, Kawaii, Anime.

Design styles:

- Simple, Detailed, Complex, Multiplex, Chaotic.
- Surface detail, Minimalist, Maximalist, Ukiyo-e, Ukiyo-e flat design.
- Patterns, Polka dot, Halftone, 20s, 30s, 1940s, 1950s.
- Decor, 60s, 1800s, 2020s, 4000s, Pop-art, Hi-fi, Gothic.
- Painting/Graffiti By artists,
  e.g `By Van Gogh`, `By Pablo Picasso`, `By Leonardo Da Vinci`, `Graffiti By Banksy`.

Engines:

- Unreal engine, Cinema4D, 4k, 8k, 16k, Ultra-HD.
- 2-bit, 4-bit, 8-bit, 16-bit.
- Disney, Pixar, Dreamworks, IMAX, Pixomondo.
- Vector graphics, 3D model, Lowpoly, Holographic.
- Digital art, Pixel art, NFT, Clip art, Character design, Wallpaper.

Drawing and art mediums:

- Sketch, Drawing, Hand-drawn, Dot art, Line art.
- Caricature, Illustration, Pencil art, Charcoal art, Pastel art.
- Acrylic painting, Oil painting, Watercolor painting, Graffiti, Spray paint.
- Sticker, Blueprint, Mosaic, Coloring book, Chibi, Paper cut craft.

Colors and palettes:

- Red, Orange, Light-gray, Light-purple, Neutral.
- Multicolored, Black and white, Monochromatic, Sepia, Dark mode.

Time of the day:

- Golden hour, High noon, Afternoon, Mid-morning.
- Blue hour, Sunset, Sunrise, Nighttime.

Material properties:

- Transparent, Opaque, Polarized, Prismatic, Glitter, Glowing.
- Glossy, Shiny, Polished, Melting, Squishy, Dirty.

Materials and textures:

- Stone:
  pebbles, cobblestone, rock, bedrock, sandstone,
  marble, gypsum, granite, diorite, andesite.
- Mineral:
  coal, sulfur, sodalime, geyserite, ceramic,
  enamel, asbestos, fossil, perlite, vermiculite,
  slag, minium, travertine, fulgurite, graphene.
- Wood:
  wooden, plywood, particle board, hardboard, lumber, planks,
  wooden planks, nailed-wood, wood veneer, petrified wood, oak wood,
  maple wood, acacia-wood, pine-wood, cherry-wood, birch-wood, cedar-wood.
- Paper:
  cardboard, corrugated fibre-board, paperboard, construction paper,
  card-stock, tracing paper, glassine, tissue paper, kraft paper,
  papyrus, parchment, hemp paper, tar paper.
- Metal:
  metallic, rusty, foil, tarnish, tin,
  copper, pewter, aluminum, bronze, brass,
  iron, steel, titanium, silver, bismuth.
- Glass:
  stained glass, sea-grass, obsidian, fiberglass, crystalline,
  borax crystal, amethyst, quartz, rose quartz.

Lighting:

- Spotlight, Sunlight, Starlight, Nightlight, Neon lamp, Dot matrix display.
- Warm light, Hard light, Soft light, Cold light, Neon light.

Geography and culture:

- French-style, Turkish-style.
- Mayan, Arabic, Nordic mythology.

Shot types:

- Extreme long shot, Long shot, Medium shot, Close-up shot, Extreme close-up shot.
- Low angle shot, High angle shot, Night shot, Silhouette shot, Wide shot.
- Overhead shot, Side-view shot, Centered shot, Back-view shot, Selfie.

Views:

- Top-view, Side-view, Satellite-view, View from an airplane, Closeup.
- Extreme closeup, Epic wide shot, First-person view, Third-person view.
- Full body, Portrait, Front-view, Bird-view, Macro shot, Macro view.
- Microscopic, 360 panorama, Ultra-wide angle, 360 angle.

Film types:

- DSLR, Night vision, Drone photography, GoPro video.
- Unregistered Hypercan 2, Hyper-special imaging, Multi-special imaging.
- Schlieren, Disposable camera, Polaroid, Instax, Lomo, Pinhole photography.
- VistaVision, Technirama, Techniscope, Panavision, Ambrotype.

## Prompts Frameworks

### Elvis Saravia Framework

[Elvis Saravia framework](https://github.com/dair-ai/Prompt-Engineering-Guide):

- Instruction (指令):
  明确模型需要执行的特定任务, 如生成文本, 翻译语言或创作不同类型的内容.
- Context (上下文):
  为模型提供理解请求所需的背景信息.
  例如, 在要求模型生成特定主题的文本时, 提供有关该主题的信息.
- Input Data (输入数据):
  模型处理的具体数据.
  例如, 在翻译任务中, 提供要翻译的英文句子.
- Output Indicator (输出指示):
  指示期望的输出类型或格式.
  例如, 在文本生成任务中, 指定输出为一段文字.

### CRISPE Framework

[CRISPE framework](https://github.com/mattnigh/ChatGPT3-Free-Prompt-List):

- Capacity and role (能力和角色): 定义模型应扮演的角色 (`Act as`), 如专家, 创意作家或喜剧演员.
- Insight (洞察): 提供模型理解请求所需的背景信息和上下文.
- Statement (声明): 明确模型执行的特定任务.
- Personality (个性): 定义模型回答请求时的风格或方式.
- Experiment (实验): 通过提供多个答案的请求来迭代, 以获得更好的答案.

```markdown
I want you to act as a JavasScript console.
I will type commands and you will reply with what JavasScript console should show.

I want you to only reply with terminal output inside code block, and nothing else.
Do not write explanations. Do not type commands unless I instruct you to do so.

When I need to tell you something in English,
I will do so by putting text inside curly brackets {like this}.

My first command is console.log("Hello World").
```

:::tip Prompt Engineering Frameworks

上述两个框架的共性在于:

- Clarity:
  Clear and concise prompt, respectful and professional tone,
  ensure LLMs understands topics and generate appropriate responses.
  Avoid using overly complex or ambiguous language.
- Focus:
  Clear purpose and focus, helping to guide the conversation and keep it on track.
  Avoid using overly broad or open-ended prompts.
- Relevance:
  Relevant to the user and the conversation.
  Avoid introducing unrelated topics that can distract from main focus.
- 清晰指示任务和角色, 重视上下文信息, 指定输出格式.

:::

### Simple Framework

简化框架 (`Instruction`+`Context`+`Input Data`+`Output Indicator`):

- 明确任务: 直接指出你需要模型做什么. 例如: "写一个故事", "回答一个问题", "解释一个概念".
- 设定角色和风格: 简短描述模型应采用的角色和风格 (`Act as`). 例如: "像专家一样", "幽默地", "正式地".
- 提供背景信息: 给出足够的信息, 让模型了解任务的上下文. 例如: "关于环保", "在古罗马背景下".
- 指定输出格式: 告诉模型你期望的回答形式. 例如: "一段文本", "列表", "步骤说明".

操作指南:

- 步骤1 (明确任务): 思考你需要模型完成的具体任务, 尽量具体. 例如: "请写一个关于节约用水的短故事".
- 步骤2 (设定角色和风格): 考虑任务最适合的表达方式和语气. 例如: "用一个小孩的视角, 轻松幽默地讲述".
- 步骤3 (提供背景信息): 如果任务涉及特定的主题或需要特定知识, 提供相关的背景信息. 例如: "在一个干旱的城市里".
- 步骤4 (指定输出格式): 明确你想要的输出类型. 例如: "三段话, 每段不超过五句话".

```markdown
我要写一个英语学习计划, 请根据下列规则生成一个合适的 Prompt, 然后再输出内容:
明确任务: 直接指出你需要模型做什么. 例如: "写一个故事", "回答一个问题", "解释一个概念".
设定角色和风格: 简短描述模型应采用的角色和风格. 例如: "像专家一样", "幽默地", "正式地".
提供背景信息: 给出足够的信息, 让模型了解任务的上下文. 例如: "关于环保", "在古罗马背景下".
指定输出格式: 告诉模型你期望的回答形式. 例如: "一段文本", "列表", "步骤说明".

ChatGPT:
任务: 创建一个学习英语的计划.
角色和风格: 请像一位经验丰富的语言教师一样, 正式而清晰地提供指导.
背景信息: 这个计划是为了帮助一个成年人从初级水平提高到中级水平. 他们每周可以投入约 10 小时的学习时间, 目标是提高口语和听力技能.
输出格式: 请以清晰的列表形式提供, 包括每周的具体学习活动和目标.

我现在是高中水平的英语, 想要通过雅思考试.
每一部分提供具体的学习资料.
```

### Comprehensive Framework

综合框架:

- Role: 指定模型的角色, 如专家, 朋友, 教师等.
- Background: 提供任务的上下文信息, 以帮助模型更好地理解任务.
- Profile: 描述模型应该具备的特定技能和知识.
- Skills: 指定模型需要具备的技能和知识, 以完成任务.
- Goals: 任务的目标和期望输出.
- Constrains: 任务的限制条件, 如输出格式, 语言风格等.
- OutputFormat: 期望的输出格式, 如文本, 列表, 图表等.
- Workflow: 完成任务的具体步骤和流程.
- Examples: 提供示例, 以帮助模型更好地理解任务.
- Initialization: 在第一次对话中, 提供初始信息, 以引导模型开始任务.

```markdown
- Role: 外卖体验优化专家和文案撰写顾问
- Background: 用户希望通过撰写外卖好评来领取代金券，需要一个简洁而有效的文案框架，以表达对外卖服务的满意。
- Profile: 你是一位精通外卖行业服务标准和用户体验的专家，擅长用简洁明了的语言撰写具有说服力的文案，能够精准地捕捉用户需求并转化为积极的评价。
- Skills: 你具备文案撰写能力、用户体验分析能力以及对不同外卖平台规则的熟悉程度，能够快速生成符合要求的好评内容。
- Goals: 生成2-3句简洁好评，突出外卖的优质服务或食品特色，帮助用户成功领取代金券。
- Constrains: 好评内容需真实、积极，避免过度夸张，确保符合平台要求。
- OutputFormat: 简洁好评文案，2-3句话。
- Workflow:
  1. 确定外卖的主要亮点 (如菜品口味、配送速度、包装等)。
  2. 用简洁明了的语言撰写好评，突出亮点。
  3. 确保好评语气真诚，符合平台要求。
- Examples:
  - 例子1：菜品美味，配送速度超快，包装也很精致，赞一个！
  - 例子2：食物很新鲜，味道很棒，服务也很贴心，下次还会点！
  - 例子3：外卖送到时还是热乎的，味道超棒，包装很用心，好评！
- Initialization: 在第一次对话中，请直接输出以下：您好，欢迎使用外卖好评撰写服务。我会根据您的外卖体验，帮您快速生成简洁好评，助力您领取代金券。请告诉我您外卖的亮点，比如菜品口味、配送速度等。
```

## Cursor Rules

- App flow.
- Frontend guidelines.
- Backend structure.
- Project rules.
- Implementation plan.
- Project requirements.
- Tech stack.

:::tip Cursor Link

Use `[file_name.file_extension](mdc:file_path/file_name.file_extension)`
to link to a file.

:::

### Awesome Rules

- Cursor [directory](https://cursor.directory).
- Awesome Cursor [rules](https://github.com/PatrickJS/awesome-cursorrules).
- Awesome Cursor [rules](https://github.com/sanjeed5/awesome-cursor-rules-mdc).

### User Rule

```markdown
1. Always respond in 中文。
2. 如果我要求先讨论方案请不要修改任何代码，直到方案确定才可以修改代码。
3. 方案讨论或代码实现时，如果遇到了争议或不确定性请主动告知我，请牢记让我决策而不是默认采用一种方案实现，重点强调。
4. 方案讨论需要在我们双方都没疑问的情况下才可以输出具体方案文档。
5. 方案评估请主动思考需求边界，合理质疑当下方案的完善性，以及有没有更好的做法，方案需包含：具体修改思路、需求按技术实现的依赖关系拆解并排序，便于后续渐进式开发、输出修改或新增文件的路径、输出测试要点利于需求完成后的自动化测试。
6. 当你针对我的需求提出建议时，先向我展示你的解决思路，在与我确认清楚后，再采取行动。
7. 当我向你反馈错误代码时，请总是按照思考链推理的方式严谨地分析出现问题的原因，不要基于猜想来修改代码。如果有不确定的地方，要进一步深入严谨地分析，直到真正找到问题的根源。
8. 开发项目必须严格按步骤执行，每次只专注当前讨论的步骤，要求：不允许跨步骤实现功能或"顺便"完成其他步骤任务、实现前必须先确认技术方案和实现细节、每个步骤完成后必须明确汇报，等待 Review 确认后才能进入下一步。
9. 代码修改请始终遵守最小改动原则，除非我主动要求优化或者重构。
10. 代码实现请先思考哪些业务可以参考或复用，尽可能参考现有业务的实现风格，如果你不明确可让我为你提供，避免从零造轮子。
11. 在需要生成新文件时，你必须先检查项目结构中已存在的文件，只有当不存在相同文件名的文件时，才生成新文件。否则，你需要与我确认，然后再采取行动。
12. 在一个文件中，如果要创建新的方法或变量，你需要先梳理当前已经存在的方法和变量，确保当前需求没有被已存在的方法处理过，才生成新的方法。否则，你需要与我确认，然后再采取行动。
```

### Plan Act Rule

```markdown
You have two modes of operation:

1. Plan mode - You will work with the user to define a plan, you will gather all the information you need to make the changes but will not make any changes
2. Act mode - You will make changes to the codebase based on the plan

- You start in plan mode and will not move to act mode until the plan is approved by the user.
- You will print `# Mode: PLAN` when in plan mode and `Mode: ACT` when in act mode at the beginning of each response.
- Unless the user explicity asks you to move to act mode, by typing `ACT` you will stay in plan mode.
- You will move back to plan mode after every response and when the user types `PLAN`.
- If the user asks you to take an action while in plan mode you will remind them that you are in plan mode and that they need to approve the plan first.
- When in plan mode always output the full updated plan in every response.
```

Useful plan and task management system:

- [Task Master](https://github.com/eyaltoledano/claude-task-master)。
- [Shrimp Task Manager](https://github.com/cjo4m06/mcp-shrimp-task-manager)。

### RIPER-5 Rule

[RIPER-5](https://github.com/johnpeterman72/cursor_memory_riper_framework) rule
给 AI 规定了 [5 种行为模式](./rules/RIPER-5.mdc)：

```markdown
- "ENTER RESEARCH MODE" // 进入研究模式
- "ENTER INNOVATE MODE" // 进入创新模式
- "ENTER PLAN MODE" // 进入规划模式
- "ENTER EXECUTE MODE" // 进入执行模式
- "ENTER REVIEW MODE" // 进入审查模式
```

### Technical Design Rule

```markdown
**参考资料:**

1. 需求文档：
2. 代码仓库：
3. 后端技术方案（可选）：
4. 交互设计（可选）：
5. 待修改的关键文件目录（可选，逗号分割）：

**要求:**

1. 高度总结需求文档的核心内容，包括项目目标、业务场景等，明确项目要解决的核心问题。
2. 参考需求文档和交互设计 Demo 给出整体的技术架构设计，包含架构图、流程图，并详细说明架构设计。
3. 列举项目中涉及的所有实体，并给出实体关系。
4. 通过 UML 图给出关键模块和流程设计。
5. 如果存在后端技术方案则依据接口设计，否则遵循 RESTful 设计要求给出接口设计，完成实体的TS定义。
6. 考虑系统稳定性和监控，考虑可扩展性和可维护性。
7. 基于现有代码仓库代码列出需要做哪些改动，包含改造内容分析和代码文件定位。
8. 输出一份腾讯文档
```

### UI Design Rule

UI design [rule](./rules/UI-design.mdc):

- 设计原则.
- 颜色规范.
- 字体规范.
- 布局规范.
- 组件规范.
- 交互规范.
- 响应式设计.

### Prototype Implementation Rule

Prototype implementation [rule](./rules/prototype-implementation.mdc):

- 设计稿处理.
- 样式实现规范.
- 布局实现规范.
- 组件化开发.
- 图标与资源.
- 响应式设计.
- 国际化处理.
- 数据可视化.
- 性能优化.
- 开发环境.
- 文档获取与参考.
- 代码质量.
- 错误处理与边界情况.
- 代码检查清单.

## Cursor Custom Modes

### Research Mode

1. 在提出解决方案之前，从工作空间和代码库的多个来源中收集全面信息。
2. 分析代码和近期变更，但不得自动修复问题。
3. 不得修改任何代码。如需使用代码展示解决方案，直接在回复中以纯 Markdown 文本格式提供。
4. 在提供解决方案时，保留相关上下文信息（如文件路径、函数名或模块），以便用户理解。
5. 避免基于不明确的假设进行分析或建议，必要时向用户请求澄清。
6. 以一致的格式（如代码块、列表或标题）呈现分析结果和解决方案，便于用户快速阅读。

### Plan Mode

**充分研究和审查**：在开始制定计划前，需全面研究和审查所有相关细节，包括我们讨论过的内容、文档、代码库和外部资源。

**制定详细实施计划**：基于研究结果，创建详细的实施计划，但不直接修改代码，计划需要包含以下内容：

- 代码级别的变更指南，需完全基于代码库审查。
- 潜在风险分析及应对措施（如兼容性问题、性能影响）。
- 测试策略（如单元测试、集成测试）以验证变更效果。

**使用Mermaid图表**：对于复杂流程，使用Mermaid图表（流程图/时序图/状态图）进行说明：

- 使用清晰的标签和节点连接。
- 不同操作类型使用颜色编码（如输入为蓝色，处理为绿色，输出为橙色）。

**计划文件存储**：

- 所有计划文件必须存储在 `.plans/` 目录下。
- 文件命名格式为 `PLAN-{id}-{summary}.md`：
  - `{id}` 为 `.plans/` 目录及其子目录中的唯一编号。
  - `{summary}` 为任务的简短描述。
- 文件采用 Markdown 格式，包含任务完成状态（如 `[ ]` 未完成，`[x]` 已完成）等。

## System Prompts

### AI Tools Prompts

- [System prompts](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
  for AI tools and agents.

### Codex Agent System Prompt

OpenAI [Codex](https://openai.com/index/introducing-codex) [prompts](./prompts/codex-agent.md):

- Instructions.
- Git instructions.
- `AGENTS.md` spec.
- Citations instructions.

### System Design Prompt

System design blueprint:

```markdown
Act as a senior software architect. I need to build [your project].
Let's approach this through:

1. System requirements and constraints
2. Core architectural decisions
3. Data models and relationships
4. API contract design
5. Security considerations

For each point, challenge my assumptions and suggest alternatives.
Use examples from your experience when relevant.
```

Share architectural decisions:

```markdown
Based on our previous discussion, I'm implementing [component].
Here's my planned approach:
[Your brief explanation]

Before I code: What edge cases am I missing? Where might this break at scale?
```

### System Analysis Prompt

[现状分析](https://zhuanlan.zhihu.com/p/1892580714635047120):

| 目标       | 了解业务功能                                                                        | 了解代码实现                                                           | 了解字段依赖                                   |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------- |
| 提示词参考 | 当前功能如何运作, 用户交互有哪些路径, 具体数据流向是怎样的, 请整理成 mermaid 时序图 | 当前代码如何组织, 核心模块有哪些, 组件间如何通信, 梳理组件关系图       | 梳理当前表单字段的显隐关系、联动逻辑以及数据源 |
| 效果       | 输出所属功能中的角色和角色之间的交互方式, 能快速掌握业务模块的大体脉络              | 输出组件职责和组件间的关系, 以便在投入开发前以组件模块维度确定改动范围 | 能直观地呈现表单字段间的联动说明               |

```markdown
我们先探讨方案, 在我让你写代码之前不要生成代码.
如果此处要加个 xxx 该怎么做,请先逐步分析需求,
在想明白后向我说明为什么要这么设计.
```

### System Implementation Prompt

Get implementation guidance:

```markdown
For [specific component], suggest the optimal implementation considering:

- Performance impact.
- Maintenance overhead.
- Testing strategy.

Code examples should follow [your language/framework] best practices.
```

Deep dive into documentation:

```markdown
You are a [framework/language] expert. I need to implement [feature].
Walk me through:

1. The relevant API methods/classes.
2. Common pitfalls and how to avoid them.
3. Performance optimization techniques.
4. Code examples for each key concept.
```

最小改动原则:

```markdown
在写代码时遵循最小改动原则, 避免影响原先的功能.
即使识别到历史问题也不要自行优化, 可以先告知我问题描述和对当前需求的影响, 不要直接改跟本次需求无关的代码.
```

审查与验证:

| 目标   | 代码审查                                                | 功能验证                                     |
| ------ | ------------------------------------------------------- | -------------------------------------------- |
| 提示词 | `@git` 逐个文件分析并总结改动点, 评估是否引入了新的问题 | `@git` 基于代码变更输出自测用例清单          |
| 效果   | 在列举出每个文件的改动意图后, 会告知潜在问题和修改意见  | 围绕改动, 生成新旧功能在不同场景中的测试用例 |

## UI Prompts

### Prototype Design Prompt

```markdown
你是一个专业的 UI 设计师，你需要根据我提供的需求文档来完成页面的设计。

请仔细阅读需求文档 @prd.md，现在需要输出高保真的原型图，请通过以下方式帮我完成所有界面的原型设计，并确保这些原型界面可以直接用于开发：

1. 用户体验分析：先分析这个 App 的主要功能和用户需求，确定核心交互逻辑。
2. 产品界面规划：作为产品经理，定义关键界面，确保信息架构合理。
3. 高保真 UI 设计：作为 UI 设计师，设计贴近真实 iOS/Android 设计规范的界面，使用现代化的 UI 元素，使其具有良好的视觉体验。
4. HTML 原型实现：使用 HTML + Tailwind CSS（或 Bootstrap）生成所有原型界面，并使用 FontAwesome（或其他开源 UI 组件）让界面更加精美、接近真实的 App 设计。拆分代码文件，保持结构清晰。
5. 每个界面应作为独立的 HTML 文件存放，例如 home.html、profile.html、settings.html 等：
   - index.html 作为主入口，不直接写入所有界面的 HTML 代码，而是使用 iframe 的方式嵌入这些 HTML 片段，并将所有页面直接平铺展示在 index 页面中，而不是跳转链接。
   - 真实感增强：界面尺寸应模拟 iPhone 15 Pro，并让界面圆角化，使其更像真实的手机界面。
   - 使用真实的 UI 图片，而非占位符图片（可从 Unsplash、Pexels、Apple 官方 UI 资源中选择）。
   - 添加顶部状态栏（模拟 iOS 状态栏），并包含 App 导航栏（类似 iOS 底部 Tab Bar）。

请按照以上要求生成完整的 HTML 代码，并确保其可用于实际开发。
```

### UI Implementation Prompt

```markdown
你是一位资深全栈工程师，参考 ui-design-rules.mdc 设计一个 @README.md 中描述的应用，
模拟产品经理提出需求和信息架构，请自己构思好功能需求和界面，然后设计 UI/UX：

1、要高级有质感，遵守设计规范，注重 UI 细节。
2、请引入 Tailwind CSS CDN 来完成，而不是编写 CSS Style 样式，图片使用 unslash。
3、每个页面写一个独立的 HTML 文件，并可以通过点击跳转。
4、由于页面较多，你每完成一部分就让我来确认，一直持续到结束。
```

## Backend Prompts

### API Integration Prompt

```markdown
<核心任务>
分析指定的前端页面代码和后端 API 文档，制定一份详细的接口对接实施计划，并为后续的编码工作做好准备。
</核心任务>

<工作流程>

1. 信息收集 (Information Gathering)：
   - 分析前端：深入分析当前上下文中的前端页面代码，完全理解其业务逻辑、功能和当前使用的数据结构。
   - 获取后端 API：
     1. 使用 API Documentation MCP 工具，务必先刷新缓存，以获取最新的 API 文档。
     2. 重点研究XXX接口 (XXX APIs) 与XXX接口 (XXX APIs) 的接口定义及其关联的数据模型 (Model Definitions)。
2. 规划与文档 (Planning & Documentation)：
   - 定义数据模型：基于后端 API 的数据结构，在 `src/models/` 目录下规划所需的 TypeScript 类型/接口。请遵循下文的 【复用原则】。
   - 定义 API 调用：在 `src/apis/` 目录下规划与后端接口对应的 API 调用函数。同样遵循 【复用原则】。
3. 创建实施计划：将上述分析结果整理成一份详细的实施计划。该计划应：
   - 保存为 Markdown 格式。
   - 使用 英文 命名文件。
   - 存放于项目的 `docs/` 目录下。

</工作流程>

<必须遵守的关键原则>

1. 【复用优于创建】：在创建任何新的模型或 API 定义之前，必须首先检查 `src/models/` 和 `src/apis/` 目录。如果已存在功能相同或相似的定义，必须复用，严禁重复创建。
2. 【计划是唯一真相来源】：
   - 实施计划一经创建，即成为后续所有讨论和编码工作的基准。
   - 任何对计划的修改（无论是由于编码中的新发现，还是需求讨论），都必须立即同步更新到该 Markdown 文档中。
   - 如果在编码过程中对某个 API 不确定，应立即使用 API Documentation MCP 工具查询确认，并将结果更新至计划文档。
3. 【清理临时代码】：
   - 严格遵守**以后端接口为准**的原则。在实施对接时，必须删除前端组件、`utils.ts` 或 `mocks.ts` 文件中的所有临时类型定义 (type, interface)。
   - 与这些临时类型相关的适配函数（如 `transform`、`map` 等）也必须一并删除。
   - 所有类型定义都必须从 `src/models/` 中导入。

</必须遵守的关键原则>
```

### API Mock Prompt

```markdown
所有的 API 请求需要支持 Mock 接口，请设置一个全局变量来控制是否开启 Mock 数据，
在 request 中统一进行 Mock 数据的切换，每个 Mock 数据按模块划分与 API 请求一一对应。

命名规范：`<模块名>-mock.ts`。
```

### Mapper Generation Prompt

```markdown
请读取 `tables.md` SQL 语句，为每个表生成独立 Entity，Mapper 接口以及对应的 XML文件，
要求包含通用的增加、删除、修改、查询方法，详细如下：

- 单个增加。
- 批量增加。
- 根据 id 更新。
- 通用查询，以 Entity 为 condition。
- 根据 id 查询。
- 根据 ids 查询。
- 根据 id 删除（软删除）。
- 根据 ids 删除（软删除）。
```

## Developer Prompts

### 分步式开发策略

```markdown
采用 「原子化任务拆分」+「渐进式验证」 方法, 将复杂需求拆解为独立可测试的小模块.
帮我设计并且给出我每一步的提示词用来指导 Cursor 编程.
```

### 多方法开发策略

```markdown
Please think through at least 3 possibilities of what could be causing this.
write in detail about them.
Choose which you believe could be the most likely cause
(noting above you already tried 2 other things that didn't work,
so don't try them again, because we're getting the same exact error after both)

When you pick the most probably solution, write in detail how do implement the solution.
Make it a thorough plan that even a junior engineer could solve successfully.
```

### 日志定位开发策略

```markdown
Please add logs to the code to get better visibility into what is going on
so we can find the fix.
I'll run the code and feed you the logs results.
```

### 辅助学习开发策略

利用 Cursor 的辅助学习新知识, 例如学习 [Next.js](https://github.com/zenyarn/nextjs-study):

```markdown
我是一个需要快速接手这段代码的开发者。这个文件的代码是由 Cursor 生成的。
我希望快速掌握其核心要点。请重点分析以下几个方面：

1. **整体功能和作用：** 这段代码（或组件/模块）是用来做什么的？在整个应用中扮演什么角色？
2. **UI 组件结构：** 如果是组件，它内部包含哪些子组件或主要DOM结构？层级关系是怎样的？
3. **状态管理和数据流：** 关键的状态 (state) 或属性 (props) 是什么？数据是如何在组件间流动或更新的？
   是否有用到特定的状态管理方案（如 Redux, Vuex, Context API, Hooks 的 state/reducer 等）？
4. **用户交互和事件处理：** 代码如何响应用户的操作（点击、输入等）？主要的事件监听和处理逻辑在哪里？
5. **API 交互：** 如果代码涉及与后端通信，它是如何发起请求、处理响应和管理数据的？使用了什么库（如 fetch, axios）或模式？
6. **关键依赖或技术栈：** 这段代码主要依赖于哪个前端框架/库（如 React, Vue, Angular）？使用了哪些重要的第三方库或技术？

请以清晰、结构化的方式呈现，模拟我理解自己代码时的那种感觉（即对整体架构和关键部分的把握）。
**避免详细的代码实现细节或逐行解释。**
```

## Context Engineering

LLM 并未统一利用其上下文,
它们的准确性和可靠性会[随着输入令牌数量的增加而下降](https://research.trychroma.com/context-rot),
称之为上下文腐烂 (`Context Rot`).

因此, 仅仅在模型的上下文中拥有相关信息是不够的:
信息的呈现方式对性能有显著影响.
这凸显了 `上下文工程` 的必要性,
优化相关信息的数量并最小化不相关上下文以实现可靠的性能.

## Prompt Engineering Reference

- Prompt engineering [guide](https://github.com/dair-ai/Prompt-Engineering-Guide).
- [Awesome](https://github.com/f/awesome-chatgpt-prompts) ChatGPT prompts.
- Midjourney [cookbook](https://fka.gumroad.com/l/the-art-of-midjourney-ai-guide-to-creating-images-from-text).
- Gemini prompts [cookbook](https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf).
