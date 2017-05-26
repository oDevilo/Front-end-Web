### THREE.Light只是其他所有光源的基类

THREE.AmbientLight(环境光)
THREE.SpotLight(聚光灯)
THREE.AreaLight(区域光)
THREE.PointLight(点光源)
THREE.DirectionLight(方向光)

### 环境光

环境光是经过多次反射而来的光称为环境光，无法确定其最初的方向。环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。因此，当你仅为场景指定环境光时，所有的物体无论法向量如何，都将表现为同样的明暗程度。 （这是因为，反射光可以从各个方向进入您的眼睛）

环境光用THREE.AmbientLight来表示，它的构造函数如下所示：

THREE.AmbientLight( hex )

它仍然接受一个16进制的颜色值，作为光源的颜色。环境光将照射场景中的所有物体，让物体显示出某种颜色。环境光的使用例子如下所示：

var light = new THREE.AmbientLight( 0xff0000 );

scene.add( light );

### 点光源

点光源：由这种光源放出的光线来自同一点，且方向辐射自四面八方。例如蜡烛放出的光，萤火虫放出的光。

点光源用PointLight来表示，它的构造函数如下所示：

PointLight( color, intensity, distance )

这个类的参数稍微复杂一些，我们花点时间来解释一下：

Color：光的颜色

Intensity：光的强度，默认是1.0,就是说是100%强度的灯光，

distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。


### 聚光灯


这种光源的光线从一个锥体中射出，在被照射的物体上产生聚光的效果。使用这种光源需要指定光的射出方向以及锥体的顶角α。

聚光灯的构造函数是：

THREE.SpotLight( hex, intensity, distance, angle, exponent )

函数的参数如下所示：

Hex：聚光灯发出的颜色，如0xFFFFFF

Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。

Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.

Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。

exponent：光源模型中，衰减的一个参数，越大衰减约快。

### 方向光（平行光）

平行光又称为方向光（Directional Light），是一组没有衰减的平行的光线，类似太阳光的效果。

方向光的构造函数如下所示：

THREE.DirectionalLight = function ( hex, intensity )

其参数如下：

Hex：关系的颜色，用16进制表示

Intensity：光线的强度，默认为1。因为RGB的三个值均在0~255之间，不能反映出光照的强度变化，光照越强，物体表面就更明亮。它的取值范围是0到1。如果为0，表示光线基本没什么作用，那么物体就会显示为黑色。

### 点光源

点光源是理想化为质点的向四面八方发出光线的光源。点光源是抽象化了的物理概念，为了把物理问题的研究简单化。就像平时说的光滑平面，质点，无空气阻力一样，点光源在现实中也是不存在的，指的是从一个点向周围空间均匀发光的光源。

点光源的特点是发光部分为一个小圆面，近似一个点

下面的例子介绍了怎么使用点光源：

light = new THREE.PointLight(0xFF0000);

light.position.set(0, 0,50);

scene.add(light);
