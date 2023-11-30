window.onload = function() {
    console.log('DOM cargado');
    //busca y obtiene el elemento del dom que es un div y que tiene la clase owl-dots

    let div_padre = document.querySelector("#slider_10812");
    let elementos_clase = document.getElementsByClassName("owl-dot");
    for (var i = 0; i < elementos_clase.length; i++) {
        //añadimos un atributo data-id a cada elemento de la clase owl-dot
        elementos_clase[i].setAttribute('data-id', i);
    }

    let elementos_slider = document.getElementsByClassName("owl-item");
    //añadimos un atributo data-id a cada elemento de la clase owl-item
    for (var i = 0; i < elementos_slider.length; i++) {
        elementos_slider[i].setAttribute('data-id', i);
    }

    // EVENTO CLICK CUANDO HACEMOS CLICK EN UN ELEMENTO DEL MENU DE NAVEGACION
    Array.prototype.forEach.call(elementos_clase, function(element) {
        element.addEventListener('click', function() {
            //identificamos el numero sobre que elemento se ha echo click
            console.log('se ha echo click en el elemento con id o página: ' + element.dataset.id);
            let numero_de_pagina_click = element.dataset.id;
            //existe_parametro_url(element.dataset.id);
            //let transform = style2;
            //let height_de_pagina = style;
            //escribe_fichero(numero_de_pagina_click, height_de_pagina, transform);
        });
    });




    // Si la url es la misma que https... muestrame en consola "es la url", si no, "no es la url"
    if (compararUrl('https://www.subaquaticamagazine.es/subaquatica-magazine-edicion-adci-septiembre-octubre-2023/')) {
        console.log('es la url');
    } else {
        console.log('no es la url');
        // encuentra la url en la que estamos con window.location.shearch y añadimos paramentro "pagina" y lo mostramos en la url
        if (encontrar_en_url()) {
            console.log('encontrado');
            let params = new URLSearchParams(window.location.search);
            let existe = params.has("pagina");
            // si existe, muestrame la clase active, ocultamelo del slider actual, muestrame sus atributos y espera un segundo para que se cargue el slider y SINO (else) muestrame "no existe" 

            if (existe) {
                console.log('existe');
                let pagina = params.get("pagina");
                console.log('la página de la url es: ' + pagina);
                //let pag_actual = dame_pagina_actual();

                // mostramos la clase active y la ocultamos del slider actual (0)
                let active = document.getElementsByClassName("active");
                console.log(active);
                ocultar_slider_actual(active[0]);

                let height_global_d = dame_equivalencia_owlheight(pagina);
                let transform_global_d = dame_equivalencia_transform(pagina);

                let padre = document.getElementsByClassName("owl-stage-outer owl-height");

                let elemento_padre = padre[0];
                //añdimos un id al elemento padre para identificarlo mejor en el dom 
                elemento_padre.setAttribute('id', 'padre');
                let elemento_padre_real = document.getElementById('padre');
                //necesitamos obtener su atributo style
                let style = elemento_padre.getAttribute('style');
                console.log("el height antes de cambiarlo es: " + style);
                //muestrame que se modifica cada vez que cambio de pagina en el div con clase owl-stage
                let padre2 = document.getElementsByClassName("owl-stage");
                let elemento_padre2 = padre2[0];
                //necesitamos obtener su atributo style
                let style2 = elemento_padre2.getAttribute('style');
                console.log("el transform antes de cambiarlo es: " + style2);

                //el valor del atributo ha cambiado y ahora es...
                //esperar 1 segundo para que se cargue el slider
                setTimeout(function() {
                    elemento_padre.setAttribute('style', 'height:' + height_global_d);
                    console.log('el height es: ' + height_global_d);
                    elemento_padre2.setAttribute('style', 'transform:' + transform_global_d);
                    console.log('el transform es: ' + transform_global_d);
                }, 0);

                // ESTE FUNCIONA 

                let contenido_a_mostrar = dame_pagina_para_mostrar(pagina);
                mostrar_slider_actual(contenido_a_mostrar, pagina);

            } else {
                console.log('no existe');
                let pagina = 0;
            }

        } else {
            console.log('no encontrado');
        }
    }

    // insertar un boton en el dom con el texto compartir debajo del elemento con id=slider_10812

    let boton_compartir = document.createElement('button');
    let texto_boton = document.createTextNode('Compartir');
    boton_compartir.appendChild(texto_boton);
    div_padre.appendChild(boton_compartir);
    boton_compartir.addEventListener('click', function() {
        console.log('click');
        let url_actual = getUrl();
        alert(url_actual);
    });

    // Funcion para trabajar con el sevidor "php" y enviarle los datos de la pagina actual, el height y el transform

    function escribe_fichero(numero_pagina, height_de_pagina, transform) {

        localStorage.setItem("nombre", "Chris");
        let miNombre = localStorage.getItem("nombre");
        console.log(miNombre);

        let url = 'https://www.subaquaticamagazine.es/wp-includes/js/cng.php';
        let params = "pagina=" + numero_pagina;
        params += "&height=" + height_de_pagina;
        params += "&transform=" + transform;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            // console.log(this.responseText);
            console.log("enviando datos al servidor" + "pagina" + numero_pagina + "height" + height_de_pagina + "transform" + transform);

        };
        xhr.send(params);
    }

    // Funcion para mostrar el slider actual, ocultamos la clase active de la pagina 0 y mostramos la clase active de la pagina actual
    // Se muestra todos los botones que existe con la clase owl-dot y su id del
    // Cuando actualizamos la pagina, por ejemplo : https:.../?pagina=1, se muestra en la botonera el numero de la pagina actual. 
    function mostrar_slider_actual(active, pagina) {
        console.log('mostrando el slider actual');
        //añadimos la clase active al elemento active
        if (pagina != 0) {

            let elementos_clase = document.getElementsByClassName("owl-dot active");
            elementos_clase[0].classList.remove('active');
            //mostramos lista de botones
            let elementos_con_clase = document.getElementsByClassName("owl-dot");
            pagina = pagina - 1;
            for (var i = 0; i < elementos_con_clase.length; i++) {
                //añadimos un atributo data-id a cada elemento de la clase owl-dot
                let numero_de_pagina = elementos_con_clase[i].getAttribute('data-id');
                console.log('el numero de pagina es: ' + numero_de_pagina);
                console.log('la pagina es: ' + pagina);

                if (numero_de_pagina == pagina) {
                    //añadiendo clase active
                    console.log('añadiendo clase active');

                    elementos_con_clase[i].classList.add('active');
                }
                //console.log(numeros_de_paginas);
            }
            // 

        }


    }

    // ocultamos la propiedad "active"
    function ocultar_slider_actual(active) {
        console.log('ocultando el slider actual');
        //eliminamos la clase active del elemento active
        active.classList.remove('active');

    }

    // obtenemos id y nos devuelve la pagina actual
    function dame_pagina_actual() {
        let active = document.querySelector("div.active");
        //obtenemos su data-id
        // console.log(active);
        let pagina_actual = active.getAttribute('data-id');
        console.log('la pagina actual es: ' + pagina_actual);
        return active;
    }

    // nos devuelve el slider que le pedimos. Por ejemplo: quiero el 2, nos devuelve la pagina 2
    function dame_pagina_para_mostrar(num_pagina) {
        //obtenemos todos los elementos con la clase owl-item
        let todos_los_contenidos = document.getElementsByClassName("owl-item");
        //obtenemos el elemento con el data-id=num_pagina
        let contenido_a_mostrar = todos_los_contenidos[num_pagina];
        console.log(contenido_a_mostrar);
        return contenido_a_mostrar;

    }

}


