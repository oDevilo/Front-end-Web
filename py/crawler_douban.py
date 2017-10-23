from urllib import request
from bs4 import BeautifulSoup as bs # BeautifulSoup html解析包
import re
import jieba # jieba 分词包 pandas 为jieba依赖的
import pandas as pd
import numpy #numpy计算包
import matplotlib.pyplot as plt
import matplotlib
# 词云展示包
from wordcloud import WordCloud

resp = request.urlopen('https://movie.douban.com/nowplaying/hangzhou/')
html_data = resp.read().decode('utf-8')
soup = bs(html_data, 'html.parser')    
nowplaying_movie = soup.find_all('div', id='nowplaying')
nowplaying_movie_list = nowplaying_movie[0].find_all('li', class_='list-item')

# 打开电影短评需要电影id，id为data-subject属性的值
# nowplaying_list每个元素如下形式 {'id': '26378579', 'name': '王牌特工2：黄金圈'}
nowplaying_list = [] 
for item in nowplaying_movie_list:        
        nowplaying_dict = {}        
        nowplaying_dict['id'] = item['data-subject']       
        for tag_img_item in item.find_all('img'):            
            nowplaying_dict['name'] = tag_img_item['alt']            
            nowplaying_list.append(nowplaying_dict)

# 解析短评网址 如王牌特工2是 https://movie.douban.com/subject/26378579/comments?start=0&limit=20 获取div comment
requrl = 'https://movie.douban.com/subject/' + nowplaying_list[0]['id'] + '/comments' +'?' +'start=0' + '&limit=20' 
resp = request.urlopen(requrl) 
html_data = resp.read().decode('utf-8') 
soup = bs(html_data, 'html.parser') 
comment_div_lits = soup.find_all('div', class_='comment')

# 解析里面的p中内容，eachCommentList里面就是用户的评论
eachCommentList = []; 
for item in comment_div_lits: 
        if item.find_all('p')[0].string is not None:     
            eachCommentList.append(item.find_all('p')[0].string)

# 将评论清理后拼接 strip() 方法用于移除字符串头尾指定的字符（默认为空格）
comments = ''
for k in range(len(eachCommentList)):
    comments = comments + (str(eachCommentList[k])).strip()

# 我们需要去除评论中的标点符合，这些内容对词频统计没有作用
pattern = re.compile(r'[\u4e00-\u9fa5]+')
filterdata = re.findall(pattern, comments)
cleaned_comments = ''.join(filterdata)

# 对处理后的字符串进行分词，高频词 用words_df.head()查看
segment = jieba.lcut(cleaned_comments)
words_df=pd.DataFrame({'segment':segment})

# 去掉停用词，如：的，好 需要再下载stopwords.txt（直接百度） words_df.head() 高频词已经不包含停用词
stopwords=pd.read_csv("stopwords.txt",index_col=False,quoting=3,sep="\t",names=['stopword'], encoding='utf-8')
words_df=words_df[~words_df.segment.isin(stopwords.stopword)]

# 词频率统计
words_stat=words_df.groupby(by=['segment'])['segment'].agg({"计数":numpy.size})
words_stat=words_stat.reset_index().sort_values(by=["计数"],ascending=False)

# 用词云显示数据 百度下载simhei.ttf
matplotlib.rcParams['figure.figsize'] = (10.0, 5.0)
word_frequence = {x[0]:x[1] for x in words_stat.head(1000).values}
word_frequence_list = []
for key in word_frequence:
    temp = (key,word_frequence[key])
    word_frequence_list.append(temp)

wordcloud=WordCloud(font_path="simhei.ttf",background_color="white",max_font_size=80) #指定字体类型、字体大小和字体颜色
wordcloud=wordcloud.fit_words(dict(word_frequence_list))
plt.imshow(wordcloud)
plt.show() # 不加程序会马上终止
