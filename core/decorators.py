from functools import wraps
from django.shortcuts import redirect  # <-- Mudou de django.contrib para django.shortcuts e de redirects para redirect

def login_obrigatorio(view_func):
    @wraps(view_func)
    def _wrapped(request, *args, **kwargs):
        if not request.session.get("id_usuario"):
            return redirect("core:index")  # <-- Usando redirect no singular
        return view_func(request, *args, **kwargs)
    return _wrapped