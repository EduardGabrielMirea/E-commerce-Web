$(document).ready(function () {
    let cesta = [];

    const actualizarCesta = () => {
        const $cesta = $('#cesta');
        $cesta.empty();
        let totalGeneral = 0;

        cesta.forEach(item => {
            const total = item.cantidad * item.precio;
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

        $('.quitar').on('click', function () {
            const nombre = $(this).data('nombre');
            cesta = cesta.filter(item => item.nombre !== nombre);
            actualizarCesta();
        });
    };

    const agregarProducto = (nombre, precio, cantidad, imagen) => {
        const productoExistente = cesta.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            cesta.push({ nombre, precio, cantidad, imagen });
        }
        actualizarCesta();
    };

    // Inicializar carruseles con carga de productos
    $("#materiales-container").carruselProductos({
        jsonUrl: "../../public/data/materiales.json",
        onProductoAgregado: agregarProducto
    });

    $("#herramientas-container").carruselProductos({
        jsonUrl: "../../public/data/herramientas.json",
        onProductoAgregado: agregarProducto
    });
});