// Busca en la url el parametro "pagina" y si existe, muestramelo y si no existe crealo con pagina y su numero 

function existe_parametro_url(numero_pagina) {
    const queryString = window.location.search;
    console.log(queryString);
    let params = new URLSearchParams(queryString);
    let existe = params.has("pagina");
    if (existe) {
        let pagina = params.get("pagina");
        if (pagina == numero_pagina) {} else {
            params.set("pagina", numero_pagina);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
            console.log(params.toString());
        }
    } else {
        console.log('no encuenta la pagina');
        params.append("pagina", numero_pagina);
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }

}


/* PAGUINA ACTUAL SIN PARAMENTRO ?pagina=_ */
//https://www.subaquaticamagazine.es/subaquatica-magazine-edicion-adci-septiembre-octubre-2023/

// devuelve la url con ?pagina=_
function getUrl() {
    console.log(window.location.href);
    return window.location.href;
}
// cuenta los caracteres de la url hasta llegar antes de ?pagina=_ (en este caso 94)
function encontrar_en_url() {
    let url_actual = getUrl();
    let palabra = "pagina";
    let position = url_actual.indexOf(palabra);
    if (position !== -1) {
        return true;

    } else {
        return false;
    }

}

// Devuelve la url actual 
function compararUrl(url) {
    let url_actual = getUrl();
    if (url_actual == url) {
        return true;
    } else {
        return false;
    }
}


// devuelve el valor de la pagina actual, en este caso el transform

