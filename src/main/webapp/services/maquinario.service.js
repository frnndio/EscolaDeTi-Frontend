angular.module('maquinario')
    .factory('maquinarioService', callMaquinarioService);

function callMaquinarioService($location, $filter, toastr, $http, configuracao) {

    var service = {};

    var urlApi = configuracao.urlApi + '/';

    service.imageIdCounter = 0;

    service.imageIndex = 0;

    function returnSucess(response) {
        return response;
    }

    function returnFailure(error) {
        return error;
    }

    service.search = function (busca) {
      return $http.get(urlApi + "anuncios?search=" + busca)
        .then(returnSucess)
        .catch(returnFailure)
    }

    service.addAnuncio = function(anuncio) {
        return $http.post(urlApi + 'anuncios/agricola/cadastrar', anuncio)
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.updateAnuncio = function(anuncio) {
        return $http.put(urlApi + 'anuncios/' + anuncio.id, anuncio)
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.findAnuncioById = function(idAnuncio) {
        return $http.get(urlApi + 'anuncios/' + idAnuncio)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.excluirAnuncio = function(idAnuncio) {
        return $http.delete(urlApi + 'anuncios/' + idAnuncio)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAllEstados = function() {
        return $http.get(urlApi + 'estados')
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getEstadoById = function(idEstado) {
        return $http.get(urlApi + 'estados/' + idEstado)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getCidadesByEstadoId = function(idEstado) {
        return $http.get(urlApi + 'cidades/estado/' + idEstado)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getCidadeById = function(idCidade) {
        return $http.get(urlApi + 'cidades/' + idCidade)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.addEndereco = function(endereco) {
        return $http.post(urlApi + 'enderecos', endereco)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getEnderecoById = function(idEndereco) {
        return $http.get(urlApi + 'enderecos/' + idEndereco)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.atualizarEndereco = function(idEndereco, endereco) {
        return $http.put(urlApi + 'enderecos/' +  idEndereco, endereco)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAllAnunciosAprovados = function(idPessoa) {
        return $http.get(urlApi + 'anuncios/usuario/' + idPessoa + '/publicados')
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAllAnunciosAguardandoAprovacao = function(idUsuario) {
        return $http.get(urlApi + 'anuncios/usuario/' + idUsuario + '/aguardandoAprovacao')
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAllAnunciosExpirados = function(idUsuario) {
        return $http.get(urlApi + 'anuncios/usuario/' + idUsuario + '/expirados')
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAllAnunciosAguardandoAprovacaoAdmin = function(idUsuario) {
        return $http.get(urlApi + 'anuncios/admin/aguardandoAprovacao')
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.aprovarAnuncio = function(idAnuncio) {
        return $http.patch(urlApi + 'anuncios/' + idAnuncio + '/aprovar' )
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.reprovarAnuncio = function(idAnuncio) {
        return $http.patch(urlApi + 'anuncios/' + idAnuncio + '/reprovar' )
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.submeterParaAvalicao = function(idAnuncio) {
        return $http.patch(urlApi + 'anuncios/' + idAnuncio + '/editar' )
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.saveAnuncioFotos = function(request) {
        return $http(request)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.impulsionarAnuncio = function(idAnuncio, tipoImpulsao) {
        return $http.patch(urlApi + 'anuncios/' + idAnuncio + '/impulsionar', tipoImpulsao)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.excluirFoto = function(idAnuncio, idFoto) {
        return $http.delete(urlApi + 'anuncios/' + idAnuncio + '/fotos/' + idFoto)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.getAnuncioDate = function (date) {
        var data = new Date(date);
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        if (dia < 10) dia = '0' + dia;
        if (mes < 10) mes = '0' + mes;

        return dia + '/' + mes + '/' + ano;
    }

    service.getAnuncioTime = function (date) {
        var time = new Date(date);
        var horas = time.getHours();
        var minutos = time.getMinutes();

        if (horas < 10) horas = '0' + horas;
        if (minutos < 10) minutos = '0' + minutos;

        return horas + ':' + minutos;
    }

    service.anos = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018',];


    service.marcas = [
        {
            categoria: 'Agrícola', marcas: [
                { codigo: 1, nome: 'Agrale' },
                { codigo: 2, nome: 'Bomag' },
                { codigo: 3, nome: 'Caterpillar' },
                { codigo: 4, nome: 'Cimisa' },
                { codigo: 5, nome: 'Civemasa' },
                { codigo: 6, nome: 'Coyote' },
                { codigo: 7, nome: 'Cremasco' },
                { codigo: 8, nome: 'Genius' },
                { codigo: 9, nome: 'IBL' },
                { codigo: 10, nome: 'Imep' },
                { codigo: 11, nome: 'John Deer' },
                { codigo: 12, nome: 'KF' },
                { codigo: 13, nome: 'KO' },
                { codigo: 14, nome: 'Piccin' },
                { codigo: 15, nome: 'PLA' },
                { codigo: 16, nome: 'Schemaq' },
                { codigo: 17, nome: 'Stabra' },
                { codigo: 18, nome: 'Sulinox' },
                { codigo: 19, nome: 'Triton' },
                { codigo: 20, nome: 'Volvo' },
                { codigo: 22, nome: 'Lavrale' },
                { codigo: 23, nome: 'Yanmar' },
                { codigo: 24, nome: 'Outra' }
            ]
        },
        {
            categoria: 'Civil', marcas: [
                { codigo: 1, nome: 'Coral' },
                { codigo: 2, nome: 'MC' },
                { codigo: 3, nome: 'Sika' },
                { codigo: 4, nome: 'Viapol' },
                { codigo: 5, nome: 'Bosch' },
                { codigo: 6, nome: 'Basf' },
                { codigo: 7, nome: 'Outra' }
            ]
        }
    ];

    service.findAllMarcas = function () {
        return service.marcas;
    }

    service.findAllAnos = function () {
        return service.anos;
    }

    service.getTotalAnunciosPublicados = function () {
        return service.anunciosPublicados.length;
    }

    service.getTotalAnunciosAguardandoAprovacao = function () {
        return service.anunciosAguardandoAprovacao.length;
    }

    service.getTotalAnunciosExpirados = function () {
        return service.anunciosExpirados.length;
    }

    service.getSubcategorias = function (categorias, categoriaSelecionada) {
        if (categoriaSelecionada == '') {
            return '';
        }

        var categoriaFiltrada = $filter('filter')(categorias, categoriaSelecionada);
        return categoriaFiltrada[0].subcategorias;
    }

    service.getCidades = function (estados, estadoSelecionado) {
        if (estadoSelecionado == '') {
            return '';
        }

        var estadoFiltrado = $filter('filter')(estados, estadoSelecionado);
        return estadoFiltrado[0].cidades;
    }

    service.getMarcas = function (categoriaSelecionada) {
        if (categoriaSelecionada == '') {
            return '';
        }

        var categoriaFiltrada = $filter('filter')(service.marcas, categoriaSelecionada);
        return categoriaFiltrada[0].marcas;
    }


    service.goToPath = function (path) {
        $location.path(path);
    }

    service.goToPathByTipo = function (tipo) {
        if (tipo == 'publicado') {
            service.goToPath('/anuncios');
        } else if (tipo == 'aguardando') {
            service.goToPath('/anuncios/aguardando_aprovacao');
            toastr.success('Anúncio criado com sucesso!', 'Sucesso!');
        }
    }

    service.setImgImpulsao = function(anuncio, tipo) {
        switch (tipo) {
            case 'BRONZE':
                anuncio.imgImpulsao = '../../../assets/img/1.png'
                break;

            case 'PRATA':
                anuncio.imgImpulsao = '../../../assets/img/2.png'
                break;

            case 'OURO':
                anuncio.imgImpulsao = '../../../assets/img/3.png'
                break;

            case 'DIAMANTE':
                anuncio.imgImpulsao = '../../../assets/img/4.png'
                break;
        }

    }

    service.findAnuncioByIndex = function (index, tipo) {
        var anuncio;

        switch (tipo) {
            case 'publicados':
                anuncio = service.anunciosPublicados[index];
                break;

            case 'aguardando':
                anuncio = service.anunciosAguardandoAprovacao[index];
                break;

            case 'expirados':
                anuncio = service.anunciosExpirados[index];
                break;
        }

        return anuncio;
    }

    service.excluirAnuncioPorIndex = function (index, tipo) {

        switch (tipo) {
            case 'publicados':
                service.anunciosPublicados.splice(index, 1);
                break;

            case 'aguardando':
                service.anunciosAguardandoAprovacao.splice(index, 1);
                break;

            case 'expirados':
                service.anunciosExpirados.splice(index, 1);
                break;
        }
    }

    service.excluirAnunciosSelecionados = function (tipo) {

        var totalAnunciosAntes;
        var totalAnunciosDepois;

        switch (tipo) {
            case 'publicados':
                totalAnunciosAntes = service.anunciosPublicados.length;
                service.anunciosPublicados = service.anunciosPublicados.filter(function (anuncio) {
                    if (!anuncio.selecionado) return anuncio;
                });
                totalAnunciosDepois = service.anunciosPublicados.length;
                break;

            case 'aguardando':
                totalAnunciosAntes = service.anunciosAguardandoAprovacao.length;
                service.anunciosAguardandoAprovacao = service.anunciosAguardandoAprovacao.filter(function (anuncio) {
                    if (!anuncio.selecionado) return anuncio;
                });
                totalAnunciosDepois = service.anunciosAguardandoAprovacao.length;
                break;

            case 'expirados':
                totalAnunciosAntes = service.anunciosExpirados.length;
                service.anunciosExpirados = service.anunciosExpirados.filter(function (anuncio) {
                    if (!anuncio.selecionado) return anuncio;
                });
                totalAnunciosDepois = service.anunciosExpirados.length;
                break;
        }

        if (totalAnunciosAntes != totalAnunciosDepois) {
            toastr.success('Anúncio(s) excluído(s) com sucesso!', 'Sucesso!');
        }

    }

    service.selecionarTodosAnuncios = function (tipo, checked) {

        switch (tipo) {
            case 'publicados':
                service.anunciosPublicados.forEach(function (anuncio) {
                    anuncio.selecionado = checked;
                });
                break;

            case 'aguardando':
                service.anunciosAguardandoAprovacao.forEach(function (anuncio) {
                    anuncio.selecionado = checked;
                });
                break;

            case 'expirados':
                service.anunciosExpirados.forEach(function (anuncio) {
                    anuncio.selecionado = checked;
                });
                break;
        }
    }

    service.insertAnuncio = function (anuncio, route) {
        anuncio.statusAnuncio = 'AGUARDANDO_APROVACAO';
        console.log('insertAnuncio');
        console.log(anuncio);
        service.addAnuncio(service.setAnuncio(anuncio)).then(function(response) {
            var request = service.createFotoPostRequest(anuncio, response.data.idGerado);
            service.saveAnuncioFotos(request).then(function(responseFoto) {
                service.goToPath(route + response.data.idGerado);
            });
        });
    }

    service.createFotoPostRequest = function(anuncio, idAnuncio) {
        var formdata = new FormData();
        anuncio.fotos.forEach(function(foto) {
            formdata.append('fotos', foto);
        });

        var request = {
            method: 'POST',
            url: 'http://back.time02escoladeti.com/anuncios/' + idAnuncio + '/fotos',
            data: formdata,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        return request;
    }

    service.setAnuncioTelefone = function(telefone) {

        telefone = telefone.replace('(', '');
        telefone = telefone.replace(')', '');
        telefone = telefone.replace('-', '');
        telefone = telefone.replace(' ', '');

        return parseFloat(telefone);
    }

    service.setAnuncio = function (anuncio) {
        anuncio.telefone = service.setAnuncioTelefone(anuncio.telefone);
        anuncio.valor = parseFloat(anuncio.valor);
        anuncio.dataCadastro = new Date().toISOString();
        return anuncio;
    }

    service.editarAnuncio = function(anuncio, idCidade, form, tipo) {

        var updatedAnuncio = angular.copy(anuncio);

        if ((form.$dirty == true && tipo == 'aprovado') || (form.$dirty == true && tipo == 'expirado')) {

            updatedAnuncio.valor = parseFloat(updatedAnuncio.valor);
            updatedAnuncio.telefone = service.setAnuncioTelefone(updatedAnuncio.telefone);

            service.updateAnuncio(updatedAnuncio).then(function(response) {
                if (response.status == 200) {
                    var request = service.createFotoPostRequest(anuncio, anuncio.id);
                    service.saveAnuncioFotos(request).then(function(response) {
                        service.submeterParaAvalicao(updatedAnuncio.id).then(function(response) {
                            service.goToPath('/anuncios/aguardando_aprovacao');
                        });
                    });
                    toastr.success('Anúncio atualizado com sucesso!', 'Sucesso!');
                } else {
                    toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
                }
            });

        } else if (form.$dirty == false && tipo == 'aprovado') {
            service.goToPath('/anuncios');
        } else if (form.$dirty == false && tipo == 'expirado') {
            service.submeterParaAvalicao(updatedAnuncio.id).then(function(response) {
                service.goToPath('/anuncios/aguardando_aprovacao');
            });
        }

        /*service.atualizarEndereco(anuncio.endereco.id, {
                bairro: null,
                complemento: null,
                idCep: null,
                idCidade: idCidade,
                numero: null,
                rua: null
        }).then(function(response) { console.log(response);});*/
    }

    service.addCounter = function (service, counterTipo) {
        var value = 0;

        switch (counterTipo) {
            case 'id':
                service.imageIdCounter += 1;
                value = service.imageIdCounter;
                break;

            case 'index':
                service.imageIndex += 1;
                value = service.imageIndex - 1;
        }

        return value;
    }

    service.createImg = function(file, anuncio, index) {

        if (typeof file == 'undefined' || file == null) {
            return;
        }

        var gallery = document.querySelector('#gallery');
        var thumb = document.createElement("div");
        thumb.classList.add('thumbnail');

        thumb.id = service.addCounter(service, 'id') + '-img';

        var img = document.createElement("img");
        img.file = file;

        var deleteIconLink = service.criarDelete(thumb, anuncio, index);

        thumb.appendChild(deleteIconLink);
        thumb.appendChild(img);
        gallery.appendChild(thumb);

        var fileInput = document.querySelector('#fileinput');
        fileInput.value = null;

        return img;
    }

    service.createImgInEdition = function(file, anuncio, index, form) {

        if (typeof file == 'undefined' || file == null) {
            return;
        }

        var gallery = document.querySelector('#gallery');
        var thumb = document.createElement("div");
        thumb.classList.add('thumbnail');

        thumb.id = service.addCounter(service, 'id') + '-img';

        var img = document.createElement("img");
        img.file = file;

        var deleteIconLink = service.criarDeleteFormData(thumb, anuncio, index, form);

        thumb.appendChild(deleteIconLink);
        thumb.appendChild(img);
        gallery.appendChild(thumb);

        var fileInput = document.querySelector('#fileinput');
        fileInput.value = null;

        return img;
    }

    service.makeImageInvisble = function (element, anuncio, index) {

        anuncio.fotos[index] = null;
        element.classList.add('display-none');
    }

    service.makeImageInvisbleFormData = function (element, anuncio, index, form) {
        service.excluirFoto(anuncio.id, anuncio.fotos[index].fotoId).then(function(response) {
        });
        element.classList.add('display-none');
        form.$dirty = true;
    }

    service.criarDelete = function(thumb, anuncio, index) {
        var deleteIconLink = document.createElement("a");
        deleteIconLink.addEventListener('click', function () {
            service.makeImageInvisble(thumb, anuncio, index);
        });
        deleteIconLink.classList.add("img-delete-icon");

        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash");

        deleteIconLink.appendChild(deleteIcon);
        return deleteIconLink;
    }

    service.criarDeleteFormData = function(thumb, anuncio, index, form) {
        var deleteIconLink = document.createElement("a");
        deleteIconLink.addEventListener('click', function () {
            service.makeImageInvisbleFormData(thumb, anuncio, index, form);
        });
        deleteIconLink.classList.add("img-delete-icon");

        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash");

        deleteIconLink.appendChild(deleteIcon);
        return deleteIconLink;
    }

    service.displayImages = function (file, img) {

        var reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result;} })(img);
        reader.readAsDataURL(file);
    }

    service.displayImagesFormData = function (file, img) {
        img.src = file.urlFoto;
    }

    service.listImagesInEditionFormData = function(file, anuncio, index, form) {

        var img = service.createImgInEdition(file, anuncio, index, form);
        service.displayImagesFormData(file, img);
    }

    service.listImagesInEdition = function (file, anuncio, index) {

        if (!file.type.match(/image.*/)) {
            throw "Arquivo deve ser uma imagem";
        }

        var img = service.createImg(file, anuncio, index);

        service.displayImages(file, img);
    }

    service.listImagesInAnuncios = function (file, img) {

        if (typeof file == 'undefined' || file == null) {
            return;
        }

        service.displayImagesFormData(file, img);
    }

    service.findMelhoresAnuncios = function () {
        return $http.get(urlApi + 'anuncios/melhores')
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.displayAnuncioImages = function (file, attrCounter) {

        if (typeof file == 'undefined' || file == null) {
            return;
        }

        var ul = document.querySelector('.bxslider');
        var li = document.createElement("li");
        var img1 = document.createElement("img");
        img1.file = file;

        li.appendChild(img1);
        ul.appendChild(li);

        service.displayImagesFormData(file, img1);

        /* foto miniaturas do slider */

        var bxPager = document.querySelector('#bx-pager');
        var aux = attrCounter;

        var a = document.createElement("a");
        a.classList.add('thumb-item-link');
        a.setAttribute("data-slide-index", aux.toString());
        a.setAttribute("href", "javascript:void(0)");

        var img2 = document.createElement("img");
        img2.file = file;

        a.appendChild(img2);
        bxPager.appendChild(a);

        service.displayImagesFormData(file, img2);
    }

    service.callImageSlider = function () {
        $('.bxslider').bxSlider({
            pagerCustom: '#bx-pager',
            adaptiveHeight: true
        });
    }

    return service;
    
}
