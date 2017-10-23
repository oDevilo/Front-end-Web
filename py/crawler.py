#encoding:UTF-8
from urllib import request
import re

def getHtml(url):
    page = request.urlopen(url)
    html = page.read()
    return html

def getImg(html):
    reg = r'src="(.+?[png|jpg|gif])"'
    imgre = re.compile(reg)
    print(1)
    print(imgre)
    imglist = re.findall(imgre,html)
    print(imglist)
    x = 0
    for imgurl in imglist:
        # 下载对应图片到当前文件夹
        request.urlretrieve(imgurl,'%s.png' % x)
        x+=1

html = getHtml("http://tieba.baidu.com/")

print(getImg(html.decode('UTF-8')))