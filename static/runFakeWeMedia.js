[
  '{{repeat(150,199)}}',
  {
    _id: '{{objectId()}}',
    type: '{{random("微博", "微信")}}',
    avatar: 'http://placehold.it/32x32',
    interest: [
      '{{repeat(1,3)}}',
      '{{random("旅游", "美食","电影","阅读","动漫","自拍","运动","音乐","星座","阅读", "时尚", "汽车", "竞技", "占卜" ,"军事", "科技")}}'],
    city: '{{random("北京", "上海", "广洲", "深圳")}}',
    name: '{{surname()}}',
    age: '{{integer(12, 38)}}',
    gender: '{{random("男", "女")}}',
    fans: '{{integer(5000, 90000)}}',
    temp: '{{integer(1000, 10000)}}',
    price: '{{random(20,30,50,100,150,200,300,400,500,800,1000,2000,3000,5000,10000)}}'
  }
]