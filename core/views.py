from django.shortcuts import redirect, render
from administracao_sistemas.models.usuario import Usuario
from core.decorators import login_obrigatorio

# Create your views here.
def index(request):
    return render(request, 'core/login.html')


def login(request):
    context = {}
    
    if request.method == 'POST':
        user_name = request.POST.get('username')
        password = request.POST.get('password')
        
        try:
            # Tenta buscar o usuário na base de dados
            usuario = Usuario.objects.get(user_name=user_name)

            request.session['id_usuario'] = usuario.id_usuario
            request.session['nome_usuario'] = usuario.nome_usuario
            request.session['user_name'] = usuario.user_name
            request.session['id_perfil'] = usuario.id_perfil.id_perfil
            request.session['desc_perfil'] = usuario.id_perfil.descricao_perfil
            
            # Compara a senha em texto puro (como você está fazendo agora)
            if usuario.password == password:
                if usuario.password_status == 1:
                    return redirect('core:dashboard')
                
                elif usuario.password_status == 2:
                    context['modal_titulo'] = "Acesso bloqueado"
                    context['modal_mensagem'] = "Você está bloqueado nesse sistema, favor procurar o administrador."
                    return render(request, 'core/login.html', context)
                
                elif usuario.password_status == 3:
                    context['modal_titulo'] = "Troca de Senha"
                    context['id_usuario'] = usuario.id_usuario
                    context['modal_mensagem'] = "Você solicitou a troca da senha ou é a primeira vez que acessa o sistema, é necessário trocar a senha ."
                    return render(request, 'core/troca_senha.html', context)
            else:
                # Senha incorreta
                context['modal_titulo'] = "Erro de Login"
                context['modal_mensagem'] = "Usuário e senha incorretos."
                return render(request, 'core/login.html', context)
                
        except Usuario.DoesNotExist:
            # Caso o usuário não seja encontrado pelo .get()
            context['modal_titulo'] = "Erro de Login"
            context['modal_mensagem'] = "Usuário e senha incorretos."    
            return render(request, 'core/login.html', context)

    else:
    # Se for uma requisição GET (primeiro acesso à página de login)
        context['modal_titulo'] = "Erro de Login"
        context['modal_mensagem'] = "Usuário e senha incorretos."
        return render(request, 'core/login.html',context)

@login_obrigatorio
def troca_senha(request):
    context = {}
    if request.method == 'POST':
        usuario = request.POST.get('id_usuario')
        nova_senha = request.POST.get('password')
        senha_repetida = request.POST.get('senha_repetida')

        if nova_senha == senha_repetida:
            Usuario.objects.filter(id_usuario = usuario).update(password = nova_senha,password_status = 1)
            return render(request, 'core/dashboard.html',context)
        else:
            context['modal_titulo'] = "Senhas diferentes"
            context['modal_mensagem'] = "As senhas digitadas não são iguais. "
            context['id_usuario'] = usuario
            return render(request, 'core/troca_senha.html', context)

@login_obrigatorio
def dashboard(request):    
    return render(request, 'core/dashboard.html')

def logout_view(request):
    request.session.flush()  # apaga tudo da sessão
    return render(request, 'core/login.html')



