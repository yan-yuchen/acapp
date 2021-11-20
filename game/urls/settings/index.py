from django.urls import path
from game.views.settings.getinfo import getinfo

urlpatterns = [
    path("getinfo/", getinfo, name="setting_getinfo"),  # 名称默认为项目路径，方便记忆
]