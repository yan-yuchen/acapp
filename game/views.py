from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align: center">嘉然今天吃什么</h1>'
    line4 = '<a href="/play/">关注嘉然</a>'
    line3 = '<hr>'
    line2 = '<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp448094018.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638115209&t=390c8a040d0b6c24b160f8b4c78029dd"    width=200>'
    return HttpResponse(line1 + line4 + line3 + line2)

def play(request):
    line1 = '<h1 style="text-align: center">欢迎！！！</h1>'
    line2 = '<a href="/">返回主页面</a>'
    line3 = '<hr>'
    line4 = '<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F14f33703fb595a1306756937aca6ec582112de1a.png&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638115890&t=37ca0fac125e6de4f39d65a72afa03ad"      width=1000>'
    return HttpResponse(line1 + line2 + line3 + line4)

# Create your views here.
