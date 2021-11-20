from django.http import JsonResponse
from game.models.player.player import Player


def getinfo_acapp(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })


def getinfo_web(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })


def getinfo(request):
    platform = request.GET.get('platform')
    if platform == "ACAPP":
        return getinfo_acapp(request)
    else:
        return getinfo_web(request)