function dame_equivalencia_transform(paginappp) {
    let transform_global = "valor";
    let num = Number(paginappp);
    num = num + 1;

    switch (num) {
        case 0:

            return transform_global = 'translate3d(0px, 0px, 0px);transition: all 0s ease 0s;width: 35280px;';
            break;
        case 1:

            return transform_global = 'translate3d(0px, 0px, 0px);transition: all 0s ease 0s;width: 35280px;';
            break;
        case 2:

            return transform_global = 'translate3d(-840px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 3:

            return transform_global = 'translate3d(-1680px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 4:

            return transform_global = 'translate3d(-2520px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 5:

            return transform_global = 'translate3d(-3360px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 6:

            return transform_global = 'translate3d(-4200px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 7:

            return transform_global = 'translate3d(-5040px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 8:

            return transform_global = 'translate3d(-5880px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 9:

            return transform_global = 'translate3d(-6720px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 10:

            return transform_global = 'translate3d(-7560px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 11:

            return transform_global = 'translate3d(-8400px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 12:

            return transform_global = 'translate3d(-9240px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 13:

            return transform_global = 'translate3d(-10080px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 14:

            return transform_global = 'translate3d(-10920px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 15:

            return transform_global = 'translate3d(-11760px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 16:

            return transform_global = 'translate3d(-12600px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 17:

            return transform_global = 'translate3d(-13440px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 18:

            return transform_global = 'translate3d(-14280px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 19:

            return transform_global = 'translate3d(-15120px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 20:

            return transform_global = 'translate3d(-15960px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 21:

            return transform_global = 'translate3d(-16800px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 22:

            return transform_global = 'translate3d(-17640px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 23:

            return transform_global = 'translate3d(-18480px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 24:

            return transform_global = 'translate3d(-19320px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 25:

            return transform_global = 'translate3d(-20160px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 26:

            return transform_global = 'translate3d(-21000px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 27:

            return transform_global = 'translate3d(-21840px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 28:

            return transform_global = 'translate3d(-22680px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 29:

            return transform_global = 'translate3d(-23520px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 30:

            return transform_global = 'translate3d(-24360px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 31:

            return transform_global = 'translate3d(-25200px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 32:

            return transform_global = 'translate3d(-26040px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 33:

            return transform_global = 'translate3d(-26880px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 34:

            return transform_global = 'translate3d(-27720px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 35:

            return transform_global = 'translate3d(-28560px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 36:

            return transform_global = 'translate3d(-29400px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 37:

            return transform_global = 'translate3d(-30240px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 38:

            return transform_global = 'translate3d(-31080px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 39:

            return transform_global = 'translate3d(-31920px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 40:

            return transform_global = 'translate3d(-32760px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
        case 41:

            return transform_global = 'translate3d(-33600px, 0px, 0px);transition: all 0.2s ease 0s;width: 35280px;';
            break;
    }
}

// devuelve el valor de la pagina actual, en este caso el height
function dame_equivalencia_owlheight(heightttt) {
    let height_global = "valor";
    let num = Number(heightttt);

    switch (num) {
        case 0:
            console.log('es el caso 0');
            return height_global = '2550.5px';
            break;

        case 1:
            console.log('es el caso 1');
            return height_global = '2550.5px;';
            break;

        case 2:
            return height_global = '2944.89px;';
            break;

        case 3:
            return height_global = '2944.94px;';
            break;

        case 4:
            return height_global = '3084.23px;';
            break;

        case 5:
            return height_global = '3688.86px;';
            break;

        case 6:
            return height_global = '3064.66px;';
            break;

        case 7:
            return height_global = '2707.06px;';
            break;

        case 8:
            return height_global = '2706.8px;';
            break;

        case 9:
            return height_global = '1906.75px;';
            break;

        case 10:
            return height_global = '3939.11px;';
            break;

        case 11:
            return height_global = '2293.39px;';
            break;

        case 12:
            return height_global = '1102.17px;';
            break;

        case 13:
            return height_global = '1688.11px;';
            break;

        case 14:
            return height_global = '2193.53px;';
            break;

        case 15:
            return height_global = '2079.94px;';
            break;

        case 16:
            return height_global = '2543.64px;';
            break;

        case 17:
            return height_global = '2755.89px;';
            break;

        case 18:
            return height_global = '1787.95px;';
            break;

        case 19:
            return height_global = '1185.25px;';
            break;

        case 20:
            return height_global = '1234.33px;';
            break;

        case 21:
            return height_global = '1062.73px;';
            break;

        case 22:
            return height_global = '2708.67px;';
            break;

        case 23:
            return height_global = '2505.89px;';
            break;

        case 24:
            return height_global = '1884.84px;';
            break;

        case 25:
            return height_global = '5731.61px;';
            break;

        case 26:
            return height_global = '4218.39px;';
            break;

        case 27:
            return height_global = '4316.02px;';
            break;

        case 28:
            return height_global = '3688.3px;';
            break;

        case 29:
            return height_global = '2893.58px;';
            break;

        case 30:
            return height_global = '1412.55px;';
            break;

        case 31:
            return height_global = '2450.97px;';
            break;

        case 32:
            return height_global = '2732.69px;';
            break;

        case 33:
            return height_global = '2429.42px;';
            break;

        case 34:
            return height_global = '2132.55px;';
            break;

        case 35:
            return height_global = '14171.4px;';
            break;

        case 36:
            return height_global = '10458.4px;';
            break;

        case 37:
            return height_global = '3749.08px;';
            break;

        case 38:
            return height_global = '1737.88px;';
            break;

        case 39:
            return height_global = '1514.31px;';
            break;

        case 40:
            return height_global = '1328.58px;';
            break;

        case 41:
            return height_global = '2828.31px;';
            break;

    }
}