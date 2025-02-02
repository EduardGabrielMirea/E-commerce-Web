$(document).ready(function() {
    let cesta = [];

    function cargarProductos(jsonUrl, containerId) {
        $.getJSON(jsonUrl, function(data) {
            let container = $(containerId);
            data.forEach((item, index) => {
                let activeClass = index === 0 ? 'active' : '';
                container.append(`
                    <div class="carousel-item ${activeClass}">
                        <div class="text-center p-3">
                            <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid mb-3" style="max-height: 200px;">
                            <h5>${item.nombre}</h5>
                            <p>${item.descripcion}</p>
                            <p><strong>${item.precio}</strong></p>
                            <input type="number" min="1" value="1" class="form-control d-inline-block w-auto cantidad" data-nombre="${item.nombre}">
                            <button class="btn btn-primary agregar" data-nombre="${item.nombre}" data-precio="${item.precio}" data-imagen="${item.imagen}">Añadir</button>
                        </div>
                    </div>
                `);
            });

            // Asignar eventos después de cargar los productos
            $('.agregar').on('click', function() {
                let nombre = $(this).data('nombre');
                let precio = parseFloat($(this).data('precio').replace('$', ''));
                let imagen = $(this).data('imagen');
                let cantidad = parseInt($(this).siblings('.cantidad').val());
                agregarProducto(nombre, precio, cantidad, imagen);
            });
        });
    }

    function agregarProducto(nombre, precio, cantidad, imagen) {
        let productoExistente = cesta.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            cesta.push({ nombre, precio, cantidad, imagen });
        }
        actualizarCesta();
    }

    function quitarProducto(nombre) {
        cesta = cesta.filter(item => item.nombre !== nombre);
        actualizarCesta();
    }

    function actualizarCesta() {
        let $cesta = $('#cesta');
        $cesta.empty();
        let totalGeneral = 0;

        cesta.forEach(item => {
            let total = item.cantidad * item.precio;
            totalGeneral += total;
            $cesta.append(`
                <tr>
                    <td>${item.nombre}</td>
                    <td><img src="${item.imagen}" alt="${item.nombre}" class="img-fluid" style="max-height: 50px;"></td>
                    <td>${item.cantidad}</td>
                    <td>${item.precio.toFixed(2)} €</td>
                    <td>${total.toFixed(2)} €</td>
                    <td><button class="btn btn-danger quitar" data-nombre="${item.nombre}">Quitar</button></td>
                </tr>
            `);
        });

        $cesta.append(`
            <tr>
                <td colspan="4"><strong>Total General</strong></td>
                <td>${totalGeneral.toFixed(2)} €</td>
                <td></td>
            </tr>
        `);

        // Asignar evento para quitar producto
        $('.quitar').on('click', function() {
            let nombre = $(this).data('nombre');
            quitarProducto(nombre);
        });
    }

    cargarProductos("../../public/data/materiales.json", "#materiales-container");
    cargarProductos("../../public/data/herramientas.json", "#herramientas-container");
});
