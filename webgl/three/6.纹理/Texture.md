THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )

各个参数的意义是：

Image：这是一个图片类型

var image = THREE.ImageUtils.loadTexture(url); // url 是一个http://xxxx/aaa.jpg 则有跨域问题，javascript没有从本地加载数据的能力，所以没有办法从本机加载数据。

Mapping：是一个THREE.UVMapping()类型，它表示的是纹理坐标。下一节，我们将说说纹理坐标。

wrapS：表示x轴的纹理的回环方式，就是当纹理的宽度小于需要贴图的平面的宽度的时候，平面剩下的部分应该p以何种方式贴图的问题。

wrapT：表示y轴的纹理回环方式。 magFilter和minFilter表示过滤的方式，这是OpenGL的基本概念，我将在下面讲一下，目前你不用担心它的使用。当您不设置的时候，它会取默认值

format：表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等。THREE.RGBAFormat表示每个像素点要使用四个分量表示，分别是红、绿、蓝、透明来表示。RGBFormat则不使用透明，也就是说纹理不会有透明的效果。

type：表示存储纹理的内存的每一个字节的格式，是有符号，还是没有符号，是整形，还是浮点型。这里默认是无符号型（THREE.UnsignedByteType）。

anisotropy：各向异性过滤。使用各向异性过滤能够使纹理的效果更好，但是会消耗更多的内存、CPU、GPU时间