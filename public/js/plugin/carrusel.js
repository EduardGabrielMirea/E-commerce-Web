((function ($) {
    $.fn.carruselProductos = function (opciones) {
        let config = $.extend({
            jsonUrl: null,
            onProductoAgregado: null
        }, opciones);

        if (!config.jsonUrl) {
            console.error("URL del JSON no proporcionada.");
            return this;
        }

        let container = this;

        $.getJSON(config.jsonUrl, function (data) {
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

            container.find('.agregar').on('click', function () {
                let nombre = $(this).data('nombre');
                let precio = parseFloat($(this).data('precio').replace('$', ''));
                let imagen = $(this).data('imagen');
                let cantidad = parseInt($(this).siblings('.cantidad').val());

                if (config.onProductoAgregado) {
                    config.onProductoAgregado(nombre, precio, cantidad, imagen);
                }
            });
        });

        return this;
    };
})(jQuery));
