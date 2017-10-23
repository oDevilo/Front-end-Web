# err.py
# python3 -m pdb err.py l 显示当前行 n 执行下一行 p 显示变量

import pdb
s = '0'
n = int(s)
pdb.set_trace()
print(10 / n)